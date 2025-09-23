import { NextRequest } from 'next/server'
import { getUser } from '@/lib/dal'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { cookies } from 'next/headers'

// Backend API helper function with authentication
async function callBackendAPI(endpoint: string, options: RequestInit = {}) {
  const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/+$/, '')
  
  // Get JWT token from cookies
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('auth-token')?.value
  
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
    throw new Error(`Backend API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// GET /api/tasks - Get tasks
export async function GET(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    // Extract query parameters
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    const endpoint = `/tasks${queryString ? `?${queryString}` : ''}`

    // Forward request to backend
    const response = await callBackendAPI(endpoint, {
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
      return createErrorResponse(data.error || 'Failed to fetch tasks', response.status)
    }

    return createSuccessResponse(data.data, data.message)

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Access token not found')) {
      return createErrorResponse('Authentication token missing. Please log in again.', 401)
    }
    return handleApiError(error, 'Get tasks')
  }
}

// POST /api/tasks - Create task
export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    // Get the request body
    const body = await request.json()
    
    // Forward request to backend
    const response = await callBackendAPI('/tasks', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    let data
    try {
      data = await response.json()
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError)
      return createErrorResponse('Invalid response from backend service', 502)
    }

    if (!response.ok) {
      return createErrorResponse(data.error || 'Failed to create task', response.status)
    }

    return createSuccessResponse(data.data, data.message)

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Access token not found')) {
      return createErrorResponse('Authentication token missing. Please log in again.', 401)
    }
    return handleApiError(error, 'Create task')
  }
}