// API service for diary entries
// Handles CRUD operations for diary entries with fallback to localStorage

import { MockDiaryEntry, pastEntries } from '../mock-data/diary-entries'
import { apiClient } from './index'

export interface DiaryApiParams {
  limit?: number
  page?: number
  sortBy?: 'date' | 'created' | 'updated'
  sortOrder?: 'asc' | 'desc'
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'terrible'
  tags?: string[]
  dateFrom?: string
  dateTo?: string
}

export interface CreateDiaryEntryData {
  title: string
  content: string
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'terrible'
  tags?: string[]
}

export interface UpdateDiaryEntryData extends Partial<CreateDiaryEntryData> {
  id: string
}

export interface DiaryStats {
  totalEntries: number
  currentStreak: number
  longestStreak: number
  totalWords: number
  averageWordsPerEntry: number
  moodDistribution: Record<string, number>
  entriesThisMonth: number
  entriesThisWeek: number
}

export class DiaryApi {
  private static readonly ENDPOINT = '/diary'
  private static readonly STORAGE_KEY = 'diaryEntries'

  // Get diary entries
  static async getEntries(params?: DiaryApiParams): Promise<MockDiaryEntry[]> {
    try {
      const response = await apiClient.get<MockDiaryEntry[]>(this.ENDPOINT, params)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch diary entries from API, using localStorage:', error)
      return this.getLocalEntries(params)
    }
  }

  // Get entry by ID
  static async getEntryById(id: string): Promise<MockDiaryEntry | null> {
    try {
      const response = await apiClient.get<MockDiaryEntry>(`${this.ENDPOINT}/${id}`)
      return response.data || null
    } catch (error) {
      console.warn('Failed to fetch diary entry by ID from API, using localStorage:', error)
      const entries = this.getLocalEntries()
      return entries.find(entry => entry.id === id) || null
    }
  }

  // Create new diary entry
  static async createEntry(data: CreateDiaryEntryData): Promise<MockDiaryEntry> {
    try {
      const response = await apiClient.post<MockDiaryEntry>(this.ENDPOINT, data)
      return response.data!
    } catch (error) {
      console.warn('Failed to create diary entry via API, using localStorage:', error)
      return this.createLocalEntry(data)
    }
  }

  // Update diary entry
  static async updateEntry(data: UpdateDiaryEntryData): Promise<MockDiaryEntry> {
    try {
      const response = await apiClient.put<MockDiaryEntry>(`${this.ENDPOINT}/${data.id}`, data)
      return response.data!
    } catch (error) {
      console.warn('Failed to update diary entry via API, using localStorage:', error)
      return this.updateLocalEntry(data)
    }
  }

