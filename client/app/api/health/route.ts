import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  try {
    // Test environment variables
    const hasMongoURI = !!process.env.MONGODB_URI
    const hasJWTSecret = !!process.env.JWT_SECRET
    
    if (!hasMongoURI) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI not found'
      }, { status: 500 })
    }
    
    if (!hasJWTSecret) {
      return NextResponse.json({
        success: false,
        error: 'JWT_SECRET not found'
      }, { status: 500 })
    }
    
    // Test MongoDB connection
    const { connectToDatabase, User } = await import('@/lib/database')
    await connectToDatabase()
    
    // Test simple user count
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userCount = await (User as any).countDocuments()
    
    return NextResponse.json({
      success: true,
      data: {
        hasMongoURI,
        hasJWTSecret,
        userCount,
        nodeEnv: process.env.NODE_ENV
      }
    })
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}