// Simple health check for Vercel
export default function handler(req, res) {
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
      vercel: {
        isVercel: !!process.env.VERCEL,
        vercelEnv: process.env.VERCEL_ENV,
        vercelUrl: process.env.VERCEL_URL
      },
      request: {
        url: req.url,
        method: req.method
      }
    };

    res.status(200).json({
      success: true,
      message: 'Simple API working',
      environment: envCheck
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}