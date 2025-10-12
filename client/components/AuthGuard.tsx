"use client"

import { useEffect, useState } from "react"
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
  const [shouldShowLoading, setShouldShowLoading] = useState(true)

  // Timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInitializing) {
        console.log('[AuthGuard] Timeout reached, stopping loading screen')
        setShouldShowLoading(false)
      }
    }, 5000) // 5 second maximum loading time

    return () => clearTimeout(timer)
  }, [isInitializing])

  useEffect(() => {
    if (!isInitializing) {
      setShouldShowLoading(false)
    }
  }, [isInitializing])

  useEffect(() => {
    // Only redirect if we're done initializing and not authenticated
    if (!isInitializing && !isAuthenticated) {
      console.log('[AuthGuard] Redirecting to login - not authenticated')
      router.push(redirectTo)
    }
  }, [isAuthenticated, isInitializing, router, redirectTo])

  // Show loading state while initializing (with timeout protection)
  if (isInitializing && shouldShowLoading) {
    return fallback || <LoadingScreen message="Loading..." />
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
  redirectTo = "/home" 
}: AuthGuardProps) {
  const { isAuthenticated, isInitializing } = useAuth()
  const router = useRouter()
  const [shouldShowLoading, setShouldShowLoading] = useState(true)

  // Timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInitializing) {
        console.log('[GuestGuard] Timeout reached, stopping loading screen')
        setShouldShowLoading(false)
      }
    }, 1500) // Reduced to 1.5 seconds

    return () => clearTimeout(timer)
  }, [isInitializing])

  useEffect(() => {
    if (!isInitializing) {
      setShouldShowLoading(false)
    }
  }, [isInitializing])

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      console.log('[GuestGuard] Redirecting authenticated user to home')
      router.push(redirectTo)
    }
  }, [isAuthenticated, isInitializing, router, redirectTo])

  // Show loading while initializing auth state (with timeout protection)
  if (isInitializing && shouldShowLoading) {
    return fallback || <LoadingScreen message="Checking authentication..." />
  }

  // If authenticated, don't render children (redirect will happen)
  if (isAuthenticated) {
    return null
  }

  // If not authenticated, render children
  return <>{children}</>
}