// Mystery exploration tracking utility
// Tracks user clicks on the "Unleash Mystery" button using database storage

// Constants
const MYSTERY_EVENT = 'mysteryExplorationUpdated'

export interface MysteryStats {
  count: number
}

// Get current mystery exploration count from server
export async function getMysteryExplorationCount(): Promise<number> {
  try {
    const response = await fetch('/api/stats', {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      console.error('Failed to fetch mystery count from server')
      return 0
    }

    const data = await response.json()
    return data.data?.mysteryClicks || 0
  } catch (error) {
    console.error('Error reading mystery exploration count from server:', error)
    return 0
  }
}

// Get full mystery stats from server
export async function getMysteryStats(): Promise<MysteryStats> {
  try {
    const count = await getMysteryExplorationCount()
    return { count }
  } catch (error) {
    console.error('Error reading mystery stats from server:', error)
    return { count: 0 }
  }
}

// Track mystery exploration on server
async function trackMysteryExplorationOnServer(): Promise<void> {
  try {
    console.log('Attempting to track mystery exploration...')
    
    // Use the Next.js API route instead of direct backend call
    const response = await fetch('/api/mystery/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({})
    })

    console.log('Mystery tracking response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Mystery tracking error response:', errorText)
      
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { error: errorText || `HTTP ${response.status}` }
      }
      
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Mystery tracking success:', data)
  } catch (error) {
    console.error('Failed to track mystery exploration on server:', error)
    throw error // Throw error so caller knows it failed
  }
}

// Increment mystery exploration count
export async function incrementMysteryExploration(): Promise<number> {
  try {
    // Track on server first
    await trackMysteryExplorationOnServer()
    
    // Get updated count from server
    const newCount = await getMysteryExplorationCount()
    
    // Dispatch custom event for real-time updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(MYSTERY_EVENT, {
        detail: { count: newCount }
      }))
    }
    
    return newCount
  } catch (error) {
    console.error('Error incrementing mystery exploration:', error)
    // Return current count as fallback
    return await getMysteryExplorationCount()
  }
}

// No longer needed - stats are in database
export function resetMysteryExplorations(): void {
  console.warn('resetMysteryExplorations is deprecated - mystery stats are now stored in database')
}

// No longer needed - stats are in database  
export function initializeMysteryStatsForUser(_userId?: string): void {
  console.warn('initializeMysteryStatsForUser is deprecated - mystery stats are now stored in database')
}

// No longer needed - stats are in database
export function clearAllMysteryStats(): void {
  console.warn('clearAllMysteryStats is deprecated - mystery stats are now stored in database')
}

// Sync with server (now just fetches latest data)
export async function syncMysteryStatsWithServer(): Promise<void> {
  try {
    // Get latest count from server and dispatch update event
    const count = await getMysteryExplorationCount()
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(MYSTERY_EVENT, {
        detail: { count }
      }))
    }
  } catch (error) {
    console.error('Failed to sync mystery stats with server:', error)
    // Don't throw - sync is optional for UI updates
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