// Marrow Progress API utilities

export interface MarrowProgressItem {
  topicId: string
  completed: boolean
  subject: string
  chapter: string
  topicTitle: string
  timeSpent?: number
  difficulty?: string
  estimatedTime?: number
  completedAt?: string
  createdAt: string
  updatedAt: string
}

export interface MarrowProgressResponse {
  progress: Record<string, boolean>
  details: MarrowProgressItem[]
}

export interface MarrowProgressStats {
  overall: {
    totalTopics: number
    completedTopics: number
    completionPercentage: number
    totalTimeSpent: number
    averageTimePerTopic: number
  }
  subjects: Array<{
    subject: string
    totalTopics: number
    completedTopics: number
    completionPercentage: number
    totalTimeSpent: number
    lastActivity: string
  }>
  chapters: Array<{
    subject: string
    chapter: string
    totalTopics: number
    completedTopics: number
    completionPercentage: number
    totalTimeSpent: number
  }>
  recentActivity: Array<{
    topicId: string
    topicTitle: string
    subject: string
    chapter: string
    completedAt: string
    timeSpent?: number
  }>
}

export interface MarrowProgressUpdate {
  topicId: string
  completed: boolean
  subject: string
  chapter: string
  topicTitle: string
  timeSpent?: number
  difficulty?: string
  estimatedTime?: number
}

// =============================================================================
// MARROW PROGRESS API FUNCTIONS
// =============================================================================

export async function fetchMarrowProgress(): Promise<MarrowProgressResponse> {
  try {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null
    
    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch('/api/marrow-progress', {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching marrow progress:', error)
    throw error
  }
}

export async function updateMarrowProgress(update: MarrowProgressUpdate): Promise<MarrowProgressItem> {
  try {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch('/api/marrow-progress', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(update),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error updating marrow progress:', error)
    throw error
  }
}

export async function bulkUpdateMarrowProgress(updates: MarrowProgressUpdate[]): Promise<{ success: boolean; updated: number }> {
  try {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch('/api/marrow-progress/bulk', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ updates }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error bulk updating marrow progress:', error)
    throw error
  }
}

export async function fetchMarrowProgressStats(): Promise<MarrowProgressStats> {
  try {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null
    
    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch('/api/marrow-progress/stats', {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching marrow progress stats:', error)
    throw error
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function calculateProgressPercentage(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export function formatTimeSpent(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 90) return 'text-green-600'
  if (percentage >= 70) return 'text-blue-600'
  if (percentage >= 50) return 'text-yellow-600'
  if (percentage >= 25) return 'text-orange-600'
  return 'text-red-600'
}

export function getProgressBadgeVariant(percentage: number): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (percentage >= 90) return 'default'
  if (percentage >= 50) return 'secondary'
  return 'outline'
}
