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

    // Check if email is verified (required for all environments)
    if (!user.isEmailVerified) {
      return NextResponse.json({
        success: false,
        error: 'Please verify your email address before logging in. Check your email for the verification link.'
      }, { status: 401 })
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { 
        userId: user._id.toString(), // Ensure userId is always a string
        email: user.email 
      },
      process.env.JWT_SECRET || 'fallback-secret-key-for-development',
      { expiresIn: '7d' }
    )

    // Update last login (using updateOne since we used lean())
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (User as any).updateOne(
        { _id: user._id },
        { $set: { lastLogin: new Date() } }
      )
    } catch {
      // Continue anyway - login was successful
    }

    // Prepare user data (exclude sensitive fields)
    const userData = {
      _id: user._id.toString(), // Ensure _id is a string
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive,
      role: user.role || 'user', // Default role if missing
      lastLogin: new Date(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }

    const response = NextResponse.json({
      success: true,
      data: {
        user: userData,
        accessToken
      },
      message: 'Login successful'
    })

    // Set token in cookie for persistence (Vercel-optimized)
    response.cookies.set('auth-token', accessToken, {
      httpOnly: false, // Allow JavaScript access for client-side auth
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict', // More permissive for Vercel
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
