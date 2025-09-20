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

// Re-export common types from mock data
export type { Quote } from '../mock-data/quotes'
export type { MysteryTopic } from '../mock-data/mystery-topics'
export type { MockNewsArticle, MockResearchPaper } from '../mock-data/news-articles'

// Base API configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
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
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    }

    // Add auth token if available
    const token = this.getAuthToken()
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new ApiError({
          message: data.error || 'An error occurred',
          status: response.status,
          code: data.code,
        })
      }

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      
      throw new ApiError({
        message: 'Network error occurred',
        status: 0,
      })
    }
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth-token')
    }
    return null
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseUrl)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }
    
    return this.request<T>(url.pathname + url.search)
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
