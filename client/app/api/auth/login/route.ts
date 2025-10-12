import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User, IUser } from '@/lib/database'
import { Session } from '@/lib/session-model'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { createErrorResponse } from '@/lib/api-utils'

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 Login Flow Started')
    
    // Step 1: Get credentials
    const { email, password } = await request.json()
    console.log('📝 Login attempt for:', email)

    if (!email || !password) {
      console.log('❌ Missing credentials')
      return createErrorResponse('Email and password are required', 400)
    }

    // Step 2: Connect to database
    await connectToDatabase()
    console.log('✅ Database connected')

    // Step 3: Find user by email
    console.log('🔍 Querying MongoDB for user...')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (User as any).findOne(
      { email: email.toLowerCase() },
      '+password'
    ).lean() as (IUser & { _id: string }) | null
    
    // Step 4: Check if user exists
    if (!user) {
      console.log('❌ User not found')
      return createErrorResponse('Invalid credentials', 401)
    }

    console.log('✅ User found:', user._id)

    // Step 5: Verify password (bcrypt.compare)
    console.log('🔐 Comparing password...')
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    // Step 6: Check password validity
    if (!isValidPassword) {
      console.log('❌ Invalid password')
      return createErrorResponse('Invalid credentials', 401)
    }

    console.log('✅ Password valid')

    // Check if user is active
    if (!user.isActive) {
      console.log('❌ User account is inactive')
      return createErrorResponse('Your account has been deactivated', 403)
    }

    // Check if email is verified (required for all environments)
    if (!user.isEmailVerified) {
      console.log('❌ Email not verified')
      return createErrorResponse('Please verify your email address before logging in. Check your email for the verification link.', 401)
    }

    console.log('✅ All checks passed')

    // Step 7: Create JWT Token
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET environment variable is not set')
      return createErrorResponse('Authentication service unavailable', 503)
    }

    const secret = new TextEncoder().encode(jwtSecret)
    
    // Calculate expiration time (7 days from now)
    const expirationTime = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days in seconds
    const expiresAt = new Date(expirationTime * 1000)
    
    console.log('🔑 Creating JWT token...')
    const accessToken = await new SignJWT({ 
      userId: user._id.toString(),
      email: user.email,
      role: user.role || 'user'
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expirationTime)
      .setIssuedAt()
      .sign(secret)

    console.log('✅ JWT token created')

    // Step 8: Get request metadata
    const userAgent = request.headers.get('user-agent') || undefined
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ipAddress = (forwardedFor?.split(',')[0]?.trim()) || 
                     request.headers.get('x-real-ip') || 
                     undefined

    // Step 9: Save session to database (sessions collection)
    console.log('💾 Saving session to MongoDB...')
    try {
      const session = new Session({
        userId: user._id,
        token: accessToken,
        expiresAt,
        userAgent,
        ipAddress,
        isActive: true
      })

      await session.save()
      console.log('✅ Session saved to database:', session._id)
    } catch (sessionError) {
      console.error('⚠️ Session save error (continuing):', sessionError)
      // Continue even if session save fails
    }

    // Step 10: Update last login timestamp
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (User as any).updateOne(
        { _id: user._id },
        { $set: { lastLogin: new Date() } }
      )
      console.log('✅ Last login updated')
    } catch {
      // Continue anyway - login was successful
    }

    // Step 11: Prepare user data (exclude sensitive fields)
    const userData = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive,
      role: user.role || 'user',
      provider: user.provider || 'credentials',
      lastLogin: new Date(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }

    // Step 12: Create response with user data
    const response = NextResponse.json({
      success: true,
      data: {
        user: userData,
        accessToken
      },
      message: 'Login successful'
    })

    // Step 13: Set HTTP-Only Cookie (Secure, SameSite=Lax)
    console.log('🍪 Setting authentication cookie...')
    response.cookies.set('auth-token', accessToken, {
      httpOnly: true, // HTTP-Only for security as per diagram
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // SameSite=Lax as per diagram
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    console.log('✅ Cookie set')
    console.log('🎉 Authentication successful!')

    return response

  } catch (error) {
    console.error('❌ Login error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
