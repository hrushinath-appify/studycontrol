// Import the compiled server for production
try {
  // Try to import the compiled server first
  const app = require('../server/dist/vercel.js');
  module.exports = app;
} catch (error) {
  console.error('Failed to load compiled server, falling back to source:', error);
  
  // Fallback to TypeScript source if compiled version doesn't exist
  try {
    require('ts-node/register');
    const app = require('../server/src/vercel.ts');
    module.exports = app;
  } catch (tsError) {
    console.error('Failed to load TypeScript server:', tsError);
    
    // Ultimate fallback - basic express app with error message
    const express = require('express');
    const app = express();
    
    app.use('*', (req, res) => {
      res.status(500).json({
        success: false,
        message: 'Server configuration error',
        error: 'Unable to load main server application'
      });
    });
    
    module.exports = app;
  }
}