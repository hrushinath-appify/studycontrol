import { NextRequest } from 'next/server'
import { getUser } from '@/lib/dal'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { cookies } from 'next/headers'

// Backend API helper function with authentication
async function callBackendAPI(endpoint: string, options: RequestInit = {}) {
  const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/+$/, '')
  
  // Get JWT token from cookies
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access-token')?.value
  
  if (!accessToken) {
    throw new Error('Access token not found in cookies')
  }
  
  try {
    const response = await fetch(`${backendUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    })
    
    return response
  } catch (error) {
    console.error('Backend API call failed:', error)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Cannot connect to backend server at ${backendUrl}. Please ensure the backend service is running.`)
    }
    throw new Error(`Backend API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// GET /api/diary/stats - Get diary statistics
export async function GET(_request: NextRequest) {
  try {
    // Check if user has a valid session
    const user = await getUser()
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    // Forward request to backend
    const response = await callBackendAPI('/diary/stats', {
      method: 'GET',
    })

    let data
    try {
      data = await response.json()
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError)
      return createErrorResponse('Invalid response from backend service', 502)
    }

    if (!response.ok) {
      return createErrorResponse(data.error || 'Failed to fetch diary statistics', response.status)
    }

    return createSuccessResponse(data.data, data.message)

  } catch (error) {
    console.error('Diary Stats API Route Error:', error)
    if (error instanceof Error && error.message.includes('Access token not found')) {
      return createErrorResponse('Authentication token missing. Please log in again.', 401)
    }
    return handleApiError(error, 'Get diary statistics')
  }
}