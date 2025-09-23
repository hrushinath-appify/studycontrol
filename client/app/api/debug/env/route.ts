// Test MongoDB connection and environment in production
export async function GET() {
  try {
    console.log('Environment check started...')
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI)
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET)
    
    // Test MongoDB connection
    const { connectToDatabase } = await import('@/lib/database')
    await connectToDatabase()
    console.log('MongoDB connection successful')
    
    return Response.json({
      success: true,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasMongoURI: !!process.env.MONGODB_URI,
        hasJWTSecret: !!process.env.JWT_SECRET,
        mongoConnectionStatus: 'connected'
      }
    })
  } catch (error) {
    console.error('Environment check failed:', error)
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasMongoURI: !!process.env.MONGODB_URI,
        hasJWTSecret: !!process.env.JWT_SECRET,
        mongoConnectionStatus: 'failed'
      }
    }, { status: 500 })
  }
}