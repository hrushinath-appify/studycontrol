import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, MarrowProgress } from '@/lib/database'
import { getUserFromToken } from '@/lib/auth-utils'
import mongoose from 'mongoose'

// =============================================================================
// POST /api/marrow-progress/bulk - Bulk update multiple topics
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
    const { updates } = body

    if (!Array.isArray(updates)) {
      return createErrorResponse('Updates must be an array', 400)
    }

    const results = []
    const objectId = new mongoose.Types.ObjectId(userId)

    for (const update of updates) {
      const {
        topicId,
        completed,
        subject,
        chapter,
        topicTitle,
        timeSpent,
        difficulty,
        estimatedTime
      } = update

      if (!topicId || completed === undefined) {
        continue // Skip invalid updates
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let progressItem = await (MarrowProgress as any).findOne({
          userId: objectId,
          topicId
        })

        if (progressItem) {
          // Update existing progress
          progressItem.completed = completed
          if (subject) progressItem.subject = subject
          if (chapter) progressItem.chapter = chapter
          if (topicTitle) progressItem.topicTitle = topicTitle
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
            userId: objectId,
            topicId,
            completed,
            subject: subject || 'Unknown',
            chapter: chapter || 'General',
            topicTitle: topicTitle || 'Unknown Topic',
            timeSpent,
            difficulty,
            estimatedTime,
            ...(completed && { completedAt: new Date() })
          })
        }

        results.push({
          topicId,
          success: true,
          completed: progressItem.completed
        })
      } catch (itemError) {
        console.error(`Error updating topic ${topicId}:`, itemError)
        results.push({
          topicId,
          success: false,
          error: 'Failed to update topic'
        })
      }
    }

    const successCount = results.filter(r => r.success).length
    return createSuccessResponse(
      results, 
      `Bulk update completed. ${successCount}/${results.length} topics updated successfully.`
    )

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Bulk update marrow progress')
  }
}
