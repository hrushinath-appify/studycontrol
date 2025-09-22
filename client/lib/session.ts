import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { User, Session } from '@/types'

const secretKey = process.env.SESSION_SECRET || 'fallback-secret-key-for-development-only'
const encodedKey = new TextEncoder().encode(secretKey)

interface SessionJWTPayload {
  userId: string
  email: string
  name: string
  role: string
  expires: string
}

export async function createSecureSession(user: User): Promise<string> {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  // Create JWT token with proper payload structure
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'user',
    expires: expires.toISOString()
  }

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(encodedKey)

  // Set secure HTTP-only cookie
  const cookieStore = await cookies()
  cookieStore.set('session-token', token, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  })

  return token
}

export async function verifySecureSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session-token')?.value

    console.log('Verifying session, token exists:', !!token, 'token length:', token?.length || 0)

    if (!token) {
      console.log('No session token found')
      return null
    }

    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })

    console.log('JWT verification successful, payload:', { userId: payload.userId, email: payload.email })

    // Reconstruct session from JWT payload
    const sessionData = payload as unknown as SessionJWTPayload
    
    if (!sessionData.userId || !sessionData.expires) {
      console.log('Missing required session data:', { userId: !!sessionData.userId, expires: !!sessionData.expires })
      return null
    }

    // Check if session is expired
    if (new Date(sessionData.expires) < new Date()) {
      console.log('Session expired:', sessionData.expires)
      return null
    }

    console.log('Session verified successfully for user:', sessionData.email)

    const session: Session = {
      user: {
        id: sessionData.userId,
        email: sessionData.email,
        name: sessionData.name,
        role: (sessionData.role as 'user' | 'admin') || 'user',
        createdAt: '', // Will be populated from backend if needed
        lastLoginAt: '' // Will be populated from backend if needed
      },
      expires: sessionData.expires
    }

    return session
  } catch (error) {
    console.error('Session verification failed:', error)
    return null
  }
}

export async function deleteSecureSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('session-token')
}

// CSRF Token utilities
export async function generateCSRFToken(): Promise<string> {
  const token = await new SignJWT({ type: 'csrf' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encodedKey)

  return token
}

export async function verifyCSRFToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })

    return payload.type === 'csrf'
  } catch {
    return false
  }
}