  // Delete diary entry
  static async deleteEntry(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`${this.ENDPOINT}/${id}`)
      return true
    } catch (error) {
      console.warn('Failed to delete diary entry via API, using localStorage:', error)
      return this.deleteLocalEntry(id)
    }
  }

  // Search diary entries
  static async searchEntries(query: string, params?: Omit<DiaryApiParams, 'limit'>): Promise<MockDiaryEntry[]> {
    try {
      const response = await apiClient.get<MockDiaryEntry[]>(`${this.ENDPOINT}/search`, { 
        q: query, 
        ...params 
      })
      return response.data || []
    } catch (error) {
      console.warn('Failed to search diary entries from API, using localStorage:', error)
      const entries = this.getLocalEntries()
      const lowercaseQuery = query.toLowerCase()
      return entries.filter(entry =>
        entry.title.toLowerCase().includes(lowercaseQuery) ||
        entry.content.toLowerCase().includes(lowercaseQuery) ||
        entry.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
    }
  }

  // Get diary statistics
  static async getStats(): Promise<DiaryStats> {
    try {
      const response = await apiClient.get<DiaryStats>(`${this.ENDPOINT}/stats`)
      return response.data!
    } catch (error) {
      console.warn('Failed to fetch diary stats from API, calculating from localStorage:', error)
      return this.calculateLocalStats()
    }
  }

  // Get entries by mood
  static async getEntriesByMood(mood: MockDiaryEntry['mood']): Promise<MockDiaryEntry[]> {
    try {
      const response = await apiClient.get<MockDiaryEntry[]>(`${this.ENDPOINT}/mood/${mood}`)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch entries by mood from API, using localStorage:', error)
      const entries = this.getLocalEntries()
      return entries.filter(entry => entry.mood === mood)
    }
  }

  // Get entries by tag
  static async getEntriesByTag(tag: string): Promise<MockDiaryEntry[]> {
    try {
      const response = await apiClient.get<MockDiaryEntry[]>(`${this.ENDPOINT}/tag/${tag}`)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch entries by tag from API, using localStorage:', error)
      const entries = this.getLocalEntries()
      return entries.filter(entry => entry.tags?.includes(tag))
    }
  }

  // Private methods for localStorage fallback
  private static getLocalEntries(params?: DiaryApiParams): MockDiaryEntry[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      let entries: MockDiaryEntry[] = stored ? JSON.parse(stored) : [...pastEntries]

      // Convert date strings back to proper format if needed
      entries = entries.map(entry => ({
        ...entry,
        createdAt: typeof entry.createdAt === 'string' ? entry.createdAt : entry.createdAt
      }))

      // Apply filters
      if (params?.mood) {
        entries = entries.filter(entry => entry.mood === params.mood)
      }

      if (params?.tags && params.tags.length > 0) {
        entries = entries.filter(entry => 
          entry.tags?.some(tag => params.tags!.includes(tag))
        )
      }

      if (params?.dateFrom) {
        entries = entries.filter(entry => 
          new Date(entry.createdAt) >= new Date(params.dateFrom!)
        )
      }

      if (params?.dateTo) {
        entries = entries.filter(entry => 
          new Date(entry.createdAt) <= new Date(params.dateTo!)
        )
      }

      // Sort entries
      if (params?.sortBy) {
        entries = entries.sort((a, b) => {
          let aValue: string | number
          let bValue: string | number

          switch (params.sortBy) {
            case 'date':
            case 'created':
              aValue = new Date(a.createdAt).getTime()
              bValue = new Date(b.createdAt).getTime()
              break
            default:
              aValue = a.title
              bValue = b.title
          }

          if (params.sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1
          } else {
            return aValue < bValue ? 1 : -1
          }
        })
      } else {
        // Default sort by created date, newest first
        entries = entries.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      }

      if (params?.limit) {
        entries = entries.slice(0, params.limit)
      }

      return entries
    } catch (error) {
      console.error('Failed to get local diary entries:', error)
      return []
    }
  }

  private static createLocalEntry(data: CreateDiaryEntryData): MockDiaryEntry {
    const entries = this.getLocalEntries()
    const newEntry: MockDiaryEntry = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      preview: data.content.substring(0, 100) + (data.content.length > 100 ? '...' : ''),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      createdAt: new Date().toISOString(),
      ...(data.mood && { mood: data.mood }),
      ...(data.tags && { tags: data.tags }),
      wordCount: data.content.split(/\s+/).filter(word => word !== '').length
    }

    const updatedEntries = [newEntry, ...entries]
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedEntries))
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('diaryEntriesUpdated'))
    
    return newEntry
  }

  private static updateLocalEntry(data: UpdateDiaryEntryData): MockDiaryEntry {
    const entries = this.getLocalEntries()
    const entryIndex = entries.findIndex(entry => entry.id === data.id)
    
    if (entryIndex === -1) {
      throw new Error('Entry not found')
    }

    const existingEntry = entries[entryIndex]!
    const updatedEntry: MockDiaryEntry = {
      id: existingEntry.id,
      date: existingEntry.date,
      createdAt: existingEntry.createdAt,
      title: data.title ?? existingEntry.title,
      content: data.content ?? existingEntry.content,
      preview: data.content ? 
        data.content.substring(0, 100) + (data.content.length > 100 ? '...' : '') : 
        existingEntry.preview,
      ...(data.mood !== undefined && { mood: data.mood }),
      ...(data.tags !== undefined && { tags: data.tags }),
      wordCount: data.content ? 
        data.content.split(/\s+/).filter(word => word !== '').length : 
        (existingEntry.wordCount ?? 0)
    }

    entries[entryIndex] = updatedEntry
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries))
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('diaryEntriesUpdated'))
    
    return updatedEntry
  }

  private static deleteLocalEntry(id: string): boolean {
    try {
      const entries = this.getLocalEntries()
      const updatedEntries = entries.filter(entry => entry.id !== id)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedEntries))
      
      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('diaryEntriesUpdated'))
      
      return true
    } catch (error) {
      console.error('Failed to delete local diary entry:', error)
      return false
    }
  }

  private static calculateLocalStats(): DiaryStats {
    const entries = this.getLocalEntries()
    const totalEntries = entries.length
    const totalWords = entries.reduce((sum, entry) => sum + (entry.wordCount || 0), 0)
    
    // Calculate mood distribution
    const moodDistribution = entries.reduce((acc, entry) => {
      if (entry.mood) {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    // Calculate streaks (simplified for mock)
    const currentStreak = 5 // Mock value
    const longestStreak = 12 // Mock value

    // Calculate time-based stats
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const entriesThisWeek = entries.filter(entry => 
      new Date(entry.createdAt) >= oneWeekAgo
    ).length

    const entriesThisMonth = entries.filter(entry => 
      new Date(entry.createdAt) >= oneMonthAgo
    ).length

    return {
      totalEntries,
      currentStreak,
      longestStreak,
      totalWords,
      averageWordsPerEntry: totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0,
      moodDistribution,
      entriesThisMonth,
      entriesThisWeek
    }
  }
}

// Export convenience functions
export const getEntries = DiaryApi.getEntries
export const getEntryById = DiaryApi.getEntryById
export const createEntry = DiaryApi.createEntry
export const updateEntry = DiaryApi.updateEntry
export const deleteEntry = DiaryApi.deleteEntry
export const searchEntries = DiaryApi.searchEntries
export const getStats = DiaryApi.getStats
export const getEntriesByMood = DiaryApi.getEntriesByMood
export const getEntriesByTag = DiaryApi.getEntriesByTag
