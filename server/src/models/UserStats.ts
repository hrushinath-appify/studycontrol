import { Schema, model, Document, Types } from 'mongoose'

export interface IUserStats extends Document {
  userId: Types.ObjectId
  
  // Diary statistics
  totalDiaryEntries: number
  currentDiaryStreak: number
  longestDiaryStreak: number
  lastDiaryEntryDate?: Date
  
  // Mystery statistics
  mysteryExplorations: number
  mysteryTopicsViewed: number
  
  // Notes statistics
  totalNotes: number
  archivedNotes: number
  
  // Tasks statistics
  totalTasks: number
  completedTasks: number
  
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
  
  // Diary statistics
  totalDiaryEntries: {
    type: Number,
    default: 0
  },
  currentDiaryStreak: {
    type: Number,
    default: 0
  },
  longestDiaryStreak: {
    type: Number,
    default: 0
  },
  lastDiaryEntryDate: {
    type: Date
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
  
  // Tasks statistics
  totalTasks: {
    type: Number,
    default: 0
  },
  completedTasks: {
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
userStatsSchema.methods.updateDiaryStats = function(entryDate: Date) {
  this.totalDiaryEntries += 1
  
  // Update streak logic
  const today = new Date()
  const lastEntry = this.lastDiaryEntryDate
  
  if (lastEntry) {
    const daysDiff = Math.floor((today.getTime() - lastEntry.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysDiff === 1) {
      // Consecutive day
      this.currentDiaryStreak += 1
    } else if (daysDiff === 0) {
      // Same day, don't increment streak
    } else {
      // Streak broken
      this.currentDiaryStreak = 1
    }
  } else {
    // First entry
    this.currentDiaryStreak = 1
  }
  
  // Update longest streak
  if (this.currentDiaryStreak > this.longestDiaryStreak) {
    this.longestDiaryStreak = this.currentDiaryStreak
  }
  
  this.lastDiaryEntryDate = entryDate
}

userStatsSchema.methods.updateMysteryStats = function() {
  this.mysteryExplorations += 1
}

userStatsSchema.methods.updateNotesStats = function(archived: boolean = false) {
  this.totalNotes += 1
  if (archived) {
    this.archivedNotes += 1
  }
}

userStatsSchema.methods.updateTaskStats = function(completed: boolean = false) {
  this.totalTasks += 1
  if (completed) {
    this.completedTasks += 1
  }
}

userStatsSchema.methods.updateFocusStats = function(sessionTime: number) {
  this.totalFocusSessions += 1
  this.totalFocusTime += sessionTime
  this.averageFocusTime = this.totalFocusTime / this.totalFocusSessions
}

export const UserStats = model<IUserStats>('UserStats', userStatsSchema)