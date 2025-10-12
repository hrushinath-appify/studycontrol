import mongoose, { Schema, model } from 'mongoose';

export interface ISession extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  refreshToken?: string;
  expiresAt: Date;
  userAgent?: string;
  ipAddress?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
sessionSchema.index({ userId: 1, isActive: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index for automatic cleanup

// Static method to clean up expired sessions
sessionSchema.statics.cleanupExpired = async function () {
  const now = new Date();
  const result = await this.deleteMany({
    $or: [
      { expiresAt: { $lt: now } },
      { isActive: false }
    ]
  });
  return result.deletedCount;
};

// Static method to invalidate all user sessions
sessionSchema.statics.invalidateUserSessions = async function (userId: string) {
  return this.updateMany(
    { userId, isActive: true },
    { $set: { isActive: false } }
  );
};

// Static method to get active sessions for a user
sessionSchema.statics.getActiveSessions = async function (userId: string) {
  return this.find({
    userId,
    isActive: true,
    expiresAt: { $gt: new Date() }
  }).sort({ createdAt: -1 });
};

// Instance method to invalidate this session
sessionSchema.methods.invalidate = async function () {
  this.isActive = false;
  return this.save();
};

// Instance method to refresh session expiry
sessionSchema.methods.refresh = async function (newExpiresAt: Date) {
  this.expiresAt = newExpiresAt;
  return this.save();
};

export const Session = model<ISession>('Session', sessionSchema);
export default Session;
