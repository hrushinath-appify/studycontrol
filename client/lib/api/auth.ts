// API service for authentication
// Handles user authentication with the backend server

import { apiClient } from './index'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin'
  preferences: {
    theme: 'light' | 'dark' | 'system'
    studyReminders: boolean
    appUpdates: boolean
    emailNotifications: boolean
    soundEnabled: boolean
    language: string
  }
  profile: {
    bio?: string
    studyGoals?: string[]
    focusAreas?: string[]
    dailyStudyHours?: number
    timezone?: string
  }
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

export interface UpdateProfileData {
  name?: string
  email?: string
  avatar?: string
  preferences?: Partial<User['preferences']>
  profile?: Partial<User['profile']>
}

export class AuthApi {
  private static readonly ENDPOINT = '/auth'
  private static readonly TOKEN_STORAGE_KEY = 'auth-token'
  private static readonly USER_STORAGE_KEY = 'auth-user'

  // Login user
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(`${this.ENDPOINT}/login`, credentials)
    
    if (response.data) {
      this.setAuthData(response.data)
      return response.data
    }
    
    throw new Error('Invalid response from server')
  }

  // Register user
  static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(`${this.ENDPOINT}/register`, data)
    
    if (response.data) {
      this.setAuthData(response.data)
      return response.data
    }
    
    throw new Error('Invalid response from server')
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      await apiClient.post(`${this.ENDPOINT}/logout`)
    } finally {
      this.clearAuthData()
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<User>(`${this.ENDPOINT}/me`)
      return response.data || null
    } catch {
      // If API call fails, check localStorage for cached user
      return this.getLocalUser()
    }
  }

  // Update user profile
  static async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await apiClient.put<User>(`${this.ENDPOINT}/profile`, data)
    
    if (response.data) {
      this.setLocalUser(response.data)
      return response.data
    }
    
    throw new Error('Invalid response from server')
  }

  // Forgot password
  static async forgotPassword(email: string): Promise<void> {
    await apiClient.post(`${this.ENDPOINT}/forgot-password`, { email })
  }

  // Reset password
  static async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post(`${this.ENDPOINT}/reset-password`, { token, password })
  }

  // Refresh token
  static async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem('refresh-token')
      if (!refreshToken) return null

      const response = await apiClient.post<{ token: string }>(`${this.ENDPOINT}/refresh-token`, { 
        refreshToken 
      })
      
      if (response.data?.token) {
        localStorage.setItem(this.TOKEN_STORAGE_KEY, response.data.token)
        return response.data.token
      }
      
      return null
    } catch {
      // If refresh fails, clear auth data
      this.clearAuthData()
      return null
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_STORAGE_KEY)
    const user = this.getLocalUser()
    return !!(token && user)
  }

  // Get stored auth token
  static getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY)
  }

  // Private helper methods
  private static setAuthData(authData: AuthResponse): void {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, authData.token)
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(authData.user))
    
    if (authData.refreshToken) {
      localStorage.setItem('refresh-token', authData.refreshToken)
    }
  }

  private static clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY)
    localStorage.removeItem(this.USER_STORAGE_KEY)
    localStorage.removeItem('refresh-token')
  }

  private static getLocalUser(): User | null {
    try {
      const stored = localStorage.getItem(this.USER_STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Failed to get local user:', error)
      return null
    }
  }

  private static setLocalUser(user: User): void {
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user))
  }
}

// Export convenience functions
export const login = AuthApi.login
export const register = AuthApi.register
export const logout = AuthApi.logout
export const getCurrentUser = AuthApi.getCurrentUser
export const updateProfile = AuthApi.updateProfile
export const forgotPassword = AuthApi.forgotPassword
export const resetPassword = AuthApi.resetPassword
export const refreshToken = AuthApi.refreshToken
export const isAuthenticated = AuthApi.isAuthenticated
export const getAuthToken = AuthApi.getAuthToken
