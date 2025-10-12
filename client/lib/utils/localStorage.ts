/**
 * Server-safe localStorage utilities that work in both SSR and client environments
 * These functions don't use React hooks and can be imported in API routes
 */

/**
 * Safe localStorage getter that works in SSR
 */
export function getLocalStorageItem(key: string): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  
  try {
    return window.localStorage.getItem(key)
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return null
  }
}

/**
 * Safe localStorage setter that works in SSR
 */
export function setLocalStorageItem(key: string, value: string): void {
  if (typeof window === 'undefined') {
    return
  }
  
  try {
    window.localStorage.setItem(key, value)
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
  }
}

/**
 * Safe localStorage remover that works in SSR
 */
export function removeLocalStorageItem(key: string): void {
  if (typeof window === 'undefined') {
    return
  }
  
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
  }
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  
  try {
    const testKey = '__localStorage_test__'
    window.localStorage.setItem(testKey, 'test')
    window.localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}
