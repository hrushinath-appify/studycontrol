"use client"

import React, { Suspense, lazy } from 'react'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { ErrorBoundary } from '@/components/ErrorBoundary'

// Lazy loaded components for better performance
export const LazyMainSidebar = lazy(() => 
  import('@/components/custom/MainSidebar')
)

// Reusable lazy loading wrapper with error boundary and suspense
interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  errorFallback?: React.ReactNode
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback = <LoadingSpinner />,
  errorFallback 
}) => (
  <ErrorBoundary fallback={errorFallback}>
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  </ErrorBoundary>
)

// Pre-defined lazy components with optimized loading states
export const LazyComponents = {
  MainSidebar: () => (
    <LazyWrapper 
      fallback={
        <div className="w-64 h-screen bg-background/80 animate-pulse" />
      }
    >
      <LazyMainSidebar />
    </LazyWrapper>
  )
}

// Dynamic import utility for route-level lazy loading
export const createLazyRoute = (
  importFn: () => Promise<{ default: React.ComponentType }>,
  fallback?: React.ReactNode
) => {
  const LazyRoute = lazy(importFn)
  
  const LazyRouteComponent = () => (
    <ErrorBoundary>
      <Suspense 
        fallback={
          fallback || (
            <div className="min-h-screen flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )
        }
      >
        <LazyRoute />
      </Suspense>
    </ErrorBoundary>
  )
  
  LazyRouteComponent.displayName = 'LazyRouteComponent'
  return LazyRouteComponent
}