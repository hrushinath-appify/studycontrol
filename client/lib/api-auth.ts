import { NextRequest } from 'next/server'
import { createErrorResponse } from '@/lib/api-utils'

/**
 * Enhanced authentication check for API routes that always returns JSON
 */
export async function apiAuthCheck(_request: NextRequest) {
  try {
    // Import these dynamically to avoid potential import issues
    const { getUser } = await import('@/lib/dal')
    const { cookies } = await import('next/headers')
    
    // Check for session
    const user = await getUser()
    if (!user) {
      return {
        isValid: false,
        response: createErrorResponse('Authentication required. Please log in again.', 401)
      }
    }
    
    // Check for access token in cookies
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access-token')?.value
    
    if (!accessToken) {
      return {
        isValid: false,
        response: createErrorResponse('Authentication token missing. Please log in again.', 401)
      }
    }
    
    return {
      isValid: true,
      user,
      accessToken
    }
  } catch (error) {
    console.error('API authentication check failed:', error)
    return {
      isValid: false,
      response: createErrorResponse('Authentication service unavailable. Please try again.', 503)
    }
  }
}