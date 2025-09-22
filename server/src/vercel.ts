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

// API routes
try {
  app.use(config.API_PREFIX, routes);
  console.log('✅ Routes setup complete');
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