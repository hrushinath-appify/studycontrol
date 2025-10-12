import mongoose from 'mongoose'

// User interface
export interface IUser extends mongoose.Document {
  name: string
  email: string
  password: string
  avatar?: string
  isEmailVerified: boolean
  emailVerificationToken?: string
  emailVerificationExpires?: Date
  lastLogin?: Date
  isActive: boolean
  role: 'user' | 'admin' | 'moderator'
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  // OAuth provider fields
  provider: 'credentials' | 'google' | 'github'
  providerId?: string
  // App metrics
  mysteryClicks: number
  // User preferences
  preferences?: {
    theme: 'light' | 'dark' | 'system'
    studyReminders: boolean
    appUpdates: boolean
    emailNotifications: boolean
    soundEnabled: boolean
    language: string
  }
  profile?: {
    bio?: string
    studyGoals?: string[]
    focusAreas?: string[]
    dailyStudyHours?: number
    timezone?: string
  }
  createdAt: Date
  updatedAt: Date
}

// MongoDB connection singleton
let isConnected = false

export async function connectToDatabase() {
  if (isConnected) {
    return
  }

  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGODB_URI!, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    })
    isConnected = true
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error)
    throw error
  }
}

// User Schema
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function(this: IUser) {
      // Password is required only for credentials-based auth
      return this.provider === 'credentials'
    },
    select: false, // Don't include password in queries by default
  },
  avatar: {
    type: String,
    default: null,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
    select: false,
  },
  emailVerificationExpires: {
    type: Date,
    select: false,
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpires: {
    type: Date,
    select: false,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'moderator'],
  },
  // OAuth provider fields
  provider: {
    type: String,
    enum: ['credentials', 'google', 'github'],
    default: 'credentials',
  },
  providerId: {
    type: String,
    sparse: true,
  },
  // Simple usage metric for "Mystery Explorations"
  mysteryClicks: {
    type: Number,
    default: 0,
    min: 0,
  },
  // User preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
    studyReminders: {
      type: Boolean,
      default: true,
    },
    appUpdates: {
      type: Boolean,
      default: true,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    soundEnabled: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'en',
    },
  },
  profile: {
    bio: {
      type: String,
      maxlength: 500,
    },
    studyGoals: [{
      type: String,
      maxlength: 100,
    }],
    focusAreas: [{
      type: String,
      maxlength: 50,
    }],
    dailyStudyHours: {
      type: Number,
      min: 0,
      max: 24,
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc: IUser, ret: Record<string, unknown>) {
      // Remove sensitive fields from JSON output
      delete ret.password
      delete ret.emailVerificationToken
      delete ret.emailVerificationExpires
      delete ret.resetPasswordToken
      delete ret.resetPasswordExpires
      delete ret.__v
      return ret
    }
  }
})

// Create indexes (email index will be created automatically by unique: true)
userSchema.index({ emailVerificationToken: 1 })
userSchema.index({ resetPasswordToken: 1 })

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)


// MarrowProgress interface and schema
export interface IMarrowProgress extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  topicId: string
  completed: boolean
  subject: string
  chapter: string
  topicTitle: string
  timeSpent?: number
  difficulty?: string
  estimatedTime?: number
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const marrowProgressSchema = new mongoose.Schema<IMarrowProgress>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  topicId: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  chapter: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  topicTitle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300,
  },
  timeSpent: {
    type: Number,
    default: 0,
    min: 0,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', null],
    default: null,
  },
  estimatedTime: {
    type: Number,
    min: 0,
  },
  completedAt: {
    type: Date,
  },
}, {
  timestamps: true,
})

// Compound index for unique topic per user
marrowProgressSchema.index({ userId: 1, topicId: 1 }, { unique: true })
marrowProgressSchema.index({ userId: 1, subject: 1 })
marrowProgressSchema.index({ userId: 1, completed: 1 })

export const MarrowProgress = mongoose.models.MarrowProgress || mongoose.model<IMarrowProgress>('MarrowProgress', marrowProgressSchema)

// Helper function to generate avatar URL
export function generateAvatarUrl(name: string): string {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
  
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=200`
}