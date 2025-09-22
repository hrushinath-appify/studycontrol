import express from 'express';
import { config } from './config/environment';
import { database } from './config/database';
import { setupMiddleware, setupErrorHandling } from './middleware';
import routes from './routes';

const app = express();

try {
  // Setup middleware
  setupMiddleware(app);
  console.log('✅ Middleware setup complete');
} catch (error) {
  console.error('❌ Middleware setup error:', error);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'StudyControl API is healthy',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
    version: '1.0.0'
  });
});

// Debug endpoint for troubleshooting
app.get('/api/debug', (req, res) => {
  try {
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      hasJWT: !!process.env.JWT_SECRET,
      hasJWTRefresh: !!process.env.JWT_REFRESH_SECRET,
      hasMongo: !!process.env.MONGODB_URI,
      hasCORS: !!process.env.CORS_ORIGIN,
      hasSessionSecret: !!process.env.SESSION_SECRET,
      jwtLength: process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0,
      corsOrigin: process.env.CORS_ORIGIN,
      mongoStart: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'NOT_SET',
      timestamp: new Date().toISOString(),
      api_prefix: process.env.API_PREFIX || '/api/v1',
      vercel: {
        isVercel: !!process.env.VERCEL,
        vercelEnv: process.env.VERCEL_ENV,
        vercelUrl: process.env.VERCEL_URL
      },
      request: {
        url: req.url,
        method: req.method,
        headers: {
          authorization: req.headers.authorization ? 'Present' : 'Missing',
          'user-agent': req.headers['user-agent'],
          origin: req.headers.origin,
          host: req.headers.host
        }
      }
    };

    console.log('Debug endpoint called:', envCheck);

    res.status(200).json({
      success: true,
      message: 'Debug endpoint working',
      environment: envCheck
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

// API routes - support both /api/v1/* and /api/* patterns for compatibility
try {
  // Primary route with v1 prefix
  app.use(config.API_PREFIX, routes);
  
  // Compatibility route without v1 prefix (for frontend routes)
  app.use('/api', routes);
  
  console.log('✅ Routes setup complete with compatibility paths');
} catch (error) {
  console.error('❌ Routes setup error:', error);
}

// Setup error handling
try {
  setupErrorHandling(app);
  console.log('✅ Error handling setup complete');
} catch (error) {
  console.error('❌ Error handling setup error:', error);
}

// Connect to database on first request (Vercel serverless pattern)
let isConnected = false;

const connectDatabase = async () => {
  if (!isConnected) {
    try {
      await database.connect();
      isConnected = true;
      console.log('✅ Connected to MongoDB for serverless function');
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
      throw error;
    }
  }
};

// Wrap app with database connection for Vercel
const handler = async (req: any, res: any) => {
  try {
    console.log('🔍 Handler called for:', req.method, req.url);
    await connectDatabase();
    console.log('✅ Database connected, proceeding with request');
    return app(req, res);
  } catch (error) {
    console.error('❌ Handler error:', error);
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: config.NODE_ENV === 'development' ? String(error) : 'Internal server error'
    });
  }
};

// Export for Vercel
export default handler;

// Also export app for local development
export { app };