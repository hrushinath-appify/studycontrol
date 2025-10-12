// API utilities for consistent error handling and response formatting

import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'
import { API_CONFIG } from './constants'
import { getLocalStorageItem } from '@/lib/utils/localStorage'

// =============================================================================
// FETCH UTILITIES
// =============================================================================

export interface FetchOptions extends RequestInit {
  timeout?: number
}

export async function apiRequest<T = unknown>(
  url: string, 
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = API_CONFIG.TIMEOUT, ...fetchOptions } = options
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    // Get access token from localStorage for backend API requests
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string>),
    }

    // Add Authorization header if we have an access token and this is a backend API call
    if (url.includes(API_CONFIG.BASE_URL)) {
      const accessToken = getLocalStorageItem('accessToken')
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
      }
    }

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      credentials: 'include',
      headers,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
      } catch {
        // If we can't parse the error response, use the status text
        errorMessage = response.statusText || errorMessage
      }
      
      const error = new Error(errorMessage) as Error & { status: number }
      error.status = response.status
      throw error
    }

    // Handle empty responses (like logout)
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return {} as T
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.')
      } else if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to server. Please check your connection and ensure the backend is running.')
      }
    }
    throw error
  }
}

// =============================================================================
// API ENDPOINT HELPERS
// =============================================================================

export function buildApiUrl(endpoint: string): string {
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, '') // Remove trailing slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}` // Ensure leading slash
  return `${baseUrl}${cleanEndpoint}`
}

// =============================================================================
// RESPONSE UTILITIES
// =============================================================================

export function createSuccessResponse<T>(data: T, message?: string, status: number = 200): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message
  } as ApiResponse<T>, { status })
}

export function createErrorResponse(error: string, status: number = 400): NextResponse {
  return NextResponse.json({
    success: false,
    error
  } as ApiResponse, { status })
}

export function createValidationErrorResponse(errors: Record<string, string>): NextResponse {
  return NextResponse.json({
    success: false,
    error: 'Validation failed',
    errors
  }, { status: 400 })
}

// =============================================================================
// AVATAR GENERATION
// =============================================================================

export function generateAvatar(email: string): string {
  const avatarOptions = [
    `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${email}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=${email}`,
    `https://api.dicebear.com/9.x/personas/svg?seed=${email}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=${email}`,
  ]
  
  const randomIndex = Math.floor(Math.random() * avatarOptions.length)
  return avatarOptions[randomIndex] as string
}

// =============================================================================
// ERROR HANDLING
// =============================================================================

export function handleApiError(error: unknown, context: string = 'API'): NextResponse {
  console.error(`${context} error:`, error)
  
  if (error instanceof Error) {
    return createErrorResponse(error.message, 500)
  }
  
  return createErrorResponse('Internal server error', 500)
}

// =============================================================================
// REQUEST PARSING
// =============================================================================

export async function parseRequestBody(request: Request): Promise<Record<string, unknown>> {
  try {
    return await request.json()
  } catch {
    throw new Error('Invalid JSON in request body')
  }
}

// =============================================================================
// USER STATS API FUNCTIONS
// =============================================================================

export interface UserStats {
  diaryHighestStreak: number
  mysteryClicks: number
  totalNotes: number
  focusSessionsTotal: number
  averageFocusTime: number
}

export async function fetchUserStats(): Promise<UserStats> {
  try {
    const response = await fetch('/api/stats', {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      let errorMessage = 'Failed to fetch user stats'
      
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
        
        // Add more specific error details if available
        if (errorData.details) {
          errorMessage += `: ${errorData.details}`
        }
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError)
      }
      
      if (response.status === 401) {
        // Check if this is a client-side call (window is available)
        if (typeof window !== 'undefined') {
          // User is not authenticated - could redirect automatically
          // For now, just throw the error to let the component handle it
        }
        throw new Error('Authentication required. Please log in to view your statistics.')
      }
      if (response.status === 403) {
        throw new Error('Access denied. Please check your authentication.')
      }
      if (response.status >= 500) {
        throw new Error(`Server error: ${errorMessage}. Please try again later or contact support.`)
      }
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching user stats:', error)
    
    if (error instanceof Error) {
      throw error // Re-throw with the specific error message
    }
    
    // Return default stats if API fails for unknown reasons
    return {
      diaryHighestStreak: 0,
      mysteryClicks: 0,
      totalNotes: 0,
      focusSessionsTotal: 0,
      averageFocusTime: 0
    }
  }
}

// =============================================================================
// CORS HEADERS
// =============================================================================

export function addCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

// =============================================================================
// RATE LIMITING (Basic Implementation)
// =============================================================================

const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

export function checkRateLimit(identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)
  
  if (!record || now - record.timestamp > windowMs) {
    rateLimitMap.set(identifier, { count: 1, timestamp: now })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}
