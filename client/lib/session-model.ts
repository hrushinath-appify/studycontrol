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
  },
  token: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  expiresAt: {
    type: Date,
    required: true,
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
  },
}, {
  timestamps: true,
})

// Add indexes explicitly to avoid duplication warnings
sessionSchema.index({ userId: 1 }, { background: true })
sessionSchema.index({ token: 1 }, { unique: true, background: true })
sessionSchema.index({ refreshToken: 1 }, { sparse: true, background: true })
sessionSchema.index({ isActive: 1 }, { background: true })
sessionSchema.index({ userId: 1, isActive: 1 }, { background: true })
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, background: true }) // TTL index for automatic cleanup

export const Session = mongoose.models.Session || mongoose.model<ISession>('Session', sessionSchema)
