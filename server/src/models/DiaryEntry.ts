import mongoose, { Schema, model } from 'mongoose';
import { IDiaryEntry } from '../types';

const diaryEntrySchema = new Schema<IDiaryEntry>(
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
      maxlength: [50000, 'Content cannot exceed 50,000 characters'],
    },
    preview: {
      type: String,
      maxlength: [500, 'Preview cannot exceed 500 characters'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    mood: {
      type: String,
      enum: ['great', 'good', 'okay', 'bad', 'terrible'],
      default: null,
    },
    tags: [{
      type: String,
      trim: true,
      maxlength: [30, 'Tag cannot exceed 30 characters'],
    }],
    wordCount: {
      type: Number,
      default: 0,
      min: [0, 'Word count cannot be negative'],
    },
    isPrivate: {
      type: Boolean,
      default: false,
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
diaryEntrySchema.index({ userId: 1, createdAt: -1 });
diaryEntrySchema.index({ userId: 1, date: -1 });
diaryEntrySchema.index({ userId: 1, mood: 1 });
diaryEntrySchema.index({ userId: 1, tags: 1 });
diaryEntrySchema.index({ 
  title: 'text', 
  content: 'text' 
}, { 
  weights: { title: 10, content: 5 } 
});

// Pre-save middleware to calculate word count and preview
diaryEntrySchema.pre('save', function (next) {
  // Calculate word count
  if (this.isModified('content')) {
    const words = this.content.trim().split(/\s+/).filter(word => word.length > 0);
    this.wordCount = words.length;
    
    // Generate preview (first 100 characters + ellipsis if longer)
    this.preview = this.content.length > 100 
      ? this.content.substring(0, 100) + '...'
      : this.content;
  }
  
  // Ensure tags are unique and lowercase
  if (this.isModified('tags')) {
    this.tags = [...new Set(this.tags.map(tag => tag.toLowerCase().trim()))];
  }
  
  next();
});

// Static method to get entries by user with pagination
diaryEntrySchema.statics.findByUserPaginated = function(
  userId: string,
  page: number = 1,
  limit: number = 10,
  filters: any = {}
) {
  const skip = (page - 1) * limit;
  const query = { userId, ...filters };
  
  return this.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

// Static method to get user's entry statistics
diaryEntrySchema.statics.getUserStats = async function(userId: string) {
  const stats = await this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalEntries: { $sum: 1 },
        totalWords: { $sum: '$wordCount' },
        averageWordsPerEntry: { $avg: '$wordCount' },
        moodDistribution: {
          $push: {
            $cond: [
              { $ne: ['$mood', null] },
              '$mood',
              '$$REMOVE'
            ]
          }
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalEntries: 0,
    totalWords: 0,
    averageWordsPerEntry: 0,
    moodDistribution: []
  };
};

// Static method to search entries
diaryEntrySchema.statics.searchEntries = function(
  userId: string,
  searchTerm: string,
  options: any = {}
) {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;
  
  return this.find({
    userId,
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { content: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ]
  })
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .lean();
};

// Instance method to get related entries (by tags)
diaryEntrySchema.methods.getRelatedEntries = function(limit: number = 5) {
  return (this.constructor as any).find({
    userId: this.userId,
    _id: { $ne: this._id },
    tags: { $in: this.tags }
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .lean();
};

// Virtual for formatted date
diaryEntrySchema.virtual('formattedDate').get(function() {
  return new Date(this.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for reading time estimate (assuming 200 words per minute)
diaryEntrySchema.virtual('readingTime').get(function() {
  return Math.ceil(this.wordCount / 200);
});

export const DiaryEntry = model<IDiaryEntry>('DiaryEntry', diaryEntrySchema);
export default DiaryEntry;
