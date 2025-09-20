import { ApiResponse, ApiError } from '@/types';

// Helper function to create success responses
export const createSuccessResponse = <T>(
  data?: T,
  message?: string,
  pagination?: ApiResponse<T>['pagination']
): ApiResponse<T> => {
  const response: ApiResponse<T> = {
    success: true,
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (message) {
    response.message = message;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  return response;
};

// Helper function to create error responses
export const createErrorResponse = (
  message: string,
  error?: string,
  status?: number
): ApiResponse => {
  return {
    success: false,
    message,
    error: error || message,
  };
};

// Helper function to create paginated responses
export const createPaginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  message?: string
): ApiResponse<T[]> => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    success: true,
    data,
    message,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

// Helper function to format validation errors
export const formatValidationErrors = (errors: any[]): string => {
  return errors
    .map(error => {
      if (error.path && error.msg) {
        return `${error.path}: ${error.msg}`;
      }
      return error.msg || error.message || 'Validation error';
    })
    .join(', ');
};

// Helper function to create API error objects
export const createApiError = (
  message: string,
  status: number = 500,
  code?: string,
  details?: any
): ApiError => {
  return {
    message,
    status,
    code,
    details,
  };
};

// Helper function to handle mongoose errors
export const handleMongooseError = (error: any): ApiError => {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((err: any) => err.message);
    return createApiError(
      'Validation failed',
      400,
      'VALIDATION_ERROR',
      messages
    );
  }

  if (error.name === 'CastError') {
    return createApiError(
      'Invalid ID format',
      400,
      'INVALID_ID',
      error.message
    );
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return createApiError(
      `${field} already exists`,
      409,
      'DUPLICATE_KEY',
      error.keyValue
    );
  }

  if (error.name === 'MongoError' || error.name === 'MongoServerError') {
    return createApiError(
      'Database operation failed',
      500,
      'DATABASE_ERROR',
      error.message
    );
  }

  return createApiError(
    error.message || 'Internal server error',
    500,
    'UNKNOWN_ERROR'
  );
};

// Helper function to sanitize user data for responses
export const sanitizeUser = (user: any) => {
  const sanitized = { ...user };
  delete sanitized.password;
  delete sanitized.refreshTokens;
  delete sanitized.emailVerificationToken;
  delete sanitized.passwordResetToken;
  delete sanitized.passwordResetExpires;
  return sanitized;
};

// Helper function to generate pagination metadata
export const getPaginationMeta = (
  page: number,
  limit: number,
  total: number
) => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev,
    nextPage: hasNext ? page + 1 : null,
    prevPage: hasPrev ? page - 1 : null,
  };
};

// Helper function to validate pagination parameters
export const validatePaginationParams = (
  page: string | undefined,
  limit: string | undefined
) => {
  const parsedPage = Math.max(1, parseInt(page || '1', 10));
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit || '10', 10)));

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip: (parsedPage - 1) * parsedLimit,
  };
};

// Helper function to build sort object from query parameters
export const buildSortObject = (
  sortBy: string = 'createdAt',
  sortOrder: string = 'desc'
): Record<string, 1 | -1> => {
  const order = sortOrder.toLowerCase() === 'asc' ? 1 : -1;
  return { [sortBy]: order };
};

// Helper function to build filter object from query parameters
export const buildFilterObject = (filters: Record<string, any>): Record<string, any> => {
  const filterObj: Record<string, any> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Handle array values (e.g., tags)
      if (typeof value === 'string' && value.includes(',')) {
        filterObj[key] = { $in: value.split(',').map(v => v.trim()) };
      }
      // Handle boolean values
      else if (value === 'true' || value === 'false') {
        filterObj[key] = value === 'true';
      }
      // Handle date ranges
      else if (key.endsWith('From') || key.endsWith('To')) {
        const dateField = key.replace(/(From|To)$/, '');
        if (!filterObj[dateField]) {
          filterObj[dateField] = {};
        }
        if (key.endsWith('From')) {
          filterObj[dateField].$gte = new Date(value);
        } else {
          filterObj[dateField].$lte = new Date(value);
        }
        delete filterObj[key];
      }
      // Handle regular values
      else {
        filterObj[key] = value;
      }
    }
  });

  return filterObj;
};
