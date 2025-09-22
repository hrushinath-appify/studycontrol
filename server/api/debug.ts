export default function handler(req: any, res: any) {
  try {
    // Check environment variables
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      hasJWT: !!process.env.JWT_SECRET,
      hasMongo: !!process.env.MONGODB_URI,
      hasCORS: !!process.env.CORS_ORIGIN,
      timestamp: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      message: 'Debug endpoint working',
      environment: envCheck
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}