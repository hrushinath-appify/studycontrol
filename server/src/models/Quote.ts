import mongoose, { Schema, model } from 'mongoose';
import { IQuote } from '@/types';

const quoteSchema = new Schema<IQuote>(
  {
    quote: {
      type: String,
      required: [true, 'Quote text is required'],
      trim: true,
      minlength: [10, 'Quote must be at least 10 characters long'],
      maxlength: [1000, 'Quote cannot exceed 1000 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters'],
    },
    category: {
      type: String,
      enum: ['motivation', 'education', 'success', 'learning', 'life'],
      required: [true, 'Category is required'],
    },
    tags: [{
      type: String,
      trim: true,
      maxlength: [30, 'Tag cannot exceed 30 characters'],
    }],
    source: {
      type: String,
      trim: true,
      maxlength: [200, 'Source cannot exceed 200 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    addedBy: {
      type: String,
      ref: 'User',
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: function(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for better query performance
quoteSchema.index({ category: 1, isActive: 1 });
quoteSchema.index({ tags: 1, isActive: 1 });
quoteSchema.index({ author: 1, isActive: 1 });
quoteSchema.index({ likes: -1, isActive: 1 });
quoteSchema.index({ createdAt: -1 });
quoteSchema.index({ 
  quote: 'text', 
  author: 'text',
  tags: 'text'
}, { 
  weights: { quote: 10, author: 5, tags: 3 } 
});

// Compound index for efficient random selection
quoteSchema.index({ isActive: 1, _id: 1 });

// Pre-save middleware
quoteSchema.pre('save', function (next) {
  // Ensure tags are unique and lowercase
  if (this.isModified('tags')) {
    this.tags = [...new Set(this.tags.map(tag => tag.toLowerCase().trim()))];
  }
  
  next();
});

// Static method to get random quote
quoteSchema.statics.getRandomQuote = async function(filters: any = {}) {
  const query = { isActive: true, ...filters };
  const count = await this.countDocuments(query);
  
  if (count === 0) {
    return null;
  }
  
  const random = Math.floor(Math.random() * count);
  return this.findOne(query).skip(random).lean();
};

// Static method to get quotes by category
quoteSchema.statics.getByCategory = function(
  category: string,
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;
  
  return this.find({ 
    category, 
    isActive: true 
  })
  .sort({ likes: -1, createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .lean();
};

// Static method to get quotes by tag
quoteSchema.statics.getByTag = function(
  tag: string,
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;
  
  return this.find({ 
    tags: tag, 
    isActive: true 
  })
  .sort({ likes: -1, createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .lean();
};

// Static method to search quotes
quoteSchema.statics.searchQuotes = function(
  searchTerm: string,
  options: any = {}
) {
  const { page = 1, limit = 10, category, tags } = options;
  const skip = (page - 1) * limit;
  
  const query: any = {
    isActive: true,
    $or: [
      { quote: { $regex: searchTerm, $options: 'i' } },
      { author: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ]
  };
  
  if (category) {
    query.category = category;
  }
  
  if (tags && tags.length > 0) {
    query.tags = { $in: tags };
  }
  
  return this.find(query)
    .sort({ likes: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

// Static method to get popular quotes
quoteSchema.statics.getPopularQuotes = function(
  page: number = 1,
  limit: number = 10,
  category?: string
) {
  const skip = (page - 1) * limit;
  const query: any = { isActive: true };
  
  if (category) {
    query.category = category;
  }
  
  return this.find(query)
    .sort({ likes: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

// Static method to get quotes by author
quoteSchema.statics.getByAuthor = function(
  author: string,
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;
  
  return this.find({ 
    author: { $regex: author, $options: 'i' }, 
    isActive: true 
  })
  .sort({ likes: -1, createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .lean();
};

// Static method to get quote statistics
quoteSchema.statics.getQuoteStats = async function() {
  const stats = await this.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalQuotes: { $sum: 1 },
        totalLikes: { $sum: '$likes' },
        averageLikes: { $avg: '$likes' },
        categoryCounts: {
          $push: '$category'
        },
        topAuthors: {
          $push: '$author'
        },
        allTags: {
          $push: '$tags'
        }
      }
    }
  ]);
  
  const result = stats[0] || {
    totalQuotes: 0,
    totalLikes: 0,
    averageLikes: 0,
    categoryCounts: [],
    topAuthors: [],
    allTags: []
  };
  
  // Process category counts
  if (result.categoryCounts.length > 0) {
    const categoryMap: Record<string, number> = {};
    result.categoryCounts.forEach((cat: string) => {
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    result.categoryDistribution = categoryMap;
  }
  
  // Process author counts
  if (result.topAuthors.length > 0) {
    const authorMap: Record<string, number> = {};
    result.topAuthors.forEach((author: string) => {
      authorMap[author] = (authorMap[author] || 0) + 1;
    });
    result.topAuthors = Object.entries(authorMap)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([author, count]) => ({ author, count }));
  }
  
  // Process tag counts
  if (result.allTags.length > 0) {
    const tagMap: Record<string, number> = {};
    result.allTags.flat().forEach((tag: string) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
    result.topTags = Object.entries(tagMap)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([tag, count]) => ({ tag, count }));
  }
  
  delete result.categoryCounts;
  delete result.allTags;
  
  return result;
};

// Instance method to increment likes
quoteSchema.methods.incrementLikes = function() {
  this.likes = (this.likes || 0) + 1;
  return this.save();
};

// Virtual for quote length
quoteSchema.virtual('length').get(function() {
  return this.quote.length;
});

export const Quote = model<IQuote>('Quote', quoteSchema);
export default Quote;
