// API service for notes
// Handles CRUD operations for notes with fallback to localStorage

import { apiClient } from './index'

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
  isPinned: boolean
  isArchived: boolean
  wordCount: number
  category?: string
}

export interface NoteStats {
  total: number
  pinned: number
  archived: number
  totalWords: number
  averageWordsPerNote: number
  tagsCount: number
  categoriesCount: number
  notesThisWeek: number
  notesThisMonth: number
}

export interface NoteApiParams {
  limit?: number
  page?: number
  sortBy?: 'created' | 'updated' | 'title' | 'wordCount'
  sortOrder?: 'asc' | 'desc'
  category?: string
  tag?: string
  pinned?: boolean
  archived?: boolean
}

export interface CreateNoteData {
  title: string
  content: string
  tags?: string[]
  category?: string
}

export interface UpdateNoteData extends Partial<CreateNoteData> {
  id: string
  isPinned?: boolean
  isArchived?: boolean
}

export class NotesApi {
  private static readonly ENDPOINT = '/notes'
  private static readonly STORAGE_KEY = 'studyControlNotes'

  // Get notes
  static async getNotes(params?: NoteApiParams): Promise<Note[]> {
    try {
      const response = await apiClient.get<Note[]>(this.ENDPOINT, params)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch notes from API, using localStorage:', error)
      return this.getLocalNotes(params)
    }
  }

  // Get note by ID
  static async getNoteById(id: string): Promise<Note | null> {
    try {
      const response = await apiClient.get<Note>(`${this.ENDPOINT}/${id}`)
      return response.data || null
    } catch (error) {
      console.warn('Failed to fetch note by ID from API, using localStorage:', error)
      const notes = this.getLocalNotes()
      return notes.find(note => note.id === id) || null
    }
  }

  // Create new note
  static async createNote(data: CreateNoteData): Promise<Note> {
    try {
      const response = await apiClient.post<Note>(this.ENDPOINT, data)
      const newNote = response.data!
      
      // Sync to localStorage when API succeeds
      try {
        const localNotes = this.getLocalNotes({ archived: true })
        const updatedNotes = [newNote, ...localNotes.filter(note => note.id !== newNote.id)]
        this.saveLocalNotes(updatedNotes)
      } catch (localError) {
        console.warn('Failed to sync new note to localStorage:', localError)
      }
      
      return newNote
    } catch (error) {
      console.warn('Failed to create note via API, using localStorage:', error)
      return this.createLocalNote(data)
    }
  }

  // Update note
  static async updateNote(data: UpdateNoteData): Promise<Note> {
    try {
      const response = await apiClient.put<Note>(`${this.ENDPOINT}/${data.id}`, data)
      const updatedNote = response.data!
      
      // Sync to localStorage when API succeeds
      try {
        const localNotes = this.getLocalNotes({ archived: true })
        const noteIndex = localNotes.findIndex(note => note.id === data.id)
        
        if (noteIndex !== -1) {
          localNotes[noteIndex] = updatedNote
          this.saveLocalNotes(localNotes)
        } else {
          // If note doesn't exist in localStorage, add it
          const updatedNotes = [updatedNote, ...localNotes]
          this.saveLocalNotes(updatedNotes)
        }
      } catch (localError) {
        console.warn('Failed to sync updated note to localStorage:', localError)
      }
      
      return updatedNote
    } catch (error) {
      console.warn('Failed to update note via API, using localStorage:', error)
      return this.updateLocalNote(data)
    }
  }

