import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// Define protected and public routes
const protectedRoutes = [
  '/home',
  '/focus',
  '/notes',
  '/settings',
  '/help',
  '/news',
  '/mystery',
  '/developer-notes',
]

const authRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-email'
]

// Admin-only routes for role-based access control
const adminRoutes = [
  '/admin',
  '/developer-notes'
]

interface TokenPayload {
  userId: string
  email: string
  role: string | undefined
  exp: number | undefined
}

// Verify JWT token using jose library (Edge Runtime compatible)
async function validateToken(token: string): Promise<TokenPayload | null> {
  try {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error('[Middleware] JWT_SECRET environment variable is not set')
      return null
    }
    
    // Convert string secret to Uint8Array for jose library
    const secret = new TextEncoder().encode(jwtSecret)
    
    // Verify the token and check expiration
    const { payload } = await jwtVerify(token, secret)
    
    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      console.log('[Middleware] Token has expired')
      return null
    }
    
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as string | undefined,
      exp: payload.exp
    }
  } catch (error) {
    console.log('[Middleware] Token verification failed:', error)
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get token from cookies
  const cookieToken = request.cookies.get('auth-token')?.value
  
  console.log('[Middleware] Checking path:', pathname, 'has token:', !!cookieToken)

  // Validate token and get payload
  const tokenPayload = cookieToken ? await validateToken(cookieToken) : null
  const isAuthenticated = !!tokenPayload

  console.log('[Middleware] Authentication status:', isAuthenticated)
  if (tokenPayload) {
    console.log('[Middleware] User role:', tokenPayload.role)
  }

  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      console.log('[Middleware] Redirecting to login - no valid token')
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check role-based access control for admin routes
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (tokenPayload?.role !== 'admin') {
        console.log('[Middleware] Access denied - insufficient permissions')
        const unauthorizedUrl = new URL('/unauthorized', request.url)
        return NextResponse.redirect(unauthorizedUrl)
      }
      console.log('[Middleware] Admin access granted')
    }

    console.log('[Middleware] Allowing access to protected route')
    return NextResponse.next()
  }

  // Handle auth routes (redirect authenticated users away)
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      console.log('[Middleware] Redirecting authenticated user from auth route to home')
      return NextResponse.redirect(new URL('/home', request.url))
    }
    console.log('[Middleware] Allowing access to auth route')
    return NextResponse.next()
  }

  // Handle root route
  if (pathname === '/') {
    if (isAuthenticated) {
      console.log('[Middleware] Redirecting authenticated user from root to home')
      return NextResponse.redirect(new URL('/home', request.url))
    } else {
      console.log('[Middleware] Redirecting unauthenticated user from root to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  console.log('[Middleware] Allowing request to proceed')
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
