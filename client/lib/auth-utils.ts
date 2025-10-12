import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { connectToDatabase, User } from '@/lib/database'
import { Session } from '@/lib/session-model'

export interface AuthenticatedUser {
  id: string
  email: string
  name: string
  role: string
  provider: string
  createdAt: string
  lastLoginAt?: string
}

// Helper function to verify JWT token and get user (with session validation)
export async function getUserFromToken(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    console.log('🔍 Getting user from JWT token...')
    
    // Get token from Authorization header or cookies
    const authHeader = request.headers.get('authorization')
    const cookieToken = request.cookies.get('auth-token')?.value
    
    console.log('📝 Auth header exists:', !!authHeader)
    console.log('🍪 Cookie token exists:', !!cookieToken)
    
    const token = authHeader?.replace('Bearer ', '') || cookieToken

    if (!token) {
      console.log('❌ No JWT token found')
      return null
    }

    console.log('🔑 Found JWT token')

    // Verify token
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.log('❌ No JWT_SECRET environment variable')
      return null
    }
    
    const secret = new TextEncoder().encode(jwtSecret)
    console.log('🔐 Attempting JWT verification...')
    
    const { payload } = await jwtVerify(token, secret)
    const decoded = payload as { userId: string; email: string; role?: string }

    console.log('✅ JWT token verified, user ID:', decoded.userId)

    // Connect to database
    await connectToDatabase()
    console.log('✅ Database connected')

    // Step: Validate session in database (as per auth flow diagram)
    console.log('🔍 Validating session in database...')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await (Session as any).findOne({
      token,
      userId: decoded.userId,
      isActive: true,
      expiresAt: { $gt: new Date() } // Check expiration
    }).lean()

    if (!session) {
      console.log('❌ Session not found, expired, or inactive')
      return null
    }

    console.log('✅ Session validated in database')

    // Get user from database
    console.log('🔍 Fetching user from database...')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userDoc = await (User as any).findById(decoded.userId).lean()
    
    if (!userDoc || !userDoc.isActive) {
      console.log('❌ User not found or inactive')
      // Invalidate session
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (Session as any).updateOne(
        { _id: session._id },
        { $set: { isActive: false } }
      )
      return null
    }

    console.log('✅ User found in database:', userDoc.email)

    return {
      id: userDoc._id.toString(),
      email: userDoc.email,
      name: userDoc.name,
      role: userDoc.role || 'user',
      provider: userDoc.provider || 'credentials',
      createdAt: userDoc.createdAt,
      lastLoginAt: userDoc.lastLogin
    }
  } catch (error) {
    console.error('❌ JWT verification error details:')
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown')
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    if (error instanceof Error) {
      console.error('Full error:', error)
    }
    return null
  }
}

// Helper function to check if user has required role
export function hasRole(user: AuthenticatedUser | null, requiredRole: string): boolean {
  if (!user) return false
  
  // Admin has access to everything
  if (user.role === 'admin') return true
  
  // Check specific role
  return user.role === requiredRole
}

// Helper function to check if user has any of the required roles
export function hasAnyRole(user: AuthenticatedUser | null, requiredRoles: string[]): boolean {
  if (!user) return false
  
  // Admin has access to everything
  if (user.role === 'admin') return true
  
  // Check if user has any of the required roles
  return requiredRoles.includes(user.role)
}