  // Delete note
  static async deleteNote(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`${this.ENDPOINT}/${id}`)
      return true
    } catch (error) {
      console.warn('Failed to delete note via API, using localStorage:', error)
      return this.deleteLocalNote(id)
    }
  }

  // Toggle note pin status
  static async togglePin(id: string): Promise<Note> {
    try {
      const response = await apiClient.patch<Note>(`${this.ENDPOINT}/${id}/pin`)
      return response.data!
    } catch (error) {
      console.warn('Failed to toggle pin via API, using localStorage:', error)
      return this.toggleLocalPin(id)
    }
  }

  // Archive/unarchive note
  static async toggleArchive(id: string): Promise<Note> {
    try {
      const response = await apiClient.patch<Note>(`${this.ENDPOINT}/${id}/archive`)
      return response.data!
    } catch (error) {
      console.warn('Failed to toggle archive via API, using localStorage:', error)
      return this.toggleLocalArchive(id)
    }
  }

  // Duplicate note
  static async duplicateNote(id: string): Promise<Note> {
    try {
      const response = await apiClient.post<Note>(`${this.ENDPOINT}/${id}/duplicate`)
      return response.data!
    } catch (error) {
      console.warn('Failed to duplicate note via API, using localStorage:', error)
      return this.duplicateLocalNote(id)
    }
  }

  // Search notes
  static async searchNotes(query: string, params?: Omit<NoteApiParams, 'limit'>): Promise<Note[]> {
    try {
      const response = await apiClient.get<Note[]>(`${this.ENDPOINT}/search`, { 
        q: query, 
        ...params 
      })
      return response.data || []
    } catch (error) {
      console.warn('Failed to search notes from API, using localStorage:', error)
      const notes = this.getLocalNotes()
      const lowercaseQuery = query.toLowerCase()
      return notes.filter(note =>
        note.title.toLowerCase().includes(lowercaseQuery) ||
        note.content.toLowerCase().includes(lowercaseQuery) ||
        note.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
        (note.category?.toLowerCase().includes(lowercaseQuery) ?? false)
      )
    }
  }

  // Get note statistics
  static async getStats(): Promise<NoteStats> {
    try {
      const response = await apiClient.get<NoteStats>(`${this.ENDPOINT}/stats`)
      return response.data!
    } catch (error) {
      console.warn('Failed to fetch note stats from API, calculating from localStorage:', error)
      return this.calculateLocalStats()
    }
  }

  // Get notes by tag
  static async getNotesByTag(tag: string): Promise<Note[]> {
    try {
      const response = await apiClient.get<Note[]>(`${this.ENDPOINT}/tag/${tag}`)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch notes by tag from API, using localStorage:', error)
      const notes = this.getLocalNotes()
      return notes.filter(note => note.tags.includes(tag))
    }
  }

  // Get all unique tags
  static async getAllTags(): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>(`${this.ENDPOINT}/tags`)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch tags from API, using localStorage:', error)
      const notes = this.getLocalNotes()
      return Array.from(new Set(notes.flatMap(note => note.tags)))
    }
  }

  // Private methods for localStorage fallback
  private static getLocalNotes(params?: NoteApiParams): Note[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      let notes: Note[] = stored ? JSON.parse(stored) : []

      // Convert date strings back to proper format if needed
      notes = notes.map(note => ({
        ...note,
        createdAt: typeof note.createdAt === 'string' ? note.createdAt : new Date(note.createdAt).toISOString(),
        updatedAt: typeof note.updatedAt === 'string' ? note.updatedAt : new Date(note.updatedAt).toISOString()
      }))

      // Apply filters
      if (params?.category) {
        notes = notes.filter(note => note.category === params.category)
      }

      if (params?.tag) {
        notes = notes.filter(note => note.tags.includes(params.tag!))
      }

      if (params?.pinned !== undefined) {
        notes = notes.filter(note => note.isPinned === params.pinned)
      }

      if (params?.archived !== undefined) {
        notes = notes.filter(note => note.isArchived === params.archived)
      } else {
        // By default, exclude archived notes
        notes = notes.filter(note => !note.isArchived)
      }

      // Sort notes
      if (params?.sortBy) {
        notes = notes.sort((a, b) => {
          // Pinned notes always come first
          if (a.isPinned && !b.isPinned) return -1
          if (!a.isPinned && b.isPinned) return 1

          let aValue: string | number
          let bValue: string | number

          switch (params.sortBy) {
            case 'created':
              aValue = new Date(a.createdAt).getTime()
              bValue = new Date(b.createdAt).getTime()
              break
            case 'updated':
              aValue = new Date(a.updatedAt).getTime()
              bValue = new Date(b.updatedAt).getTime()
              break
            case 'wordCount':
              aValue = a.wordCount
              bValue = b.wordCount
              break
            case 'title':
            default:
              aValue = a.title.toLowerCase()
              bValue = b.title.toLowerCase()
          }

          if (params.sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1
          } else {
            return aValue < bValue ? 1 : -1
          }
        })
      } else {
        // Default sort: pinned first, then by updated date (newest first)
        notes = notes.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1
          if (!a.isPinned && b.isPinned) return 1
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        })
      }

      if (params?.limit) {
        notes = notes.slice(0, params.limit)
      }

      return notes
    } catch (error) {
      console.error('Failed to get local notes:', error)
      return []
    }
  }

  private static saveLocalNotes(notes: Note[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes))
  }

  private static createLocalNote(data: CreateNoteData): Note {
    const notes = this.getLocalNotes({ archived: true }) // Include archived to get all
    const newNote: Note = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      tags: data.tags || [],
      ...(data.category && { category: data.category }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      isArchived: false,
      wordCount: data.content.split(/\s+/).filter(word => word !== '').length
    }

    const updatedNotes = [newNote, ...notes]
    this.saveLocalNotes(updatedNotes)
    
    return newNote
  }

  private static updateLocalNote(data: UpdateNoteData): Note {
    const notes = this.getLocalNotes({ archived: true }) // Include archived to get all
    const noteIndex = notes.findIndex(note => note.id === data.id)
    
    if (noteIndex === -1) {
      // If note not found in localStorage, create a basic note structure
      console.warn(`Note ${data.id} not found in localStorage, creating basic structure`)
      
      const basicNote: Note = {
        id: data.id,
        title: data.title || 'Untitled',
        content: data.content || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPinned: data.isPinned || false,
        isArchived: false,
        tags: data.tags || [],
        wordCount: data.content ? data.content.split(/\s+/).filter(word => word !== '').length : 0
      }
      
      const updatedNotes = [basicNote, ...notes]
      this.saveLocalNotes(updatedNotes)
      
      return basicNote
    }

    const existingNote = notes[noteIndex]!
    const updatedNote: Note = {
      id: existingNote.id,
      title: data.title ?? existingNote.title,
      content: data.content ?? existingNote.content,
      createdAt: existingNote.createdAt,
      updatedAt: new Date().toISOString(),
      isPinned: data.isPinned ?? existingNote.isPinned,
      isArchived: existingNote.isArchived,
      tags: data.tags ?? existingNote.tags,
      ...(data.category !== undefined && { category: data.category }),
      wordCount: data.content ? data.content.split(/\s+/).filter(word => word !== '').length : existingNote.wordCount
    }

    notes[noteIndex] = updatedNote
    this.saveLocalNotes(notes)
    
    return updatedNote
  }

  private static deleteLocalNote(id: string): boolean {
    try {
      const notes = this.getLocalNotes({ archived: true }) // Include archived to get all
      const updatedNotes = notes.filter(note => note.id !== id)
      this.saveLocalNotes(updatedNotes)
      return true
    } catch (error) {
      console.error('Failed to delete local note:', error)
      return false
    }
  }

  private static toggleLocalPin(id: string): Note {
    const notes = this.getLocalNotes({ archived: true }) // Include archived to get all
    const noteIndex = notes.findIndex(note => note.id === id)
    
    if (noteIndex === -1) {
      throw new Error('Note not found')
    }

    const existingNote = notes[noteIndex]!
    const updatedNote: Note = {
      id: existingNote.id,
      title: existingNote.title,
      content: existingNote.content,
      tags: existingNote.tags,
      createdAt: existingNote.createdAt,
      updatedAt: new Date().toISOString(),
      isPinned: !existingNote.isPinned,
      isArchived: existingNote.isArchived,
      wordCount: existingNote.wordCount,
      ...(existingNote.category && { category: existingNote.category })
    }

    notes[noteIndex] = updatedNote
    this.saveLocalNotes(notes)
    
    return updatedNote
  }

  private static toggleLocalArchive(id: string): Note {
    const notes = this.getLocalNotes({ archived: true }) // Include archived to get all
    const noteIndex = notes.findIndex(note => note.id === id)
    
    if (noteIndex === -1) {
      throw new Error('Note not found')
    }

    const existingNote = notes[noteIndex]!
    const updatedNote: Note = {
      id: existingNote.id,
      title: existingNote.title,
      content: existingNote.content,
      tags: existingNote.tags,
      createdAt: existingNote.createdAt,
      updatedAt: new Date().toISOString(),
      isPinned: false, // Unpin when archiving
      isArchived: !existingNote.isArchived,
      wordCount: existingNote.wordCount,
      ...(existingNote.category && { category: existingNote.category })
    }

    notes[noteIndex] = updatedNote
    this.saveLocalNotes(notes)
    
    return updatedNote
  }

  private static duplicateLocalNote(id: string): Note {
    const notes = this.getLocalNotes({ archived: true }) // Include archived to get all
    const originalNote = notes.find(note => note.id === id)
    
    if (!originalNote) {
      throw new Error('Note not found')
    }

    const duplicatedNote: Note = {
      ...originalNote,
      id: Date.now().toString(),
      title: `${originalNote.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      isArchived: false
    }

    const updatedNotes = [duplicatedNote, ...notes]
    this.saveLocalNotes(updatedNotes)
    
    return duplicatedNote
  }

  private static calculateLocalStats(): NoteStats {
    const allNotes = this.getLocalNotes({ archived: true }) // Include archived for stats
    const activeNotes = allNotes.filter(note => !note.isArchived)
    
    const total = activeNotes.length
    const pinned = activeNotes.filter(note => note.isPinned).length
    const archived = allNotes.filter(note => note.isArchived).length
    const totalWords = activeNotes.reduce((sum, note) => sum + note.wordCount, 0)
    const averageWordsPerNote = total > 0 ? Math.round(totalWords / total) : 0

    // Get unique tags and categories
    const allTags = Array.from(new Set(activeNotes.flatMap(note => note.tags)))
    const allCategories = Array.from(new Set(activeNotes.map(note => note.category).filter(Boolean)))

    // Calculate time-based stats
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const notesThisWeek = activeNotes.filter(note => 
      new Date(note.createdAt) >= oneWeekAgo
    ).length

    const notesThisMonth = activeNotes.filter(note => 
      new Date(note.createdAt) >= oneMonthAgo
    ).length

    return {
      total,
      pinned,
      archived,
      totalWords,
      averageWordsPerNote,
      tagsCount: allTags.length,
      categoriesCount: allCategories.length,
      notesThisWeek,
      notesThisMonth
    }
  }
}

// Export convenience functions
export const getNotes = NotesApi.getNotes
export const getNoteById = NotesApi.getNoteById
export const createNote = NotesApi.createNote
export const updateNote = NotesApi.updateNote
export const deleteNote = NotesApi.deleteNote
export const togglePin = NotesApi.togglePin
export const toggleArchive = NotesApi.toggleArchive
export const duplicateNote = NotesApi.duplicateNote
export const searchNotes = NotesApi.searchNotes
export const getStats = NotesApi.getStats
export const getNotesByTag = NotesApi.getNotesByTag
export const getAllTags = NotesApi.getAllTags
