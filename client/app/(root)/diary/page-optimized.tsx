'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Smile, ImageIcon, Mic, ChevronRight, Flame, Calendar, Trophy, Eye, FileText, Clock } from 'lucide-react'
import { DiaryApi, type DiaryEntry as ApiDiaryEntry, type DiaryStats } from '@/lib/api/diary'
import { generateSmartTitle } from '@/lib/utils/diary'
import AuthGuard from '@/components/AuthGuard'
import { VirtualizedList, OptimizedListItem } from '@/components/optimized'
import { useDebounce } from '@/hooks/use-debounce'

// Use the API interface
type DiaryEntry = ApiDiaryEntry

// Memoized stat card component
const StatCard = React.memo<{
  icon: React.ReactNode
  value: number
  label: string
  subtitle: string
  color: string
}>(({ icon, value, label, subtitle, color }) => (
  <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300 group">
    <div className="flex items-center justify-center mb-3">
      <div className={`w-6 h-6 md:w-8 md:h-8 ${color} group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
    </div>
    <div className={`text-2xl md:text-3xl font-bold mb-2 ${color}`}>
      {value}
    </div>
    <div className="text-muted-foreground text-sm mb-1">
      {label}
    </div>
    <div className="text-xs text-muted-foreground/70">
      {subtitle}
    </div>
  </div>
))

StatCard.displayName = 'StatCard'

// Memoized diary entry item
const DiaryEntryItem = React.memo<{
  entry: DiaryEntry
  index: number
}>(({ entry, index }) => (
  <Link href={`/diary/${entry.id}`} className="block">
    <OptimizedListItem
      className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg md:rounded-xl p-4 md:p-6 hover:bg-card/50 hover:border-border/60 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-fade-in hover:scale-[1.02] active:scale-[0.98]"
    >
      <div 
        className="flex items-start justify-between"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
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
              {entry.wordCount || entry.content.length} words
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(entry.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </span>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-4 mt-1" />
      </div>
    </OptimizedListItem>
  </Link>
))

DiaryEntryItem.displayName = 'DiaryEntryItem'

const DiaryPageContent = React.memo(() => {
  const [currentEntry, setCurrentEntry] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [streakData, setStreakData] = useState<DiaryStats | null>(null)
  const [showStreakCelebration, setShowStreakCelebration] = useState(false)
  const [loading, setLoading] = useState(true)

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const user = useMemo(() => ({ name: 'Ammu' }), [])

  // Load entries and stats from database
  const loadEntriesAndStats = useCallback(async () => {
    try {
      setLoading(true)
      
      const [entriesData, statsData] = await Promise.all([
        DiaryApi.getEntries(),
        DiaryApi.getStats()
      ])
      
      setEntries(entriesData)
      setStreakData(statsData)
    } catch (error) {
      console.error('Failed to load diary data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadEntriesAndStats()

    // Listen for custom events when entries are updated from other components
    const handleEntriesUpdate = () => {
      loadEntriesAndStats()
    }
    
    window.addEventListener('diaryEntriesUpdated', handleEntriesUpdate)

    return () => {
      window.removeEventListener('diaryEntriesUpdated', handleEntriesUpdate)
    }
  }, [loadEntriesAndStats])

  const handleSaveEntry = useCallback(async () => {
    if (currentEntry.trim()) {
      try {
        // Generate a smart title from content, use a simple fallback if none found
        const smartTitle = generateSmartTitle(currentEntry)
        const title = smartTitle || 'Untitled Entry'
        
        // Create entry via API
        const newEntry = await DiaryApi.createEntry({
          title,
          content: currentEntry
        })
        
        // Update local state
        setEntries(prev => [newEntry, ...prev])
        
        // Reload stats to get updated streak data
        const updatedStats = await DiaryApi.getStats()
        setStreakData(updatedStats)
      
        // Check if this creates a new streak milestone
        const wasStreakBroken = streakData?.currentStreak === 0
        const isNewMilestone = updatedStats.currentStreak > 0 && 
          (updatedStats.currentStreak % 7 === 0 || // Weekly milestones
           updatedStats.currentStreak === 3 ||     // 3-day milestone
           updatedStats.currentStreak === 30 ||    // Monthly milestone
         wasStreakBroken)                         // Streak restoration
      
        if (isNewMilestone) {
          setShowStreakCelebration(true)
          setTimeout(() => setShowStreakCelebration(false), 3000)
        }
      
        console.log('Entry saved successfully:', newEntry)
        setCurrentEntry('')
      } catch (error) {
        console.error('Failed to save diary entry:', error)
      }
    }
  }, [currentEntry, streakData?.currentStreak])

  // Search entries using database API
  const searchEntries = useCallback(async (query: string) => {
    if (!query.trim()) {
      await loadEntriesAndStats()
      return
    }
    
    try {
      const searchResults = await DiaryApi.searchEntries(query)
      setEntries(searchResults)
    } catch (error) {
      console.error('Failed to search entries:', error)
    }
  }, [loadEntriesAndStats])

  // Handle search with debounced query
  useEffect(() => {
    searchEntries(debouncedSearchQuery)
  }, [debouncedSearchQuery, searchEntries])

  // Memoized handlers
  const handleCurrentEntryChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentEntry(e.target.value)
  }, [])

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  // Memoized streak calculations
  const streakMessage = useMemo(() => {
    const streak = streakData?.currentStreak || 0
    if (streak === 0) return "Start your streak today!"
    if (streak === 1) return "Great start! Keep it going!"
    if (streak < 7) return `${streak} days strong! 🔥`
    if (streak < 30) return `Amazing ${streak}-day streak! 🚀`
    return `Incredible ${streak}-day streak! You're unstoppable! 🏆`
  }, [streakData?.currentStreak])

  const streakColor = useMemo(() => {
    const streak = streakData?.currentStreak || 0
    if (streak === 0) return "text-muted-foreground"
    if (streak < 3) return "text-orange-500"
    if (streak < 7) return "text-red-500"
    if (streak < 30) return "text-purple-500"
    return "text-yellow-500"
  }, [streakData?.currentStreak])

  // Virtual list render function
  const renderEntry = useCallback((entry: DiaryEntry, index: number) => (
    <DiaryEntryItem key={entry.id || `entry-${index}`} entry={entry} index={index} />
  ), [])

  // Filter function for virtual list
  const filterFn = useCallback((entry: DiaryEntry, query: string) => {
    return entry.content.toLowerCase().includes(query.toLowerCase()) ||
           entry.title?.toLowerCase().includes(query.toLowerCase()) ||
           entry.date.toLowerCase().includes(query.toLowerCase())
  }, [])

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
                <div className="text-sm opacity-90">{streakMessage}</div>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>
      )}

      {/* Streak Statistics */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            icon={<Flame className="w-full h-full" />}
            value={streakData?.currentStreak || 0}
            label="Current Streak"
            subtitle={streakMessage}
            color={streakColor}
          />
          
          <StatCard
            icon={<Trophy className="w-full h-full" />}
            value={streakData?.longestStreak || 0}
            label="Longest Streak"
            subtitle="Personal Best"
            color="text-yellow-500"
          />
          
          <StatCard
            icon={<Calendar className="w-full h-full" />}
            value={streakData?.totalEntries || 0}
            label="Total Entries"
            subtitle="All Time"
            color="text-blue-500"
          />
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
                onChange={handleCurrentEntryChange}
                placeholder={`What secrets does the night hold, ${user.name}?`}
                autoComplete="off"
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
                  <ImageIcon className="h-4 w-4 md:h-5 md:w-5" />
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
              onChange={handleSearchInputChange}
              placeholder="Search entries..."
              autoComplete="off"
              className="pl-10 bg-card/30 border-border/50 rounded-full transition-all duration-200 focus:bg-card/50"
            />
          </div>
        </div>

        {/* Entries List with Virtualization for better performance */}
        <div className="space-y-3 md:space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Loading entries...</div>
            </div>
          ) : entries.length === 0 ? (
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
          ) : entries.length > 10 ? (
            // Use virtualized list for better performance with many entries
            <VirtualizedList
              items={entries}
              renderItem={renderEntry}
              itemHeight={200}
              containerHeight={800}
              searchQuery={debouncedSearchQuery}
              filterFn={filterFn}
            />
          ) : (
            // Regular list for smaller datasets
            entries.map((entry, index) => (
              <DiaryEntryItem key={entry.id || `entry-${index}`} entry={entry} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  )
})

DiaryPageContent.displayName = 'DiaryPageContent'

const DiaryPage = () => {
  return (
    <AuthGuard>
      <DiaryPageContent />
    </AuthGuard>
  )
}

export default DiaryPage