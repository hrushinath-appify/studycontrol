import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User';
import { AuthenticatedRequest, LoginRequest, RegisterRequest } from '../types';
import { config } from '../config/environment';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  handleMongooseError,
  sanitizeUser
} from '../utils/response';
import { asyncHandler } from '../utils/asyncHandler';
import { validationResult } from 'express-validator';
import { emailService } from '../utils/emailService';

// Generate JWT tokens
const generateTokens = (userId: string, email: string, role: string) => {
  const payload = { userId, email, role };
  const refreshPayload = { userId };
  
  // Cast to avoid TypeScript JWT overload issues
  const accessToken = (jwt.sign as any)(payload, config.JWT_SECRET, { 
    expiresIn: config.JWT_EXPIRES_IN 
  });

  const refreshToken = (jwt.sign as any)(refreshPayload, config.JWT_REFRESH_SECRET, { 
    expiresIn: config.JWT_REFRESH_EXPIRES_IN 
  });

  return { accessToken, refreshToken };
};

// Generate avatar URL (using initials)
const generateAvatarUrl = (name: string): string => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
  
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=200`;
};

// Register user
export const register = asyncHandler(async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(createErrorResponse(
      'Validation failed',
      errors.array().map(err => err.msg).join(', ')
    ));
  }

  const { name, email, password }: RegisterRequest = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json(createErrorResponse('User already exists with this email'));
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      avatar: generateAvatarUrl(name),
      isEmailVerified: false,
      preferences: {
        theme: 'system',
        studyReminders: true,
        appUpdates: true,
        emailNotifications: true,
        soundEnabled: true,
        language: 'en',
      },
      profile: {
        timezone: 'UTC',
      },
    });

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
    
    user.emailVerificationToken = hashedVerificationToken;
    user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await user.save();

    // Send verification email
    let emailSent = false;
    try {
      emailSent = await emailService.sendVerificationEmail(user.email, user.name, verificationToken);
      console.log(`Email send result for ${user.email}:`, emailSent);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      // Continue with registration even if email fails
    }

    // For now, don't generate tokens until email is verified
    // Just return success message
    res.status(201).json(createSuccessResponse(
      {
        user: sanitizeUser(user.toObject()),
        emailSent,
      },
      'Registration successful! Please check your email to verify your account before logging in.'
    ));
  } catch (error) {
    console.error('Registration error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Login user
export const login = asyncHandler(async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(createErrorResponse(
      'Validation failed',
      errors.array().map(err => err.msg).join(', ')
    ));
  }

  const { email, password }: LoginRequest = req.body;

  try {
    // Find user with password
    const user = await User.findOne({ email: email.toLowerCase() })
      .select('+password +refreshTokens');

    if (!user) {
      return res.status(401).json(createErrorResponse('Invalid credentials'));
    }

    // Check if email is verified (temporarily disabled for testing)
    // if (!user.isEmailVerified) {
    //   return res.status(401).json(createErrorResponse('Please verify your email address before logging in. Check your email for the verification link.'));
    // }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json(createErrorResponse('Invalid credentials'));
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(
      user._id.toString(),
      user.email,
      user.role
    );

    // Update refresh tokens (keep only last 5)
    user.refreshTokens = [...(user.refreshTokens || []), refreshToken].slice(-5);
    user.lastLoginAt = new Date();
    await user.save();

    // Prepare response data
    const responseData = {
      user: sanitizeUser(user.toObject()),
      accessToken,
      refreshToken,
    };

    res.json(createSuccessResponse(
      responseData,
      'Login successful'
    ));
  } catch (error) {
    console.error('Login error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Logout user
export const logout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json(createErrorResponse('User not authenticated'));
    }

    // Remove refresh token from user
    if (refreshToken) {
      await User.findByIdAndUpdate(
        user._id,
        { $pull: { refreshTokens: refreshToken } }
      );
    } else {
      // If no refresh token provided, clear all refresh tokens
      await User.findByIdAndUpdate(
        user._id,
        { $set: { refreshTokens: [] } }
      );
    }

    res.json(createSuccessResponse(null, 'Logout successful'));
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json(createErrorResponse('Logout failed'));
  }
});

// Get current user
export const getCurrentUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json(createErrorResponse('User not authenticated'));
    }

    // Get fresh user data from database
    const currentUser = await User.findById(user._id);
    if (!currentUser) {
      return res.status(404).json(createErrorResponse('User not found'));
    }

    res.json(createSuccessResponse(
      sanitizeUser(currentUser.toObject()),
      'User data retrieved successfully'
    ));
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json(createErrorResponse('Failed to get user data'));
  }
});

// Update user profile
export const updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json(createErrorResponse('User not authenticated'));
    }

    const { name, avatar, preferences, profile } = req.body;

    // Build update object
    const updateData: any = {};
    
    if (name) updateData.name = name.trim();
    if (avatar) updateData.avatar = avatar;
    if (preferences) updateData.preferences = { ...user.preferences, ...preferences };
    if (profile) updateData.profile = { ...user.profile, ...profile };

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json(createErrorResponse('User not found'));
    }

    res.json(createSuccessResponse(
      sanitizeUser(updatedUser.toObject()),
      'Profile updated successfully'
    ));
  } catch (error) {
    console.error('Update profile error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Forgot password
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(createErrorResponse('Email is required'));
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Don't reveal if user exists or not
      return res.json(createSuccessResponse(
        null,
        'If an account with that email exists, a password reset link has been sent'
      ));
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save hashed token and expiry to user
    user.passwordResetToken = hashedResetToken;
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    // Send password reset email
    try {
      await emailService.sendPasswordResetEmail(user.email, user.name, resetToken);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      // Continue even if email fails
    }

    res.json(createSuccessResponse(
      null,
      'If an account with that email exists, a password reset link has been sent'
    ));
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json(createErrorResponse('Failed to process password reset request'));
  }
});

// Reset password
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json(createErrorResponse('Token and password are required'));
  }

  try {
    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) {
      return res.status(400).json(createErrorResponse('Invalid or expired reset token'));
    }

    // Update password and clear reset token
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokens = []; // Invalidate all existing sessions
    
    await user.save();

    res.json(createSuccessResponse(
      null,
      'Password reset successful'
    ));
  } catch (error) {
    console.error('Reset password error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Refresh access token
export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json(createErrorResponse('Refresh token is required'));
  }

  try {
    // Verify refresh token
    const decoded: any = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);

    // Find user and check if refresh token exists
    const user = await User.findById(decoded.userId).select('+refreshTokens');
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      return res.status(401).json(createErrorResponse('Invalid refresh token'));
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user._id.toString(),
      user.email,
      user.role
    );

    // Update refresh tokens (replace old with new)
    user.refreshTokens = user.refreshTokens.map(token => 
      token === refreshToken ? newRefreshToken : token
    );
    await user.save();

    res.json(createSuccessResponse({
      accessToken,
      refreshToken: newRefreshToken,
      user: sanitizeUser(user.toObject()),
    }, 'Token refreshed successfully'));
  } catch (error) {
    console.error('Refresh token error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json(createErrorResponse('Invalid refresh token'));
    }
    res.status(500).json(createErrorResponse('Token refresh failed'));
  }
});

// Validate token
export const validateToken = asyncHandler(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : null;

  if (!token) {
    return res.status(401).json(createErrorResponse('No token provided'));
  }

  try {
    const decoded: any = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json(createErrorResponse('User not found'));
    }

    res.json(createSuccessResponse({
      valid: true,
      user: sanitizeUser(user.toObject()),
    }, 'Token is valid'));
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json(createErrorResponse('Token has expired'));
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json(createErrorResponse('Invalid token'));
    } else {
      return res.status(401).json(createErrorResponse('Token validation failed'));
    }
  }
});

// Verify email
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json(createErrorResponse('Verification token is required'));
  }

  try {
    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid verification token
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    }).select('+emailVerificationToken +emailVerificationExpires');

    if (!user) {
      return res.status(400).json(createErrorResponse('Invalid or expired verification token'));
    }

    // Update user as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    
    await user.save();

    res.json(createSuccessResponse(
      { user: sanitizeUser(user.toObject()) },
      'Email verified successfully! You can now log in to your account.'
    ));
  } catch (error) {
    console.error('Email verification error:', error);
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
  }
});

// Resend verification email
export const resendVerificationEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(createErrorResponse('Email is required'));
  }

  try {
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      isEmailVerified: false 
    });
    
    if (!user) {
      // Don't reveal if user exists or is already verified
      return res.json(createSuccessResponse(
        null,
        'If an unverified account with that email exists, a new verification email has been sent'
      ));
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    // Update user with new token
    user.emailVerificationToken = hashedVerificationToken;
    user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await user.save();

    // Send verification email
    try {
      await emailService.sendVerificationEmail(user.email, user.name, verificationToken);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      return res.status(500).json(createErrorResponse('Failed to send verification email'));
    }

    res.json(createSuccessResponse(
      null,
      'If an unverified account with that email exists, a new verification email has been sent'
    ));
  } catch (error) {
    console.error('Resend verification email error:', error);
    res.status(500).json(createErrorResponse('Failed to resend verification email'));
  }
});
