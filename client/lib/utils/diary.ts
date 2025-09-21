import { DiaryEntry } from '@/types'

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
  const sortedEntries = entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  
  // Group entries by date (in case multiple entries per day)
  const entriesByDate = new Map<string, DiaryEntry[]>()
  sortedEntries.forEach(entry => {
    const dateKey = new Date(entry.createdAt).toISOString().split('T')[0]!
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
