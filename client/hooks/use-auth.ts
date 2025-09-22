import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import authService, { AuthState, LoginCredentials } from '@/lib/auth-service'
import { User } from '@/types'
import { toast, toastMessages } from '@/lib/toast'

interface UseAuthReturn extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<{ email: string; requiresVerification: boolean } | undefined>
  updateProfile: (data: Partial<User>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  clearError: () => void
  refreshAuth: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitializing: true,
    error: null,
    lastAuthCheck: 0,
  })

  const initializationRef = useRef(false)
  const authCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Update auth state safely
   */
  const updateAuthState = useCallback((updates: Partial<AuthState>) => {
    setAuthState(prev => ({ ...prev, ...updates }))
  }, [])

  /**
   * Initialize authentication state
   */
  const initializeAuth = useCallback(async () => {
    if (initializationRef.current) return
    initializationRef.current = true

    console.log('[useAuth] Initializing authentication...')
    updateAuthState({ isInitializing: true, error: null })

    try {
      const { user, isAuthenticated } = await authService.checkAuthentication()
      
      updateAuthState({
        user,
        isAuthenticated,
        isInitializing: false,
        lastAuthCheck: Date.now(),
      })

      if (isAuthenticated) {
        authService.startAuthMonitoring()
        console.log('[useAuth] Authentication initialized successfully')
      } else {
        console.log('[useAuth] No valid authentication found')
      }

    } catch (error) {
      console.error('[useAuth] Auth initialization failed:', error)
      updateAuthState({
        user: null,
        isAuthenticated: false,
        isInitializing: false,
        error: error instanceof Error ? error.message : 'Auth initialization failed',
      })
    }
  }, [updateAuthState])

  /**
   * Reliable redirect to home with fallbacks
   */
  const redirectToHome = useCallback(async (): Promise<void> => {
    console.log('[useAuth] Redirecting to home...')
    
    // Clear any existing timeout
    if (authCheckTimeoutRef.current) {
      clearTimeout(authCheckTimeoutRef.current)
    }

    // Multiple redirect strategies for maximum reliability
    try {
      // Strategy 1: Next.js router (preferred)
      router.push('/home')
      console.log('[useAuth] Router redirect initiated')
      
      // Strategy 2: Fallback with window.location after delay
      authCheckTimeoutRef.current = setTimeout(() => {
        console.log('[useAuth] Fallback redirect via window.location')
        window.location.href = '/home'
      }, 2000)

      // Strategy 3: Force redirect if still on login page after 4 seconds
      setTimeout(() => {
        if (window.location.pathname === '/login') {
          console.log('[useAuth] Force redirect - still on login page')
          window.location.replace('/home')
        }
      }, 4000)

    } catch (error) {
      console.error('[useAuth] Redirect failed, using window.location:', error)
      window.location.href = '/home'
    }
  }, [router])

  /**
   * Enhanced login with proper redirect handling
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    console.log('[useAuth] Starting login for:', credentials.email)
    updateAuthState({ isLoading: true, error: null })

    try {
      const result = await authService.login(credentials)

      if (result.success && result.data) {
        // Update state immediately
        updateAuthState({
          user: result.data.user,
          isAuthenticated: true,
          isLoading: false,
          lastAuthCheck: Date.now(),
        })

        // Start monitoring
        authService.startAuthMonitoring()

        // Show success message
        toast.success(
          toastMessages.auth.loginSuccess, 
          `Welcome back, ${result.data.user.name}!`
        )

        console.log('[useAuth] Login successful, preparing redirect...')

        // Use a more reliable redirect mechanism
        await redirectToHome()
        
        return true

      } else {
        const errorMessage = result.error || 'Login failed'
        updateAuthState({
          isLoading: false,
          error: errorMessage,
        })

        // Show appropriate error message
        if (errorMessage.toLowerCase().includes('invalid') || 
            errorMessage.toLowerCase().includes('incorrect') ||
            errorMessage.toLowerCase().includes('password') ||
            errorMessage.toLowerCase().includes('email')) {
          toast.error(toastMessages.auth.invalidCredentials)
        } else if (errorMessage.toLowerCase().includes('verify')) {
          toast.error('Email Verification Required', errorMessage)
        } else {
          toast.error(toastMessages.auth.loginError, errorMessage)
        }

        return false
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      console.error('[useAuth] Login error:', errorMessage)
      
      updateAuthState({
        isLoading: false,
        error: errorMessage,
      })

      toast.error(toastMessages.auth.loginError, errorMessage)
      return false
    }
  }, [updateAuthState, redirectToHome])

  /**
   * Enhanced logout
   */
  const logout = useCallback(async (): Promise<void> => {
    console.log('[useAuth] Starting logout...')
    
    try {
      authService.stopAuthMonitoring()
      await authService.logout()
      
      updateAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })

      toast.success(toastMessages.auth.logoutSuccess)
      router.push('/login')

    } catch (error) {
      console.error('[useAuth] Logout error:', error)
      
      // Force logout locally even if server fails
      updateAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })

      toast.error(toastMessages.auth.logoutError)
      router.push('/login')
    }
  }, [updateAuthState, router])

  /**
   * Register function
   */
  const register = useCallback(async (name: string, email: string, password: string) => {
    updateAuthState({ isLoading: true, error: null })

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1'
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        const errorMessage = data.error || 'Registration failed'
        updateAuthState({ isLoading: false, error: errorMessage })
        
        if (errorMessage.toLowerCase().includes('already exists')) {
          toast.error(toastMessages.auth.emailAlreadyExists)
        } else if (errorMessage.toLowerCase().includes('password')) {
          toast.error(toastMessages.auth.weakPassword)
        } else {
          toast.error(toastMessages.auth.registerError, errorMessage)
        }
        
        throw new Error(errorMessage)
      }
      
      updateAuthState({ isLoading: false })
      toast.success(toastMessages.auth.registerSuccess, data.message || 'Registration successful!')
      
      return { email, requiresVerification: true }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed"
      updateAuthState({ isLoading: false, error: errorMessage })
      throw error
    }
  }, [updateAuthState])

  /**
   * Refresh authentication state
   */
  const refreshAuth = useCallback(async (): Promise<void> => {
    console.log('[useAuth] Refreshing authentication state...')
    
    try {
      const { user, isAuthenticated } = await authService.checkAuthentication()
      updateAuthState({
        user,
        isAuthenticated,
        lastAuthCheck: Date.now(),
      })
    } catch (error) {
      console.error('[useAuth] Auth refresh failed:', error)
      updateAuthState({
        error: error instanceof Error ? error.message : 'Auth refresh failed'
      })
    }
  }, [updateAuthState])

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    updateAuthState({ error: null })
  }, [updateAuthState])

  // Placeholder functions for missing methods
  const updateProfile = useCallback(async (_data: Partial<User>): Promise<void> => {
    throw new Error('Not implemented')
  }, [])

  const changePassword = useCallback(async (_currentPassword: string, _newPassword: string): Promise<void> => {
    throw new Error('Not implemented')
  }, [])

  const forgotPassword = useCallback(async (_email: string): Promise<void> => {
    throw new Error('Not implemented')
  }, [])

  /**
   * Initialize auth on mount
   */
  useEffect(() => {
    initializeAuth()
    
    // Cleanup on unmount
    return () => {
      authService.stopAuthMonitoring()
      if (authCheckTimeoutRef.current) {
        clearTimeout(authCheckTimeoutRef.current)
      }
    }
  }, [initializeAuth])

  return {
    ...authState,
    login,
    logout,
    register,
    updateProfile,
    changePassword,
    forgotPassword,
    clearError,
    refreshAuth,
  }
}

export default useAuth