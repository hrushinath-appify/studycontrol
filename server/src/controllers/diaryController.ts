import { Response } from 'express';
import { DiaryEntry } from '../models/DiaryEntry';
import { AuthenticatedRequest, DiaryQuery, CreateDiaryEntryRequest } from '../types';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  createPaginatedResponse,
  handleMongooseError,
  validatePaginationParams,
  buildSortObject,
  buildFilterObject
} from '../utils/response';
import { asyncHandler } from '../utils/asyncHandler';
import { validationResult } from 'express-validator';
import { calculateDiaryStreaks } from '../utils/streakCalculator';

// Get all diary entries for a user
export const getDiaryEntries = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!._id || req.user!.id;
  
  // Convert to string if it's an ObjectId
  const userIdString = userId.toString();
  const { 
    page, 
    limit, 
    sortBy = 'createdAt', 
    sortOrder = 'desc',
    mood,
    tags,
    dateFrom,
    dateTo,
    search
  }: DiaryQuery = req.query;

  try {
    const { page: validPage, limit: validLimit, skip } = validatePaginationParams(page, limit);

    // Build filter object
    const filters: any = { userId: userIdString };
    
    if (mood) filters.mood = mood;
    if (tags) filters.tags = { $in: tags.split(',').map(tag => tag.trim()) };
    if (dateFrom || dateTo) {
      filters.createdAt = {};
      if (dateFrom) filters.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filters.createdAt.$lte = new Date(dateTo);
    }

    // Search functionality
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Get total count for pagination
    const total = await DiaryEntry.countDocuments(filters);

    // Get entries with pagination and sorting
    const sort = buildSortObject(sortBy, sortOrder);
    const entries = await DiaryEntry.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(validLimit)
      .lean();

    // Ensure ObjectId is converted to string for frontend consumption
    const entriesWithStringIds = entries.map(entry => ({
      ...entry,
      id: entry._id.toString(),
      _id: undefined // Remove the _id field
    }));

    console.log('=== Backend Response Debug ===');
    if (entriesWithStringIds.length > 0) {
      console.log('First entry ID:', entriesWithStringIds[0].id);
      console.log('First entry ID type:', typeof entriesWithStringIds[0].id);
      console.log('First entry ID length:', entriesWithStringIds[0].id?.length);
    }

    res.json(createPaginatedResponse(
      entriesWithStringIds,
      validPage,
      validLimit,
      total,
      'Diary entries retrieved successfully'
    ));
  } catch (error) {
    console.error('Get diary entries error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Get a single diary entry
export const getDiaryEntry = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!._id || req.user!.id;

  try {
    const entry = await DiaryEntry.findOne({ _id: id, userId }).lean();

    if (!entry) {
      return res.status(404).json(createErrorResponse('Diary entry not found'));
    }

    // Ensure ObjectId is converted to string for frontend consumption
    const entryWithStringId = {
      ...entry,
      id: entry._id.toString(),
      _id: undefined // Remove the _id field
    };

    res.json(createSuccessResponse(
      entryWithStringId,
      'Diary entry retrieved successfully'
    ));
  } catch (error) {
    console.error('Get diary entry error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Create a new diary entry
export const createDiaryEntry = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(createErrorResponse(
      'Validation failed',
      errors.array().map(err => err.msg).join(', ')
    ));
  }

  const userId = req.user!._id || req.user!.id;
  const { title, content, mood, tags, date, isPrivate }: CreateDiaryEntryRequest = req.body;

  try {
    // Create new diary entry
    const entry = new DiaryEntry({
      userId,
      title: title.trim(),
      content: content.trim(),
      date: date || new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      mood,
      tags: tags || [],
      isPrivate: isPrivate || false,
    });

    const savedEntry = await entry.save();

    // Ensure ObjectId is converted to string for frontend consumption
    const entryWithStringId = {
      ...savedEntry.toObject(),
      id: savedEntry._id.toString(),
      _id: undefined // Remove the _id field
    };

    res.status(201).json(createSuccessResponse(
      entryWithStringId,
      'Diary entry created successfully'
    ));
  } catch (error) {
    console.error('Create diary entry error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Update a diary entry
export const updateDiaryEntry = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(createErrorResponse(
      'Validation failed',
      errors.array().map(err => err.msg).join(', ')
    ));
  }

  const { id } = req.params;
  const userId = req.user!._id || req.user!.id;
  const updateData = req.body;

  try {
    // Find and update the entry
    const entry = await DiaryEntry.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json(createErrorResponse('Diary entry not found'));
    }

    res.json(createSuccessResponse(
      entry,
      'Diary entry updated successfully'
    ));
  } catch (error) {
    console.error('Update diary entry error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Delete a diary entry
export const deleteDiaryEntry = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!._id || req.user!.id;

  try {
    const entry = await DiaryEntry.findOneAndDelete({ _id: id, userId });

    if (!entry) {
      return res.status(404).json(createErrorResponse('Diary entry not found'));
    }

    res.json(createSuccessResponse(
      null,
      'Diary entry deleted successfully'
    ));
  } catch (error) {
    console.error('Delete diary entry error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Get diary statistics
export const getDiaryStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!._id || req.user!.id;

  try {
    // Get basic stats
    const totalEntries = await DiaryEntry.countDocuments({ userId });
    const totalWords = await DiaryEntry.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$wordCount' } } }
    ]);

    // Get mood distribution
    const moodStats = await DiaryEntry.aggregate([
      { $match: { userId, mood: { $exists: true, $ne: null } } },
      { $group: { _id: '$mood', count: { $sum: 1 } } }
    ]);

    // Get entries by time period
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    const [entriesThisWeek, entriesThisMonth, entriesThisYear] = await Promise.all([
      DiaryEntry.countDocuments({ userId, createdAt: { $gte: oneWeekAgo } }),
      DiaryEntry.countDocuments({ userId, createdAt: { $gte: oneMonthAgo } }),
      DiaryEntry.countDocuments({ userId, createdAt: { $gte: oneYearAgo } })
    ]);

    // Get most used tags
    const tagStats = await DiaryEntry.aggregate([
      { $match: { userId } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Calculate streaks with proper consecutive day logic using shared utility
    const allEntries = await DiaryEntry.find({ userId })
      .sort({ createdAt: -1 })
      .select('date createdAt');

    const { currentStreak, longestStreak } = calculateDiaryStreaks(allEntries)

    const stats = {
      totalEntries,
      currentStreak,
      longestStreak,
      diaryHighestStreak: longestStreak,  // Alias for consistency with UserStats API
      totalWords: totalWords[0]?.total || 0,
      averageWordsPerEntry: totalEntries > 0 ? Math.round((totalWords[0]?.total || 0) / totalEntries) : 0,
      moodDistribution: moodStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {} as Record<string, number>),
      entriesThisWeek,
      entriesThisMonth,
      entriesThisYear,
      mostUsedTags: tagStats.map(tag => ({ tag: tag._id, count: tag.count }))
    };

    res.json(createSuccessResponse(
      stats,
      'Diary statistics retrieved successfully'
    ));
  } catch (error) {
    console.error('Get diary stats error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Search diary entries
export const searchDiaryEntries = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!._id || req.user!.id;
  const { search, page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  if (!search || typeof search !== 'string') {
    return res.status(400).json(createErrorResponse('Search term is required'));
  }

  try {
    const { page: validPage, limit: validLimit, skip } = validatePaginationParams(
      page as string, 
      limit as string
    );

    // Build search query
    const searchQuery = {
      userId,
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    };

    // Get total count
    const total = await DiaryEntry.countDocuments(searchQuery);

    // Get search results
    const sort = buildSortObject(sortBy as string, sortOrder as string);
    const entries = await DiaryEntry.find(searchQuery)
      .sort(sort)
      .skip(skip)
      .limit(validLimit)
      .lean();

    res.json(createPaginatedResponse(
      entries,
      validPage,
      validLimit,
      total,
      `Found ${total} diary entries matching "${search}"`
    ));
  } catch (error) {
    console.error('Search diary entries error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Get entries by mood
export const getEntriesByMood = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { mood } = req.params;
  const userId = req.user!._id || req.user!.id;
  const { page, limit } = req.query;

  try {
    const { page: validPage, limit: validLimit, skip } = validatePaginationParams(
      page as string, 
      limit as string
    );

    const query = { userId, mood };
    const total = await DiaryEntry.countDocuments(query);

    const entries = await DiaryEntry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(validLimit)
      .lean();

    res.json(createPaginatedResponse(
      entries,
      validPage,
      validLimit,
      total,
      `Entries with mood "${mood}" retrieved successfully`
    ));
  } catch (error) {
    console.error('Get entries by mood error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Get entries by tag
export const getEntriesByTag = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { tag } = req.params;
  const userId = req.user!._id || req.user!.id;
  const { page, limit } = req.query;

  try {
    const { page: validPage, limit: validLimit, skip } = validatePaginationParams(
      page as string, 
      limit as string
    );

    const query = { userId, tags: tag };
    const total = await DiaryEntry.countDocuments(query);

    const entries = await DiaryEntry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(validLimit)
      .lean();

    res.json(createPaginatedResponse(
      entries,
      validPage,
      validLimit,
      total,
      `Entries with tag "${tag}" retrieved successfully`
    ));
  } catch (error) {
    console.error('Get entries by tag error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});
