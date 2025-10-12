import { Request, Response } from 'express'
import { UserStats, DiaryEntry, Note } from '../models'
import { AuthenticatedRequest } from '../types'
import { calculateDiaryStreaks } from '../utils/streakCalculator'

// Get user statistics
export const getUserStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Handle both _id and id fields for compatibility
    const userId = req.user!._id || req.user!.id

    // Get or create user stats
    let userStats = await UserStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserStats({ userId })
      await userStats.save()
    }

    // Calculate real-time stats
    const [diaryEntries, notes] = await Promise.all([
      DiaryEntry.find({ userId }),
      Note.find({ userId })
    ])

    // Calculate diary stats using the shared streak calculation utility
    const totalDiaryEntries = diaryEntries.length
    const { currentStreak, longestStreak } = calculateDiaryStreaks(diaryEntries)

    // Calculate note stats
    const totalNotes = notes.length
    const archivedNotes = notes.filter(note => note.isArchived).length

    // Update the userStats document with calculated values
    userStats.totalDiaryEntries = totalDiaryEntries
    userStats.currentDiaryStreak = currentStreak
    userStats.longestDiaryStreak = longestStreak
    userStats.totalNotes = totalNotes
    userStats.archivedNotes = archivedNotes
    
    await userStats.save()

    const statsData = {
      // Diary stats
      diaryTotalEntries: totalDiaryEntries,
      diaryCurrentStreak: currentStreak,
      diaryHighestStreak: longestStreak,
      
      // Mystery stats
      mysteryClicks: userStats.mysteryExplorations,
      mysteryTopicsViewed: userStats.mysteryTopicsViewed,
      
      // Note stats
      totalNotes,
      archivedNotes,
      
      // Focus stats
      focusSessionsTotal: userStats.totalFocusSessions,
      totalFocusTime: userStats.totalFocusTime,
      averageFocusTime: Math.round(userStats.averageFocusTime)
    }

    res.json({
      success: true,
      data: statsData,
      message: 'User statistics retrieved successfully'
    })

  } catch (error) {
    console.error('Get user stats error:', error)
    
    // Add detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve user statistics',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// Update diary stats (called when diary entry is created)
export const updateDiaryStats = async (userId: string, entryDate: Date = new Date()) => {
  try {
    let userStats = await UserStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserStats({ userId })
    }

    // Update diary stats manually
    userStats.totalDiaryEntries += 1
    
    // Update streak logic
    const today = new Date()
    const lastEntry = userStats.lastDiaryEntryDate
    
    if (lastEntry) {
      const daysDiff = Math.floor((today.getTime() - lastEntry.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysDiff === 1) {
        // Consecutive day
        userStats.currentDiaryStreak += 1
      } else if (daysDiff === 0) {
        // Same day, don't increment streak
      } else {
        // Streak broken
        userStats.currentDiaryStreak = 1
      }
    } else {
      // First entry
      userStats.currentDiaryStreak = 1
    }
    
    // Update longest streak
    if (userStats.currentDiaryStreak > userStats.longestDiaryStreak) {
      userStats.longestDiaryStreak = userStats.currentDiaryStreak
    }
    
    userStats.lastDiaryEntryDate = entryDate
    await userStats.save()
    
    return userStats
  } catch (error) {
    console.error('Update diary stats error:', error)
    throw error
  }
}

// Update note stats (called when note is created)
export const updateNoteStats = async (userId: string, archived: boolean = false) => {
  try {
    let userStats = await UserStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserStats({ userId })
    }

    // Update note stats manually
    userStats.totalNotes += 1
    if (archived) {
      userStats.archivedNotes += 1
    }
    await userStats.save()
    
    return userStats
  } catch (error) {
    console.error('Update note stats error:', error)
    throw error
  }
}

// Update focus stats (called when focus session completes)
export const updateFocusStats = async (userId: string, sessionTime: number) => {
  try {
    let userStats = await UserStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserStats({ userId })
    }

    // Update focus stats manually
    userStats.totalFocusSessions += 1
    userStats.totalFocusTime += sessionTime
    userStats.averageFocusTime = userStats.totalFocusTime / userStats.totalFocusSessions
    await userStats.save()
    
    return userStats
  } catch (error) {
    console.error('Update focus stats error:', error)
    throw error
  }
}

// Update mystery stats (called when mystery exploration happens)
export const updateMysteryStats = async (userId: string) => {
  try {
    let userStats = await UserStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserStats({ userId })
    }

    // Update mystery stats manually
    userStats.mysteryExplorations += 1
    await userStats.save()
    
    return userStats
  } catch (error) {
    console.error('Update mystery stats error:', error)
    throw error
  }
}