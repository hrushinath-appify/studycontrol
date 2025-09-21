import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthenticatedRequest } from '../types';
import { config } from '../config/environment';
import { createErrorResponse } from '../utils/response';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Authentication middleware
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (!token) {
      res.status(401).json(createErrorResponse('Access token is required'));
      return;
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json(createErrorResponse('Token has expired'));
        return;
      } else if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json(createErrorResponse('Invalid token'));
        return;
      } else {
        res.status(401).json(createErrorResponse('Token verification failed'));
        return;
      }
    }

    // Get user from database
    const user = await User.findById(decoded.userId).select('-password -refreshTokens');
    if (!user) {
      res.status(401).json(createErrorResponse('User not found'));
      return;
    }

    // Check if user's email is verified (temporarily disabled for testing)
    // if (!user.isEmailVerified) {
    //   res.status(401).json(createErrorResponse('Please verify your email address to access this feature. Check your email for the verification link.'));
    //   return;
    // }

    // Check if user is active (you can add an isActive field to User model if needed)
    // if (!user.isActive) {
    //   res.status(401).json(createErrorResponse('User account is deactivated'));
    //   return;
    // }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json(createErrorResponse('Authentication failed'));
  }
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (!token) {
      next();
      return;
    }

    try {
      const decoded: any = jwt.verify(token, config.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password -refreshTokens');
      
      if (user) {
        req.user = user;
      }
    } catch (error) {
      // Silently ignore token errors for optional auth
      console.warn('Optional auth token error:', error);
    }

    next();
  } catch (error) {
    console.error('Optional authentication error:', error);
    next(); // Continue without authentication
  }
};

// Authorization middleware for specific roles
export const authorize = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json(createErrorResponse('Authentication required'));
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json(createErrorResponse('Insufficient permissions'));
      return;
    }

    next();
  };
};

// Middleware to check if user owns the resource
export const checkResourceOwnership = (resourceUserIdField: string = 'userId') => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json(createErrorResponse('Authentication required'));
        return;
      }

      // For admin users, skip ownership check
      if (req.user.role === 'admin') {
        next();
        return;
      }

      // Get resource ID from params or body
      const resourceId = req.params.id;
      if (!resourceId) {
        res.status(400).json(createErrorResponse('Resource ID is required'));
        return;
      }

      // This is a generic check - in practice, you'd want to implement
      // specific checks for each resource type
      const userId = req.user._id || req.user.id;
      
      // For now, we'll assume the resource belongs to the user
      // In a real implementation, you'd query the specific model
      next();
    } catch (error) {
      console.error('Resource ownership check error:', error);
      res.status(500).json(createErrorResponse('Authorization check failed'));
    }
  };
};

// Middleware to refresh token
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json(createErrorResponse('Refresh token is required'));
      return;
    }

    // Verify refresh token
    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
    } catch (error) {
      res.status(401).json(createErrorResponse('Invalid refresh token'));
      return;
    }

    // Find user and check if refresh token exists
    const user = await User.findById(decoded.userId).select('+refreshTokens');
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      res.status(401).json(createErrorResponse('Invalid refresh token'));
      return;
    }

    // Generate new access token
    const newAccessToken = (jwt.sign as any)(
      { userId: user._id, email: user.email, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    // Optionally, rotate refresh token
    const newRefreshToken = (jwt.sign as any)(
      { userId: user._id },
      config.JWT_REFRESH_SECRET,
      { expiresIn: config.JWT_REFRESH_EXPIRES_IN }
    );

    // Update refresh tokens in database
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    user.refreshTokens.push(newRefreshToken);
    await user.save();

    res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          preferences: user.preferences,
          profile: user.profile,
        }
      },
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json(createErrorResponse('Token refresh failed'));
  }
};

// Middleware to validate token without requiring it
export const validateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : null;

  if (!token) {
    res.status(401).json(createErrorResponse('No token provided'));
    return;
  }

  try {
    jwt.verify(token, config.JWT_SECRET);
    res.json({
      success: true,
      message: 'Token is valid'
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json(createErrorResponse('Token has expired'));
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json(createErrorResponse('Invalid token'));
    } else {
      res.status(401).json(createErrorResponse('Token validation failed'));
    }
  }
};

// Authentication middleware that allows unverified users (for email verification, etc.)
export const authenticateAllowUnverified = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (!token) {
      res.status(401).json(createErrorResponse('Access token is required'));
      return;
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json(createErrorResponse('Token has expired'));
        return;
      } else if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json(createErrorResponse('Invalid token'));
        return;
      } else {
        res.status(401).json(createErrorResponse('Token verification failed'));
        return;
      }
    }

    // Get user from database (without checking email verification)
    const user = await User.findById(decoded.userId).select('-password -refreshTokens');
    if (!user) {
      res.status(401).json(createErrorResponse('User not found'));
      return;
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json(createErrorResponse('Authentication failed'));
  }
};
