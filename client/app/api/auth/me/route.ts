import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User, IUser } from '@/lib/database'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 /api/auth/me - Starting authentication check')
    
    // Get token from Authorization header or cookies
    const authHeader = request.headers.get('authorization')
    const cookieToken = request.cookies.get('auth-token')?.value
    
    const token = authHeader?.replace('Bearer ', '') || cookieToken
    console.log('🔑 Token found:', !!token)

    if (!token) {
      console.log('❌ No token provided')
      return NextResponse.json({
        success: false,
        error: 'No token provided'
      }, { status: 401 })
    }

    // Verify token
    let decoded: { userId: string; email: string }
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-for-development') as { userId: string; email: string }
      console.log('✅ Token verified for user:', decoded.userId)
    } catch (tokenError) {
      console.log('❌ Token verification failed:', tokenError)
      return NextResponse.json({
        success: false,
        error: 'Invalid token'
      }, { status: 401 })
    }

    // Connect to database
    console.log('🔌 Connecting to database...')
    await connectToDatabase()
    console.log('✅ Database connected')

    // Find user
    console.log('👤 Finding user by ID:', decoded.userId)
    
    // Convert userId to string if it's an ObjectId
    const userIdString = decoded.userId.toString()
    console.log('🔍 UserID as string:', userIdString)
    
    // Validate ObjectId format (24 characters hex)
    if (!userIdString || typeof userIdString !== 'string' || !/^[0-9a-fA-F]{24}$/.test(userIdString)) {
      console.log('❌ Invalid user ID format:', userIdString)
      return NextResponse.json({
        success: false,
        error: 'Invalid user ID'
      }, { status: 401 })
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (User as any).findById(userIdString).lean() as (IUser & { _id: any }) | null
    
    if (!user) {
      console.log('❌ User not found')
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 401 })
    }

    if (!user.isActive) {
      console.log('❌ User is not active')
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 401 })
    }

    console.log('✅ User found:', user.email)
    console.log('🔍 User data structure:', {
      hasId: !!user._id,
      idType: typeof user._id,
      hasRole: !!user.role,
      role: user.role,
      isActive: user.isActive
    })

    // Prepare user data (exclude sensitive fields like password)
    const userData = {
      _id: user._id.toString(), // Ensure _id is a string
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive,
      role: user.role || 'user', // Default role if missing
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }

    console.log('📦 Prepared user data:', { 
      id: userData._id, 
      email: userData.email, 
      role: userData.role 
    })

    console.log('✅ Returning user data successfully')
    return NextResponse.json({
      success: true,
      data: userData
    })

  } catch (error) {
    console.error('💥 Auth verification error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
