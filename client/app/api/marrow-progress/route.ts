import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, MarrowProgress } from '@/lib/database'
import { getUserFromToken } from '@/lib/auth-utils'
import mongoose from 'mongoose'

// =============================================================================
// GET /api/marrow-progress - Get user's marrow progress
// =============================================================================
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

    // Get all progress for user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const progressItems = await (MarrowProgress as any)
      .find({ userId: new mongoose.Types.ObjectId(userId) })
      .lean()

    // Convert to a simple object format for frontend
    const progressMap: Record<string, boolean> = {}
    const details = progressItems.map((item: any) => {
      progressMap[item.topicId] = item.completed
      return {
        ...item,
        id: item._id.toString(),
        _id: undefined
      }
    })

    return createSuccessResponse({
      progress: progressMap,
      details
    }, 'Marrow progress fetched successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get marrow progress')
  }
}

// =============================================================================
// POST /api/marrow-progress - Update topic progress
// =============================================================================
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getUserFromToken(request)
    
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }
    
    const userId = user.id

    // Connect to database
    await connectToDatabase()

    // Get the request body
    const body = await request.json()
    const {
      topicId,
      completed,
      subject,
      chapter,
      topicTitle,
      timeSpent,
      difficulty,
      estimatedTime
    } = body

    if (!topicId || completed === undefined || !subject || !chapter || !topicTitle) {
      return createErrorResponse(
        'Missing required fields: topicId, completed, subject, chapter, topicTitle',
        400
      )
    }

    // Find existing progress or create new one
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let progressItem = await (MarrowProgress as any).findOne({
      userId: new mongoose.Types.ObjectId(userId),
      topicId
    })

    if (progressItem) {
      // Update existing progress
      progressItem.completed = completed
      progressItem.subject = subject
      progressItem.chapter = chapter
      progressItem.topicTitle = topicTitle
      
      if (timeSpent !== undefined) progressItem.timeSpent = timeSpent
      if (difficulty !== undefined) progressItem.difficulty = difficulty
      if (estimatedTime !== undefined) progressItem.estimatedTime = estimatedTime
      
      if (completed) {
        progressItem.completedAt = new Date()
      } else {
        progressItem.completedAt = undefined
      }
      
      await progressItem.save()
    } else {
      // Create new progress item
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      progressItem = await (MarrowProgress as any).create({
        userId: new mongoose.Types.ObjectId(userId),
        topicId,
        completed,
        subject,
        chapter,
        topicTitle,
        timeSpent,
        difficulty,
        estimatedTime,
        ...(completed && { completedAt: new Date() })
      })
    }

    // Transform for frontend compatibility
    const transformedItem = {
      ...progressItem.toObject(),
      id: progressItem._id.toString(),
      _id: undefined
    }

    return createSuccessResponse(
      transformedItem, 
      `Topic ${completed ? 'completed' : 'marked as incomplete'}`
    )

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Update marrow progress')
  }
}
