// Utility function for consistent streak calculation across diary and user stats
// This ensures both controllers use the exact same logic

export interface StreakResult {
  currentStreak: number
  longestStreak: number
}

export interface DiaryEntryForStreak {
  date: string
  createdAt: Date
}

export function calculateDiaryStreaks(entries: DiaryEntryForStreak[]): StreakResult {
  let currentStreak = 0
  let longestStreak = 0

  if (entries.length === 0) {
    return { currentStreak, longestStreak }
  }

  // Group entries by date field (not createdAt) to handle multiple entries per day
  // Convert the date field to YYYY-MM-DD format for consistency
  const entriesByDate = new Map<string, boolean>()
  
  entries.forEach(entry => {
    // Parse the date field (e.g., "September 21, 2025") and convert to YYYY-MM-DD
    let dateKey: string
    try {
      console.log('Processing entry date:', entry.date, 'createdAt:', entry.createdAt)
      // Handle both formats: "September 21, 2025" and "YYYY-MM-DD"
      const parsedDate = new Date(entry.date)
      if (isNaN(parsedDate.getTime())) {
        // If date parsing fails, fall back to createdAt
        console.log('Date parsing failed for:', entry.date, 'using createdAt')
        dateKey = new Date(entry.createdAt).toISOString().split('T')[0]
      } else {
        dateKey = parsedDate.toISOString().split('T')[0]
        console.log('Parsed date successfully:', entry.date, '->', dateKey)
      }
    } catch (error) {
      // Fallback to createdAt if date parsing fails
      console.log('Date parsing error for:', entry.date, 'error:', error, 'using createdAt')
      dateKey = new Date(entry.createdAt).toISOString().split('T')[0]
    }
    entriesByDate.set(dateKey, true)
  })

  // Get unique dates sorted in ascending order (oldest first)
  const uniqueDates = Array.from(entriesByDate.keys()).sort()
  
  console.log('=== STREAK CALCULATION DEBUG ===')
  console.log('All entries count:', entries.length)
  console.log('Unique dates with entries:', uniqueDates)
  
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  
  console.log('Today:', today)
  console.log('Yesterday:', yesterday)
  console.log('Has entry today:', uniqueDates.includes(today))
  console.log('Has entry yesterday:', uniqueDates.includes(yesterday))
  
  // === CALCULATE CURRENT STREAK ===
  // Current streak: consecutive days with entries ending today or yesterday
  if (uniqueDates.includes(today) || uniqueDates.includes(yesterday)) {
    // Start from most recent date (today if available, otherwise yesterday)
    let startDate = uniqueDates.includes(today) ? today : yesterday
    let checkDate = new Date(startDate)
    
    console.log('Starting current streak calculation from:', startDate)
    
    // Count backwards from start date
    while (true) {
      const checkDateStr = checkDate.toISOString().split('T')[0]
      console.log('Checking date for current streak:', checkDateStr, 'Has entry:', uniqueDates.includes(checkDateStr))
      
      if (uniqueDates.includes(checkDateStr)) {
        currentStreak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }
  }
  
  console.log('Calculated current streak:', currentStreak)
  
  // === CALCULATE LONGEST STREAK ===
  // Find the longest consecutive sequence in all dates
  if (uniqueDates.length === 1) {
    longestStreak = 1
  } else if (uniqueDates.length > 1) {
    let tempStreak = 1
    longestStreak = 1
    
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1])
      const currDate = new Date(uniqueDates[i])
      const diffTime = currDate.getTime() - prevDate.getTime()
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
      
      console.log(`Longest streak check: ${uniqueDates[i-1]} -> ${uniqueDates[i]}, diff: ${diffDays} days`)
      
      if (diffDays === 1) {
        tempStreak++
        console.log(`Consecutive day found, temp streak now: ${tempStreak}`)
      } else {
        tempStreak = 1
        console.log(`Gap found, resetting temp streak to 1`)
      }
      
      longestStreak = Math.max(longestStreak, tempStreak)
      console.log(`Longest streak updated to: ${longestStreak}`)
    }
  }
  
  // Ensure longest streak is at least as long as current streak
  longestStreak = Math.max(longestStreak, currentStreak)
  
  console.log('Final current streak:', currentStreak)
  console.log('Final longest streak:', longestStreak)
  console.log('=== END STREAK CALCULATION ===')

  return { currentStreak, longestStreak }
}