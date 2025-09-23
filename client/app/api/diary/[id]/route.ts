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

// GET /api/diary/[id] - Get specific diary entry
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check if user has a valid session
    const user = await getUser()
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    const { id } = await params

    // Forward request to backend
    const response = await callBackendAPI(`/diary/${id}`, {
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
      return createErrorResponse(data.error || 'Failed to fetch diary entry', response.status)
    }

    return createSuccessResponse(data.data, data.message)

  } catch (error) {
    console.error('Get Diary Entry API Route Error:', error)
    if (error instanceof Error && error.message.includes('Access token not found')) {
      return createErrorResponse('Authentication token missing. Please log in again.', 401)
    }
    return handleApiError(error, 'Get diary entry')
  }
}

// PUT /api/diary/[id] - Update specific diary entry
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check if user has a valid session
    const user = await getUser()
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    const { id } = await params
    
    // Get the request body
    const body = await request.json()

    // Forward request to backend
    const response = await callBackendAPI(`/diary/${id}`, {
      method: 'PUT',
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
      return createErrorResponse(data.error || 'Failed to update diary entry', response.status)
    }

    return createSuccessResponse(data.data, data.message)

  } catch (error) {
    console.error('Update Diary Entry API Route Error:', error)
    if (error instanceof Error && error.message.includes('Access token not found')) {
      return createErrorResponse('Authentication token missing. Please log in again.', 401)
    }
    return handleApiError(error, 'Update diary entry')
  }
}

// DELETE /api/diary/[id] - Delete specific diary entry
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check if user has a valid session
    const user = await getUser()
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    const { id } = await params

    // Forward request to backend
    const response = await callBackendAPI(`/diary/${id}`, {
      method: 'DELETE',
    })

    let data
    try {
      data = await response.json()
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError)
      return createErrorResponse('Invalid response from backend service', 502)
    }

    if (!response.ok) {
      return createErrorResponse(data.error || 'Failed to delete diary entry', response.status)
    }

    return createSuccessResponse(data.data, data.message)

  } catch (error) {
    console.error('Delete Diary Entry API Route Error:', error)
    if (error instanceof Error && error.message.includes('Access token not found')) {
      return createErrorResponse('Authentication token missing. Please log in again.', 401)
    }
    return handleApiError(error, 'Delete diary entry')
  }
}