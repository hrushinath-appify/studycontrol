import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User, IUser } from '@/lib/database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Login attempt started')
    const { email, password } = await request.json()
    console.log('📧 Email:', email, 'HasPassword:', !!password)

    if (!email || !password) {
      console.log('❌ Missing email or password')
      return NextResponse.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 })
    }

    // Connect to database
    console.log('🔌 Connecting to database...')
    await connectToDatabase()
    console.log('✅ Database connected')

    // Find user and include password for comparison
    console.log('👤 Searching for user:', email.toLowerCase())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (User as any).findOne(
      { email: email.toLowerCase() },
      '+password'
    ).lean() as (IUser & { _id: string }) | null
    
    if (!user) {
      console.log('❌ User not found')
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 })
    }
    
    console.log('✅ User found:', { 
      id: user._id, 
      email: user.email, 
      hasPassword: !!user.password,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive 
    })

    // Check password
    console.log('🔒 Checking password...')
    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log('🔒 Password valid:', isValidPassword)
    
    if (!isValidPassword) {
      console.log('❌ Invalid password')
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 })
    }

    // Check if email is verified (allow for development/testing)
    console.log('📧 Checking email verification...', { isEmailVerified: user.isEmailVerified, NODE_ENV: process.env.NODE_ENV })
    if (!user.isEmailVerified && process.env.NODE_ENV === 'production') {
      console.log('❌ Email not verified')
      return NextResponse.json({
        success: false,
        error: 'Please verify your email before logging in'
      }, { status: 401 })
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      process.env.JWT_SECRET || 'fallback-secret-key-for-development',
      { expiresIn: '7d' }
    )

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Prepare user data (password is excluded by schema transform)
    const userData = user.toJSON()

    const response = NextResponse.json({
      success: true,
      data: {
        user: userData,
        accessToken
      },
      message: 'Login successful'
    })

    // Set token in cookie for persistence
    response.cookies.set('auth-token', accessToken, {
      httpOnly: false, // Allow JavaScript access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response

  } catch (error) {
    console.error('❌ Login error:', error)
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
