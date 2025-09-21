// Mystery exploration tracking utility
// Tracks user clicks on the "Unleash Mystery" button using local storage and database sync

import { apiRequest, buildApiUrl } from './api-utils'
import { AuthApi } from './api/auth'

// Constants
const MYSTERY_STORAGE_KEY = 'mystery-exploration-stats'
const MYSTERY_EVENT = 'mysteryExplorationUpdated'

export interface MysteryStats {
  count: number
}

// Get current mystery exploration count
export function getMysteryExplorationCount(): number {
  if (typeof window === 'undefined') return 0
  
  try {
    const stored = localStorage.getItem(MYSTERY_STORAGE_KEY)
    if (!stored) return 0
    
    const data = JSON.parse(stored) as MysteryStats
    return data.count || 0
  } catch (error) {
    console.error('Error reading mystery exploration count:', error)
    return 0
  }
}

// Get full mystery stats
export function getMysteryStats(): MysteryStats {
  if (typeof window === 'undefined') {
    return { count: 0 }
  }
  
  try {
    const stored = localStorage.getItem(MYSTERY_STORAGE_KEY)
    if (!stored) {
      return { count: 0 }
    }
    
    const data = JSON.parse(stored) as MysteryStats
    return {
      count: data.count || 0
    }
  } catch (error) {
    console.error('Error reading mystery stats:', error)
    return { count: 0 }
  }
}

// Track mystery exploration on server
async function trackMysteryExplorationOnServer(): Promise<void> {
  // Only attempt server tracking if user is authenticated
  if (!AuthApi.isAuthenticated()) {
    console.log('User not authenticated, skipping server tracking')
    return
  }

  try {
    await apiRequest(buildApiUrl('/mystery/track'), {
      method: 'POST',
      body: JSON.stringify({}) // Send empty JSON object to satisfy server's JSON validation
    })
  } catch (error) {
    console.error('Failed to track mystery exploration on server:', error)
    // Don't throw here - we want localStorage tracking to still work even if server is down
  }
}

// Increment mystery exploration count
export async function incrementMysteryExploration(): Promise<number> {
  if (typeof window === 'undefined') return 0
  
  try {
    const currentStats = getMysteryStats()
    const newStats: MysteryStats = {
      count: currentStats.count + 1
    }
    
    // Update localStorage immediately for responsive UI
    localStorage.setItem(MYSTERY_STORAGE_KEY, JSON.stringify(newStats))
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent(MYSTERY_EVENT, {
      detail: newStats
    }))
    
    // Sync with server in background
    trackMysteryExplorationOnServer()
    
    return newStats.count
  } catch (error) {
    console.error('Error incrementing mystery exploration:', error)
    return getMysteryExplorationCount()
  }
}

// Reset mystery exploration count (for testing/debugging)
export function resetMysteryExplorations(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(MYSTERY_STORAGE_KEY)
    
    // Dispatch reset event
    window.dispatchEvent(new CustomEvent(MYSTERY_EVENT, {
      detail: { count: 0 }
    }))
  } catch (error) {
    console.error('Error resetting mystery explorations:', error)
  }
}

// Sync localStorage count with server count
export async function syncMysteryStatsWithServer(): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    // Fetch current stats from server
    const response = await fetch('/api/stats', {
      method: 'GET',
      credentials: 'include',
    })
    
    if (response.ok) {
      const data = await response.json()
      const serverMysteryCount = data.data?.mysteryClicks || 0
      const localCount = getMysteryExplorationCount()
      
      // If server has more clicks than local, update local to match server
      // This helps with cross-device sync
      if (serverMysteryCount > localCount) {
        const newStats: MysteryStats = { count: serverMysteryCount }
        localStorage.setItem(MYSTERY_STORAGE_KEY, JSON.stringify(newStats))
        
        // Dispatch update event
        window.dispatchEvent(new CustomEvent(MYSTERY_EVENT, {
          detail: newStats
        }))
      }
    }
  } catch (error) {
    console.error('Failed to sync mystery stats with server:', error)
    // Don't throw - sync is optional
  }
}

// Listen for mystery exploration updates
export function onMysteryExplorationUpdate(callback: (stats: MysteryStats) => void): () => void {
  if (typeof window === 'undefined') return () => {}
  
  const handleUpdate = (event: CustomEvent<MysteryStats>) => {
    callback(event.detail)
  }
  
  window.addEventListener(MYSTERY_EVENT, handleUpdate as EventListener)
  
  // Return cleanup function
  return () => {
    window.removeEventListener(MYSTERY_EVENT, handleUpdate as EventListener)
  }
}