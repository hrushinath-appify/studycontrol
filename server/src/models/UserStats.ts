import { Schema, model, Document, Types } from 'mongoose'

export interface IUserStats extends Document {
  userId: Types.ObjectId
  
  // Mystery statistics
  mysteryExplorations: number
  mysteryTopicsViewed: number
  
  // Notes statistics
  totalNotes: number
  archivedNotes: number
  
  // Focus statistics
  totalFocusSessions: number
  totalFocusTime: number // in minutes
  averageFocusTime: number // in minutes
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

const userStatsSchema = new Schema<IUserStats>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Mystery statistics
  mysteryExplorations: {
    type: Number,
    default: 0
  },
  mysteryTopicsViewed: {
    type: Number,
    default: 0
  },
  
  // Notes statistics
  totalNotes: {
    type: Number,
    default: 0
  },
  archivedNotes: {
    type: Number,
    default: 0
  },
  
  // Focus statistics
  totalFocusSessions: {
    type: Number,
    default: 0
  },
  totalFocusTime: {
    type: Number,
    default: 0
  },
  averageFocusTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'userstats'
})

// Index for faster queries
userStatsSchema.index({ userId: 1 })

// Methods to update stats
userStatsSchema.methods.updateMysteryStats = function() {
  this.mysteryExplorations += 1
}

userStatsSchema.methods.updateNotesStats = function(archived: boolean = false) {
  this.totalNotes += 1
  if (archived) {
    this.archivedNotes += 1
  }
}

userStatsSchema.methods.updateFocusStats = function(sessionTime: number) {
  this.totalFocusSessions += 1
  this.totalFocusTime += sessionTime
  this.averageFocusTime = this.totalFocusTime / this.totalFocusSessions
}

export const UserStats = model<IUserStats>('UserStats', userStatsSchema)