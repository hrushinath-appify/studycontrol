import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

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
const userSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
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

// Create indexes
userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ emailVerificationToken: 1 })
userSchema.index({ resetPasswordToken: 1 })

export const User = mongoose.models.User || mongoose.model('User', userSchema)

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