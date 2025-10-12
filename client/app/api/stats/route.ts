import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, DiaryEntry, Note, User } from '@/lib/database'
import { getUserFromToken } from '@/lib/auth-utils'

// GET /api/stats - Get user statistics
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getUserFromToken(request)
    
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }
    
    const userId = user.id

    // Connect to database
    await connectToDatabase()

    // Get current date for calculations
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Parallel queries for better performance
    const [
      totalNotes,
      totalDiaryEntries,
      todayDiaryEntries,
      monthNotes,
      recentActivity,
      userDoc
    ] = await Promise.all([
      // Total counts
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Note as any).countDocuments({ userId }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (DiaryEntry as any).countDocuments({ userId }),
      
      // Today's diary entries
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (DiaryEntry as any).countDocuments({ 
        userId, 
        createdAt: { $gte: today } 
      }),
      
      // Notes created this month
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Note as any).countDocuments({ 
        userId, 
        createdAt: { $gte: monthAgo } 
      }),
      
  // Recent activity (last 5 items across all collections)
      Promise.all([
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Note as any).find({ userId })
          .select('title createdAt')
          .sort({ createdAt: -1 })
          .limit(2)
          .lean()
          .then((notes: unknown[]) => notes.map((note: unknown) => ({ ...(note as Record<string, unknown>), type: 'note' }))),
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (DiaryEntry as any).find({ userId })
          .select('title createdAt')
          .sort({ createdAt: -1 })
          .limit(1)
          .lean()
          .then((entries: unknown[]) => entries.map((entry: unknown) => ({ ...(entry as Record<string, unknown>), type: 'diary' })))
      ]).then(([notes, entries]) => {
        const combined = [...notes, ...entries]
        return combined
          .sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime())
          .slice(0, 5)
      }),
      // Fetch user doc to read mysteryClicks metric
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (User as any).findById(userId).select('mysteryClicks').lean()
    ])

    // Calculate diary streaks
    const { currentStreak, longestStreak } = await calculateDiaryStreaks(userId)

  // Get mystery click count from user doc (defaults to 0 if missing)
  const mysteryClicks = (userDoc?.mysteryClicks as number | undefined) ?? 0

    // Calculate productivity score (simple algorithm)
    const activityScore = Math.min(100, (monthNotes + todayDiaryEntries) * 5)
    const productivityScore = Math.round(activityScore)

    // Build statistics object in the expected format for settings page
    const stats = {
      // Settings page expects these specific fields
      diaryHighestStreak: longestStreak,
      mysteryClicks,
      totalNotes,
      focusSessionsTotal: 0, // TODO: Implement focus session tracking
      averageFocusTime: 0,   // TODO: Implement focus session tracking
      
      // Additional detailed stats
      overview: {
        totalNotes,
        totalDiaryEntries,
        currentStreak,
        longestStreak
      },
      
      activity: {
        todayDiaryEntries,
        monthNotes,
        recentActivity
      },
      
      productivity: {
        score: productivityScore,
        trend: activityScore > 50 ? 'up' : activityScore > 25 ? 'stable' : 'down'
      },
      
      breakdown: {
        notesByCategory: await getNotesByCategory(userId),
        diaryEntriesByMood: await getDiaryEntriesByMood(userId)
      }
    }

    return createSuccessResponse(stats, 'User statistics retrieved successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get user statistics')
  }
}

// Calculate diary streaks
async function calculateDiaryStreaks(userId: string) {
  try {
    // Get all diary entries sorted by date
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entries = await (DiaryEntry as any)
      .find({ userId })
      .sort({ createdAt: -1 })
      .select('createdAt')
      .lean()

    if (!entries || entries.length === 0) {
      return { currentStreak: 0, longestStreak: 0 }
    }

    // Convert entries to date strings (YYYY-MM-DD format)
    const uniqueDates: string[] = Array.from(new Set(
      entries.map((entry: { createdAt: Date }) => 
        entry.createdAt.toISOString().split('T')[0]
      )
    )) as string[]
    uniqueDates.sort().reverse() // Sort in descending order (most recent first)

    let currentStreak = 0
    let longestStreak = 0

    // Calculate current streak
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

    // Start from today or yesterday
    if (uniqueDates.includes(today) || uniqueDates.includes(yesterday)) {
  const startDateStr: string = uniqueDates.includes(today) ? today : yesterday
      const checkDate = new Date(startDateStr)
      
      // Count backwards from the starting date
      while (true) {
  const checkDateStr = checkDate.toISOString().slice(0, 10)
        if (uniqueDates.includes(checkDateStr)) {
          currentStreak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else {
          break
        }
      }
    }

    // Calculate longest streak
    if (uniqueDates.length === 1) {
      longestStreak = 1
    } else if (uniqueDates.length > 1) {
      let tempStreak = 1
      longestStreak = 1

      for (let i = 1; i < uniqueDates.length; i++) {
        const prevDate = new Date(uniqueDates[i - 1] as string)
        const currentDate = new Date(uniqueDates[i] as string)
        const diffTime = prevDate.getTime() - currentDate.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) {
          tempStreak++
          longestStreak = Math.max(longestStreak, tempStreak)
        } else {
          tempStreak = 1
        }
      }
    }

    return { currentStreak, longestStreak }
  } catch (error) {
    console.error('Error calculating diary streaks:', error)
    return { currentStreak: 0, longestStreak: 0 }
  }
}

// Helper functions for aggregated data
async function getNotesByCategory(userId: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (Note as any).aggregate([
      { $match: { userId } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ])
    
    return result.map((item: { _id: string; count: number }) => ({
      category: item._id || 'Uncategorized',
      count: item.count
    }))
  } catch (error) {
    console.error('Error getting notes by category:', error)
    return []
  }
}

async function getDiaryEntriesByMood(userId: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (DiaryEntry as any).aggregate([
      { $match: { userId } },
      { $group: { _id: '$mood', count: { $sum: 1 } } }
    ])
    
    return result.map((item: { _id: string; count: number }) => ({
      mood: item._id || 'Not specified',
      count: item.count
    }))
  } catch (error) {
    console.error('Error getting diary entries by mood:', error)
    return []
  }
}