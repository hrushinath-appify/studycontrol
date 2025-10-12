import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, Note, User } from '@/lib/database'
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
      monthNotes,
      recentActivity,
      userDoc
    ] = await Promise.all([
      // Total counts
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Note as any).countDocuments({ userId }),
      
      // Notes created this month
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Note as any).countDocuments({ 
        userId, 
        createdAt: { $gte: monthAgo } 
      }),
      
      // Recent activity (last 5 items)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Note as any).find({ userId })
        .select('title createdAt')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
        .then((notes: unknown[]) => notes.map((note: unknown) => ({ ...(note as Record<string, unknown>), type: 'note' }))),
      
      // Fetch user doc to read mysteryClicks metric
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (User as any).findById(userId).select('mysteryClicks').lean()
    ])

  // Get mystery click count from user doc (defaults to 0 if missing)
  const mysteryClicks = (userDoc?.mysteryClicks as number | undefined) ?? 0

    // Calculate productivity score (simple algorithm)
    const activityScore = Math.min(100, monthNotes * 5)
    const productivityScore = Math.round(activityScore)

    // Build statistics object in the expected format for settings page
    const stats = {
      // Settings page expects these specific fields
      mysteryClicks,
      totalNotes,
      focusSessionsTotal: 0, // TODO: Implement focus session tracking
      averageFocusTime: 0,   // TODO: Implement focus session tracking
      
      // Additional detailed stats
      overview: {
        totalNotes
      },
      
      activity: {
        monthNotes,
        recentActivity
      },
      
      productivity: {
        score: productivityScore,
        trend: activityScore > 50 ? 'up' : activityScore > 25 ? 'stable' : 'down'
      },
      
      breakdown: {
        notesByCategory: await getNotesByCategory(userId)
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