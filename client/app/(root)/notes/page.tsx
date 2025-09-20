'use client'

import React, { useState, useEffect, useRef } from 'react'
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

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  isPinned: boolean
  isArchived: boolean
  wordCount: number
}

const NotesPage = () => {
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
  
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('studyControlNotes')
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes)
      const notesWithDates = parsed.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
      }))
      setNotes(notesWithDates)
    }
  }, [])

  // Save notes to localStorage
  const saveNotesToStorage = (notesToSave: Note[]) => {
    localStorage.setItem('studyControlNotes', JSON.stringify(notesToSave))
  }

  // Auto-save functionality
  useEffect(() => {
    if (selectedNote && isEditing) {
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
  }, [selectedNote?.content, selectedNote?.title])

  const createNote = () => {
    if (!newNoteTitle.trim()) return

    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      isArchived: false,
      wordCount: newNoteContent.trim().split(/\s+/).filter(word => word !== '').length
    }

    const updatedNotes = [newNote, ...notes]
    setNotes(updatedNotes)
    saveNotesToStorage(updatedNotes)
    setSelectedNote(newNote)
    setShowCreateForm(false)
    setIsEditing(true)
    
    // Reset form
    setNewNoteTitle('')
    setNewNoteContent('')
    setNewNoteTags('')
  }

  const saveCurrentNote = () => {
    if (!selectedNote) return

    const updatedNote = {
      ...selectedNote,
      updatedAt: new Date(),
      wordCount: selectedNote.content.split(/\s+/).filter(word => word !== '').length
    }

    const updatedNotes = notes.map(note => 
      note.id === selectedNote.id ? updatedNote : note
    )
    
    setNotes(updatedNotes)
    saveNotesToStorage(updatedNotes)
    setSelectedNote(updatedNote)
  }

  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId)
    setNotes(updatedNotes)
    saveNotesToStorage(updatedNotes)
    
    if (selectedNote?.id === noteId) {
      setSelectedNote(null)
      setIsEditing(false)
    }
  }

  const togglePin = (noteId: string) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    )
    setNotes(updatedNotes)
    saveNotesToStorage(updatedNotes)
    
    if (selectedNote?.id === noteId) {
      setSelectedNote({ ...selectedNote, isPinned: !selectedNote.isPinned })
    }
  }

  const duplicateNote = (note: Note) => {
    const duplicatedNote: Note = {
      ...note,
      id: Date.now().toString(),
      title: `${note.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false
    }
    
    const updatedNotes = [duplicatedNote, ...notes]
    setNotes(updatedNotes)
    saveNotesToStorage(updatedNotes)
  }

  // Filter and search notes
  const filteredNotes = notes.filter(note => {
    if (note.isArchived) return false
    
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesTag = filterTag === 'all' || 
      (filterTag === 'pinned' && note.isPinned) ||
      note.tags.includes(filterTag)
    
    return matchesSearch && matchesTag
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    
    switch (sortBy) {
      case 'created':
        return b.createdAt.getTime() - a.createdAt.getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'updated':
      default:
        return b.updatedAt.getTime() - a.updatedAt.getTime()
    }
  })

  // Get all unique tags
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)))

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const getPreview = (content: string) => {
    return content.length > 150 ? content.substring(0, 150) + '...' : content
  }

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
          <div className="text-primary flex-shrink-0">
            <StickyNote className="w-10 h-10 md:w-12 md:h-12" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">{notes.length}</div>
            <div className="text-muted-foreground text-sm">Total Notes</div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-yellow-500 mb-1">
              {notes.filter(n => n.isPinned).length}
            </div>
            <div className="text-muted-foreground text-sm">Pinned</div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <Tag className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-500 mb-1">{allTags.length}</div>
            <div className="text-muted-foreground text-sm">Tags</div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {notes.reduce((acc, note) => acc + note.wordCount, 0)}
            </div>
            <div className="text-muted-foreground text-sm">Words</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="lg:col-span-1">
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 mb-4">
              {/* Search and Filters */}
              <div className="space-y-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes..."
                    className="pl-10 bg-background/50"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    className="flex-1 bg-background/50 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">All Notes</option>
                    <option value="pinned">Pinned</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-background/50 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="updated">Last Updated</option>
                    <option value="created">Date Created</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>

              {/* Create Note Button */}
              <Button
                onClick={() => setShowCreateForm(true)}
                className="w-full mb-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
            </div>

            {/* Notes List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => {
                    setSelectedNote(note)
                    setIsEditing(false)
                  }}
                  className={`bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 cursor-pointer hover:bg-card/50 transition-all duration-200 ${
                    selectedNote?.id === note.id ? 'ring-2 ring-primary/50 bg-card/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {note.isPinned && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      <h3 className="font-semibold text-foreground truncate">{note.title}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePin(note.id)
                        }}
                        className="p-1 hover:bg-accent/50 rounded"
                      >
                        <Star className={`w-4 h-4 ${note.isPinned ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNote(note.id)
                        }}
                        className="p-1 hover:bg-accent/50 rounded text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                    {getPreview(note.content)}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(note.updatedAt)}
                      </span>
                      <span>{note.wordCount} words</span>
                    </div>
                  </div>
                  
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
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
              ))}
              
              {filteredNotes.length === 0 && (
                <div className="text-center py-12">
                  <StickyNote className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">
                    {notes.length === 0 ? 'No notes yet' : 'No notes match your search'}
                  </p>
                  <p className="text-muted-foreground/70 text-sm mt-2">
                    {notes.length === 0 ? 'Create your first note to get started' : 'Try adjusting your search or filters'}
                  </p>
                </div>
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
                    onClick={() => setShowCreateForm(false)}
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
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      placeholder="Enter note title..."
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Tags (comma-separated)</label>
                    <Input
                      value={newNoteTags}
                      onChange={(e) => setNewNoteTags(e.target.value)}
                      placeholder="study, important, project..."
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Content</label>
                    <textarea
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      placeholder="Start writing your note..."
                      className="w-full min-h-[300px] bg-background/50 border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={createNote}
                      disabled={!newNoteTitle.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Create Note
                    </Button>
                    <Button
                      onClick={() => setShowCreateForm(false)}
                      variant="outline"
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
                        onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
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
                          <Clock className="w-3 h-3 animate-pulse" />
                          Saving...
                        </>
                      )}
                      {autoSaveStatus === 'saved' && (
                        <>
                          <Check className="w-3 h-3 text-green-500" />
                          Saved
                        </>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      {isEditing ? 'Preview' : 'Edit'}
                    </Button>
                    
                    <Button
                      onClick={() => duplicateNote(selectedNote)}
                      variant="ghost"
                      size="sm"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={() => deleteNote(selectedNote.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-4">
                  {isEditing ? (
                    <textarea
                      ref={contentRef}
                      value={selectedNote.content}
                      onChange={(e) => {
                        setSelectedNote({ ...selectedNote, content: e.target.value })
                        setAutoSaveStatus('unsaved')
                      }}
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
                        Created: {selectedNote.createdAt.toLocaleDateString()}
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
}

export default NotesPage
