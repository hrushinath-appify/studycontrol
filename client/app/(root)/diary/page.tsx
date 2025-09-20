'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Smile, Image, Mic, ChevronRight, Flame, Calendar, Trophy, Eye, FileText, Clock } from 'lucide-react'
import { loadDiaryEntries, saveStreakData, calculateStreak, saveDiaryEntries, generateSmartTitle, type StreakData } from '@/lib/utils/diary'

export interface DiaryEntry {
  id: string
  date: string
  title: string
  content: string
  preview: string
  createdAt: Date
}


const DiaryPage = () => {
  const [currentEntry, setCurrentEntry] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastEntryDate: null,
    totalEntries: 0
  })
  const [showStreakCelebration, setShowStreakCelebration] = useState(false)

  const user = { name: 'Ammu' }

  // Mock data for past entries with dates
  const pastEntries: DiaryEntry[] = [
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
      content: 'Learning about quantum mechanics...',
      preview: 'Thoughts on a new concept learned in physics',
      createdAt: new Date('2024-07-25')
    },
    {
      id: '3',
      date: 'July 24, 2024',
      title: 'A summary of the day\'s events and feelings',
      content: 'What an interesting day...',
      preview: 'A summary of the day\'s events and feelings',
      createdAt: new Date('2024-07-24')
    },
    {
      id: '4',
      date: 'July 23, 2024',
      title: 'Notes on a challenging math problem and its solution',
      content: 'Today I tackled a difficult calculus problem...',
      preview: 'Notes on a challenging math problem and its solution',
      createdAt: new Date('2024-07-23')
    },
    {
      id: '5',
      date: 'July 22, 2024',
      title: 'Reflections on a successful presentation in class',
      content: 'I presented my research today...',
      preview: 'Reflections on a successful presentation in class',
      createdAt: new Date('2024-07-22')
    }
  ]


  // Load entries and streak data from localStorage
  const loadEntriesAndStreakData = () => {
    // Load saved entries
    let currentEntries = loadDiaryEntries()
    
    if (currentEntries.length === 0) {
      // Use mock data initially
      currentEntries = pastEntries
      setEntries(pastEntries)
    } else {
      setEntries(currentEntries)
    }

    // Load streak data
          const streakDataFromStorage = localStorage.getItem('diaryStreakData')
    if (streakDataFromStorage) {
      setStreakData(JSON.parse(streakDataFromStorage))
    } else {
      // Calculate initial streak from current entries
      const calculated = calculateStreak(currentEntries)
      setStreakData(calculated)
      saveStreakData(calculated)
    }
  }

  useEffect(() => {
    loadEntriesAndStreakData()

    // Listen for custom events when entries are updated from other components
    const handleEntriesUpdate = () => {
      loadEntriesAndStreakData()
    }
    
    window.addEventListener('diaryEntriesUpdated', handleEntriesUpdate)

    return () => {
      window.removeEventListener('diaryEntriesUpdated', handleEntriesUpdate)
    }
  }, [])


  const handleSaveEntry = () => {
    if (currentEntry.trim()) {
      // Generate a smart title from content, use a simple fallback if none found
      const smartTitle = generateSmartTitle(currentEntry)
      const title = smartTitle || 'Untitled Entry'
      
      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        title: title,
        content: currentEntry,
        preview: currentEntry.substring(0, 100) + (currentEntry.length > 100 ? '...' : ''),
        createdAt: new Date()
      }
      
      // Add new entry to existing entries (latest first)
      const updatedEntries = [newEntry, ...entries]
      
      // Update entries state
      setEntries(updatedEntries)
      
      // Save entries to localStorage
      saveDiaryEntries(updatedEntries)
      
      // Recalculate streak
      const newStreakData = calculateStreak(updatedEntries)
      
      // Check if this creates a new streak milestone
      const wasStreakBroken = streakData.currentStreak === 0
      const isNewMilestone = newStreakData.currentStreak > 0 && 
        (newStreakData.currentStreak % 7 === 0 || // Weekly milestones
         newStreakData.currentStreak === 3 ||     // 3-day milestone
         newStreakData.currentStreak === 30 ||    // Monthly milestone
         wasStreakBroken)                         // Streak restoration
      
      if (isNewMilestone) {
        setShowStreakCelebration(true)
        setTimeout(() => setShowStreakCelebration(false), 3000)
      }
      
      // Save updated streak data
      saveStreakData(newStreakData)
      setStreakData(newStreakData)
      
      console.log('Saving entry:', currentEntry)
      console.log('New streak:', newStreakData.currentStreak)
      setCurrentEntry('')
    }
  }

  const getStreakMessage = () => {
    const streak = streakData.currentStreak
    if (streak === 0) return "Start your streak today!"
    if (streak === 1) return "Great start! Keep it going!"
    if (streak < 7) return `${streak} days strong! 🔥`
    if (streak < 30) return `Amazing ${streak}-day streak! 🚀`
    return `Incredible ${streak}-day streak! You're unstoppable! 🏆`
  }

  const getStreakColor = () => {
    const streak = streakData.currentStreak
    if (streak === 0) return "text-muted-foreground"
    if (streak < 3) return "text-orange-500"
    if (streak < 7) return "text-red-500"
    if (streak < 30) return "text-purple-500"
    return "text-yellow-500"
  }

  // Enhanced search function that includes date searching
  const searchEntries = (entries: DiaryEntry[], query: string): DiaryEntry[] => {
    if (!query.trim()) return entries
    
    const lowerQuery = query.toLowerCase().trim()
    
    return entries.filter(entry => {
      // Search in title and content
      const titleMatch = entry.title.toLowerCase().includes(lowerQuery)
      const contentMatch = entry.content.toLowerCase().includes(lowerQuery)
      
      // Search in date - support multiple date formats
      const dateMatch = searchByDate(entry, lowerQuery)
      
      return titleMatch || contentMatch || dateMatch
    })
  }

  // Helper function to search by date with various format support
  const searchByDate = (entry: DiaryEntry, query: string): boolean => {
    const entryDate = entry.createdAt
    const entryDateString = entry.date.toLowerCase()
    
    // Direct date string match (e.g., "july 26", "july 26, 2024")
    if (entryDateString.includes(query)) {
      return true
    }
    
    // Parse query for date components
    const queryLower = query.toLowerCase()
    
    // Month name matching
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ]
    
    const monthAbbr = [
      'jan', 'feb', 'mar', 'apr', 'may', 'jun',
      'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
    ]
    
    // Check if query contains month name or abbreviation
    for (let i = 0; i < months.length; i++) {
      const month = months[i]
      const monthAbbrItem = monthAbbr[i]
      if (month && monthAbbrItem && (queryLower.includes(month) || queryLower.includes(monthAbbrItem))) {
        const entryMonth = entryDate.getMonth()
        if (entryMonth === i) {
          // If only month is specified, match any day of that month
          if (queryLower === month || queryLower === monthAbbrItem) {
            return true
          }
          // If month and day are specified, check both
          const dayMatch = queryLower.match(/\d+/)
          if (dayMatch) {
            const queryDay = parseInt(dayMatch[0])
            const entryDay = entryDate.getDate()
            if (queryDay === entryDay) {
              return true
            }
          }
        }
      }
    }
    
    // Numeric date matching (e.g., "7/26", "07/26", "7-26", "26/7")
    const numericPatterns = [
      /(\d{1,2})[\/\-](\d{1,2})/,  // MM/DD or DD/MM
      /(\d{1,2})\s+(\d{1,2})/,     // MM DD or DD MM
    ]
    
    for (const pattern of numericPatterns) {
      const match = queryLower.match(pattern)
      if (match && match[1] && match[2]) {
        const num1 = parseInt(match[1])
        const num2 = parseInt(match[2])
        const entryMonth = entryDate.getMonth() + 1 // getMonth() returns 0-11
        const entryDay = entryDate.getDate()
        
        // Try both MM/DD and DD/MM formats
        if ((num1 === entryMonth && num2 === entryDay) || 
            (num1 === entryDay && num2 === entryMonth)) {
          return true
        }
      }
    }
    
    // Year matching (e.g., "2024")
    if (queryLower.match(/^\d{4}$/)) {
      const queryYear = parseInt(queryLower)
      const entryYear = entryDate.getFullYear()
      return queryYear === entryYear
    }
    
    // Relative date matching (e.g., "today", "yesterday", "this week")
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (queryLower === 'today') {
      return entryDate.toDateString() === today.toDateString()
    }
    
    if (queryLower === 'yesterday') {
      return entryDate.toDateString() === yesterday.toDateString()
    }
    
    if (queryLower === 'this week') {
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate >= weekAgo && entryDate <= today
    }
    
    if (queryLower === 'last week') {
      const twoWeeksAgo = new Date(today)
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate >= twoWeeksAgo && entryDate < weekAgo
    }
    
    return false
  }

  const filteredEntries = searchEntries(entries, searchQuery)

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Diary Mode
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Capture your daily reflections and insights.
            </p>
          </div>
          <div className="text-primary flex-shrink-0">
            <svg 
              width="40" 
              height="40" 
              className="md:w-12 md:h-12"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Streak Celebration */}
      {showStreakCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-8 py-4 rounded-2xl shadow-2xl animate-bounce">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div className="text-center">
                <div className="text-xl font-bold">Streak Milestone! 🎉</div>
                <div className="text-sm opacity-90">{getStreakMessage()}</div>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>
      )}

      {/* Streak Statistics */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Current Streak */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-3">
              <Flame className={`w-6 h-6 md:w-8 md:h-8 ${getStreakColor()} group-hover:scale-110 transition-transform duration-200`} />
            </div>
            <div className={`text-2xl md:text-3xl font-bold mb-2 ${getStreakColor()}`}>
              {streakData.currentStreak}
            </div>
            <div className="text-muted-foreground text-sm mb-1">
              Current Streak
            </div>
            <div className="text-xs text-muted-foreground/70">
              {getStreakMessage()}
            </div>
          </div>

          {/* Longest Streak */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-3">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">
              {streakData.longestStreak}
            </div>
            <div className="text-muted-foreground text-sm mb-1">
              Longest Streak
            </div>
            <div className="text-xs text-muted-foreground/70">
              Personal Best
            </div>
          </div>

          {/* Total Entries */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 md:w-8 md:h-8 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-2">
              {streakData.totalEntries}
            </div>
            <div className="text-muted-foreground text-sm mb-1">
              Total Entries
            </div>
            <div className="text-xs text-muted-foreground/70">
              All Time
            </div>
          </div>
        </div>
      </div>

      {/* Main Entry Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="space-y-4">
            {/* Entry Textarea */}
            <div className="relative">
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder={`What secrets does the night hold, ${user.name}?`}
                className="w-full min-h-[180px] md:min-h-[200px] bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground text-base md:text-lg leading-relaxed focus:outline-none focus:ring-0 p-0"
                style={{ fontFamily: 'inherit' }}
              />
            </div>

            {/* Entry Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/30">
              <div className="flex items-center space-x-2 md:space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-200"
                  title="Add emoji"
                >
                  <Smile className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-200"
                  title="Add image"
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-200"
                  title="Voice recording"
                >
                  <Mic className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
              <Button
                onClick={handleSaveEntry}
                disabled={!currentEntry.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                Save Entry
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Past Entries Section */}
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Past Entries
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Click on any entry to preview
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entries, dates (e.g., 'july 26', '7/26', 'today')..."
              className="pl-10 bg-card/30 border-border/50 rounded-full transition-all duration-200 focus:bg-card/50"
            />
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-3 md:space-y-4">
          {filteredEntries.map((entry, index) => (
            <Link key={entry.id} href={`/diary/${entry.id}`}>
              <div
                className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg md:rounded-xl p-4 md:p-6 hover:bg-card/50 hover:border-border/60 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-fade-in hover:scale-[1.02] active:scale-[0.98]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-semibold text-foreground text-sm md:text-base">
                        {entry.date}
                      </h3>
                      <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        <Eye className="h-3 w-3" />
                        <span>View Details</span>
                      </div>
                    </div>
                    
                    {/* Only show title if it's meaningful and not redundant */}
                    {entry.title && 
                     entry.title !== 'Untitled Entry' && 
                     !entry.content.startsWith(entry.title) && 
                     !entry.title.includes(entry.date) && (
                      <h4 className="font-medium text-foreground text-sm md:text-base mb-2 line-clamp-2">
                        {entry.title}
                      </h4>
                    )}
                    
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-3 mb-3">
                      {entry.preview}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {entry.content.length} characters
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {entry.createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-4 mt-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredEntries.length === 0 && searchQuery && (
          <div className="text-center py-8 md:py-12">
            <div className="text-muted-foreground/50 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-muted-foreground text-base md:text-lg">
              No entries found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-muted-foreground/70 text-sm mt-2">
              Try adjusting your search terms
            </p>
          </div>
        )}

        {filteredEntries.length === 0 && !searchQuery && (
          <div className="text-center py-8 md:py-12">
            <div className="text-muted-foreground/30 mb-4">
              <svg 
                className="h-16 w-16 mx-auto" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-muted-foreground text-base md:text-lg">
              No diary entries yet
            </p>
            <p className="text-muted-foreground/70 text-sm mt-2">
              Start writing to see your entries here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiaryPage