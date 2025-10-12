import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User } from '@/lib/database'
import { Session } from '@/lib/session-model'
import { jwtVerify, SignJWT } from 'jose'
import { createErrorResponse } from '@/lib/api-utils'

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 Session Refresh Flow Started')
    
    // Step 1: Get token from cookie or body
    const cookieToken = request.cookies.get('auth-token')?.value
    const body = await request.json().catch(() => ({}))
    const token = body.token || cookieToken

    if (!token) {
      console.log('❌ No token provided')
      return createErrorResponse('No token provided', 401)
    }

    console.log('✅ Token received')

    // Step 2: Verify token (even if expired, we want to check signature)
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET not configured')
      return createErrorResponse('Authentication service unavailable', 503)
    }

    const secret = new TextEncoder().encode(jwtSecret)
    
    let payload
    try {
      // Try to verify token (will fail if expired)
      const result = await jwtVerify(token, secret)
      payload = result.payload
      
      // If token is still valid, no need to refresh
      if (payload.exp && payload.exp * 1000 > Date.now()) {
        console.log('✅ Token is still valid, no refresh needed')
        return NextResponse.json({
          success: true,
          data: { token },
          message: 'Token is still valid'
        })
      }
    } catch (error) {
      // Token might be expired, try to decode without verification to check if it's ours
      console.log('⚠️ Token verification failed, attempting to decode...')
      
      // Check if token is expired but otherwise valid
      if (error instanceof Error && error.message.includes('exp')) {
        // Token is expired, we can try to refresh it
        try {
          // Decode without verification to get user info
          const parts = token.split('.')
          if (parts.length !== 3) {
            throw new Error('Invalid token format')
          }
          
          const payloadStr = Buffer.from(parts[1], 'base64').toString('utf-8')
          payload = JSON.parse(payloadStr)
        } catch {
          console.log('❌ Could not decode token')
          return createErrorResponse('Invalid token', 401)
        }
      } else {
        console.log('❌ Token verification failed:', error)
        return createErrorResponse('Invalid token', 401)
      }
    }

    console.log('✅ Token decoded, userId:', payload.userId)

    // Step 3: Connect to database
    await connectToDatabase()
    console.log('✅ Database connected')

    // Step 4: Check if session exists in database
    console.log('🔍 Checking session in database...')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await (Session as any).findOne({
      token,
      userId: payload.userId,
      isActive: true
    })

    if (!session) {
      console.log('❌ Session not found or inactive')
      return createErrorResponse('Session not found or expired', 401)
    }

    console.log('✅ Session found in database')

    // Step 5: Check if user still exists and is active
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (User as any).findById(payload.userId)
    
    if (!user || !user.isActive) {
      console.log('❌ User not found or inactive')
      // Invalidate session
      session.isActive = false
      await session.save()
      return createErrorResponse('User not found or inactive', 401)
    }

    console.log('✅ User is active')

    // Step 6: Renew JWT Token
    console.log('🔑 Creating new JWT token...')
    const expirationTime = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    const expiresAt = new Date(expirationTime * 1000)
    
    const newToken = await new SignJWT({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expirationTime)
      .setIssuedAt()
      .sign(secret)

    console.log('✅ New JWT token created')

    // Step 7: Update session in database
    console.log('💾 Updating session in MongoDB...')
    session.token = newToken
    session.expiresAt = expiresAt
    await session.save()
    console.log('✅ Session updated in database')

    // Step 8: Prepare response
    const response = NextResponse.json({
      success: true,
      data: { 
        token: newToken,
        expiresAt: expiresAt.toISOString()
      },
      message: 'Token refreshed successfully'
    })

    // Step 9: Update cookie
    console.log('🍪 Updating cookie...')
    response.cookies.set('auth-token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    })

    console.log('🎉 Session refreshed successfully!')
    return response

  } catch (error) {
    console.error('❌ Session refresh error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
