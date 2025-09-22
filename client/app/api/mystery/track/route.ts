import { NextRequest } from 'next/server'
import { getUser } from '@/lib/dal'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { cookies } from 'next/headers'

// Backend API helper function with authentication
async function callBackendAPI(endpoint: string, options: RequestInit = {}) {
  const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1').replace(/\/+$/, '')
  
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

export async function POST(_request: NextRequest) {
  try {
    console.log('Mystery track API route called')
    
    const user = await getUser()
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    // Forward request to backend
    const response = await callBackendAPI('/mystery/track', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    let data
    try {
      data = await response.json()
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError)
      return createErrorResponse('Invalid response from backend service', 502)
    }

    if (!response.ok) {
      console.error('Backend error:', response.status, data)
      return createErrorResponse(data.error || 'Failed to track mystery exploration', response.status)
    }

    console.log('Mystery tracking success:', data)
    return createSuccessResponse(data.data || {}, data.message || 'Mystery exploration tracked successfully')

  } catch (error) {
    console.error('Mystery tracking API error:', error)
    if (error instanceof Error && error.message.includes('Access token not found')) {
      return createErrorResponse('Authentication token missing. Please log in again.', 401)
    }
    return handleApiError(error, 'Track mystery exploration')
  }
}