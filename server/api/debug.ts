import { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  try {
    // Check environment variables
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

    // Log environment check for debugging
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
}