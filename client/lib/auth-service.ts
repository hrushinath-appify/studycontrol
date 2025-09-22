import { User } from '@/types'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitializing: boolean
  error: string | null
  lastAuthCheck: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  data?: {
    user: User
    accessToken: string
    refreshToken: string
  }
  error?: string
  message?: string
}

class AuthService {
  private readonly API_BASE_URL: string
  private readonly MAX_RETRIES = 3
  private readonly RETRY_DELAY = 1000
  private readonly AUTH_CHECK_INTERVAL = 5 * 60 * 1000 // 5 minutes
  private authCheckTimer: NodeJS.Timeout | null = null
  private isCheckingAuth = false

  constructor() {
    this.API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1'
  }

  /**
   * Enhanced login with enterprise-grade error handling and retry logic
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, password } = credentials
    
    console.log('[AuthService] Starting login process for:', email)
    
    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        console.log(`[AuthService] Login attempt ${attempt}/${this.MAX_RETRIES}`)
        
        const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()
        console.log('[AuthService] Login API response:', { status: response.status, success: data.success })

        if (!response.ok) {
          const errorMessage = data.error || 'Login failed'
          console.error('[AuthService] Login failed:', errorMessage)
          return { success: false, error: errorMessage }
        }

        // Store token securely
        if (data.data?.accessToken) {
          localStorage.setItem('auth-token', data.data.accessToken)
          localStorage.setItem('auth-user', JSON.stringify(data.data.user))
          localStorage.setItem('auth-timestamp', Date.now().toString())
          console.log('[AuthService] Token stored successfully')
        }

        // Create server-side session with retry logic
        const sessionCreated = await this.createSessionWithRetry(data.data.user)
        if (!sessionCreated) {
          console.error('[AuthService] Session creation failed after retries')
          return { success: false, error: 'Failed to create session' }
        }

        console.log('[AuthService] Login completed successfully')
        return { success: true, data: data.data, message: data.message }

      } catch (error) {
        console.error(`[AuthService] Login attempt ${attempt} failed:`, error)
        
        if (attempt === this.MAX_RETRIES) {
          return { 
            success: false, 
            error: `Login failed after ${this.MAX_RETRIES} attempts: ${error instanceof Error ? error.message : 'Unknown error'}` 
          }
        }
        
        // Wait before retrying
        await this.delay(this.RETRY_DELAY * attempt)
      }
    }

    return { success: false, error: 'Login failed after maximum retries' }
  }

  /**
   * Create session with retry logic and proper error handling
   */
  private async createSessionWithRetry(user: User, maxRetries = 3): Promise<boolean> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[AuthService] Creating session attempt ${attempt}/${maxRetries}`)
        
        const response = await fetch('/api/auth/create-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ user }),
        })

        const result = await response.json()
        console.log('[AuthService] Session creation response:', { status: response.status, success: result.success })

        if (response.ok && result.success) {
          console.log('[AuthService] Session created successfully')
          return true
        }

        console.error('[AuthService] Session creation failed:', result.error)
        
      } catch (error) {
        console.error(`[AuthService] Session creation attempt ${attempt} failed:`, error)
      }

      if (attempt < maxRetries) {
        await this.delay(500 * attempt)
      }
    }

    return false
  }

  /**
   * Comprehensive authentication check with fallbacks
   */
  async checkAuthentication(): Promise<{ user: User | null; isAuthenticated: boolean }> {
    if (this.isCheckingAuth) {
      console.log('[AuthService] Auth check already in progress, waiting...')
      await this.delay(100)
      return this.checkAuthentication()
    }

    this.isCheckingAuth = true
    console.log('[AuthService] Starting authentication check')

    try {
      // First, try to get user from localStorage (faster)
      const cachedUser = this.getCachedUser()
      if (cachedUser) {
        console.log('[AuthService] Found cached user, verifying with server...')
      }

      // Verify with server
      const token = localStorage.getItem('auth-token')
      const response = await fetch(`${this.API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: token ? {
          'Authorization': `Bearer ${token}`,
        } : {},
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          console.log('[AuthService] Server auth verification successful')
          
          // Update cached user data
          localStorage.setItem('auth-user', JSON.stringify(data.data))
          localStorage.setItem('auth-timestamp', Date.now().toString())
          
          return { user: data.data, isAuthenticated: true }
        }
      }

      console.log('[AuthService] Server auth verification failed, clearing cache')
      this.clearAuthData()
      return { user: null, isAuthenticated: false }

    } catch (error) {
      console.error('[AuthService] Auth check failed:', error)
      
      // If server is unreachable, use cached data temporarily
      const cachedUser = this.getCachedUser()
      if (cachedUser && this.isCacheValid()) {
        console.log('[AuthService] Using cached auth data due to server error')
        return { user: cachedUser, isAuthenticated: true }
      }

      this.clearAuthData()
      return { user: null, isAuthenticated: false }
    } finally {
      this.isCheckingAuth = false
    }
  }

  /**
   * Get cached user with validation
   */
  private getCachedUser(): User | null {
    try {
      const userStr = localStorage.getItem('auth-user')
      const timestamp = localStorage.getItem('auth-timestamp')
      
      if (!userStr || !timestamp) return null
      
      const user = JSON.parse(userStr)
      const age = Date.now() - parseInt(timestamp)
      
      // Cache valid for 10 minutes
      if (age > 10 * 60 * 1000) {
        console.log('[AuthService] Cached user data expired')
        return null
      }
      
      return user
    } catch {
      return null
    }
  }

  /**
   * Check if cache is still valid
   */
  private isCacheValid(): boolean {
    const timestamp = localStorage.getItem('auth-timestamp')
    if (!timestamp) return false
    
    const age = Date.now() - parseInt(timestamp)
    return age < 10 * 60 * 1000 // 10 minutes
  }

  /**
   * Clear all authentication data
   */
  private clearAuthData(): void {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')
    localStorage.removeItem('auth-timestamp')
    console.log('[AuthService] Auth data cleared')
  }

  /**
   * Enhanced logout with cleanup
   */
  async logout(): Promise<void> {
    console.log('[AuthService] Starting logout process')
    
    try {
      // Clear auth check timer
      if (this.authCheckTimer) {
        clearInterval(this.authCheckTimer)
        this.authCheckTimer = null
      }

      // Call server logout
      await fetch(`${this.API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })

      console.log('[AuthService] Server logout completed')
    } catch (error) {
      console.error('[AuthService] Server logout failed:', error)
    } finally {
      // Always clear local data
      this.clearAuthData()
      console.log('[AuthService] Logout completed')
    }
  }

  /**
   * Start periodic auth checks
   */
  startAuthMonitoring(): void {
    if (this.authCheckTimer) return
    
    this.authCheckTimer = setInterval(async () => {
      const { isAuthenticated } = await this.checkAuthentication()
      if (!isAuthenticated) {
        console.log('[AuthService] Periodic auth check failed, user logged out')
        this.clearAuthData()
        window.location.href = '/login'
      }
    }, this.AUTH_CHECK_INTERVAL)
    
    console.log('[AuthService] Auth monitoring started')
  }

  /**
   * Stop auth monitoring
   */
  stopAuthMonitoring(): void {
    if (this.authCheckTimer) {
      clearInterval(this.authCheckTimer)
      this.authCheckTimer = null
      console.log('[AuthService] Auth monitoring stopped')
    }
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Health check for authentication system
   */
  async healthCheck(): Promise<{ healthy: boolean; message: string }> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/health`, {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        return { healthy: true, message: 'Auth system healthy' }
      }

      return { healthy: false, message: `Auth server responded with ${response.status}` }
    } catch (error) {
      return { 
        healthy: false, 
        message: `Auth server unreachable: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }
    }
  }
}

// Export singleton instance
export const authService = new AuthService()
export default authService