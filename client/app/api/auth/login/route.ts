import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User, IUser } from '@/lib/database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Find user and include password for comparison
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (User as any).findOne(
      { email: email.toLowerCase() },
      '+password'
    ).lean() as (IUser & { _id: string }) | null
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 })
    }

    // Check if email is verified (allow for development/testing)
    if (!user.isEmailVerified && process.env.NODE_ENV === 'production') {
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
    console.error('Login error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
