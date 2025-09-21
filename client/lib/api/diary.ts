// API service for diary entries
// Handles CRUD operations for diary entries with fallback to localStorage

// Removed mock data import - now using database
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

export interface DiaryEntry {
  id: string
  title: string
  content: string
  preview: string
  date: string
  createdAt: string
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'terrible'
  tags?: string[]
  wordCount?: number
  isPrivate?: boolean
  attachments?: string[]
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

  // Get diary entries
  static async getEntries(params?: DiaryApiParams): Promise<DiaryEntry[]> {
    try {
      const response = await apiClient.get<DiaryEntry[]>(this.ENDPOINT, params)
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch diary entries from API:', error)
      throw error
    }
  }

  // Get entry by ID
  static async getEntryById(id: string): Promise<DiaryEntry | null> {
    try {
      const response = await apiClient.get<DiaryEntry>(`${this.ENDPOINT}/${id}`)
      return response.data || null
    } catch (error) {
      console.error('Failed to fetch diary entry by ID from API:', error)
      throw error
    }
  }

  // Create new diary entry
  static async createEntry(data: CreateDiaryEntryData): Promise<DiaryEntry> {
    try {
      const response = await apiClient.post<DiaryEntry>(this.ENDPOINT, data)
      return response.data!
    } catch (error) {
      console.error('Failed to create diary entry via API:', error)
      throw error
    }
  }

  // Update diary entry
  static async updateEntry(data: UpdateDiaryEntryData): Promise<DiaryEntry> {
    try {
      const response = await apiClient.put<DiaryEntry>(`${this.ENDPOINT}/${data.id}`, data)
      return response.data!
    } catch (error) {
      console.error('Failed to update diary entry via API:', error)
      throw error
    }
  }

  // Delete diary entry
  static async deleteEntry(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`${this.ENDPOINT}/${id}`)
      return true
    } catch (error) {
      console.error('Failed to delete diary entry via API:', error)
      throw error
    }
  }

  // Search diary entries
  static async searchEntries(query: string, params?: Omit<DiaryApiParams, 'limit'>): Promise<DiaryEntry[]> {
    try {
      const response = await apiClient.get<DiaryEntry[]>(`${this.ENDPOINT}/search`, { 
        q: query, 
        ...params 
      })
      return response.data || []
    } catch (error) {
      console.error('Failed to search diary entries from API:', error)
      throw error
    }
  }

  // Get diary statistics
  static async getStats(): Promise<DiaryStats> {
    try {
      const response = await apiClient.get<DiaryStats>(`${this.ENDPOINT}/stats`)
      return response.data!
    } catch (error) {
      console.error('Failed to fetch diary stats from API:', error)
      throw error
    }
  }

  // Get entries by mood
  static async getEntriesByMood(mood: DiaryEntry['mood']): Promise<DiaryEntry[]> {
    try {
      const response = await apiClient.get<DiaryEntry[]>(`${this.ENDPOINT}/mood/${mood}`)
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch entries by mood from API:', error)
      throw error
    }
  }

  // Get entries by tag
  static async getEntriesByTag(tag: string): Promise<DiaryEntry[]> {
    try {
      const response = await apiClient.get<DiaryEntry[]>(`${this.ENDPOINT}/tag/${tag}`)
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch entries by tag from API:', error)
      throw error
    }
  }

  // All localStorage fallback methods removed - now using database exclusively
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


