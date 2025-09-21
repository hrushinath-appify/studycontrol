import { cookies } from 'next/headers'

export interface BackendApiOptions extends RequestInit {
  requireAuth?: boolean
}

/**
 * Enhanced backend API helper function with better error handling
 */
export async function callBackendAPI(endpoint: string, options: BackendApiOptions = {}): Promise<Response> {
  const { requireAuth = true, ...fetchOptions } = options
  const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/+$/, '')
  
  // Prepare headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  }
  
  // Add authentication if required
  if (requireAuth) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access-token')?.value
    
    if (!accessToken) {
      throw new Error('Access token not found in cookies')
    }
    
    headers['Authorization'] = `Bearer ${accessToken}`
  }
  
  try {
    const response = await fetch(`${backendUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
    })

    return response
  } catch (error) {
    console.error('Backend API call failed:', {
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    throw new Error(`Backend API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Helper to safely parse JSON response with proper error handling
 */
export async function parseJsonResponse(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch (parseError) {
    console.error('Failed to parse response as JSON:', {
      status: response.status,
      statusText: response.statusText,
      error: parseError instanceof Error ? parseError.message : 'Unknown error',
    })
    throw new Error('Invalid JSON response from backend service')
  }
}