import { cookies } from 'next/headers'

export interface BackendApiOptions extends RequestInit {
  requireAuth?: boolean
}

/**
 * Enhanced backend API helper function with better error handling
 */
export async function callBackendAPI(endpoint: string, options: BackendApiOptions = {}): Promise<Response> {
  const { requireAuth = true, ...fetchOptions } = options
  
  // Use relative URL for production (same domain) or explicit URL for development
  const isDev = process.env.NODE_ENV === 'development'
  const backendUrl = isDev 
    ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/+$/, '')
    : '/api/v1' // Relative URL for production
  
  console.log('🔍 Backend API Debug:', {
    isDev,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    backendUrl,
    endpoint,
    fullUrl: `${backendUrl}${endpoint}`
  })
  
  // Prepare headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  }
  
  // Add authentication if required
  if (requireAuth) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('auth-token')?.value
    
    if (!accessToken) {
      console.error('❌ No auth-token cookie found')
      throw new Error('Authentication required. Please log in again.')
    }
    
    headers['Authorization'] = `Bearer ${accessToken}`
    console.log('🔑 Auth token length:', accessToken.length)
  }
  
  try {
    console.log('🌐 Calling backend API:', {
      url: `${backendUrl}${endpoint}`,
      method: fetchOptions.method || 'GET',
      requireAuth,
      headers: Object.keys(headers),
      hasAuth: !!headers['Authorization']
    })
    
    const response = await fetch(`${backendUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
      // Add timeout to detect backend connection issues
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })

    console.log('🌐 Backend API response:', {
      status: response.status,
      statusText: response.statusText,
      url: `${backendUrl}${endpoint}`
    })

    return response
  } catch (error) {
    console.error('❌ Backend API call failed:', {
      endpoint,
      backendUrl,
      fullUrl: `${backendUrl}${endpoint}`,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorName: error instanceof Error ? error.name : 'Unknown',
    })
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        throw new Error('Backend server is not responding. Please ensure the server is running on port 5000.')
      } else if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')) {
        throw new Error('Cannot connect to backend server. Please ensure it is running on port 5000.')
      }
    }
    
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