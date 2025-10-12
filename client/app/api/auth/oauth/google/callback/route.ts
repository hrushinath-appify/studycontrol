import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User, generateAvatarUrl } from '@/lib/database'
import { Session } from '@/lib/session-model'
import { SignJWT } from 'jose'

interface GoogleUserProfile {
  id: string
  email: string
  name: string
  picture?: string
  verified_email: boolean
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔵 Google OAuth Callback Started')
    
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    // Handle OAuth denial
    if (error) {
      console.log('❌ OAuth error:', error)
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent('Google authentication was cancelled')}`, request.url)
      )
    }

    if (!code) {
      console.log('❌ No authorization code received')
      return NextResponse.redirect(
        new URL('/login?error=Authentication failed', request.url)
      )
    }

    console.log('✅ Authorization code received')

    // Exchange code for tokens
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/oauth/google/callback`

    if (!clientId || !clientSecret) {
      console.error('❌ Google OAuth credentials not configured')
      return NextResponse.redirect(
        new URL('/login?error=OAuth not configured', request.url)
      )
    }

    console.log('🔄 Exchanging code for access token...')
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      console.error('❌ Token exchange failed:', await tokenResponse.text())
      return NextResponse.redirect(
        new URL('/login?error=Authentication failed', request.url)
      )
    }

    const tokens = await tokenResponse.json()
    console.log('✅ Access token received')

    // Get user profile from Google
    console.log('👤 Fetching user profile from Google...')
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!profileResponse.ok) {
      console.error('❌ Profile fetch failed')
      return NextResponse.redirect(
        new URL('/login?error=Failed to get profile', request.url)
      )
    }

    const profile: GoogleUserProfile = await profileResponse.json()
    console.log('✅ User profile received:', profile.email)

    // Connect to database
    await connectToDatabase()
    console.log('✅ Database connected')

    // Check if user exists
    console.log('🔍 Checking if user exists in database...')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let user = await (User as any).findOne({ 
      $or: [
        { email: profile.email.toLowerCase() },
        { providerId: profile.id, provider: 'google' }
      ]
    })

    if (!user) {
      // Create new user in MongoDB
      console.log('💾 Creating new user from OAuth profile...')
      user = new User({
        name: profile.name,
        email: profile.email.toLowerCase(),
        avatar: profile.picture || generateAvatarUrl(profile.name),
        isEmailVerified: profile.verified_email,
        isActive: true,
        role: 'user',
        provider: 'google',
        providerId: profile.id,
        mysteryClicks: 0,
        lastLogin: new Date()
      })
      await user.save()
      console.log('✅ New user created:', user._id)
    } else {
      // Update existing user
      console.log('✅ User exists, updating login time...')
      user.lastLogin = new Date()
      if (!user.providerId && user.provider === 'credentials') {
        user.provider = 'google'
        user.providerId = profile.id
      }
      await user.save()
    }

    // Create JWT Token
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET not configured')
      return NextResponse.redirect(
        new URL('/login?error=Authentication service unavailable', request.url)
      )
    }

    const secret = new TextEncoder().encode(jwtSecret)
    const expirationTime = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)
    const expiresAt = new Date(expirationTime * 1000)

    console.log('🔑 Creating JWT token...')
    const accessToken = await new SignJWT({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expirationTime)
      .setIssuedAt()
      .sign(secret)

    console.log('✅ JWT token created')

    // Save session to database
    const userAgent = request.headers.get('user-agent') || undefined
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ipAddress = (forwardedFor?.split(',')[0]?.trim()) || 
                     request.headers.get('x-real-ip') || 
                     undefined

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
      console.log('✅ Session saved:', session._id)
    } catch (sessionError) {
      console.error('⚠️ Session save error (continuing):', sessionError)
    }

    // Create redirect response
    const redirectUrl = new URL('/home', request.url)
    const response = NextResponse.redirect(redirectUrl)

    // Set HTTP-Only Cookie
    console.log('🍪 Setting authentication cookie...')
    response.cookies.set('auth-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    })

    console.log('🎉 Google OAuth authentication successful!')
    return response

  } catch (error) {
    console.error('❌ Google OAuth callback error:', error)
    return NextResponse.redirect(
      new URL('/login?error=Authentication failed', request.url)
    )
  }
}
