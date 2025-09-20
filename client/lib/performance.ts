// Performance monitoring and optimization utilities

import React from 'react'

// =============================================================================
// PERFORMANCE MONITORING
// =============================================================================

export function measurePerformance<T>(
  name: string,
  fn: () => T
): T {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`)
  }
  
  return result
}

export async function measureAsyncPerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now()
  const result = await fn()
  const end = performance.now()
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`)
  }
  
  return result
}

// =============================================================================
// MEMORY MONITORING
// =============================================================================

export function logMemoryUsage(label: string): void {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memory = (performance as any).memory
    console.log(`🧠 ${label}:`, {
      usedJSHeapSize: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      totalJSHeapSize: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
    })
  }
}

// =============================================================================
// LAZY LOADING UTILITIES
// =============================================================================

export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
): React.LazyExoticComponent<T> {
  return React.lazy(async () => {
    try {
      return await measureAsyncPerformance(`Lazy load ${importFn.name}`, importFn)
    } catch (error) {
      console.error('Failed to load component:', error)
      if (fallback) {
        return { default: fallback as T }
      }
      throw error
    }
  })
}

// =============================================================================
// IMAGE OPTIMIZATION
// =============================================================================

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

export function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(preloadImage))
}

// =============================================================================
// BUNDLE SIZE OPTIMIZATION
// =============================================================================

export function dynamicImport<T>(
  importFn: () => Promise<T>
): Promise<T> {
  return measureAsyncPerformance('Dynamic import', importFn)
}

// =============================================================================
// WEB VITALS MONITORING
// =============================================================================

export function reportWebVitals(metric: any): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', metric)
  }
  
  // In production, you might want to send this to an analytics service
  // analytics.track('Web Vital', metric)
}

// =============================================================================
// CACHE UTILITIES
// =============================================================================

const cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

export function memoizeWithTTL<T extends (...args: any[]) => any>(
  fn: T,
  ttl: number = 5 * 60 * 1000 // 5 minutes default
): T {
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    const cached = cache.get(key)
    
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data
    }
    
    const result = fn(...args)
    cache.set(key, { data: result, timestamp: Date.now(), ttl })
    
    return result
  }) as T
}

export function clearCache(): void {
  cache.clear()
}

// =============================================================================
// INTERSECTION OBSERVER UTILITIES
// =============================================================================

export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  })
}

// =============================================================================
// VIRTUAL SCROLLING UTILITIES
// =============================================================================

export function calculateVisibleItems(
  scrollTop: number,
  itemHeight: number,
  containerHeight: number,
  totalItems: number,
  overscan: number = 5
): { startIndex: number; endIndex: number } {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const visibleItems = Math.ceil(containerHeight / itemHeight)
  const endIndex = Math.min(totalItems - 1, startIndex + visibleItems + overscan * 2)
  
  return { startIndex, endIndex }
}
