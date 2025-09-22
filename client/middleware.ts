import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

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
  '/reset-password'
]

const secretKey = process.env.SESSION_SECRET || 'fallback-secret-key-for-development-only'
const encodedKey = new TextEncoder().encode(secretKey)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('session-token')?.value

  console.log('[Middleware] Checking path:', pathname, 'has session:', !!sessionToken)

  // TEMPORARILY DISABLE PROTECTION TO TEST REDIRECT
  // Check if user has a valid session
  // const isAuthenticated = sessionToken ? await isValidSession(sessionToken) : false

  // console.log('[Middleware] Authentication status:', isAuthenticated)

  // Handle protected routes - TEMPORARILY DISABLED
  // if (protectedRoutes.some(route => pathname.startsWith(route))) {
  //   if (!isAuthenticated) {
  //     console.log('[Middleware] Redirecting to login - no valid session')
  //     const loginUrl = new URL('/login', request.url)
  //     loginUrl.searchParams.set('redirect', pathname)
  //     return NextResponse.redirect(loginUrl)
  //   }
  // }

  // Handle auth routes (redirect authenticated users away) - ALSO DISABLED FOR NOW
  // if (authRoutes.some(route => pathname.startsWith(route))) {
  //   if (isAuthenticated) {
  //     console.log('[Middleware] Redirecting authenticated user to home')
  //     return NextResponse.redirect(new URL('/home', request.url))
  //   }
  // }

  // Handle root route
  if (pathname === '/') {
    console.log('[Middleware] Root route - redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  console.log('[Middleware] Allowing request to proceed')
  return NextResponse.next()
}

async function isValidSession(sessionToken: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(sessionToken, encodedKey, {
      algorithms: ['HS256'],
    })
    
    // Check if session has required fields and is not expired
    if (!payload.userId || !payload.expires) {
      return false
    }
    
    // Check if session is expired
    if (new Date(payload.expires as string) < new Date()) {
      return false
    }
    
    return true
  } catch {
    return false
  }
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
