import { NextRequest } from 'next/server'
import { createSession } from '@/lib/dal'
import { validateLoginRequest } from '@/lib/validations'
import { parseRequestBody, createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request)
    
    // Validate input
    const validation = validateLoginRequest(body)
    if (!validation.isValid) {
      const errorMessage = Object.values(validation.errors)[0] || 'Validation failed'
      return createErrorResponse(errorMessage, 400)
    }

    const { email, password } = body

    // Authenticate against the backend API server
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/+$/, '')
    
    try {
      const loginResponse = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const loginData = await loginResponse.json()

      if (!loginResponse.ok) {
        return createErrorResponse(loginData.error || 'Authentication failed', loginResponse.status)
      }

      // Ensure the backend actually provided tokens (i.e., user is verified)
      if (!loginData.data.accessToken || !loginData.data.refreshToken) {
        return createErrorResponse('Account verification required. Please check your email.', 401)
      }

      // Create session with the backend response
      await createSession(loginData.data.user)

      // Store tokens in HTTP-only cookies for API access
      const response = createSuccessResponse({
        user: loginData.data.user,
        token: loginData.data.accessToken
      })

      // Set authentication cookies
      response.cookies.set('access-token', loginData.data.accessToken, {
        httpOnly: false, // Allow JavaScript access for API calls
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 // 7 days
      })

      if (loginData.data.refreshToken) {
        response.cookies.set('refresh-token', loginData.data.refreshToken, {
          httpOnly: true, // Keep refresh token secure
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 30 * 24 * 60 * 60 // 30 days
        })
      }

      return response

    } catch (fetchError) {
      console.error('Backend authentication failed:', fetchError)
      return createErrorResponse('Authentication service unavailable', 503)
    }

  } catch (error) {
    return handleApiError(error, 'Login')
  }
}
