import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, DiaryEntry, Task, Note } from '@/lib/database'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

// Helper function to get authenticated user ID
async function getAuthenticatedUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    throw new Error('Authentication token not found')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string }
    return decoded.userId
  } catch (error) {
    console.error('JWT verification failed:', error)
    throw new Error('Invalid authentication token')
  }
}

// GET /api/stats - Get user statistics
export async function GET(_request: NextRequest) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    // Get current date for calculations
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Parallel queries for better performance
    const [
      totalNotes,
      totalTasks,
      totalDiaryEntries,
      completedTasks,
      todayDiaryEntries,
      weekTasks,
      monthNotes,
      recentActivity
    ] = await Promise.all([
      // Total counts
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Note as any).countDocuments({ userId }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Task as any).countDocuments({ userId }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (DiaryEntry as any).countDocuments({ userId }),
      
      // Completed tasks
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Task as any).countDocuments({ userId, completed: true }),
      
      // Today's diary entries
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (DiaryEntry as any).countDocuments({ 
        userId, 
        createdAt: { $gte: today } 
      }),
      
      // Tasks created this week
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Task as any).countDocuments({ 
        userId, 
        createdAt: { $gte: weekAgo } 
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
        (Task as any).find({ userId })
          .select('title createdAt completed')
          .sort({ createdAt: -1 })
          .limit(2)
          .lean()
          .then((tasks: unknown[]) => tasks.map((task: unknown) => ({ ...(task as Record<string, unknown>), type: 'task' }))),
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (DiaryEntry as any).find({ userId })
          .select('title createdAt')
          .sort({ createdAt: -1 })
          .limit(1)
          .lean()
          .then((entries: unknown[]) => entries.map((entry: unknown) => ({ ...(entry as Record<string, unknown>), type: 'diary' })))
      ]).then(([notes, tasks, entries]) => {
        const combined = [...notes, ...tasks, ...entries]
        return combined
          .sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime())
          .slice(0, 5)
      })
    ])

    // Calculate productivity score (simple algorithm)
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    const activityScore = Math.min(100, (weekTasks + monthNotes + todayDiaryEntries) * 5)
    const productivityScore = Math.round((completionRate + activityScore) / 2)

    // Build statistics object
    const stats = {
      overview: {
        totalNotes,
        totalTasks,
        totalDiaryEntries,
        completedTasks,
        pendingTasks: totalTasks - completedTasks,
        completionRate: Math.round(completionRate)
      },
      
      activity: {
        todayDiaryEntries,
        weekTasks,
        monthNotes,
        recentActivity
      },
      
      productivity: {
        score: productivityScore,
        trend: activityScore > 50 ? 'up' : activityScore > 25 ? 'stable' : 'down'
      },
      
      breakdown: {
        tasksByPriority: await getTasksByPriority(userId),
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

// Helper functions for aggregated data
async function getTasksByPriority(userId: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (Task as any).aggregate([
      { $match: { userId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ])
    
    const priorities = ['low', 'medium', 'high', 'urgent']
    return priorities.map(priority => ({
      priority,
      count: result.find((r: { _id: string }) => r._id === priority)?.count || 0
    }))
  } catch (error) {
    console.error('Error getting tasks by priority:', error)
    return []
  }
}

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