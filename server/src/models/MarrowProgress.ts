import { Schema, model, Document, Types, Model } from 'mongoose'

export interface IMarrowProgress extends Document {
  userId: Types.ObjectId
  topicId: string
  completed: boolean
  completedAt?: Date
  subject: string // category from MysteryTopic
  chapter: string // tags[0] from MysteryTopic
  topicTitle: string
  
  // Optional metadata for analytics
  timeSpent?: number // in minutes
  difficulty?: string
  estimatedTime?: number
  
  // Timestamps
  createdAt: Date
  updatedAt: Date

  // Instance methods
  markCompleted(timeSpent?: number): Promise<IMarrowProgress>
  markIncomplete(): Promise<IMarrowProgress>
}

export interface IMarrowProgressModel extends Model<IMarrowProgress> {
  getUserProgress(userId: Types.ObjectId): Promise<IMarrowProgress[]>
  getUserProgressBySubject(userId: Types.ObjectId, subject: string): Promise<IMarrowProgress[]>
  getUserProgressByChapter(userId: Types.ObjectId, subject: string, chapter: string): Promise<IMarrowProgress[]>
  getCompletedTopics(userId: Types.ObjectId): Promise<IMarrowProgress[]>
  getProgressStats(userId: Types.ObjectId): Promise<any[]>
  getSubjectStats(userId: Types.ObjectId): Promise<any[]>
}

const marrowProgressSchema = new Schema<IMarrowProgress>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  topicId: {
    type: String,
    required: true,
    index: true
  },
  completed: {
    type: Boolean,
    default: false,
    index: true
  },
  completedAt: {
    type: Date
  },
  subject: {
    type: String,
    required: true,
    index: true
  },
  chapter: {
    type: String,
    required: true,
    index: true
  },
  topicTitle: {
    type: String,
    required: true
  },
  
  // Optional metadata
  timeSpent: {
    type: Number,
    min: 0
  },
  difficulty: {
    type: String
  },
  estimatedTime: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true,
  collection: 'marrowprogress'
})

// Compound indexes for efficient queries
marrowProgressSchema.index({ userId: 1, topicId: 1 }, { unique: true })
marrowProgressSchema.index({ userId: 1, subject: 1 })
marrowProgressSchema.index({ userId: 1, chapter: 1 })
marrowProgressSchema.index({ userId: 1, completed: 1 })
marrowProgressSchema.index({ completedAt: -1 })

// Static methods for common queries
marrowProgressSchema.statics.getUserProgress = function(userId: Types.ObjectId) {
  return this.find({ userId }).sort({ updatedAt: -1 })
}

marrowProgressSchema.statics.getUserProgressBySubject = function(userId: Types.ObjectId, subject: string) {
  return this.find({ userId, subject }).sort({ updatedAt: -1 })
}

marrowProgressSchema.statics.getUserProgressByChapter = function(userId: Types.ObjectId, subject: string, chapter: string) {
  return this.find({ userId, subject, chapter }).sort({ updatedAt: -1 })
}

marrowProgressSchema.statics.getCompletedTopics = function(userId: Types.ObjectId) {
  return this.find({ userId, completed: true }).sort({ completedAt: -1 })
}

marrowProgressSchema.statics.getProgressStats = function(userId: Types.ObjectId) {
  return this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalTopics: { $sum: 1 },
        completedTopics: {
          $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
        },
        totalTimeSpent: { $sum: '$timeSpent' },
        subjectStats: {
          $push: {
            subject: '$subject',
            completed: '$completed'
          }
        }
      }
    },
    {
      $project: {
        totalTopics: 1,
        completedTopics: 1,
        completionPercentage: {
          $multiply: [
            { $divide: ['$completedTopics', '$totalTopics'] },
            100
          ]
        },
        totalTimeSpent: 1,
        averageTimePerTopic: {
          $cond: [
            { $eq: ['$completedTopics', 0] },
            0,
            { $divide: ['$totalTimeSpent', '$completedTopics'] }
          ]
        }
      }
    }
  ])
}

marrowProgressSchema.statics.getSubjectStats = function(userId: Types.ObjectId) {
  return this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: '$subject',
        totalTopics: { $sum: 1 },
        completedTopics: {
          $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
        },
        totalTimeSpent: { $sum: '$timeSpent' },
        lastActivity: { $max: '$updatedAt' }
      }
    },
    {
      $project: {
        subject: '$_id',
        totalTopics: 1,
        completedTopics: 1,
        completionPercentage: {
          $multiply: [
            { $divide: ['$completedTopics', '$totalTopics'] },
            100
          ]
        },
        totalTimeSpent: 1,
        lastActivity: 1
      }
    },
    { $sort: { completionPercentage: -1, lastActivity: -1 } }
  ])
}

// Instance methods
marrowProgressSchema.methods.markCompleted = function(timeSpent?: number) {
  this.completed = true
  this.completedAt = new Date()
  if (timeSpent !== undefined) {
    this.timeSpent = timeSpent
  }
  return this.save()
}

marrowProgressSchema.methods.markIncomplete = function() {
  this.completed = false
  this.completedAt = undefined
  return this.save()
}

// Pre-save middleware to update completedAt
marrowProgressSchema.pre('save', function(next) {
  if (this.isModified('completed')) {
    if (this.completed && !this.completedAt) {
      this.completedAt = new Date()
    } else if (!this.completed) {
      this.completedAt = undefined
    }
  }
  next()
})

export const MarrowProgress = model<IMarrowProgress, IMarrowProgressModel>('MarrowProgress', marrowProgressSchema)
