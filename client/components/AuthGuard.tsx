"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./AuthProvider"
import LoadingScreen from "./ui/loading-screen"
import type { AuthGuardProps } from "@/types"

export default function AuthGuard({ 
  children, 
  fallback,
  redirectTo = "/login" 
}: AuthGuardProps) {
  const { isAuthenticated, isInitializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're done initializing and not authenticated
    if (!isInitializing && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isInitializing, router, redirectTo])

  // Show loading state while initializing
  if (isInitializing) {
    return fallback || <LoadingScreen message="Initializing..." />
  }

  // If not authenticated after initialization, don't render children (redirect will happen)
  if (!isAuthenticated) {
    return null
  }

  // If authenticated, render children
  return <>{children}</>
}

// Component for protecting routes that should only be accessible when NOT authenticated
export function GuestGuard({ 
  children, 
  fallback,
  redirectTo = "/" 
}: AuthGuardProps) {
  const { isAuthenticated, isInitializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isInitializing, router, redirectTo])

  // Show loading while initializing auth state
  if (isInitializing) {
    return fallback || <LoadingScreen message="Checking authentication..." />
  }

  // If authenticated, don't render children (redirect will happen)
  if (isAuthenticated) {
    return null
  }

  // If not authenticated, render children
  return <>{children}</>
}
