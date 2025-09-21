import { Request, Response } from 'express'
import { UserStats, DiaryEntry, Task, Note } from '../models'
import { AuthenticatedRequest } from '../types'

// Get user statistics
export const getUserStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id

    // Get or create user stats
    let userStats = await UserStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserStats({ userId })
      await userStats.save()
    }

    // Calculate real-time stats
    const [diaryEntries, tasks, notes] = await Promise.all([
      DiaryEntry.find({ userId }),
      Task.find({ userId }),
      Note.find({ userId })
    ])

    // Calculate diary stats
    const totalDiaryEntries = diaryEntries.length
    const diaryDates = diaryEntries.map(entry => new Date(entry.createdAt)).sort((a, b) => a.getTime() - b.getTime())
    
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    
    if (diaryDates.length > 0) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      // Calculate streaks
      const uniqueDates = [...new Set(diaryDates.map(date => {
        const d = new Date(date)
        d.setHours(0, 0, 0, 0)
        return d.getTime()
      }))]
      
      uniqueDates.sort((a, b) => a - b)
      
      for (let i = 0; i < uniqueDates.length; i++) {
        if (i === 0) {
          tempStreak = 1
        } else {
          const prevDate = new Date(uniqueDates[i - 1])
          const currDate = new Date(uniqueDates[i])
          const daysDiff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
          
          if (daysDiff === 1) {
            tempStreak++
          } else {
            tempStreak = 1
          }
        }
        
        longestStreak = Math.max(longestStreak, tempStreak)
        
        // Check if this is current streak (includes today or yesterday)
        const lastDate = new Date(uniqueDates[uniqueDates.length - 1])
        const daysSinceLastEntry = (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        
        if (i === uniqueDates.length - 1 && daysSinceLastEntry <= 1) {
          currentStreak = tempStreak
        }
      }
    }

    // Calculate task stats
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.completed).length
    const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

    // Calculate note stats
    const totalNotes = notes.length
    const archivedNotes = notes.filter(note => note.isArchived).length

    // Update the userStats document with calculated values
    userStats.totalDiaryEntries = totalDiaryEntries
    userStats.currentDiaryStreak = currentStreak
    userStats.longestDiaryStreak = longestStreak
    userStats.totalTasks = totalTasks
    userStats.completedTasks = completedTasks
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
      
      // Task stats
      totalTasks,
      completedTasks,
      taskCompletionRate: Math.round(taskCompletionRate),
      
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
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve user statistics'
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

// Update task stats (called when task is created/completed)
export const updateTaskStats = async (userId: string, completed: boolean = false) => {
  try {
    let userStats = await UserStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserStats({ userId })
    }

    // Update task stats manually
    userStats.totalTasks += 1
    if (completed) {
      userStats.completedTasks += 1
    }
    await userStats.save()
    
    return userStats
  } catch (error) {
    console.error('Update task stats error:', error)
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