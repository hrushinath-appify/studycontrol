// API service layer - Main entry point
// This module provides a unified interface for all API calls

export * from './auth'

// Diary API
export { DiaryApi } from './diary'
export { getStats as getDiaryStats } from './diary'

// Tasks API  
export { TasksApi } from './tasks'
export { getStats as getTaskStats } from './tasks'

// Notes API
export { NotesApi } from './notes'
export { getStats as getNotesStats } from './notes'

// Focus API
export { FocusApi } from './focus'
export { getStats as getFocusStats } from './focus'

// User API - avoiding updateProfile conflict
export { UserApi } from './user'
export { getStats as getUserStats } from './user'

export * from './news'
export * from './quotes'
export * from './mystery'

// Re-export common types from API modules
export type { Quote } from './quotes'
export type { MysteryTopic } from '../mock-data/mystery-topics'
export type { MockNewsArticle, MockResearchPaper } from '../mock-data/news-articles'

// Base API configuration
export const API_CONFIG = {
  BASE_URL: '/api/', // Use Next.js API routes instead of direct backend calls
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
}


// Common API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiErrorResponse {
  message: string
  status: number
  code?: string
}

// Base API client class
export class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor(baseUrl: string = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      credentials: 'include', // Include cookies for authentication
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`
        let errorCode: string | undefined
        
        // Try to parse as JSON for error details
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
          errorCode = errorData.code
        } catch (parseError) {
          // If JSON parsing fails, it might be an HTML error page
          console.warn('Failed to parse error response as JSON:', parseError)
          try {
            const textContent = await response.text()
            if (textContent.includes('<!DOCTYPE') || textContent.includes('<html')) {
              errorMessage = `Server returned HTML error page (${response.status})`
            } else {
              errorMessage = textContent || errorMessage
            }
          } catch {
            // If we can't even read as text, use status text
            errorMessage = response.statusText || errorMessage
          }
        }
        
        throw new ApiError({
          message: errorMessage,
          status: response.status,
          ...(errorCode && { code: errorCode }),
        })
      }

      // Try to parse successful response as JSON
      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error('Failed to parse successful response as JSON:', parseError)
        throw new ApiError({
          message: 'Server returned invalid JSON response',
          status: response.status,
        })
      }

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      
      // Check if it's a network error or timeout
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('❌ Network error:', error.message)
        throw new ApiError({
          message: `Network connection failed`,
          status: 0,
        })
      }
      
      console.error('❌ API Error:', error)
      throw new ApiError({
        message: 'An unexpected error occurred',
        status: 0,
      })
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    // Ensure endpoint doesn't start with / to make it relative to baseUrl
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    
    // Build query string if params exist
    let queryString = ''
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      queryString = searchParams.toString()
      if (queryString) {
        queryString = '?' + queryString
      }
    }
    
    // Pass the endpoint with query string to request method
    return this.request<T>(cleanEndpoint + queryString)
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }
}

// Create a default API client instance
export const apiClient = new ApiClient()

// Custom error class for API errors
export class ApiError extends Error {
  public status: number
  public code?: string

  constructor({ message, status, code }: { message: string; status: number; code?: string }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    if (code) {
      this.code = code
    }
  }
}

// Utility functions for API calls
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError
}
