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
  Star,
  X,
  Check,
  Copy
} from 'lucide-react'
import { NotesApi, type Note as ApiNote, type NoteStats as ApiNoteStats } from '@/lib/api/notes'

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
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
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
  
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load notes and stats from database
  const loadNotesAndStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [notesData, statsData] = await Promise.all([
        NotesApi.getNotes(),
        NotesApi.getStats()
      ])
      
      setNotes(notesData || [])
      setStats(statsData)
    } catch (error) {
      console.error('Failed to load notes:', error)
      setError('Failed to load notes. Please try again.')
      setNotes([])
      setStats(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Refresh stats only
  const refreshStats = useCallback(async () => {
    try {
      const statsData = await NotesApi.getStats()
      setStats(statsData)
    } catch (error) {
      console.error('Failed to refresh stats:', error)
      // Don't show error for stats refresh failures as it's not critical
    }
  }, [])

  useEffect(() => {
    loadNotesAndStats()
  }, [loadNotesAndStats])

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

  // Auto-save functionality
  const saveCurrentNote = useCallback(async () => {
    if (!selectedNote) return

    try {
      const updatedNote = await NotesApi.updateNote({
        id: selectedNote.id,
        title: selectedNote.title,
        content: selectedNote.content
      })

      setNotes(prev => prev.map(note => 
        note.id === selectedNote.id ? updatedNote : note
      ))
      // Don't update selectedNote here to avoid triggering auto-save loop
      setError(null)
      
      // Refresh stats as word count may have changed
      await refreshStats()
    } catch (error) {
      console.error('Failed to save note:', error)
      
      // If it's a "Note not found" error, try to sync the note to localStorage first
      if (error instanceof Error && error.message === 'Note not found') {
        try {
          // Try to reload all notes to sync localStorage
          console.log('Note not found in localStorage, resyncing notes...')
          await loadNotesAndStats()
          
          // Try saving again after sync
          const retryUpdatedNote = await NotesApi.updateNote({
            id: selectedNote.id,
            title: selectedNote.title,
            content: selectedNote.content
          })
          
          setNotes(prev => prev.map(note => 
            note.id === selectedNote.id ? retryUpdatedNote : note
          ))
          // Don't update selectedNote here to avoid triggering auto-save loop
          setError(null)
          await refreshStats()
          
          console.log('Successfully saved after resync')
        } catch (retryError) {
          console.error('Failed to save even after resync:', retryError)
          setError('Failed to save note. Changes may be lost. Please refresh the page.')
        }
      } else {
        setError('Failed to save note. Your changes may be lost.')
      }
    }
  }, [selectedNote, refreshStats, loadNotesAndStats])

  // Auto-save functionality
  useEffect(() => {
    const content = selectedNote?.content
    const title = selectedNote?.title
    const noteId = selectedNote?.id
    
    if (noteId && content !== undefined && title !== undefined && isEditing) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
      
      setAutoSaveStatus('saving')
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveCurrentNote()
        setAutoSaveStatus('saved')
      }, 1000) // Auto-save after 1 second of inactivity
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [selectedNote?.content, selectedNote?.title, selectedNote?.id, isEditing, saveCurrentNote])

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

      setNotes(prev => [newNote, ...prev])
      setSelectedNote(newNote)
      setShowCreateForm(false)
      setIsEditing(true)
      
      // Refresh stats
      await refreshStats()
      
      // Reset form
      setNewNoteTitle('')
      setNewNoteContent('')
      setNewNoteTags('')
    } catch (error) {
      console.error('Failed to create note:', error)
      setError('Failed to create note. Please try again.')
    } finally {
      setOperationLoading(prev => ({ ...prev, create: false }))
    }
  }, [newNoteTitle, newNoteContent, newNoteTags, refreshStats])

  const deleteNote = useCallback(async (noteId: string) => {
    try {
      setOperationLoading(prev => ({ ...prev, delete: true }))
      setError(null)
      
      await NotesApi.deleteNote(noteId)
      setNotes(prev => prev.filter(note => note.id !== noteId))
      
      if (selectedNote?.id === noteId) {
        setSelectedNote(null)
        setIsEditing(false)
      }
      
      // Refresh stats
      await refreshStats()
    } catch (error) {
      console.error('Failed to delete note:', error)
      
      // Still remove from UI for better UX, but show warning
      setNotes(prev => prev.filter(note => note.id !== noteId))
      if (selectedNote?.id === noteId) {
        setSelectedNote(null)
        setIsEditing(false)
      }
      
      if (!isOnline) {
        setHasOfflineChanges(true)
        setError('Note deleted locally. Changes will sync when connection is restored.')
      } else {
        setError('Note deleted locally, but may not be synced to server. Changes will sync when connection is restored.')
      }
      await refreshStats()
    } finally {
      setOperationLoading(prev => ({ ...prev, delete: false }))
    }
  }, [selectedNote?.id, refreshStats, isOnline])

  const togglePin = useCallback(async (noteId: string) => {
    try {
      setOperationLoading(prev => ({ ...prev, toggle: true }))
      setError(null)
      
      const updatedNote = await NotesApi.togglePin(noteId)
      setNotes(prev => prev.map(note => 
        note.id === noteId ? updatedNote : note
      ))
      
      if (selectedNote?.id === noteId) {
        setSelectedNote(updatedNote)
      }
      
      // Refresh stats
      await refreshStats()
    } catch (error) {
      console.error('Failed to toggle pin:', error)
      
      // Optimistically update UI even if API fails
      setNotes(prev => prev.map(note => 
        note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
      ))
      
      if (selectedNote?.id === noteId) {
        setSelectedNote(prev => prev ? { ...prev, isPinned: !prev.isPinned } : null)
      }
      
      if (!isOnline) {
        setHasOfflineChanges(true)
        setError('Pin status updated locally. Changes will sync when connection is restored.')
      } else {
        setError('Pin status updated locally, but may not be synced to server. Changes will sync when connection is restored.')
      }
      await refreshStats()
    } finally {
      setOperationLoading(prev => ({ ...prev, toggle: false }))
    }
  }, [selectedNote?.id, refreshStats, isOnline])

  const duplicateNote = useCallback(async (note: Note) => {
    try {
      setOperationLoading(prev => ({ ...prev, duplicate: true }))
      setError(null)
      
      const duplicatedNote = await NotesApi.duplicateNote(note.id)
      setNotes(prev => [duplicatedNote, ...prev])
      
      // Refresh stats
      await refreshStats()
    } catch (error) {
      console.error('Failed to duplicate note:', error)
      setError('Failed to duplicate note. Please try again.')
    } finally {
      setOperationLoading(prev => ({ ...prev, duplicate: false }))
    }
  }, [refreshStats])

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
    } catch (error) {
      console.error('Failed to search notes:', error)
      setError('Failed to search notes. Please try again.')
    } finally {
      setOperationLoading(prev => ({ ...prev, search: false }))
    }
  }, [loadNotesAndStats])

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

  const handleToggleEdit = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

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
      setAutoSaveStatus('unsaved')
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

  const handleTogglePin = useCallback((e: React.MouseEvent, noteId: string) => {
    e.stopPropagation()
    togglePin(noteId)
  }, [togglePin])

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

  const createTogglePinHandler = useCallback((noteId: string) => {
    return (e: React.MouseEvent) => handleTogglePin(e, noteId)
  }, [handleTogglePin])

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

        // If filtering by tag or pinned, apply those filters
        if (filterTag === 'pinned') return note.isPinned;
        if (filterTag !== 'all') return note.tags && note.tags.includes(filterTag);

        // Otherwise, show all notes (including archived)
        return true;
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        
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
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }, [])

  const getPreview = useCallback((content: string) => {
    return content.length > 150 ? content.substring(0, 150) + '...' : content
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Notes
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Capture your thoughts and organize your ideas.
            </p>
          </div>
          <div className="text-primary flex-shrink-0" aria-hidden="true">
            <StickyNote className="w-10 h-10 md:w-12 md:h-12" />
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" role="region" aria-label="Notes statistics">
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-2" aria-hidden="true">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1" aria-label={`${stats?.total || 0} total notes`}>
              {stats?.total || 0}
            </div>
            <div className="text-muted-foreground text-sm">Total Notes</div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-2" aria-hidden="true">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-yellow-500 mb-1" aria-label={`${stats?.pinned || 0} pinned notes`}>
              {stats?.pinned || 0}
            </div>
            <div className="text-muted-foreground text-sm">Pinned</div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-2" aria-hidden="true">
              <Tag className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-500 mb-1" aria-label={`${stats?.tagsCount || 0} unique tags`}>
              {stats?.tagsCount || 0}
            </div>
            <div className="text-muted-foreground text-sm">Tags</div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-2" aria-hidden="true">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-500 mb-1" aria-label={`${stats?.totalWords || 0} total words`}>
              {stats?.totalWords || 0}
            </div>
            <div className="text-muted-foreground text-sm">Words</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="lg:col-span-1">
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 mb-4">
              {/* Search and Filters */}
              <div className="space-y-4 mb-4" role="search" aria-label="Search and filter notes">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search notes..."
                    className="pl-10 bg-background/50"
                    aria-label="Search notes"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={filterTag}
                    onChange={handleFilterTagChange}
                    className="flex-1 bg-background/50 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label="Filter by tag"
                  >
                    <option value="all">All Notes</option>
                    <option value="pinned">Pinned</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={handleSortByChange}
                    className="bg-background/50 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                className="w-full mb-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={operationLoading.create}
                aria-label="Create new note"
              >
                <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                {operationLoading.create ? 'Creating...' : 'New Note'}
              </Button>
            </div>

            {/* Notes List */}
            <div 
              className="space-y-3 max-h-[600px] overflow-y-auto" 
              role="list" 
              aria-label={`Notes list with ${filteredNotes.length} ${filteredNotes.length === 1 ? 'note' : 'notes'}`}
            >
              {loading ? (
                <div className="text-center py-8" role="status" aria-live="polite">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
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
                    className={`bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 cursor-pointer hover:bg-card/50 transition-all duration-200 ${
                      selectedNote?.id === note.id ? 'ring-2 ring-primary/50 bg-card/50' : ''
                    } ${operationLoading.delete || operationLoading.toggle ? 'opacity-50 pointer-events-none' : ''}`}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`Note: ${note.title || 'Untitled'}. ${note.isPinned ? 'Pinned. ' : ''}${note.wordCount || 0} words. Updated ${formatDate(note.updatedAt || new Date().toISOString())}.`}
                    onKeyDown={createNoteKeyDownHandler(note)}
                  >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {note.isPinned && <Star className="w-4 h-4 text-yellow-500 fill-current" aria-label="Pinned note" />}
                      <h3 className="font-semibold text-foreground truncate">{note.title || 'Untitled'}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={createTogglePinHandler(note.id)}
                        className="p-1 hover:bg-accent/50 rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
                        disabled={operationLoading.toggle}
                        aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
                      >
                        {operationLoading.toggle ? (
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                        ) : (
                          <Star className={`w-4 h-4 ${note.isPinned ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                        )}
                      </button>
                      <button
                        onClick={createDeleteNoteHandler(note.id)}
                        className="p-1 hover:bg-accent/50 rounded text-muted-foreground hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        disabled={operationLoading.delete}
                        aria-label="Delete note"
                      >
                        {operationLoading.delete ? (
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                    {getPreview(note.content || '')}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(note.updatedAt || new Date().toISOString())}
                      </span>
                      <span>{note.wordCount || 0} words</span>
                    </div>
                  </div>
                  
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={`${noteKey}-tag-${tagIndex}-${tag}`}
                          className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{note.tags.length - 3} more
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
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Create New Note</h2>
                  <Button
                    onClick={handleCloseCreateForm}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
                    <Input
                      value={newNoteTitle}
                      onChange={handleNewNoteTitleChange}
                      placeholder="Enter note title..."
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Tags (comma-separated)</label>
                    <Input
                      value={newNoteTags}
                      onChange={handleNewNoteTagsChange}
                      placeholder="study, important, project..."
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Content</label>
                    <textarea
                      value={newNoteContent}
                      onChange={handleNewNoteContentChange}
                      placeholder="Start writing your note..."
                      className="w-full min-h-[300px] bg-background/50 border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={createNote}
                      disabled={!newNoteTitle.trim() || operationLoading.create}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {operationLoading.create ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Create Note
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCloseCreateForm}
                      variant="outline"
                      disabled={operationLoading.create}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : selectedNote ? (
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {isEditing ? (
                      <Input
                        ref={titleRef}
                        value={selectedNote.title}
                        onChange={handleNoteTitleChange}
                        className="text-xl font-semibold bg-transparent border-0 p-0 focus:ring-0"
                      />
                    ) : (
                      <h2 className="text-xl font-semibold text-foreground">{selectedNote.title}</h2>
                    )}
                    {selectedNote.isPinned && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mr-4">
                      {autoSaveStatus === 'saving' && (
                        <>
                          <div className="w-3 h-3 animate-spin rounded-full border border-muted-foreground border-t-transparent" />
                          Saving...
                        </>
                      )}
                      {autoSaveStatus === 'saved' && (
                        <>
                          <Check className="w-3 h-3 text-green-500" />
                          Saved
                        </>
                      )}
                      {autoSaveStatus === 'unsaved' && (
                        <>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                          Unsaved changes
                        </>
                      )}
                    </div>
                    
                    <Button
                      onClick={handleToggleEdit}
                      variant="outline"
                      size="sm"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      {isEditing ? 'Preview' : 'Edit'}
                    </Button>
                    
                    <Button
                      onClick={handleDuplicateNote}
                      variant="ghost"
                      size="sm"
                      disabled={operationLoading.duplicate}
                    >
                      {operationLoading.duplicate ? (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <Button
                      onClick={handleDeleteSelectedNote}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      disabled={operationLoading.delete}
                    >
                      {operationLoading.delete ? (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="mb-4">
                  {isEditing ? (
                    <textarea
                      ref={contentRef}
                      value={selectedNote.content}
                      onChange={handleNoteContentChange}
                      placeholder="Start writing your note..."
                      className="w-full min-h-[400px] bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground focus:outline-none text-base leading-relaxed"
                    />
                  ) : (
                    <div className="min-h-[400px] prose prose-sm max-w-none text-foreground">
                      {selectedNote.content.split('\n').map((line, index) => (
                        <p key={index} className="mb-3 leading-relaxed">
                          {line || '\u00A0'}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="border-t border-border/30 pt-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Created: {new Date(selectedNote.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Updated: {formatDate(selectedNote.updatedAt)}
                      </span>
                      <span>{selectedNote.wordCount} words</span>
                    </div>
                  </div>
                  
                  {selectedNote.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedNote.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                        >
                          <Tag className="w-3 h-3 inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-12 text-center">
                <StickyNote className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Select a note to view
                </h3>
                <p className="text-muted-foreground">
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
