import mongoose, { Schema, model } from 'mongoose';
import { INote } from '@/types';

const noteSchema = new Schema<INote>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      ref: 'User',
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title must be at least 1 character long'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [1, 'Content must be at least 1 character long'],
      maxlength: [100000, 'Content cannot exceed 100,000 characters'],
    },
    tags: [{
      type: String,
      trim: true,
      maxlength: [30, 'Tag cannot exceed 30 characters'],
    }],
    category: {
      type: String,
      trim: true,
      maxlength: [50, 'Category cannot exceed 50 characters'],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      validate: {
        validator: function(v: string) {
          // Validate hex color format
          return !v || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
        },
        message: 'Color must be a valid hex color code',
      },
    },
    attachments: [{
      type: String,
      validate: {
        validator: function(v: string) {
          // Basic URL validation
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Attachment must be a valid URL',
      },
    }],
    sharedWith: [{
      type: String,
      ref: 'User',
    }],
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
noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ userId: 1, isPinned: -1, createdAt: -1 });
noteSchema.index({ userId: 1, isArchived: 1 });
noteSchema.index({ userId: 1, category: 1 });
noteSchema.index({ userId: 1, tags: 1 });
noteSchema.index({ 
  title: 'text', 
  content: 'text' 
}, { 
  weights: { title: 10, content: 5 } 
});

// Pre-save middleware
noteSchema.pre('save', function (next) {
  // Ensure tags are unique and lowercase
  if (this.isModified('tags')) {
    this.tags = [...new Set(this.tags.map(tag => tag.toLowerCase().trim()))];
  }
  
  // If archived, unpin the note
  if (this.isModified('isArchived') && this.isArchived) {
    this.isPinned = false;
  }
  
  next();
});

// Static method to get notes by user with pagination and filters
noteSchema.statics.findByUserPaginated = function(
  userId: string,
  page: number = 1,
  limit: number = 10,
  filters: any = {},
  sortBy: string = 'updatedAt',
  sortOrder: 'asc' | 'desc' = 'desc'
) {
  const skip = (page - 1) * limit;
  const query = { userId, ...filters };
  
  // Custom sort for pinned notes (pinned first, then by sort criteria)
  const sort: any = {};
  if (sortBy === 'pinned') {
    sort.isPinned = -1;
    sort.updatedAt = -1;
  } else {
    sort.isPinned = -1; // Always show pinned first
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
  }
  
  return this.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

// Static method to search notes
noteSchema.statics.searchNotes = function(
  userId: string,
  searchTerm: string,
  options: any = {}
) {
  const { page = 1, limit = 10, includeArchived = false } = options;
  const skip = (page - 1) * limit;
  
  const baseQuery: any = {
    userId,
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { content: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ]
  };
  
  if (!includeArchived) {
    baseQuery.isArchived = { $ne: true };
  }
  
  return this.find(baseQuery)
    .sort({ isPinned: -1, updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

// Static method to get notes by category
noteSchema.statics.getNotesByCategory = function(userId: string, category: string) {
  return this.find({
    userId,
    category,
    isArchived: { $ne: true }
  })
  .sort({ isPinned: -1, updatedAt: -1 })
  .lean();
};

// Static method to get notes by tag
noteSchema.statics.getNotesByTag = function(userId: string, tag: string) {
  return this.find({
    userId,
    tags: tag,
    isArchived: { $ne: true }
  })
  .sort({ isPinned: -1, updatedAt: -1 })
  .lean();
};

// Static method to get pinned notes
noteSchema.statics.getPinnedNotes = function(userId: string) {
  return this.find({
    userId,
    isPinned: true,
    isArchived: { $ne: true }
  })
  .sort({ updatedAt: -1 })
  .lean();
};

// Static method to get archived notes
noteSchema.statics.getArchivedNotes = function(userId: string, page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  
  return this.find({
    userId,
    isArchived: true
  })
  .sort({ updatedAt: -1 })
  .skip(skip)
  .limit(limit)
  .lean();
};

// Static method to get user's note statistics
noteSchema.statics.getUserNoteStats = async function(userId: string) {
  const stats = await this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalNotes: { $sum: 1 },
        pinnedNotes: {
          $sum: { $cond: [{ $eq: ['$isPinned', true] }, 1, 0] }
        },
        archivedNotes: {
          $sum: { $cond: [{ $eq: ['$isArchived', true] }, 1, 0] }
        },
        categories: {
          $addToSet: '$category'
        },
        tags: {
          $push: '$tags'
        }
      }
    },
    {
      $project: {
        totalNotes: 1,
        pinnedNotes: 1,
        archivedNotes: 1,
        activeNotes: { $subtract: ['$totalNotes', '$archivedNotes'] },
        categories: { $filter: { input: '$categories', cond: { $ne: ['$$this', null] } } },
        allTags: {
          $reduce: {
            input: '$tags',
            initialValue: [],
            in: { $concatArrays: ['$$value', '$$this'] }
          }
        }
      }
    }
  ]);
  
  const result = stats[0] || {
    totalNotes: 0,
    pinnedNotes: 0,
    archivedNotes: 0,
    activeNotes: 0,
    categories: [],
    allTags: []
  };
  
  // Count tag frequencies
  if (result.allTags && result.allTags.length > 0) {
    const tagCounts: Record<string, number> = {};
    result.allTags.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    result.topTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
  }
  
  delete result.allTags;
  return result;
};

// Instance method to get related notes (by tags and category)
noteSchema.methods.getRelatedNotes = function(limit: number = 5) {
  const query: any = {
    userId: this.userId,
    _id: { $ne: this._id },
    isArchived: { $ne: true }
  };
  
  // Prioritize notes with same category or shared tags
  if (this.category || this.tags.length > 0) {
    query.$or = [];
    
    if (this.category) {
      query.$or.push({ category: this.category });
    }
    
    if (this.tags.length > 0) {
      query.$or.push({ tags: { $in: this.tags } });
    }
  }
  
  return (this.constructor as any).find(query)
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean();
};

// Virtual for word count
noteSchema.virtual('wordCount').get(function() {
  return this.content.trim().split(/\s+/).filter(word => word.length > 0).length;
});

// Virtual for reading time estimate (assuming 200 words per minute)
noteSchema.virtual('readingTime').get(function() {
  const wordCount = this.content.trim().split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(wordCount / 200);
});

// Virtual for preview (first 200 characters)
noteSchema.virtual('preview').get(function() {
  return this.content.length > 200 
    ? this.content.substring(0, 200) + '...'
    : this.content;
});

export const Note = model<INote>('Note', noteSchema);
export default Note;
