// API service for diary entries
// Handles CRUD operations for diary entries with fallback to localStorage

// Removed mock data import - now using database
import { apiClient } from './index'
import { validateObjectId } from '@/lib/utils'

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
  updatedAt: string
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
  diaryHighestStreak: number  // Alias for longestStreak to match UserStats API
  totalWords: number
  averageWordsPerEntry: number
  moodDistribution: Record<string, number>
  entriesThisMonth: number
  entriesThisWeek: number
}

export class DiaryApi {
  private static readonly ENDPOINT = '/diary'

  // Get entries from the backend
  static async getEntries(params?: DiaryApiParams): Promise<DiaryEntry[]> {
    try {
      const { data } = await apiClient.get('/diary', { params })
      const entries = (data as any)?.entries || []
      
      return entries.map((entry: any) => ({
        id: entry._id || entry.id,
        title: entry.title,
        content: entry.content,
        preview: entry.content.length > 150 ? entry.content.substring(0, 150) + '...' : entry.content,
        date: entry.date,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        mood: entry.mood,
        tags: entry.tags || [],
        wordCount: entry.wordCount || entry.content.trim().split(/\s+/).filter((w: string) => w.length > 0).length,
        isPrivate: entry.isPrivate || false,
        attachments: entry.attachments || []
      }))
    } catch (error) {
      console.error('Failed to get diary entries:', error)
      throw error
    }
  }

  // Get entry by ID
  static async getEntryById(id: string): Promise<DiaryEntry | null> {
    try {
      // Validate the ID before making the API call
      validateObjectId(id, 'diary entry')
      
      const response = await apiClient.get(`${this.ENDPOINT}/${id}`)
      const entry = (response.data as any)
      
      if (!entry) {
        return null
      }
      
      // Transform the entry to match the DiaryEntry interface
      return {
        id: entry._id || entry.id,
        title: entry.title,
        content: entry.content,
        preview: entry.content.length > 150 ? entry.content.substring(0, 150) + '...' : entry.content,
        date: entry.date,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        mood: entry.mood,
        tags: entry.tags || [],
        wordCount: entry.wordCount || entry.content.trim().split(/\s+/).filter((w: string) => w.length > 0).length,
        isPrivate: entry.isPrivate || false,
        attachments: entry.attachments || []
      }
    } catch (error) {
      console.error('Failed to fetch diary entry by ID from API:', error)
      throw error
    }
  }

  // Create new diary entry
  static async createEntry(data: CreateDiaryEntryData): Promise<DiaryEntry> {
    try {
      const response = await apiClient.post(this.ENDPOINT, data)
      const entry = (response.data as any)
      
      // Transform the entry to match the DiaryEntry interface
      return {
        id: entry._id || entry.id,
        title: entry.title,
        content: entry.content,
        preview: entry.content.length > 150 ? entry.content.substring(0, 150) + '...' : entry.content,
        date: entry.date,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        mood: entry.mood,
        tags: entry.tags || [],
        wordCount: entry.wordCount || entry.content.trim().split(/\s+/).filter((w: string) => w.length > 0).length,
        isPrivate: entry.isPrivate || false,
        attachments: entry.attachments || []
      }
    } catch (error) {
      console.error('Failed to create diary entry via API:', error)
      throw error
    }
  }

  // Update diary entry
  static async updateEntry(data: UpdateDiaryEntryData): Promise<DiaryEntry> {
    try {
      // Validate the ID before making the API call
      validateObjectId(data.id, 'diary entry')
      
      const response = await apiClient.put(`${this.ENDPOINT}/${data.id}`, data)
      const entry = (response.data as any)
      
      // Transform the entry to match the DiaryEntry interface
      return {
        id: entry._id || entry.id,
        title: entry.title,
        content: entry.content,
        preview: entry.content.length > 150 ? entry.content.substring(0, 150) + '...' : entry.content,
        date: entry.date,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        mood: entry.mood,
        tags: entry.tags || [],
        wordCount: entry.wordCount || entry.content.trim().split(/\s+/).filter((w: string) => w.length > 0).length,
        isPrivate: entry.isPrivate || false,
        attachments: entry.attachments || []
      }
    } catch (error) {
      console.error('Failed to update diary entry via API:', error)
      throw error
    }
  }

  // Delete diary entry
  static async deleteEntry(id: string): Promise<boolean> {
    try {
      // Validate the ID before making the API call
      validateObjectId(id, 'diary entry')
      
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


