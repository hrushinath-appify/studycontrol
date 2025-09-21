import { Request, Response, NextFunction } from 'express';
import { createErrorResponse, handleMongooseError } from '../utils/response';
import { config } from '../config/environment';

// Global error handler middleware
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Handle Mongoose errors
  if (error.name === 'ValidationError' || 
      error.name === 'CastError' || 
      error.code === 11000 ||
      error.name === 'MongoError' ||
      error.name === 'MongoServerError') {
    const apiError = handleMongooseError(error);
    res.status(apiError.status).json(createErrorResponse(apiError.message, apiError.code));
    return;
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    res.status(401).json(createErrorResponse('Invalid token', 'INVALID_TOKEN'));
    return;
  }

  if (error.name === 'TokenExpiredError') {
    res.status(401).json(createErrorResponse('Token expired', 'TOKEN_EXPIRED'));
    return;
  }

  // Handle multer errors (file upload)
  if (error.code === 'LIMIT_FILE_SIZE') {
    res.status(400).json(createErrorResponse('File too large', 'FILE_TOO_LARGE'));
    return;
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    res.status(400).json(createErrorResponse('Unexpected file field', 'UNEXPECTED_FILE'));
    return;
  }

  // Handle rate limiting errors
  if (error.status === 429) {
    res.status(429).json(createErrorResponse('Too many requests', 'RATE_LIMIT_EXCEEDED'));
    return;
  }

  // Handle custom API errors
  if (error.status && error.message) {
    res.status(error.status).json(createErrorResponse(error.message, error.code));
    return;
  }

  // Default server error
  const message = config.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : error.message || 'Internal server error';

  res.status(500).json(createErrorResponse(message, 'INTERNAL_SERVER_ERROR'));
};

// 404 handler for unmatched routes
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json(createErrorResponse(
    `Route ${req.originalUrl} not found`,
    'ROUTE_NOT_FOUND'
  ));
};

// Async error wrapper
export const asyncErrorHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
