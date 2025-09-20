// Custom hook for debouncing values and functions

import { useState, useEffect, useRef, useCallback } from 'react'

// Hook for debouncing a value
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Hook for debouncing a callback function
export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  ) as T

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}

// Hook for debouncing with immediate execution on first call
export function useDebounceImmediate<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastCallTimeRef = useRef<number>(0)

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // If it's the first call or enough time has passed, execute immediately
      if (now - lastCallTimeRef.current > delay) {
        lastCallTimeRef.current = now
        callback(...args)
      } else {
        // Otherwise, debounce it
        timeoutRef.current = setTimeout(() => {
          lastCallTimeRef.current = Date.now()
          callback(...args)
        }, delay)
      }
    },
    [callback, delay]
  ) as T

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}
