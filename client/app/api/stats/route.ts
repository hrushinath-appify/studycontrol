import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, User } from '@/lib/database'
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

    // Fetch user doc to read mysteryClicks metric
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userDoc = await (User as any).findById(userId).select('mysteryClicks').lean()

    // Get mystery click count from user doc (defaults to 0 if missing)
    const mysteryClicks = (userDoc?.mysteryClicks as number | undefined) ?? 0

    // Calculate productivity score (simple algorithm based on mystery clicks)
    const activityScore = Math.min(100, mysteryClicks * 10)
    const productivityScore = Math.round(activityScore)

    // Build statistics object in the expected format for settings page
    const stats = {
      // Settings page expects these specific fields
      mysteryClicks,
      focusSessionsTotal: 0, // TODO: Implement focus session tracking
      averageFocusTime: 0,   // TODO: Implement focus session tracking
      
      // Additional detailed stats
      overview: {
        mysteryExplorations: mysteryClicks
      },
      
      activity: {
        mysteryClicks,
        recentActivity: [] // No notes to track
      },
      
      productivity: {
        score: productivityScore,
        trend: activityScore > 50 ? 'up' : activityScore > 25 ? 'stable' : 'down'
      },
      
      breakdown: {
        mysteryExplorations: mysteryClicks
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