import { DiaryEntry } from '@/app/(root)/diary/page'
import { diaryCache, CACHE_KEYS } from './cache'

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastEntryDate: string | null
  totalEntries: number
}

/**
 * Calculate streak data based on diary entries
 * @param entries Array of diary entries
 * @returns StreakData object with current streak, longest streak, last entry date, and total entries
 */
export const calculateStreak = (entries: DiaryEntry[]): StreakData => {
  if (entries.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastEntryDate: null, totalEntries: 0 }
  }

  // Sort entries by date (most recent first)
  const sortedEntries = entries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  
  // Group entries by date (in case multiple entries per day)
  const entriesByDate = new Map<string, DiaryEntry[]>()
  sortedEntries.forEach(entry => {
    const dateKey = entry.createdAt.toISOString().split('T')[0]!
    if (!entriesByDate.has(dateKey)) {
      entriesByDate.set(dateKey, [])
    }
    entriesByDate.get(dateKey)!.push(entry)
  })

  const uniqueDates = Array.from(entriesByDate.keys()).sort().reverse()
  
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0
  
  const today = new Date().toISOString().split('T')[0]!
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]!
  
  // Calculate current streak
  const streakDate = new Date()
  for (let i = 0; i < uniqueDates.length; i++) {
    const entryDate = uniqueDates[i]
    const expectedDate = new Date(streakDate).toISOString().split('T')[0]!
    
    if (entryDate === expectedDate) {
      currentStreak++
      streakDate.setDate(streakDate.getDate() - 1)
    } else if (i === 0 && entryDate === yesterday && !uniqueDates.includes(today)) {
      // If the most recent entry is yesterday and there's no entry today, start from yesterday
      currentStreak++
      streakDate.setDate(streakDate.getDate() - 2)
    } else {
      break
    }
  }
  
  // Calculate longest streak
  tempStreak = 1
  longestStreak = 1
  
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const currentDate = new Date(uniqueDates[i]!)
    const nextDate = new Date(uniqueDates[i + 1]!)
    const diffTime = currentDate.getTime() - nextDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      tempStreak++
      longestStreak = Math.max(longestStreak, tempStreak)
    } else {
      tempStreak = 1
    }
  }
  
  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    lastEntryDate: uniqueDates[0] || null,
    totalEntries: entries.length
  }
}

/**
 * Load diary entries from localStorage with proper type conversion
 * @returns Array of DiaryEntry objects
 */
export const loadDiaryEntries = (): DiaryEntry[] => {
  try {
    // Check cache first
    const cached = diaryCache.get(CACHE_KEYS.DIARY_ENTRIES)
    if (cached) {
      return cached
    }

    const savedEntries = localStorage.getItem('diaryEntries')
    if (savedEntries) {
      const entries = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        createdAt: new Date(entry.createdAt)
      }))
      
      // Cache the loaded entries
      diaryCache.set(CACHE_KEYS.DIARY_ENTRIES, entries)
      return entries
    }
    return []
  } catch (error) {
    console.error('Error loading diary entries:', error)
    return []
  }
}

/**
 * Save diary entries to localStorage
 * @param entries Array of DiaryEntry objects to save
 */
export const saveDiaryEntries = (entries: DiaryEntry[]): void => {
  try {
    localStorage.setItem('diaryEntries', JSON.stringify(entries))
    
    // Update cache
    diaryCache.set(CACHE_KEYS.DIARY_ENTRIES, entries)
    
    // Dispatch custom event to notify other components of the update
    window.dispatchEvent(new CustomEvent('diaryEntriesUpdated'))
  } catch (error) {
    console.error('Error saving diary entries:', error)
    throw error
  }
}

/**
 * Load streak data from localStorage
 * @returns StreakData object
 */
export const loadStreakData = (): StreakData | null => {
  try {
    const savedStreak = localStorage.getItem('diaryStreakData')
    return savedStreak ? JSON.parse(savedStreak) : null
  } catch (error) {
    console.error('Error loading streak data:', error)
    return null
  }
}

