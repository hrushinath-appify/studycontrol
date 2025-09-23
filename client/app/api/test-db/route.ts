import { NextResponse } from 'next/server'
import { connectToDatabase, User } from '@/lib/database'

export async function GET() {
  try {
    console.log('🧪 Testing database connection...')
    
    // Check environment variables
    const mongoUri = process.env.MONGODB_URI
    const jwtSecret = process.env.JWT_SECRET
    
    console.log('📋 Environment check:', {
      mongoUri: mongoUri ? `${mongoUri.substring(0, 20)}...` : 'MISSING',
      jwtSecret: jwtSecret ? 'SET' : 'MISSING'
    })

    if (!mongoUri) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI environment variable is missing'
      }, { status: 500 })
    }

    if (!jwtSecret) {
      return NextResponse.json({
        success: false,
        error: 'JWT_SECRET environment variable is missing'
      }, { status: 500 })
    }

    // Connect to database
    await connectToDatabase()
    console.log('✅ Database connected successfully')

    // Test user query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userCount = await (User as any).countDocuments()
    console.log('👥 Total users in database:', userCount)

    // Test specific user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testUser = await (User as any).findOne({ email: 'hrushinath29@gmail.com' })
    console.log('👤 Test user found:', testUser ? 'YES' : 'NO')

    return NextResponse.json({
      success: true,
      data: {
        mongoUri: mongoUri ? `${mongoUri.substring(0, 20)}...` : 'MISSING',
        jwtSecret: jwtSecret ? 'SET' : 'MISSING',
        userCount,
        testUserExists: !!testUser
      },
      message: 'Database test successful'
    })

  } catch (error) {
    console.error('❌ Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}