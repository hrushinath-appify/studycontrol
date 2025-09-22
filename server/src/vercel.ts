import express from 'express';
import { config, validateConfig } from './config/environment';
import { database } from './config/database';
import { setupMiddleware, setupErrorHandling } from './middleware';
import routes from './routes';

// Validate configuration
validateConfig();

const app = express();

// Setup middleware
setupMiddleware(app);

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
app.use(config.API_PREFIX, routes);

// Setup error handling
setupErrorHandling(app);

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
    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: config.NODE_ENV === 'development' ? error : 'Internal server error'
    });
  }
};

// Export for Vercel
export default handler;

// Also export app for local development
export { app };