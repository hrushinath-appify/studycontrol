import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from '@/config/environment';
import { errorHandler, notFoundHandler } from './errorHandler';

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later',
    error: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiting for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later',
    error: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = config.CORS_ORIGIN.split(',').map(origin => origin.trim());
    
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 86400, // 24 hours
};

// Setup middleware
export const setupMiddleware = (app: Application): void => {
  // Security middleware
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));

  // CORS
  app.use(cors(corsOptions));

  // Compression
  app.use(compression());

  // Request logging
  if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // Body parsing
  app.use(express.json({ 
    limit: '10mb',
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf.toString());
      } catch (e) {
        // Cast res to Express Response type
        (res as any).status(400).json({
          success: false,
          message: 'Invalid JSON',
          error: 'INVALID_JSON'
        });
        return;
      }
    }
  }));

  app.use(express.urlencoded({ 
    extended: true, 
    limit: '10mb' 
  }));

  // Rate limiting - DISABLED for development
  // app.use('/api', limiter);
  // app.use('/api/v1/auth', authLimiter);

  // Request timeout (30 seconds)
  app.use((req, res, next) => {
    req.setTimeout(30000, () => {
      res.status(408).json({
        success: false,
        message: 'Request timeout',
        error: 'REQUEST_TIMEOUT'
      });
    });
    next();
  });

  // Add request timestamp
  app.use((req, res, next) => {
    req.timestamp = Date.now();
    next();
  });

  // Health check endpoint (before other routes)
  app.get('/health', (req, res) => {
    res.json({
      success: true,
      message: 'StudyControl API is healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: config.NODE_ENV,
      uptime: process.uptime()
    });
  });
};

// Setup error handling
export const setupErrorHandling = (app: Application): void => {
  // 404 handler
  app.use(notFoundHandler);
  
  // Global error handler
  app.use(errorHandler);
};

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      timestamp?: number;
    }
  }
}
