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

// API routes
app.use(config.API_PREFIX, routes);

// Setup error handling
setupErrorHandling(app);

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await database.connect();
    
    // Start listening
    const server = app.listen(config.PORT, () => {
      console.log(`
🚀 StudyControl API Server Started Successfully!

📍 Server Details:
   • Environment: ${config.NODE_ENV}
   • Port: ${config.PORT}
   • API Base URL: http://localhost:${config.PORT}${config.API_PREFIX}
   
🔗 Available Endpoints:
   • Health Check: http://localhost:${config.PORT}/health
   • API Health: http://localhost:${config.PORT}${config.API_PREFIX}/health
   • Authentication: http://localhost:${config.PORT}${config.API_PREFIX}/auth
   • Quotes: http://localhost:${config.PORT}${config.API_PREFIX}/quotes
   
📊 Database:
   • MongoDB: ${database.isHealthy() ? '✅ Connected' : '❌ Disconnected'}
   • Connection State: ${database.getConnectionState()}
   
🛡️  Security Features:
   • CORS: Enabled
   • Helmet: Enabled  
   • Rate Limiting: Enabled
   • JWT Authentication: Enabled
   
📝 Logs:
   • Request Logging: ${config.NODE_ENV === 'development' ? 'Development Mode' : 'Production Mode'}
   • Log Level: ${config.LOG_LEVEL}
      `);
    });

    // Graceful shutdown handling
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n⚠️  Received ${signal}. Starting graceful shutdown...`);
      
      server.close(async () => {
        console.log('✅ HTTP server closed');
        
        try {
          await database.disconnect();
          console.log('✅ Database connection closed');
          console.log('👋 Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during database shutdown:', error);
          process.exit(1);
        }
      });

      // Force close after 30 seconds
      setTimeout(() => {
        console.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 30000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      gracefulShutdown('UNHANDLED_REJECTION');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;
