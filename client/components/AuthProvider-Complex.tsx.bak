"use client"

import { createContext, useContext, ReactNode } from "react"
import { AuthContextType } from "@/types"
import useAuth from "@/hooks/use-auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth()

  // Create adapter to match the expected AuthContextType interface
  const adaptedAuth: AuthContextType = {
    user: auth.user,
    isLoading: auth.isLoading,
    isInitializing: auth.isInitializing,
    isAuthenticated: auth.isAuthenticated,
    error: auth.error,
    login: async (email: string, password: string) => {
      const success = await auth.login({ email, password })
      if (!success) {
        throw new Error(auth.error || 'Login failed')
      }
    },
    logout: auth.logout,
    register: async (name: string, email: string, password: string) => {
      const result = await auth.register(name, email, password)
      return result || { email, requiresVerification: true }
    },
    updateProfile: auth.updateProfile,
    changePassword: auth.changePassword,
    forgotPassword: auth.forgotPassword,
    clearError: auth.clearError,
  }

  return (
    <AuthContext.Provider value={adaptedAuth}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the hook for backward compatibility
export { useAuth }