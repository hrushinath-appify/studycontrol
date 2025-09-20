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
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    
    try {
      const loginResponse = await fetch(`${backendUrl}/api/v1/auth/login`, {
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

      return createSuccessResponse({
        user: loginData.data.user,
        accessToken: loginData.data.accessToken,
        refreshToken: loginData.data.refreshToken
      })

    } catch (fetchError) {
      console.error('Backend authentication failed:', fetchError)
      return createErrorResponse('Authentication service unavailable', 503)
    }

  } catch (error) {
    return handleApiError(error, 'Login')
  }
}
