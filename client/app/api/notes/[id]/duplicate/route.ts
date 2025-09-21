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
    throw new Error(`Backend API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// POST /api/notes/[id]/duplicate - Duplicate note
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check if user has a valid session
    const user = await getUser()
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    const { id } = await params

    // Forward request to backend
    const response = await callBackendAPI(`/notes/${id}/duplicate`, {
      method: 'POST',
    })

    let data
    try {
      data = await response.json()
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError)
      return createErrorResponse('Invalid response from backend service', 502)
    }

    if (!response.ok) {
      return createErrorResponse(data.error || 'Failed to duplicate note', response.status)
    }

    // Transform _id to id for frontend compatibility
    const transformedNote = data.data ? {
      ...data.data,
      id: data.data._id,
      wordCount: data.data.content ? data.data.content.trim().split(/\s+/).filter((word: string) => word.length > 0).length : 0,
      _id: undefined
    } : null

    return createSuccessResponse(transformedNote, data.message)

  } catch (error) {
    console.error('Duplicate Note API Route Error:', error)
    if (error instanceof Error && error.message.includes('Access token not found')) {
      return createErrorResponse('Authentication token missing. Please log in again.', 401)
    }
    return handleApiError(error, 'Duplicate note')
  }
}