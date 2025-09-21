'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, X } from 'lucide-react'
import { DiaryEntry } from '@/types'
import { loadDiaryEntries, updateDiaryEntry, generateSmartTitle } from '@/lib/utils/diary'
import LoadingSpinner from '@/components/ui/loading-spinner'

const DiaryEditPage = () => {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const entryId = params.id as string
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [originalEntry, setOriginalEntry] = useState<DiaryEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const loadEntry = () => {
      try {
        // First try to get data from URL params (when navigating from view page)
        const urlData = searchParams.get('data')
        if (urlData) {
          const entryData = JSON.parse(decodeURIComponent(urlData))
          setTitle(entryData.title || '')
          setContent(entryData.content || '')
          setOriginalEntry(entryData)
          setIsLoading(false)
          return
        }

        // Fallback: load from localStorage
        const entries = loadDiaryEntries()
        if (entries.length > 0) {
          const entry = entries.find(e => e.id === entryId)
          if (entry) {
            setTitle(entry.title)
            setContent(entry.content)
            setOriginalEntry(entry)
          } else {
            // Entry not found, redirect back
            router.push('/diary')
            return
          }
        } else {
          // No entries found, redirect back
          router.push('/diary')
          return
        }
      } catch (error) {
        console.error('Error loading entry for editing:', error)
        router.push('/diary')
        return
      } finally {
        setIsLoading(false)
      }
    }

    loadEntry()
  }, [entryId, searchParams, router])

  // Check for changes
  useEffect(() => {
    if (originalEntry) {
      const titleChanged = title !== originalEntry.title
      const contentChanged = content !== originalEntry.content
      setHasChanges(titleChanged || contentChanged)
    }
  }, [title, content, originalEntry])

  const handleSave = async () => {
    if (!originalEntry || isSaving) return

    setIsSaving(true)
    try {
      // Generate new title using shared utility
      let newTitle: string
      if (title.trim()) {
        // Use provided title if user entered one
        newTitle = title.trim()
      } else {
        // Generate smart title from content, use simple fallback if none found
        const smartTitle = generateSmartTitle(content, originalEntry?.createdAt ? new Date(originalEntry.createdAt) : undefined)
        newTitle = smartTitle || 'Untitled Entry'
      }
      
      // Update the entry using the utility function
      const updatedEntry = updateDiaryEntry(entryId, {
        title: newTitle,
        content: content,
      })

      if (!updatedEntry) {
        throw new Error('Entry not found')
      }

      // Navigate back to the entry view
      router.replace(`/diary/${entryId}`)
    } catch (error) {
      console.error('Error saving entry:', error)
      alert('Failed to save changes. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (hasChanges) {
      const confirmCancel = window.confirm(
        'You have unsaved changes. Are you sure you want to cancel?'
      )
      if (!confirmCancel) return
    }
    
    router.replace(`/diary/${entryId}`)
  }

  const handleBack = () => {
    if (hasChanges) {
      const confirmBack = window.confirm(
        'You have unsaved changes. Are you sure you want to go back?'
      )
      if (!confirmBack) return
    }
    
    router.replace(`/diary/${entryId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!originalEntry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Entry Not Found</h1>
          <p className="text-muted-foreground mb-6">The diary entry you&apos;re trying to edit doesn&apos;t exist.</p>
          <Link href="/diary">
            <Button>Back to Diary</Button>
          </Link>
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
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="hover:bg-accent/50"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Edit Entry</h1>
                <p className="text-sm text-muted-foreground">
                  {originalEntry.date} {hasChanges && '• Unsaved changes'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className="min-w-[100px]"
              >
                {isSaving ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your entry..."
              className="w-full px-4 py-3 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors overflow-hidden"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty to auto-generate from content
            </p>
          </div>

          {/* Content Field */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your diary entry here..."
              rows={20}
              className="w-full px-4 py-3 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors resize-vertical min-h-[400px] overflow-auto"
              style={{ fontFamily: 'inherit' }}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                {content.length} characters
              </p>
              {hasChanges && (
                <p className="text-xs text-amber-500">
                  Unsaved changes
                </p>
              )}
            </div>
          </div>

          {/* Save Button (Mobile) */}
          <div className="sm:hidden">
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="w-full"
              size="lg"
            >
              {isSaving ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiaryEditPage
