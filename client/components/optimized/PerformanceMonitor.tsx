"use client"

import { useEffect } from 'react'

// Performance monitoring component for development
export const PerformanceMonitor = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    // Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            console.log('🎨 LCP:', entry.startTime)
            break
          case 'first-input':
            const fidEntry = entry as PerformanceEntry & {
              processingStart?: number
              startTime: number
            }
            if (fidEntry.processingStart) {
              console.log('⚡ FID:', fidEntry.processingStart - fidEntry.startTime)
            }
            break
          case 'layout-shift':
            const clsEntry = entry as PerformanceEntry & {
              value?: number
              hadRecentInput?: boolean
            }
            if (!clsEntry.hadRecentInput && clsEntry.value) {
              console.log('📐 CLS:', clsEntry.value)
            }
            break
        }
      })
    })

    try {
      observer.observe({ type: 'largest-contentful-paint', buffered: true })
      observer.observe({ type: 'first-input', buffered: true })
      observer.observe({ type: 'layout-shift', buffered: true })
    } catch (error) {
      // Browser doesn't support some metrics
      console.warn('Performance Observer not fully supported:', error)
    }

    // Memory usage monitoring
    const logMemoryUsage = () => {
      const perfWithMemory = performance as Performance & {
        memory?: {
          usedJSHeapSize: number
          totalJSHeapSize: number
          jsHeapSizeLimit: number
        }
      }
      
      if (perfWithMemory.memory) {
        console.log('🧠 Memory Usage:', {
          used: `${(perfWithMemory.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
          total: `${(perfWithMemory.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        })
      }
    }

    const memoryInterval = setInterval(logMemoryUsage, 30000) // Every 30 seconds

    return () => {
      observer.disconnect()
      clearInterval(memoryInterval)
    }
  }, [])

  return null
}

// Hook for measuring component render time
export const useRenderTime = (componentName: string) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      console.log(`🔄 ${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`)
    }
  })
}

// Component wrapper for performance profiling
export const withPerformanceProfile = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) => {
  const ProfiledComponent = (props: P) => {
    useRenderTime(componentName)
    return <WrappedComponent {...props} />
  }
  
  ProfiledComponent.displayName = `withPerformanceProfile(${componentName})`
  return ProfiledComponent
}