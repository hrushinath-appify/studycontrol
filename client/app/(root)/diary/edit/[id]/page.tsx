'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, X } from 'lucide-react'
import { DiaryApi } from '@/lib/api/diary'
import { DiaryEntry } from '@/types'
import { generateSmartTitle } from '@/lib/utils/diary'
import LoadingSpinner from '@/components/ui/loading-spinner'

const DiaryEditPage = () => {
  const params = useParams()
  const router = useRouter()
  const entryId = params.id as string
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [originalEntry, setOriginalEntry] = useState<DiaryEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEntry = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const entry = await DiaryApi.getEntryById(entryId)
        if (entry) {
          setTitle(entry.title)
          setContent(entry.content)
          setOriginalEntry(entry)
        } else {
          setError('Entry not found')
          setTimeout(() => router.push('/diary'), 2000)
        }
      } catch (error) {
        console.error('Error loading entry:', error)
        setError('Failed to load entry')
        setTimeout(() => router.push('/diary'), 2000)
      } finally {
        setIsLoading(false)
      }
    }

    if (entryId) {
      loadEntry()
    }
  }, [entryId, router])

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }, [])

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }, [])

  // Check for changes
  useEffect(() => {
    if (originalEntry) {
      const titleChanged = title !== originalEntry.title
      const contentChanged = content !== originalEntry.content
      setHasChanges(titleChanged || contentChanged)
    }
  }, [title, content, originalEntry])

  const handleSave = useCallback(async () => {
    if (!originalEntry || !hasChanges) return

    try {
      setIsSaving(true)
      
      // Use the provided title or generate a smart one if empty
      let finalTitle = title.trim()
      if (!finalTitle) {
        const smartTitle = generateSmartTitle(content)
        finalTitle = smartTitle || 'Untitled Entry'
      }

      await DiaryApi.updateEntry({
        id: entryId,
        title: finalTitle,
        content: content.trim()
      })

      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('diaryEntriesUpdated'))

      // Navigate back to the entry
      router.push(`/diary/${entryId}`)
    } catch (error) {
      console.error('Error saving entry:', error)
      alert('Failed to save entry. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }, [originalEntry, hasChanges, title, content, entryId, router])

  const handleCancel = useCallback(() => {
    if (hasChanges) {
      const confirmCancel = window.confirm(
        'You have unsaved changes. Are you sure you want to cancel?'
      )
      if (!confirmCancel) return
    }
    
    router.push(`/diary/${entryId}`)
  }, [hasChanges, entryId, router])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
          e.preventDefault()
          if (hasChanges && !isSaving) {
            handleSave()
          }
        }
      }
      if (e.key === 'Escape') {
        handleCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasChanges, isSaving, handleSave, handleCancel])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <p className="text-sm text-muted-foreground">Redirecting to diary...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href={`/diary/${entryId}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent/50"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Edit Entry</h1>
                <p className="text-sm text-muted-foreground">
                  {hasChanges ? 'Unsaved changes' : 'No changes'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={handleCancel}
                disabled={isSaving}
                className="hover:bg-accent/50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title for your entry..."
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder="Write your diary entry here..."
              rows={20}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <div className="text-sm text-muted-foreground">
              {content.trim().split(/\s+/).filter(word => word.length > 0).length} words • Press Ctrl+S to save • Esc to cancel
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiaryEditPage
