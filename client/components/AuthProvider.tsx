"use client"

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react"
import { useRouter } from "next/navigation"
import { User, AuthContextType } from "@/types"
import { toast, toastMessages } from "@/lib/toast"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  // Prevent infinite loops
  const initRef = useRef(false)
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Simple, reliable auth check with better timing
  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    const checkAuth = async () => {
      console.log('[AuthProvider] Starting auth check...')
      
      try {
        // Check for token in localStorage first
        const token = localStorage.getItem('auth-token')
        console.log('[AuthProvider] Token exists:', !!token)
        
        if (!token) {
          console.log('[AuthProvider] No token found')
          setUser(null)
          setIsInitializing(false)
          return
        }

        console.log('[AuthProvider] Token found, fetching user data...')

        // Verify token with the new API structure
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        })

        console.log('[AuthProvider] Auth check response status:', response.status)

        if (response.ok) {
          const data = await response.json()
          console.log('[AuthProvider] Auth check successful:', data.data?.email)
          setUser(data.data)
        } else {
          console.log('[AuthProvider] Auth check failed, clearing token')
          setUser(null)
          localStorage.removeItem('auth-token')
        }
      } catch (error) {
        console.error('[AuthProvider] Auth check error:', error)
        setUser(null)
        localStorage.removeItem('auth-token')
      } finally {
        // Only set initializing to false after we've set the user state
        console.log('[AuthProvider] Auth check completed, setting isInitializing to false')
        setIsInitializing(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        const errorMessage = data.error || 'Login failed'
        setError(errorMessage)
        toast.error(toastMessages.auth.invalidCredentials)
        throw new Error(errorMessage)
      }
      
      // Store token in localStorage (the cookie is set by the API)
      if (data.data.accessToken) {
        localStorage.setItem('auth-token', data.data.accessToken)
      }
      
      // Set user immediately
      setUser(data.data.user)
      
      toast.success(toastMessages.auth.loginSuccess, `Welcome back, ${data.data.user.name}!`)
      
      // Clear any existing redirect timeout
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current)
      }

      // Immediate redirect attempt
      router.push('/home')
      
      // Fallback redirect after 1 second
      redirectTimeoutRef.current = setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/home'
        }
      }, 1000)
      
      // Force redirect after 3 seconds if still on login
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname === '/login') {
          window.location.replace('/home')
        }
      }, 3000)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      console.error('[AuthProvider] Login error:', errorMessage)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/register', {
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
        setError(errorMessage)
        toast.error(toastMessages.auth.registerError, errorMessage)
        throw new Error(errorMessage)
      }
      
      toast.success(toastMessages.auth.registerSuccess, data.message || 'Registration successful!')
      return { email, requiresVerification: true }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed"
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1'
      
      await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      
      localStorage.removeItem('auth-token')
      setUser(null)
      toast.success(toastMessages.auth.logoutSuccess)
      router.push('/login')
      
    } catch {
      localStorage.removeItem('auth-token')
      setUser(null)
      router.push('/login')
    }
  }

  const updateProfile = async (_data: Partial<User>) => {
    throw new Error('Not implemented')
  }

  const changePassword = async (_currentPassword: string, _newPassword: string) => {
    throw new Error('Not implemented')
  }

  const forgotPassword = async (_email: string) => {
    throw new Error('Not implemented')
  }

  const clearError = () => {
    setError(null)
  }

  const isAuthenticated = !!user

  const value: AuthContextType = {
    user,
    isLoading,
    isInitializing,
    login,
    logout,
    register,
    updateProfile,
    changePassword,
    forgotPassword,
    isAuthenticated,
    error,
    clearError,
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}