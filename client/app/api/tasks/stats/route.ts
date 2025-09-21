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
  
  const response = await fetch(`${backendUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  })
  
  return response
}

// GET /api/tasks/stats - Get task statistics
export async function GET(_request: NextRequest) {
  try {
    // Check if user has a valid session
    const user = await getUser()
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    // Forward request to backend
    const response = await callBackendAPI('/tasks/stats', {
      method: 'GET',
    })

    const data = await response.json()

    if (!response.ok) {
      return createErrorResponse(data.error || 'Failed to fetch task statistics', response.status)
    }

    return createSuccessResponse(data.data, data.message)

  } catch (error) {
    console.error('Tasks Stats API Route Error:', error)
    if (error instanceof Error && error.message.includes('Access token not found')) {
      return createErrorResponse('Authentication token missing. Please log in again.', 401)
    }
    return handleApiError(error, 'Get task statistics')
  }
}