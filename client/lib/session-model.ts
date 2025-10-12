import mongoose from 'mongoose'

// Session interface
export interface ISession extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  token: string
  refreshToken?: string
  expiresAt: Date
  userAgent?: string
  ipAddress?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Session Schema
const sessionSchema = new mongoose.Schema<ISession>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  refreshToken: {
    type: String,
    sparse: true,
    index: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true,
  },
  userAgent: {
    type: String,
    maxlength: 500,
  },
  ipAddress: {
    type: String,
    maxlength: 45, // IPv6 length
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
}, {
  timestamps: true,
})

// Compound indexes for efficient queries
sessionSchema.index({ userId: 1, isActive: 1 })
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }) // TTL index for automatic cleanup

export const Session = mongoose.models.Session || mongoose.model<ISession>('Session', sessionSchema)
