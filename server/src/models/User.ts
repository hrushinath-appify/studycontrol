import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types';
import { config } from '../config/environment';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: function(this: IUser) {
        // Password is required only for credentials-based auth
        return this.provider === 'credentials';
      },
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false, // Don't include password in queries by default
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
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
        maxlength: [500, 'Bio cannot exceed 500 characters'],
      },
      studyGoals: [{
        type: String,
        maxlength: [100, 'Study goal cannot exceed 100 characters'],
      }],
      focusAreas: [{
        type: String,
        maxlength: [50, 'Focus area cannot exceed 50 characters'],
      }],
      dailyStudyHours: {
        type: Number,
        min: [0, 'Daily study hours cannot be negative'],
        max: [24, 'Daily study hours cannot exceed 24'],
      },
      timezone: {
        type: String,
        default: 'UTC',
      },
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
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    refreshTokens: [{
      type: String,
      select: false,
    }],
    lastLoginAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
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
    // Mystery tracking
    mysteryClicks: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.refreshTokens;
        delete ret.emailVerificationToken;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
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
userSchema.index({ createdAt: -1 });
userSchema.index({ lastLoginAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, config.BCRYPT_ROUNDS);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Static method to find user by email with password
userSchema.statics.findByEmailWithPassword = function (email: string) {
  return this.findOne({ email }).select('+password +refreshTokens');
};

// Static method to find user by reset token
userSchema.statics.findByResetToken = function (token: string) {
  return this.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });
};

// Virtual for full name (if needed in the future)
userSchema.virtual('fullName').get(function () {
  return this.name;
});

// Pre-remove middleware to clean up related data
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    // Clean up user's data when user is deleted
    await mongoose.model('Note').deleteMany({ userId: this._id });
    await mongoose.model('PomodoroSession').deleteMany({ userId: this._id });
    await mongoose.model('TimerSettings').deleteMany({ userId: this._id });
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Create and export the model
export const User = model<IUser>('User', userSchema);
export default User;
