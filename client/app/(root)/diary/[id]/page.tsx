'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DiaryDetailView from '@/components/custom/DiaryDetailView'
import { DiaryApi } from '@/lib/api/diary'
import { DiaryEntry } from '@/types'
import LoadingSpinner from '@/components/ui/loading-spinner'

const DiaryDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const rawId = params.id as string
  
  // Decode the URL parameter in case it's URL-encoded
  const entryId = rawId ? decodeURIComponent(rawId) : rawId
  
  // Debug logging to see what ID we're getting
  console.log('🔍 Debug - Raw ID from params:', rawId)
  console.log('🔍 Debug - Decoded ID:', entryId)
  console.log('🔍 Debug - ID length:', entryId?.length)
  console.log('🔍 Debug - Is valid ObjectId:', entryId ? /^[0-9a-fA-F]{24}$/.test(entryId) : false)
  const [currentEntry, setCurrentEntry] = useState<DiaryEntry | null>(null)
  const [allEntries, setAllEntries] = useState<DiaryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load entry and related entries
  useEffect(() => {
    const loadEntryData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Validate ID format before making API call
        if (!entryId || entryId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(entryId)) {
          console.error('❌ Invalid diary entry ID format:', {
            entryId,
            length: entryId?.length,
            expected: '24 hex characters',
            received: entryId
          })
          setError('Invalid diary entry ID format. The entry link may be corrupted.')
          setIsLoading(false)
          return
        }

        console.log('✅ Fetching diary entry with valid ID:', entryId)

        // Load all entries to get navigation data
        const [entry, entries] = await Promise.all([
          DiaryApi.getEntryById(entryId),
          DiaryApi.getEntries()
        ])

        if (!entry) {
          console.error('❌ Entry not found for ID:', entryId)
          setError('Entry not found')
          return
        }

        console.log('✅ Successfully loaded entry:', {
          id: entry.id,
          title: entry.title,
          date: entry.date
        })

        setCurrentEntry(entry)
        setAllEntries(entries)
      } catch (error) {
        console.error('❌ Error loading entry data:', error)
        
        // Provide specific error messages based on error type
        if (error instanceof Error) {
          if (error.message.includes('Invalid diary entry ID format')) {
            setError('Invalid diary entry URL. Please check the link and try again.')
          } else if (error.message.includes('diary entry ID is required')) {
            setError('No diary entry specified. Please select an entry to view.')
          } else if (error.message.includes('Authentication')) {
            setError('Please log in to view diary entries.')
          } else if (error.message.includes('Network')) {
            setError('Unable to connect. Please check your internet connection and try again.')
          } else {
            setError('Failed to load diary entry. Please try again.')
          }
        } else {
          setError('Failed to load diary entry')
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (entryId) {
      loadEntryData()
    }
  }, [entryId])

  // Event handlers defined with useCallback
  const handleBackToDiary = useCallback(() => {
    router.push('/diary')
  }, [router])

  const handlePrevious = useCallback(() => {
    const currentIndex = allEntries.findIndex(entry => entry.id === entryId)
    const previousEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null
    if (previousEntry) {
      router.replace(`/diary/${previousEntry.id}`)
    }
  }, [allEntries, entryId, router])

  const handleNext = useCallback(() => {
    const currentIndex = allEntries.findIndex(entry => entry.id === entryId)
    const nextEntry = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null
    if (nextEntry) {
      router.replace(`/diary/${nextEntry.id}`)
    }
  }, [allEntries, entryId, router])

  const handleEdit = useCallback(() => {
    if (currentEntry) {
      router.push(`/diary/edit/${currentEntry.id}`)
    }
  }, [currentEntry, router])

  const handleDelete = useCallback(async () => {
    if (!currentEntry) return
    
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${currentEntry.title}"?\n\nThis action cannot be undone.`
    )
    
    if (confirmDelete) {
      try {
        await DiaryApi.deleteEntry(currentEntry.id)
        
        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('diaryEntriesUpdated'))
        window.dispatchEvent(new CustomEvent('userStatsUpdated'))
        
        // Navigate back to diary list
        router.push('/diary')
      } catch (error) {
        console.error('Error deleting entry:', error)
        
        // Provide specific error messages
        let errorMessage = 'Failed to delete entry. Please try again.'
        if (error instanceof Error) {
          if (error.message.includes('Invalid diary entry ID format')) {
            errorMessage = 'Invalid entry. The entry may have already been deleted.'
          } else if (error.message.includes('Authentication')) {
            errorMessage = 'Please log in to delete entries.'
          } else if (error.message.includes('Network')) {
            errorMessage = 'Connection failed. Please check your internet and try again.'
          }
        }
        
        alert(errorMessage)
      }
    }
  }, [currentEntry, router])

  const handleShare = useCallback(() => {
    if (!currentEntry) return
    
    if (navigator.share) {
      navigator.share({
        title: currentEntry.title,
        text: currentEntry.content.substring(0, 100) + '...',
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }, [currentEntry])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Show error state
  if (error || !currentEntry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Entry Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The diary entry you're looking for doesn't exist."}
          </p>
          <button 
            onClick={handleBackToDiary}
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Back to Diary
          </button>
        </div>
      </div>
    )
  }

  // Find current entry index and navigation entries
  const currentIndex = allEntries.findIndex(entry => entry.id === entryId)
  const previousEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null
  const nextEntry = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null

  return (
    <DiaryDetailView
      entry={currentEntry}
      {...(previousEntry && { previousEntry })}
      {...(nextEntry && { nextEntry })}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onShare={handleShare}
      showBackButton={true}
      backHref="/diary"
    />
  )
}

export default DiaryDetailPage
