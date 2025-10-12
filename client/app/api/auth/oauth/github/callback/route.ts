import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User, generateAvatarUrl } from '@/lib/database'
import { Session } from '@/lib/session-model'
import { SignJWT } from 'jose'

interface GitHubUserProfile {
  id: number
  login: string
  name: string | null
  email: string | null
  avatar_url: string
}

interface GitHubEmail {
  email: string
  primary: boolean
  verified: boolean
  visibility: string | null
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔵 GitHub OAuth Callback Started')
    
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    // Handle OAuth denial
    if (error) {
      console.log('❌ OAuth error:', error)
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent('GitHub authentication was cancelled')}`, request.url)
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
    const clientId = process.env.GITHUB_CLIENT_ID
    const clientSecret = process.env.GITHUB_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error('❌ GitHub OAuth credentials not configured')
      return NextResponse.redirect(
        new URL('/login?error=OAuth not configured', request.url)
      )
    }

    console.log('🔄 Exchanging code for access token...')
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    if (!tokenResponse.ok) {
      console.error('❌ Token exchange failed')
      return NextResponse.redirect(
        new URL('/login?error=Authentication failed', request.url)
      )
    }

    const tokens = await tokenResponse.json()
    
    if (tokens.error) {
      console.error('❌ Token error:', tokens.error_description)
      return NextResponse.redirect(
        new URL('/login?error=Authentication failed', request.url)
      )
    }

    console.log('✅ Access token received')

    // Get user profile from GitHub
    console.log('👤 Fetching user profile from GitHub...')
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!profileResponse.ok) {
      console.error('❌ Profile fetch failed')
      return NextResponse.redirect(
        new URL('/login?error=Failed to get profile', request.url)
      )
    }

    const profile: GitHubUserProfile = await profileResponse.json()
    console.log('✅ User profile received:', profile.login)

    // Get user emails from GitHub (if email is not public)
    let userEmail = profile.email
    let emailVerified = false

    if (!userEmail) {
      console.log('📧 Fetching user emails from GitHub...')
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })

      if (emailsResponse.ok) {
        const emails: GitHubEmail[] = await emailsResponse.json()
        const primaryEmail = emails.find(e => e.primary) || emails[0]
        userEmail = primaryEmail?.email || null
        emailVerified = primaryEmail?.verified || false
      }
    } else {
      emailVerified = true // Assume verified if public
    }

    if (!userEmail) {
      console.error('❌ Could not retrieve email from GitHub')
      return NextResponse.redirect(
        new URL('/login?error=Email required for authentication', request.url)
      )
    }

    console.log('✅ User email:', userEmail)

    // Connect to database
    await connectToDatabase()
    console.log('✅ Database connected')

    // Check if user exists
    console.log('🔍 Checking if user exists in database...')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let user = await (User as any).findOne({
      $or: [
        { email: userEmail.toLowerCase() },
        { providerId: profile.id.toString(), provider: 'github' }
      ]
    })

    if (!user) {
      // Create new user in MongoDB
      console.log('💾 Creating new user from OAuth profile...')
      const userName = profile.name || profile.login
      user = new User({
        name: userName,
        email: userEmail.toLowerCase(),
        avatar: profile.avatar_url || generateAvatarUrl(userName),
        isEmailVerified: emailVerified,
        isActive: true,
        role: 'user',
        provider: 'github',
        providerId: profile.id.toString(),
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
        user.provider = 'github'
        user.providerId = profile.id.toString()
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

    console.log('🎉 GitHub OAuth authentication successful!')
    return response

  } catch (error) {
    console.error('❌ GitHub OAuth callback error:', error)
    return NextResponse.redirect(
      new URL('/login?error=Authentication failed', request.url)
    )
  }
}
