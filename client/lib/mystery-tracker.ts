// Mystery exploration tracking utility
// Tracks user clicks on the "Unleash Mystery" button using local storage and events

const MYSTERY_STORAGE_KEY = 'mystery-explorations-count'
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

// Increment mystery exploration count
export function incrementMysteryExploration(): number {
  if (typeof window === 'undefined') return 0
  
  try {
    const currentStats = getMysteryStats()
    const newStats: MysteryStats = {
      count: currentStats.count + 1
    }
    
    localStorage.setItem(MYSTERY_STORAGE_KEY, JSON.stringify(newStats))
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent(MYSTERY_EVENT, {
      detail: newStats
    }))
    
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