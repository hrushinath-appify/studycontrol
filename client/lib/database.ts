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
  role: string
  resetPasswordToken?: string
  resetPasswordExpires?: Date
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
    required: true,
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

// Diary Entry interface and schema
export interface IDiaryEntry extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  title: string
  content: string
  mood?: 'excellent' | 'good' | 'neutral' | 'bad' | 'terrible'
  tags?: string[]
  isPrivate: boolean
  createdAt: Date
  updatedAt: Date
}

const diaryEntrySchema = new mongoose.Schema<IDiaryEntry>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000,
  },
  mood: {
    type: String,
    enum: ['excellent', 'good', 'neutral', 'bad', 'terrible'],
    default: 'neutral',
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 50,
  }],
  isPrivate: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})

export const DiaryEntry = mongoose.models.DiaryEntry || mongoose.model<IDiaryEntry>('DiaryEntry', diaryEntrySchema)

// Task interface and schema
export interface ITask extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
  category?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

const taskSchema = new mongoose.Schema<ITask>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  completed: {
    type: Boolean,
    default: false,
    index: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
  },
  category: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 30,
  }],
}, {
  timestamps: true,
})

export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema)

// Note interface and schema  
export interface INote extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  title: string
  content: string
  category?: string
  tags?: string[]
  isArchived: boolean
  isPinned: boolean
  color?: string
  createdAt: Date
  updatedAt: Date
}

const noteSchema = new mongoose.Schema<INote>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
    maxlength: 50000,
  },
  category: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 30,
  }],
  isArchived: {
    type: Boolean,
    default: false,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '#ffffff',
  },
}, {
  timestamps: true,
})

export const Note = mongoose.models.Note || mongoose.model<INote>('Note', noteSchema)

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