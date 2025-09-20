'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DiaryDetailView from '@/components/custom/DiaryDetailView'
import { DiaryEntry } from '../page'
import { loadDiaryEntries, deleteDiaryEntry } from '@/lib/utils/diary'
import LoadingSpinner from '@/components/ui/loading-spinner'

// Mock data - fallback when no saved entries exist
const mockEntries: DiaryEntry[] = [
  {
    id: '1',
    date: 'July 26, 2024',
    title: 'Reflections on today\'s study session and personal growth - A detailed analysis',
    content: `Today was a remarkably productive day that I want to document in detail. I woke up early at 6:00 AM, feeling refreshed and energized after a good night's sleep. The morning routine went smoothly - I started with a 20-minute meditation session that helped center my mind for the day ahead.

My first study session began at 7:30 AM with advanced calculus. I worked through several challenging integration problems, particularly focusing on integration by parts and partial fractions. The concept that initially seemed daunting last week is now becoming clearer. I spent about 2 hours on this subject and managed to complete all the exercises in chapter 12.

Around 10:00 AM, I took a well-deserved break and had a healthy breakfast consisting of oatmeal with fresh berries and a cup of green tea. This fuel gave me the energy I needed for the next study session.

From 10:30 AM to 12:30 PM, I dove into organic chemistry. Today's focus was on reaction mechanisms, specifically nucleophilic substitution reactions. I created detailed diagrams showing the step-by-step process of SN1 and SN2 reactions, including the factors that influence which mechanism predominates. The visual approach really helped me understand the three-dimensional aspects of these reactions.

Lunch break was at 12:30 PM, followed by a 30-minute walk in the park. The fresh air and light exercise helped clear my mind and prepare for the afternoon session.

The afternoon was dedicated to physics - specifically quantum mechanics. I worked on understanding wave functions and the Schrödinger equation. This is perhaps the most challenging subject I'm tackling this semester, but I'm starting to appreciate the mathematical beauty behind the physics. I spent considerable time on the particle in a box problem and finally grasped how boundary conditions affect the wave function solutions.

Around 4:00 PM, I had a virtual study group session with three classmates. We discussed the quantum mechanics problems and helped each other with concepts we found difficult. Collaborative learning really enhances understanding - explaining concepts to others forces you to think more deeply about the material.

The evening was reserved for review and consolidation. I went through my notes from all three subjects, creating mind maps and summary sheets. This active review process helps transfer information from short-term to long-term memory.

I also spent some time planning tomorrow's study schedule, ensuring I maintain this productive momentum. Setting clear goals and time blocks has been crucial to my success.

Reflecting on today, I feel a deep sense of accomplishment. Not just because of the material covered, but because of the disciplined approach I maintained throughout the day. Each study session built upon the previous one, creating a compound effect of learning.

This experience reinforces my belief that consistent, focused effort yields remarkable results. Tomorrow, I plan to tackle differential equations, continue with organic chemistry synthesis problems, and delve deeper into quantum mechanical operators.

The key lessons from today:
1. Early morning study sessions are highly effective
2. Regular breaks enhance focus and retention
3. Visual learning aids (diagrams, mind maps) are invaluable
4. Collaborative study sessions provide new perspectives
5. End-of-day review consolidates learning

I'm grateful for this productive day and excited to continue this journey of learning and growth.`,
    preview: 'Reflections on today\'s study session and personal growth - A detailed analysis',
    createdAt: new Date('2024-07-26')
  },
  {
    id: '2',
    date: 'July 25, 2024',
    title: 'Thoughts on a new concept learned in physics',
    content: 'Learning about quantum mechanics was fascinating today. The wave-particle duality concept really opened my mind to how different the quantum world is from our everyday experience. I spent hours working through the double-slit experiment and understanding how particles can exist in superposition until observed.',
    preview: 'Thoughts on a new concept learned in physics',
    createdAt: new Date('2024-07-25')
  },
  {
    id: '3',
    date: 'July 24, 2024',
    title: 'A summary of the day\'s events and feelings',
    content: 'What an interesting day it was. I had a great conversation with my professor about career paths in research, and it really got me thinking about my future goals. The afternoon was spent working on my research project, and I made some significant progress on the data analysis.',
    preview: 'A summary of the day\'s events and feelings',
    createdAt: new Date('2024-07-24')
  },
  {
    id: '4',
    date: 'July 23, 2024',
    title: 'Notes on a challenging math problem and its solution',
    content: 'Today I tackled a difficult calculus problem that had been bothering me for days. After several hours of work, I finally found the solution using integration by parts combined with a clever substitution. The feeling of finally understanding it was incredible.',
    preview: 'Notes on a challenging math problem and its solution',
    createdAt: new Date('2024-07-23')
  },
  {
    id: '5',
    date: 'July 22, 2024',
    title: 'Reflections on a successful presentation in class',
    content: 'I presented my research today and it went better than expected. The feedback from my classmates was really encouraging, and I feel more confident about my presentation skills. I\'m looking forward to the next opportunity to share my work.',
    preview: 'Reflections on a successful presentation in class',
    createdAt: new Date('2024-07-22')
  }
]

const DiaryDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const entryId = params.id as string
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load entries from localStorage and listen for changes
  useEffect(() => {
    const loadEntries = () => {
      try {
        const savedEntries = loadDiaryEntries()
        if (savedEntries.length > 0) {
          setEntries(savedEntries)
        } else {
          // Use mock data if no saved entries
          setEntries(mockEntries)
        }
      } catch (error) {
        console.error('Error loading entries:', error)
        setEntries(mockEntries)
      } finally {
        setIsLoading(false)
      }
    }

    // Only load if we don't have entries yet or if the current entry is not found
    if (entries.length === 0 || !entries.find(entry => entry.id === entryId)) {
      loadEntries()
    } else {
      setIsLoading(false)
    }

    // Listen for storage changes (when entries are updated from other tabs/components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'diaryEntries') {
        loadEntries()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events (for same-tab updates)
    const handleEntriesUpdate = () => {
      loadEntries()
    }
    
    window.addEventListener('diaryEntriesUpdated', handleEntriesUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('diaryEntriesUpdated', handleEntriesUpdate)
    }
  }, [entryId, entries.length])

  // Find the current entry
  const currentEntry = entries.find(entry => entry.id === entryId)
  const currentIndex = entries.findIndex(entry => entry.id === entryId)
  
  // Get previous and next entries
  const previousEntry = currentIndex > 0 ? entries[currentIndex - 1] : null
  const nextEntry = currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!currentEntry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Entry Not Found</h1>
          <p className="text-muted-foreground mb-6">The diary entry you&apos;re looking for doesn&apos;t exist.</p>
          <button 
            onClick={() => router.push('/diary')}
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Back to Diary
          </button>
        </div>
      </div>
    )
  }

  const handlePrevious = () => {
    if (previousEntry) {
      // Use replace to avoid adding to history stack for smoother navigation
      router.replace(`/diary/${previousEntry.id}`)
    }
  }

  const handleNext = () => {
    if (nextEntry) {
      // Use replace to avoid adding to history stack for smoother navigation  
      router.replace(`/diary/${nextEntry.id}`)
    }
  }

  const handleEdit = () => {
    // Navigate to edit mode with entry data
    const entryData = encodeURIComponent(JSON.stringify({
      id: currentEntry.id,
      title: currentEntry.title,
      content: currentEntry.content
    }))
    router.push(`/diary/edit/${currentEntry.id}?data=${entryData}`)
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${currentEntry.title}"?\n\nThis action cannot be undone.`
    )
    
    if (confirmDelete) {
      try {
        const updatedEntries = deleteDiaryEntry(currentEntry.id)
        
        if (updatedEntries === null) {
          throw new Error('Entry not found')
        }
        
        // Navigate back to diary list
        router.push('/diary')
      } catch (error) {
        console.error('Error deleting entry:', error)
        alert('Failed to delete entry. Please try again.')
      }
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentEntry.title,
        text: currentEntry.preview,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
    }
  }

  return (
    <DiaryDetailView
      entry={currentEntry}
      previousEntry={previousEntry ?? null}
      nextEntry={nextEntry ?? null}
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
