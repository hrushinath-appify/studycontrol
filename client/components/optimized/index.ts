// Export optimized components for better performance
export { VirtualizedList, OptimizedListItem } from './VirtualizedList'
export { OptimizedImage, preloadImage, preloadImages } from './OptimizedImage'
export { PerformanceMonitor, useRenderTime, withPerformanceProfile } from './PerformanceMonitor'

// Performance utilities
export { measurePerformance, measureAsyncPerformance, memoizeWithTTL } from '@/lib/performance'

// Custom hooks for performance
export { useDebounce, useDebounceCallback, useDebounceImmediate } from '@/hooks/use-debounce'
export { useAsync } from '@/hooks/use-async'
export { useLocalStorage } from '@/hooks/use-local-storage'