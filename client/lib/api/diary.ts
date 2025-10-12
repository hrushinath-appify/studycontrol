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
      const response = await apiClient.get('/diary', { params })
      
      console.log('📥 Diary API - Full response:', JSON.stringify(response, null, 2).substring(0, 500))
      
      // The response structure is: { success: true, data: { entries: [...], pagination: {...} } }
      const responseData = response.data as { entries?: unknown[]; pagination?: unknown } | undefined
      const entries = responseData?.entries || []
      
      console.log('📥 Diary API - Extracted entries count:', entries.length)
      
      const mappedEntries = entries.map((entry: unknown, idx: number) => {
        const rawEntry = entry as Record<string, unknown>
        
        // Try multiple ways to get the ID - prioritize 'id' over '_id'
        const id = (rawEntry.id || rawEntry._id) as string | undefined
        
        // Validate ID format
        if (!id || typeof id !== 'string' || id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(id)) {
          console.error(`❌ CRITICAL: Invalid ID in API response for entry ${idx}:`, {
            fullEntry: rawEntry,
            extractedId: id,
            idType: typeof id,
            idLength: id?.length,
            has_id: 'id' in rawEntry,
            has_underscore_id: '_id' in rawEntry,
            id_value: rawEntry.id,
            _id_value: rawEntry._id
          })
          // Throw error instead of silently continuing with bad data
          throw new Error(`Invalid diary entry ID format received from API: ${id}. Entry index: ${idx}`)
        }
        
        console.log(`✅ Entry ${idx} validated - ID: ${id}, Title: ${rawEntry.title}`)
        
        const content = rawEntry.content as string || ''
        const mood = rawEntry.mood as DiaryEntry['mood'] | undefined
        return {
          id,
          title: rawEntry.title as string || 'Untitled',
          content,
          preview: content.length > 150 ? content.substring(0, 150) + '...' : content,
          date: rawEntry.date as string || new Date().toISOString(),
          createdAt: rawEntry.createdAt as string || new Date().toISOString(),
          updatedAt: rawEntry.updatedAt as string || new Date().toISOString(),
          ...(mood && { mood }),
          tags: (rawEntry.tags as string[]) || [],
          wordCount: (rawEntry.wordCount as number) || content.trim().split(/\s+/).filter((w: string) => w.length > 0).length,
          isPrivate: (rawEntry.isPrivate as boolean) || false,
          attachments: (rawEntry.attachments as string[]) || []
        }
      })
      
      console.log('✅ Successfully mapped', mappedEntries.length, 'diary entries')
      return mappedEntries
    } catch (error) {
      console.error('❌ Failed to get diary entries:', error)
      throw error
    }
  }

  // Get entry by ID
  static async getEntryById(id: string): Promise<DiaryEntry | null> {
    try {
      // Validate the ID before making the API call
      validateObjectId(id, 'diary entry')
      
      const response = await apiClient.get(`${this.ENDPOINT}/${id}`)
      const rawEntry = response.data as Record<string, unknown> | null | undefined
      
      if (!rawEntry) {
        return null
      }
      
      // Transform the entry to match the DiaryEntry interface
      const content = rawEntry.content as string || ''
      const mood = rawEntry.mood as DiaryEntry['mood'] | undefined
      return {
        id: (rawEntry._id || rawEntry.id) as string,
        title: rawEntry.title as string || 'Untitled',
        content,
        preview: content.length > 150 ? content.substring(0, 150) + '...' : content,
        date: rawEntry.date as string || new Date().toISOString(),
        createdAt: rawEntry.createdAt as string || new Date().toISOString(),
        updatedAt: rawEntry.updatedAt as string || new Date().toISOString(),
        ...(mood && { mood }),
        tags: (rawEntry.tags as string[]) || [],
        wordCount: (rawEntry.wordCount as number) || content.trim().split(/\s+/).filter((w: string) => w.length > 0).length,
        isPrivate: (rawEntry.isPrivate as boolean) || false,
        attachments: (rawEntry.attachments as string[]) || []
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
      const rawEntry = response.data as Record<string, unknown>
      
      // Transform the entry to match the DiaryEntry interface
      const content = rawEntry.content as string || ''
      const mood = rawEntry.mood as DiaryEntry['mood'] | undefined
      return {
        id: (rawEntry._id || rawEntry.id) as string,
        title: rawEntry.title as string || 'Untitled',
        content,
        preview: content.length > 150 ? content.substring(0, 150) + '...' : content,
        date: rawEntry.date as string || new Date().toISOString(),
        createdAt: rawEntry.createdAt as string || new Date().toISOString(),
        updatedAt: rawEntry.updatedAt as string || new Date().toISOString(),
        ...(mood && { mood }),
        tags: (rawEntry.tags as string[]) || [],
        wordCount: (rawEntry.wordCount as number) || content.trim().split(/\s+/).filter((w: string) => w.length > 0).length,
        isPrivate: (rawEntry.isPrivate as boolean) || false,
        attachments: (rawEntry.attachments as string[]) || []
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
      const rawEntry = response.data as Record<string, unknown>
      
      // Transform the entry to match the DiaryEntry interface
      const content = rawEntry.content as string || ''
      const mood = rawEntry.mood as DiaryEntry['mood'] | undefined
      return {
        id: (rawEntry._id || rawEntry.id) as string,
        title: rawEntry.title as string || 'Untitled',
        content,
        preview: content.length > 150 ? content.substring(0, 150) + '...' : content,
        date: rawEntry.date as string || new Date().toISOString(),
        createdAt: rawEntry.createdAt as string || new Date().toISOString(),
        updatedAt: rawEntry.updatedAt as string || new Date().toISOString(),
        ...(mood && { mood }),
        tags: (rawEntry.tags as string[]) || [],
        wordCount: (rawEntry.wordCount as number) || content.trim().split(/\s+/).filter((w: string) => w.length > 0).length,
        isPrivate: (rawEntry.isPrivate as boolean) || false,
        attachments: (rawEntry.attachments as string[]) || []
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