/**
 * Save streak data to localStorage
 * @param streakData StreakData object to save
 */
export const saveStreakData = (streakData: StreakData): void => {
  try {
    localStorage.setItem('diaryStreakData', JSON.stringify(streakData))
  } catch (error) {
    console.error('Error saving streak data:', error)
    throw error
  }
}

/**
 * Update diary entries and recalculate streak data
 * @param entries Updated array of DiaryEntry objects
 */
export const updateEntriesAndStreak = (entries: DiaryEntry[]): void => {
  try {
    // Save entries
    saveDiaryEntries(entries)
    
    // Recalculate and save streak data
    const newStreakData = calculateStreak(entries)
    saveStreakData(newStreakData)
  } catch (error) {
    console.error('Error updating entries and streak:', error)
    throw error
  }
}

/**
 * Delete a diary entry by ID and update streak data
 * @param entryId ID of the entry to delete
 * @returns Updated array of entries, or null if entry not found
 */
export const deleteDiaryEntry = (entryId: string): DiaryEntry[] | null => {
  try {
    const entries = loadDiaryEntries()
    const entryIndex = entries.findIndex(entry => entry.id === entryId)
    
    if (entryIndex === -1) {
      return null // Entry not found
    }
    
    const updatedEntries = entries.filter(entry => entry.id !== entryId)
    updateEntriesAndStreak(updatedEntries)
    
    return updatedEntries
  } catch (error) {
    console.error('Error deleting diary entry:', error)
    throw error
  }
}

/**
 * Generate a smart title from content
 * @param content The diary entry content
 * @param fallbackDate Date to use for fallback title
 * @returns Generated title string, or null if no meaningful title can be generated
 */
export const generateSmartTitle = (content: string, _fallbackDate?: Date): string | null => {
  const firstLine = content.split('\n')[0]?.trim()
  
  if (!firstLine) {
    return null
  }
  
  // Check if the first line looks like a title (reasonable length, not just random characters)
  const isValidTitle = (text: string) => {
    // Must be between 3 and 100 characters
    if (text.length < 3 || text.length > 100) return false
    
    // Should contain some spaces or punctuation (not just random characters)
    const hasSpaces = text.includes(' ')
    const hasValidWords = /\b\w{2,}\b/.test(text) // Contains words of at least 2 characters
    const notAllSameChar = !(/^(.)\1*$/.test(text.replace(/\s/g, ''))) // Not all same character
    
    return hasSpaces || (hasValidWords && notAllSameChar)
  }
  
  if (firstLine.length > 0 && isValidTitle(firstLine)) {
    return firstLine.length > 80 ? firstLine.substring(0, 80) + '...' : firstLine
  } else {
    // Return null instead of generating a date-based title to avoid redundancy
    return null
  }
}

/**
 * Update a diary entry by ID
 * @param entryId ID of the entry to update
 * @param updates Partial DiaryEntry object with fields to update
 * @returns Updated DiaryEntry object, or null if entry not found
 */
export const updateDiaryEntry = (entryId: string, updates: Partial<DiaryEntry>): DiaryEntry | null => {
  try {
    const entries = loadDiaryEntries()
    const entryIndex = entries.findIndex(entry => entry.id === entryId)
    
    if (entryIndex === -1) {
      return null // Entry not found
    }
    
    const existingEntry = entries[entryIndex]!
    // Update the entry
    const updatedEntry: DiaryEntry = {
      ...existingEntry,
      ...updates,
      // Ensure we don't accidentally change the ID or creation date
      id: existingEntry.id,
      createdAt: existingEntry.createdAt
    }
    
    entries[entryIndex] = updatedEntry
    updateEntriesAndStreak(entries)
    
    return updatedEntry
  } catch (error) {
    console.error('Error updating diary entry:', error)
    throw error
  }
}
