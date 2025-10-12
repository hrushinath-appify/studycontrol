'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  FileText,
  Calendar,
  Clock,
  Tag,
  StickyNote,
  BookOpen,
  X,
  Check,
  Copy,
  WifiOff
} from 'lucide-react'
import { NotesApi, type Note as ApiNote, type NoteStats as ApiNoteStats } from '@/lib/api/notes'
import { useRealtimeNotes, syncSSEEventWithStorage } from '@/lib/sse-notes'

// Use the API interface instead of local interface
type Note = ApiNote
type NoteStats = ApiNoteStats

const NotesPage = React.memo(() => {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTag, setFilterTag] = useState<string>('all')
  const [isEditing, setIsEditing] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [newNoteTags, setNewNoteTags] = useState('')
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'title'>('updated')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<NoteStats | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [operationLoading, setOperationLoading] = useState<{
    create: boolean
    delete: boolean
    toggle: boolean
    duplicate: boolean
    search: boolean
  }>({
    create: false,
    delete: false,
    toggle: false,
    duplicate: false,
    search: false
  })
  const [isOnline, setIsOnline] = useState(true)
  const [hasOfflineChanges, setHasOfflineChanges] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  // Real-time notes integration
  const { subscribe: subscribeToRealtime, isConnected: isRealtimeConnected } = useRealtimeNotes()

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate stats dynamically from current notes
  const calculateStats = useCallback((notesList: Note[]): NoteStats => {
    const activeNotes = notesList.filter(note => !note.isArchived)
    
    const total = activeNotes.length
    const totalWords = activeNotes.reduce((sum, note) => sum + (note.wordCount || 0), 0)
    const averageWordsPerNote = total > 0 ? Math.round(totalWords / total) : 0
    
    // Get unique tags
    const allTags = Array.from(new Set(activeNotes.flatMap(note => note.tags || [])))
    
    // Get unique categories
    const allCategories = Array.from(new Set(
      activeNotes.map(note => note.category).filter(Boolean) as string[]
    ))
    
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
      archived: notesList.filter(note => note.isArchived).length,
      totalWords,
      averageWordsPerNote,
      tagsCount: allTags.length,
      categoriesCount: allCategories.length,
      notesThisWeek,
      notesThisMonth
    }
  }, [])

  // Load notes and stats from database
  const loadNotesAndStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const notesData = await NotesApi.getNotes()
      
      setNotes(notesData || [])
      
      // Calculate stats from loaded notes for real-time accuracy
      const calculatedStats = calculateStats(notesData || [])
      setStats(calculatedStats)
    } catch (error) {
      console.error('Failed to load notes:', error)
      setError('Failed to load notes. Please check your connection and try again.')
      setNotes([])
      setStats(null)
    } finally {
      setLoading(false)
    }
  }, [calculateStats])

  // Refresh stats from current notes (always real-time)
  const refreshStats = useCallback(() => {
    const calculatedStats = calculateStats(notes)
    setStats(calculatedStats)
  }, [calculateStats, notes])

  useEffect(() => {
    loadNotesAndStats()
  }, [loadNotesAndStats])

  // Real-time updates integration
  useEffect(() => {
    const unsubscribe = subscribeToRealtime((event) => {
      console.log('Real-time notes event:', event)
      
      // Sync with localStorage
      syncSSEEventWithStorage(event)
      
      // Update UI based on event type
      switch (event.type) {
        case 'note_created':
          if (event.note) {
            setNotes(prev => {
              const updatedNotes = [event.note!, ...prev]
              const newStats = calculateStats(updatedNotes)
              setStats(newStats)
              return updatedNotes
            })
          }
          break
        case 'note_updated':
          if (event.note) {
            setNotes(prev => {
              const updatedNotes = prev.map(note => 
                note.id === event.noteId ? event.note! : note
              )
              const newStats = calculateStats(updatedNotes)
              setStats(newStats)
              return updatedNotes
            })
          }
          break
        case 'note_deleted':
          setNotes(prev => {
            const updatedNotes = prev.filter(note => note.id !== event.noteId)
            const newStats = calculateStats(updatedNotes)
            setStats(newStats)
            return updatedNotes
          })
          if (selectedNote?.id === event.noteId) {
            setSelectedNote(null)
            setIsEditing(false)
          }
          break
        case 'note_archived':
          if (event.note) {
            setNotes(prev => {
              const updatedNotes = prev.map(note => 
                note.id === event.noteId ? event.note! : note
              )
              const newStats = calculateStats(updatedNotes)
              setStats(newStats)
              return updatedNotes
            })
          }
          break
      }
    })

    return unsubscribe
  }, [subscribeToRealtime, selectedNote?.id, calculateStats])

  // Refresh stats periodically to ensure they stay up to date
  useEffect(() => {
    const interval = setInterval(() => {
      refreshStats()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [refreshStats])

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      if (hasOfflineChanges) {
        setError('Connection restored. Syncing changes...')
        // Reload to sync any offline changes
        loadNotesAndStats()
        setHasOfflineChanges(false)
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
      setError('You are offline. Changes will be saved locally and synced when connection is restored.')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check initial online status
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [hasOfflineChanges, loadNotesAndStats])

  const saveCurrentNote = useCallback(async () => {
    if (!selectedNote) return

    try {
      const updatedNote = await NotesApi.updateNote({
        id: selectedNote.id,
        title: selectedNote.title,
        content: selectedNote.content
      })

      setNotes(prev => {
        const updatedNotes = prev.map(note => 
          note.id === selectedNote.id ? updatedNote : note
        )
        // Update stats immediately as word count may have changed
        const newStats = calculateStats(updatedNotes)
        setStats(newStats)
        return updatedNotes
      })
      setSelectedNote(updatedNote)
      setError(null)
    } catch (error) {
      console.error('Failed to save note:', error)
      
      // Handle different types of errors
      if (error instanceof Error) {
        if (error.message.includes('Unauthorized')) {
          setError('Session expired. Please log in again.')
        } else if (error.message.includes('Note not found')) {
          setError('Note not found. It may have been deleted by another session.')
          // Clear the selected note since it no longer exists
          setSelectedNote(null)
          setIsEditing(false)
        } else {
          setError('Failed to save note. Please check your connection and try again.')
        }
      } else {
        setError('Failed to save note. Please try again.')
      }
    }
  }, [selectedNote, calculateStats, loadNotesAndStats])

  const createNote = useCallback(async () => {
    if (!newNoteTitle.trim()) return

    try {
      setOperationLoading(prev => ({ ...prev, create: true }))
      setError(null)
      
      const newNote = await NotesApi.createNote({
        title: newNoteTitle.trim(),
        content: newNoteContent.trim(),
        tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      })

      setNotes(prev => {
        const updatedNotes = [newNote, ...prev]
        // Update stats immediately
        const newStats = calculateStats(updatedNotes)
        setStats(newStats)
        return updatedNotes
      })
      setSelectedNote(newNote)
      setShowCreateForm(false)
      setIsEditing(false) // Go to preview mode after creating
      
      // Reset form
      setNewNoteTitle('')
      setNewNoteContent('')
      setNewNoteTags('')
    } catch (error) {
      console.error('Failed to create note:', error)
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        setError('Session expired. Please log in again.')
      } else {
        setError('Failed to create note. Please check your connection and try again.')
      }
    } finally {
      setOperationLoading(prev => ({ ...prev, create: false }))
    }
  }, [newNoteTitle, newNoteContent, newNoteTags, calculateStats])

  const deleteNote = useCallback(async (noteId: string) => {
    try {
      setOperationLoading(prev => ({ ...prev, delete: true }))
      setError(null)
      
      await NotesApi.deleteNote(noteId)
      setNotes(prev => {
        const updatedNotes = prev.filter(note => note.id !== noteId)
        // Update stats immediately
        const newStats = calculateStats(updatedNotes)
        setStats(newStats)
        return updatedNotes
      })
      
      if (selectedNote?.id === noteId) {
        setSelectedNote(null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Failed to delete note:', error)
      
      // Handle different types of errors
      if (error instanceof Error) {
        if (error.message.includes('Unauthorized')) {
          setError('Session expired. Please log in again.')
        } else if (error.message.includes('Note not found')) {
          // Note was already deleted, remove from UI
          setNotes(prev => {
            const updatedNotes = prev.filter(note => note.id !== noteId)
            const newStats = calculateStats(updatedNotes)
            setStats(newStats)
            return updatedNotes
          })
          if (selectedNote?.id === noteId) {
            setSelectedNote(null)
            setIsEditing(false)
          }
          setError(null) // Clear error since this is expected
        } else {
          setError('Failed to delete note. Please check your connection and try again.')
        }
      } else {
        setError('Failed to delete note. Please try again.')
      }
    } finally {
      setOperationLoading(prev => ({ ...prev, delete: false }))
    }
  }, [selectedNote?.id, isOnline, calculateStats])



  const duplicateNote = useCallback(async (note: Note) => {
    try {
      setOperationLoading(prev => ({ ...prev, duplicate: true }))
      setError(null)
      
      const duplicatedNote = await NotesApi.duplicateNote(note.id)
      setNotes(prev => {
        const updatedNotes = [duplicatedNote, ...prev]
        // Update stats immediately
        const newStats = calculateStats(updatedNotes)
        setStats(newStats)
        return updatedNotes
      })
    } catch (error) {
      console.error('Failed to duplicate note:', error)
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        setError('Session expired. Please log in again.')
      } else {
        setError('Failed to duplicate note. Please check your connection and try again.')
      }
    } finally {
      setOperationLoading(prev => ({ ...prev, duplicate: false }))
    }
  }, [calculateStats])

  // Search notes using database API
  const searchNotes = useCallback(async (query: string) => {
    if (!query.trim()) {
      await loadNotesAndStats()
      return
    }
    
    try {
      setOperationLoading(prev => ({ ...prev, search: true }))
      setError(null)
      
      const searchResults = await NotesApi.searchNotes(query)
      setNotes(searchResults)
      
      // Recalculate stats from search results for real-time accuracy
      const calculatedStats = calculateStats(searchResults)
      setStats(calculatedStats)
    } catch (error) {
      console.error('Failed to search notes:', error)
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        setError('Session expired. Please log in again.')
      } else {
        setError('Failed to search notes. Please check your connection and try again.')
      }
    } finally {
      setOperationLoading(prev => ({ ...prev, search: false }))
    }
  }, [loadNotesAndStats, calculateStats])

  // Handle search input changes
  const handleSearchChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    await searchNotes(query)
  }, [searchNotes])

  const handleNoteClick = useCallback((note: Note) => {
    setSelectedNote(note)
    setIsEditing(false)
  }, [])

  const handleToggleEdit = useCallback(async () => {
    if (isEditing) {
      // Save note when switching from edit to preview
      await saveCurrentNote()
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }, [isEditing, saveCurrentNote])

  const handleCloseCreateForm = useCallback(() => {
    setShowCreateForm(false)
  }, [])

  const handleShowCreateForm = useCallback(() => {
    setShowCreateForm(true)
  }, [])

  const handleNoteContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    if (selectedNote) {
      setSelectedNote({ ...selectedNote, content })
    }
  }, [selectedNote])

  const handleNoteTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    if (selectedNote) {
      setSelectedNote({ ...selectedNote, title })
    }
  }, [selectedNote])

  const handleFilterTagChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterTag(e.target.value)
  }, [])

  const handleSortByChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'updated' | 'created' | 'title')
  }, [])

  const handleNewNoteTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNoteTitle(e.target.value)
  }, [])

  const handleNewNoteTagsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNoteTags(e.target.value)
  }, [])

  const handleNewNoteContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNoteContent(e.target.value)
  }, [])



  const handleDeleteNote = useCallback((e: React.MouseEvent, noteId: string) => {
    e.stopPropagation()
    deleteNote(noteId)
  }, [deleteNote])

  const handleDuplicateNote = useCallback(() => {
    if (selectedNote) {
      duplicateNote(selectedNote)
    }
  }, [selectedNote, duplicateNote])

  const handleDeleteSelectedNote = useCallback(() => {
    if (selectedNote) {
      deleteNote(selectedNote.id)
    }
  }, [selectedNote, deleteNote])



  const createDeleteNoteHandler = useCallback((noteId: string) => {
    return (e: React.MouseEvent) => handleDeleteNote(e, noteId)
  }, [handleDeleteNote])

  const createNoteClickHandler = useCallback((note: Note) => {
    return () => handleNoteClick(note)
  }, [handleNoteClick])

  const createNoteKeyDownHandler = useCallback((note: Note) => {
    return (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleNoteClick(note)
      }
    }
  }, [handleNoteClick])

  const handleDismissError = useCallback(() => {
    setError(null)
  }, [])

  // Filter notes locally (for tag filtering and sorting) with proper validation
  const filteredNotes = useMemo(() => {
    return notes
      .filter(note => {
        // Ensure note has valid id
        if (!note || !note.id) return false

        // If filtering by tag, apply tag filter
        if (filterTag !== 'all') return note.tags && note.tags.includes(filterTag);

        // Otherwise, show all notes (including archived)
        return true;
      })
      .sort((a, b) => {        
        switch (sortBy) {
          case 'created':
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          case 'title':
            return (a.title || '').localeCompare(b.title || '')
          case 'updated':
          default:
            return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
        }
      })
  }, [notes, filterTag, sortBy])

  // Get all unique tags with validation
  const allTags = useMemo(() => {
    return Array.from(new Set(
      notes
        .filter(note => note && note.tags && Array.isArray(note.tags))
        .flatMap(note => note.tags)
        .filter(tag => typeof tag === 'string' && tag.trim() !== '')
    ))
  }, [notes])

  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return 'Unknown'
    
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      
      // Less than 1 minute
      if (diffInMinutes < 1) return 'Just now'
      
      // Less than 60 minutes
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      
      // Less than 24 hours
      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) return `${diffInHours}h ago`
      
      // Less than 7 days
      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays < 7) return `${diffInDays}d ago`
      
      // Less than 30 days - show date with time
      if (diffInDays < 30) {
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      }
      
      // More than 30 days - show full date
      return date.toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'short', 
        day: 'numeric'
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Invalid date'
    }
  }, [])

  const getPreview = useCallback((content: string) => {
    return content.length > 150 ? content.substring(0, 150) + '...' : content
  }, [])

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
              Notes
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Capture your thoughts and organize your ideas.
            </p>
          </div>
          <div className="text-primary flex-shrink-0" aria-hidden="true">
            <StickyNote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className={`border rounded-lg p-4 mb-6 ${
            !isOnline ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`} role="alert">
            <div className="flex items-center gap-2">
              {!isOnline ? (
                <>
                  <div className="w-5 h-5 text-yellow-500 flex-shrink-0">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-yellow-700 dark:text-yellow-300">{error}</p>
                </>
              ) : (
                <>
                  <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </>
              )}
              <button
                onClick={handleDismissError}
                className={`ml-auto p-1 rounded ${
                  !isOnline ? 'hover:bg-yellow-100 dark:hover:bg-yellow-800/50' : 'hover:bg-red-100 dark:hover:bg-red-800/50'
                }`}
                aria-label="Dismiss error"
              >
                <X className={`w-4 h-4 ${!isOnline ? 'text-yellow-500' : 'text-red-500'}`} />
              </button>
            </div>
            {!isOnline && (
              <div className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                Working offline. Your changes are being saved locally.
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6" role="region" aria-label="Notes statistics">
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-1 sm:mb-2" aria-hidden="true">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1" aria-label={`${stats?.total || 0} total notes`} key={`total-${stats?.total}`}>
              {stats?.total || 0}
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm">Total Notes</div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-1 sm:mb-2" aria-hidden="true">
              <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-green-500 mb-1" aria-label={`${stats?.tagsCount || 0} unique tags`} key={`tags-${stats?.tagsCount}`}>
              {stats?.tagsCount || 0}
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm">Tags</div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-1 sm:mb-2" aria-hidden="true">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-500 mb-1" aria-label={`${stats?.notesThisWeek || 0} notes created this week`} key={`created-${stats?.notesThisWeek}`}>
              {stats?.notesThisWeek || 0}
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm">Created (7d)</div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-1 sm:mb-2" aria-hidden="true">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-blue-500 mb-1" aria-label={`${stats?.totalWords || 0} total words`} key={`words-${stats?.totalWords}`}>
              {stats?.totalWords || 0}
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm">Words</div>
          </div>
        </div>

        {/* Real-time Connection Status Banner */}
        {!isRealtimeConnected && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 mb-4 sm:mb-6 flex items-center gap-2" role="status" aria-live="polite">
            <WifiOff className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-orange-500">Real-time updates are currently unavailable. Data will sync when connection is restored.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Notes List */}
          <div className="lg:col-span-1">
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
              {/* Search and Filters */}
              <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4" role="search" aria-label="Search and filter notes">
                <div className="relative">
                  <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search notes..."
                    className="pl-8 sm:pl-10 bg-background/50 text-sm sm:text-base h-9 sm:h-10"
                    aria-label="Search notes"
                  />
                </div>
                
                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                  <select
                    value={filterTag}
                    onChange={handleFilterTagChange}
                    className="w-full xs:flex-1 bg-background/50 border border-border rounded-md px-3 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 text-sm sm:text-sm md:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 hover:border-primary/50 cursor-pointer"
                    aria-label="Filter by tag"
                  >
                    <option value="all">All Notes</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={handleSortByChange}
                    className="w-full xs:flex-1 bg-background/50 border border-border rounded-md px-3 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 text-sm sm:text-sm md:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 hover:border-primary/50 cursor-pointer"
                    aria-label="Sort notes by"
                  >
                    <option value="updated">Last Updated</option>
                    <option value="created">Date Created</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>

              {/* Create Note Button */}
              <Button
                onClick={handleShowCreateForm}
                className="w-full mb-3 sm:mb-4 bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base h-9 sm:h-10"
                disabled={operationLoading.create}
                aria-label="Create new note"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" aria-hidden="true" />
                {operationLoading.create ? 'Creating...' : 'New Note'}
              </Button>
            </div>

            {/* Notes List */}
            <div 
              className="space-y-2 sm:space-y-3 max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto" 
              role="list" 
              aria-label={`Notes list with ${filteredNotes.length} ${filteredNotes.length === 1 ? 'note' : 'notes'}`}
            >
              {loading ? (
                <div className="text-center py-8" role="status" aria-live="polite">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                  <div className="text-muted-foreground">Loading notes...</div>
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="text-center py-12" role="status">
                  <StickyNote className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" aria-hidden="true" />
                  <p className="text-muted-foreground text-lg">
                    {notes.length === 0 ? 'No notes yet' : 'No notes match your search'}
                  </p>
                  <p className="text-muted-foreground/70 text-sm mt-2">
                    {notes.length === 0 ? 'Create your first note to get started' : 'Try adjusting your search or filters'}
                  </p>
                </div>
              ) : (
                filteredNotes.map((note, index) => {
                  // Ensure we have a valid key - use id if available, otherwise use index
                  const noteKey = note.id ? `note-${note.id}` : `note-fallback-${index}-${note.title?.slice(0, 10) || 'untitled'}`
                  
                  return (
                  <div
                    key={noteKey}
                    onClick={createNoteClickHandler(note)}
                    className={`bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer hover:bg-card/50 active:scale-[0.98] transition-all duration-200 ${
                      selectedNote?.id === note.id ? 'ring-2 ring-primary/50 bg-card/50' : ''
                    } ${operationLoading.delete || operationLoading.toggle ? 'opacity-50 pointer-events-none' : ''}`}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`Note: ${note.title || 'Untitled'}. ${note.wordCount || 0} words. Updated ${formatDate(note.updatedAt || new Date().toISOString())}.`}
                    onKeyDown={createNoteKeyDownHandler(note)}
                  >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground truncate text-sm sm:text-base">{note.title || 'Untitled'}</h3>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={createDeleteNoteHandler(note.id)}
                        className="p-1.5 sm:p-1 hover:bg-accent/50 rounded text-muted-foreground hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-primary/50 touch-manipulation"
                        disabled={operationLoading.delete}
                        aria-label="Delete note"
                      >
                        {operationLoading.delete ? (
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                    {getPreview(note.content || '')}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="flex items-center gap-1" title={new Date(note.updatedAt || new Date().toISOString()).toLocaleString()}>
                        <Clock className="w-3 h-3" />
                        {formatDate(note.updatedAt || new Date().toISOString())}
                      </span>
                      <span className="hidden sm:inline">{note.wordCount || 0} words</span>
                    </div>
                  </div>
                  
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.slice(0, isMobile ? 2 : 3).map((tag, tagIndex) => (
                        <span
                          key={`${noteKey}-tag-${tagIndex}-${tag}`}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > (isMobile ? 2 : 3) && (
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          +{note.tags.length - (isMobile ? 2 : 3)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Note Editor */}
          <div className="lg:col-span-2">
            {showCreateForm ? (
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">Create New Note</h2>
                  <Button
                    onClick={handleCloseCreateForm}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 sm:h-9 sm:w-9"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2 block">Title</label>
                    <Input
                      value={newNoteTitle}
                      onChange={handleNewNoteTitleChange}
                      placeholder="Enter note title..."
                      className="bg-background/50 text-sm sm:text-base h-9 sm:h-10"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2 block">Tags (comma-separated)</label>
                    <Input
                      value={newNoteTags}
                      onChange={handleNewNoteTagsChange}
                      placeholder="study, important, project..."
                      className="bg-background/50 text-sm sm:text-base h-9 sm:h-10"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2 block">Content</label>
                    <textarea
                      value={newNoteContent}
                      onChange={handleNewNoteContentChange}
                      placeholder="Start writing your note..."
                      className="w-full min-h-[120px] sm:min-h-[150px] bg-background/50 border border-border rounded-md px-2.5 sm:px-3 py-2 text-sm sm:text-base text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      onClick={createNote}
                      disabled={!newNoteTitle.trim() || operationLoading.create}
                      className="bg-primary hover:bg-primary/90 text-sm sm:text-base h-9 sm:h-10 flex-1 sm:flex-initial"
                    >
                      {operationLoading.create ? (
                        <>
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                          Create Note
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCloseCreateForm}
                      variant="outline"
                      disabled={operationLoading.create}
                      className="text-sm sm:text-base h-9 sm:h-10 flex-1 sm:flex-initial"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : selectedNote ? (
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {isEditing ? (
                      <Input
                        ref={titleRef}
                        value={selectedNote.title}
                        onChange={handleNoteTitleChange}
                        className="text-lg sm:text-xl font-semibold bg-transparent border-0 p-0 focus:ring-0"
                      />
                    ) : (
                      <h2 className="text-lg sm:text-xl font-semibold text-foreground truncate">{selectedNote.title}</h2>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      onClick={handleToggleEdit}
                      variant="outline"
                      size="sm"
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    >
                      <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                      <span className="hidden sm:inline">{isEditing ? 'Save & Preview' : 'Edit'}</span>
                    </Button>
                    
                    <Button
                      onClick={handleDuplicateNote}
                      variant="ghost"
                      size="sm"
                      disabled={operationLoading.duplicate}
                      className="h-8 w-8 sm:h-9 sm:w-9"
                      title="Duplicate note"
                    >
                      {operationLoading.duplicate ? (
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </Button>
                    
                    <Button
                      onClick={handleDeleteSelectedNote}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 h-8 w-8 sm:h-9 sm:w-9"
                      disabled={operationLoading.delete}
                      title="Delete note"
                    >
                      {operationLoading.delete ? (
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3 sm:mb-4">
                  {isEditing ? (
                    <textarea
                      ref={contentRef}
                      value={selectedNote.content}
                      onChange={handleNoteContentChange}
                      placeholder="Start writing your note..."
                      className="w-full min-h-[300px] sm:min-h-[400px] bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground focus:outline-none text-sm sm:text-base leading-relaxed"
                    />
                  ) : (
                    <div className="min-h-[300px] sm:min-h-[400px] prose prose-sm max-w-none text-foreground">
                      {selectedNote.content.split('\n').map((line, index) => (
                        <p key={index} className="mb-2 sm:mb-3 leading-relaxed text-sm sm:text-base">
                          {line || '\u00A0'}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="border-t border-border/30 pt-3 sm:pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <span className="flex items-center gap-1" title={new Date(selectedNote.createdAt).toLocaleString()}>
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Created:</span>
                        {new Date(selectedNote.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric',
                          month: 'short', 
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </span>
                      <span className="flex items-center gap-1" title={new Date(selectedNote.updatedAt).toLocaleString()}>
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Updated:</span>
                        {formatDate(selectedNote.updatedAt)}
                      </span>
                      <span className="hidden sm:inline">{selectedNote.wordCount} words</span>
                    </div>
                  </div>
                  
                  {selectedNote.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      {selectedNote.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs bg-primary/10 text-primary border border-primary/20"
                        >
                          <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-0.5 sm:mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg sm:rounded-xl p-8 sm:p-12 text-center">
                <StickyNote className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
                  Select a note to view
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Choose a note from the list to start reading or editing
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

NotesPage.displayName = 'NotesPage'

export default NotesPage

