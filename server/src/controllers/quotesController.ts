import { Request, Response } from 'express';
import { Quote } from '@/models/Quote';
import { AuthenticatedRequest } from '@/types';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  createPaginatedResponse,
  handleMongooseError,
  validatePaginationParams,
  buildSortObject
} from '@/utils/response';
import { asyncHandler } from '@/utils/asyncHandler';
import { validationResult } from 'express-validator';

// Get all quotes with pagination and filters
export const getQuotes = asyncHandler(async (req: Request, res: Response) => {
  const { 
    page, 
    limit, 
    category,
    tags,
    author,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  try {
    const { page: validPage, limit: validLimit, skip } = validatePaginationParams(
      page as string, 
      limit as string
    );

    // Build filter object
    const filters: any = { isActive: true };
    
    if (category) filters.category = category;
    if (author) filters.author = { $regex: author, $options: 'i' };
    if (tags) filters.tags = { $in: (tags as string).split(',').map(tag => tag.trim()) };

    // Search functionality
    if (search) {
      filters.$or = [
        { quote: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    // Get total count
    const total = await Quote.countDocuments(filters);

    // Get quotes with pagination and sorting
    const sort = buildSortObject(sortBy as string, sortOrder as string);
    const quotes = await Quote.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(validLimit)
      .lean();

    res.json(createPaginatedResponse(
      quotes,
      validPage,
      validLimit,
      total,
      'Quotes retrieved successfully'
    ));
  } catch (error) {
    console.error('Get quotes error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Get random quote
export const getRandomQuote = asyncHandler(async (req: Request, res: Response) => {
  const { category, tags } = req.query;

  try {
    const filters: any = { isActive: true };
    
    if (category) filters.category = category;
    if (tags) filters.tags = { $in: (tags as string).split(',').map(tag => tag.trim()) };

    const quote = await Quote.aggregate([
      { $match: filters },
      { $sample: { size: 1 } }
    ]);

    if (quote.length === 0) {
      return res.status(404).json(createErrorResponse('No quotes found matching criteria'));
    }

    res.json(createSuccessResponse(
      quote[0],
      'Random quote retrieved successfully'
    ));
  } catch (error) {
    console.error('Get random quote error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Get quote of the day
export const getQuoteOfTheDay = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Use current date as seed for consistent daily quote
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const totalQuotes = await Quote.countDocuments({ isActive: true });
    
    if (totalQuotes === 0) {
      return res.status(404).json(createErrorResponse('No quotes available'));
    }

    const skipCount = seed % totalQuotes;
    
    const quote = await Quote.findOne({ isActive: true })
      .skip(skipCount)
      .lean();

    res.json(createSuccessResponse(
      quote,
      'Quote of the day retrieved successfully'
    ));
  } catch (error) {
    console.error('Get quote of the day error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Get quotes by category
export const getQuotesByCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.params;
  const { page, limit } = req.query;

  try {
    const { page: validPage, limit: validLimit, skip } = validatePaginationParams(
      page as string, 
      limit as string
    );

    const filters = { category, isActive: true };
    const total = await Quote.countDocuments(filters);

    const quotes = await Quote.find(filters)
      .sort({ likes: -1, createdAt: -1 })
      .skip(skip)
      .limit(validLimit)
      .lean();

    res.json(createPaginatedResponse(
      quotes,
      validPage,
      validLimit,
      total,
      `Quotes in category "${category}" retrieved successfully`
    ));
  } catch (error) {
    console.error('Get quotes by category error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Get quotes by tag
export const getQuotesByTag = asyncHandler(async (req: Request, res: Response) => {
  const { tag } = req.params;
  const { page, limit } = req.query;

  try {
    const { page: validPage, limit: validLimit, skip } = validatePaginationParams(
      page as string, 
      limit as string
    );

    const filters = { tags: tag, isActive: true };
    const total = await Quote.countDocuments(filters);

    const quotes = await Quote.find(filters)
      .sort({ likes: -1, createdAt: -1 })
      .skip(skip)
      .limit(validLimit)
      .lean();

    res.json(createPaginatedResponse(
      quotes,
      validPage,
      validLimit,
      total,
      `Quotes with tag "${tag}" retrieved successfully`
    ));
  } catch (error) {
    console.error('Get quotes by tag error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Search quotes
export const searchQuotes = asyncHandler(async (req: Request, res: Response) => {
  const { search, page, limit, category, tags } = req.query;

  if (!search || typeof search !== 'string') {
    return res.status(400).json(createErrorResponse('Search term is required'));
  }

  try {
    const { page: validPage, limit: validLimit, skip } = validatePaginationParams(
      page as string, 
      limit as string
    );

    // Build search query
    const filters: any = {
      isActive: true,
      $or: [
        { quote: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    };

    if (category) filters.category = category;
    if (tags) filters.tags = { $in: (tags as string).split(',').map(tag => tag.trim()) };

    const total = await Quote.countDocuments(filters);

    const quotes = await Quote.find(filters)
      .sort({ likes: -1, createdAt: -1 })
      .skip(skip)
      .limit(validLimit)
      .lean();

    res.json(createPaginatedResponse(
      quotes,
      validPage,
      validLimit,
      total,
      `Found ${total} quotes matching "${search}"`
    ));
  } catch (error) {
    console.error('Search quotes error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Get popular quotes
export const getPopularQuotes = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, category } = req.query;

  try {
    const { page: validPage, limit: validLimit, skip } = validatePaginationParams(
      page as string, 
      limit as string
    );

    const filters: any = { isActive: true };
    if (category) filters.category = category;

    const total = await Quote.countDocuments(filters);

    const quotes = await Quote.find(filters)
      .sort({ likes: -1, createdAt: -1 })
      .skip(skip)
      .limit(validLimit)
      .lean();

    res.json(createPaginatedResponse(
      quotes,
      validPage,
      validLimit,
      total,
      'Popular quotes retrieved successfully'
    ));
  } catch (error) {
    console.error('Get popular quotes error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Create new quote (admin only)
export const createQuote = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(createErrorResponse(
      'Validation failed',
      errors.array().map(err => err.msg).join(', ')
    ));
  }

  const { quote, author, category, tags, source } = req.body;
  const userId = req.user?._id;

  try {
    const newQuote = new Quote({
      quote: quote.trim(),
      author: author.trim(),
      category,
      tags: tags || [],
      source: source?.trim(),
      addedBy: userId,
      isActive: true,
      likes: 0
    });

    const savedQuote = await newQuote.save();

    res.status(201).json(createSuccessResponse(
      savedQuote,
      'Quote created successfully'
    ));
  } catch (error) {
    console.error('Create quote error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Like a quote
export const likeQuote = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const quote = await Quote.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!quote) {
      return res.status(404).json(createErrorResponse('Quote not found'));
    }

    res.json(createSuccessResponse(
      { likes: quote.likes },
      'Quote liked successfully'
    ));
  } catch (error) {
    console.error('Like quote error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Get quote statistics
export const getQuoteStats = asyncHandler(async (req: Request, res: Response) => {
  try {
    const stats = await Quote.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalQuotes: { $sum: 1 },
          totalLikes: { $sum: '$likes' },
          averageLikes: { $avg: '$likes' },
          categories: { $addToSet: '$category' },
          authors: { $addToSet: '$author' }
        }
      }
    ]);

    // Get category distribution
    const categoryStats = await Quote.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get top authors
    const authorStats = await Quote.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$author', count: { $sum: 1 }, totalLikes: { $sum: '$likes' } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const result = stats[0] || {
      totalQuotes: 0,
      totalLikes: 0,
      averageLikes: 0,
      categories: [],
      authors: []
    };

    result.categoryDistribution = categoryStats.reduce((acc, cat) => {
      acc[cat._id] = cat.count;
      return acc;
    }, {});

    result.topAuthors = authorStats.map(author => ({
      author: author._id,
      quotesCount: author.count,
      totalLikes: author.totalLikes
    }));

    delete result.categories;
    delete result.authors;

    res.json(createSuccessResponse(
      result,
      'Quote statistics retrieved successfully'
    ));
  } catch (error) {
    console.error('Get quote stats error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});
