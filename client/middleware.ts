import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Define protected and public routes
const protectedRoutes = [
  '/home',
  '/diary',
  '/focus',
  '/notes',
  '/to-do-list',
  '/settings',
  '/help',
  '/news',
  '/mystery',
  '/developer-notes'
]

const authRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-email'
]

// Verify JWT token
async function isValidToken(token: string): Promise<boolean> {
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-for-development')
    return true
  } catch (error) {
    console.log('[Middleware] Token verification failed:', error)
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get token from cookies
  const cookieToken = request.cookies.get('auth-token')?.value
  
  console.log('[Middleware] Checking path:', pathname, 'has token:', !!cookieToken)

  // Check if user has a valid token
  const isAuthenticated = cookieToken ? await isValidToken(cookieToken) : false

  console.log('[Middleware] Authentication status:', isAuthenticated)

  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      console.log('[Middleware] Redirecting to login - no valid token')
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Handle auth routes (redirect authenticated users away)
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      console.log('[Middleware] Redirecting authenticated user to home')
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }

  // Handle root route
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/home', request.url))
    } else {
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
