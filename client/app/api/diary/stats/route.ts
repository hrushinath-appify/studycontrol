import { NextRequest } from 'next/server'
import { getUserFromToken } from '@/lib/auth-utils'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, DiaryEntry } from '@/lib/database'
import mongoose from 'mongoose'

// GET /api/diary/stats - Get diary statistics
export async function GET(request: NextRequest) {
  try {
    // Check if user has a valid session
    const user = await getUserFromToken(request)
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    const userId = user.id

    // Connect to database
    await connectToDatabase()

    // Get all diary entries for the user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entries = await (DiaryEntry as any)
      .find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .lean()

    // Calculate statistics
    const totalEntries = entries.length
    const totalWords = entries.reduce((sum: number, entry: { content: string }) => {
      return sum + (entry.content?.trim().split(/\s+/).filter((w: string) => w.length > 0).length || 0)
    }, 0)
    const averageWordsPerEntry = totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0

    // Calculate streak
    const sortedDates = entries
      .map((e: { createdAt: Date }) => new Date(e.createdAt))
      .sort((a: Date, b: Date) => b.getTime() - a.getTime())
    
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    
    if (sortedDates.length > 0) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      
      const lastEntryDate = new Date(sortedDates[0])
      lastEntryDate.setHours(0, 0, 0, 0)
      
      // Check if there's an entry today or yesterday
      if (lastEntryDate.getTime() === today.getTime() || lastEntryDate.getTime() === yesterday.getTime()) {
        currentStreak = 1
        tempStreak = 1
        
        let prevDate = lastEntryDate
        for (let i = 1; i < sortedDates.length; i++) {
          const currDate = new Date(sortedDates[i])
          currDate.setHours(0, 0, 0, 0)
          
          const daysDiff = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24))
          
          if (daysDiff === 1) {
            currentStreak++
            tempStreak++
          } else if (daysDiff === 0) {
            // Same day, continue
            continue
          } else {
            break
          }
          
          prevDate = currDate
        }
        
        longestStreak = Math.max(longestStreak, tempStreak)
      }
      
      // Calculate longest streak overall
      if (sortedDates.length > 0) {
        tempStreak = 1
        let prevDate = new Date(sortedDates[0])
        prevDate.setHours(0, 0, 0, 0)
        
        for (let i = 1; i < sortedDates.length; i++) {
          const currDate = new Date(sortedDates[i])
          currDate.setHours(0, 0, 0, 0)
          
          const daysDiff = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24))
          
          if (daysDiff === 1) {
            tempStreak++
            longestStreak = Math.max(longestStreak, tempStreak)
          } else if (daysDiff === 0) {
            continue
          } else {
            tempStreak = 1
          }
          
          prevDate = currDate
        }
      }
    }

    // Mood distribution
    const moodDistribution: Record<string, number> = {}
    entries.forEach((entry: { mood?: string }) => {
      const mood = entry.mood || 'neutral'
      moodDistribution[mood] = (moodDistribution[mood] || 0) + 1
    })

    // Entries this month and week
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    const entriesThisMonth = entries.filter((e: { createdAt: Date }) => 
      new Date(e.createdAt) >= startOfMonth
    ).length
    
    const entriesThisWeek = entries.filter((e: { createdAt: Date }) => 
      new Date(e.createdAt) >= startOfWeek
    ).length

    const stats = {
      totalEntries,
      currentStreak,
      longestStreak,
      diaryHighestStreak: longestStreak,
      totalWords,
      averageWordsPerEntry,
      moodDistribution,
      entriesThisMonth,
      entriesThisWeek
    }

    return createSuccessResponse(stats, 'Diary statistics retrieved successfully')

  } catch (error) {
    console.error('Diary Stats API Route Error:', error)
    return handleApiError(error, 'Get diary statistics')
  }
}