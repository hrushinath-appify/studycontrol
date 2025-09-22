"use client"

import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from "react"
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

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if we have a token in localStorage for API calls
        const token = localStorage.getItem('auth-token');
        
        // Use the correct API URL from environment variables
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1'
        
        // Try to get user data from the server (this will work with session cookies)
        const response = await fetch(`${apiUrl}/auth/me`, {
          method: 'GET',
          headers: token ? {
            'Authorization': `Bearer ${token}`,
          } : {},
          credentials: 'include', // This ensures session cookies are sent
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.data)
          
          // If we don't have a token but the session works, store a placeholder
          if (!token && data.data) {
            console.log('Session-based auth working, but no token in localStorage')
          }
        } else {
          // If the auth check fails, clear everything
          setUser(null)
          localStorage.removeItem('auth-token');
        }
      } catch (error) {
        console.warn("Auth check failed:", error)
        setUser(null)
        localStorage.removeItem('auth-token');
      } finally {
        setIsInitializing(false)
      }
    }

    checkAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1'
      
      const response = await fetch(`${apiUrl}/auth/login`, {
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
        
        throw new Error(errorMessage)
      }
      
      // Store the auth token for API calls
      if (data.data.accessToken) {
        localStorage.setItem('auth-token', data.data.accessToken)
      }
      
      // Create server-side session cookie by calling a session endpoint
      try {
        console.log('Creating session for user:', data.data.user.email)
        const sessionResponse = await fetch('/api/auth/create-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ user: data.data.user }),
        });
        
        const sessionResult = await sessionResponse.json()
        console.log('Session creation result:', sessionResult)
        
        if (!sessionResponse.ok) {
          console.error('Session creation failed:', sessionResult)
          throw new Error('Failed to create session')
        }
      } catch (error) {
        console.error('Failed to create session cookie:', error);
        // Don't fail the login, but warn the user
        toast.error('Session Error', 'Login successful but session creation failed. Please refresh the page.');
        return
      }
      
      setUser(data.data.user)
      
      toast.success(toastMessages.auth.loginSuccess, `Welcome back, ${data.data.user.name}!`)
      
      // Small delay to ensure session cookie is properly set before redirect
      setTimeout(() => {
        router.push('/home')
      }, 100)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true)
    setError(null)

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
        setError(errorMessage)
        
        if (errorMessage.toLowerCase().includes('already exists') || 
            errorMessage.toLowerCase().includes('email') ||
            errorMessage.toLowerCase().includes('user already exists')) {
          toast.error(toastMessages.auth.emailAlreadyExists)
        } else if (errorMessage.toLowerCase().includes('password')) {
          toast.error(toastMessages.auth.weakPassword)
        } else {
          toast.error(toastMessages.auth.registerError, errorMessage)
        }
        
        throw new Error(errorMessage)
      }
      
      // Don't auto-login for unverified users
      // The server now returns a message about email verification
      toast.success(toastMessages.auth.registerSuccess, data.message || 'Registration successful! Please check your email to verify your account.')
      
      // Return the email for the verification page
      return { email, requiresVerification: true }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateProfile = useCallback(async (data: Partial<User>) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        const errorMessage = result.error || 'Failed to update profile'
        setError(errorMessage)
        toast.error(toastMessages.auth.profileUpdateError, errorMessage)
        throw new Error(errorMessage)
      }
      
      setUser(result.data)
      toast.success(toastMessages.auth.profileUpdateSuccess)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Profile update failed"
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        const errorMessage = result.error || 'Failed to change password'
        setError(errorMessage)
        toast.error('Password Change Failed', errorMessage)
        throw new Error(errorMessage)
      }
      
      toast.success('Password Changed', 'Your password has been updated successfully')
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Password change failed"
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1'
      
      await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      
      // Clear auth token from localStorage
      localStorage.removeItem('auth-token')
      
      setUser(null)
      toast.success(toastMessages.auth.logoutSuccess)
      router.push('/login')
      
    } catch (error) {
      console.error('Logout error:', error)
      // Still log out the user locally even if the server request fails
      localStorage.removeItem('auth-token')
      
      setUser(null)
      toast.error(toastMessages.auth.logoutError)
      router.push('/login')
    }
  }, [router])

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        const errorMessage = data.error || 'Password reset failed'
        setError(errorMessage)
        throw new Error(errorMessage)
      }
      
      toast.success(toastMessages.auth.passwordResetSent, `Reset link sent to ${email}`)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Password reset failed"
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const isAuthenticated = useMemo(() => !!user, [user])

  const value: AuthContextType = useMemo(() => ({
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
  }), [
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
  ])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}