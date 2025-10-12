import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, MarrowProgress } from '@/lib/database'
import { getUserFromToken } from '@/lib/auth-utils'
import mongoose from 'mongoose'

// =============================================================================
// GET /api/marrow-progress/stats - Get user's marrow progress statistics
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

    const objectId = new mongoose.Types.ObjectId(userId)
    
    // Get overall progress stats
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const overallStats = await (MarrowProgress as any).aggregate([
      { $match: { userId: objectId } },
      {
        $group: {
          _id: null,
          totalTopics: { $sum: 1 },
          completedTopics: {
            $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
          },
          totalTimeSpent: { $sum: '$timeSpent' }
        }
      },
      {
        $project: {
          _id: 0,
          totalTopics: 1,
          completedTopics: 1,
          completionPercentage: {
            $multiply: [
              { $divide: ['$completedTopics', '$totalTopics'] },
              100
            ]
          },
          totalTimeSpent: 1,
          averageTimePerTopic: {
            $cond: {
              if: { $gt: ['$completedTopics', 0] },
              then: { $divide: ['$totalTimeSpent', '$completedTopics'] },
              else: 0
            }
          }
        }
      }
    ])
    
    // Get subject-wise stats
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subjectStats = await (MarrowProgress as any).aggregate([
      { $match: { userId: objectId } },
      {
        $group: {
          _id: '$subject',
          totalTopics: { $sum: 1 },
          completedTopics: {
            $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
          },
          totalTimeSpent: { $sum: '$timeSpent' },
          lastActivity: { $max: '$updatedAt' }
        }
      },
      {
        $project: {
          subject: '$_id',
          totalTopics: 1,
          completedTopics: 1,
          completionPercentage: {
            $multiply: [
              { $divide: ['$completedTopics', '$totalTopics'] },
              100
            ]
          },
          totalTimeSpent: 1,
          lastActivity: 1
        }
      },
      { $sort: { subject: 1 } }
    ])
    
    // Get recent activity (last 10 completed topics)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recentActivity = await (MarrowProgress as any)
      .find({
        userId: objectId,
        completed: true
      })
      .sort({ completedAt: -1 })
      .limit(10)
      .select('topicId topicTitle subject chapter completedAt timeSpent')
      .lean()

    // Get chapter-wise progress
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chapterStats = await (MarrowProgress as any).aggregate([
      { $match: { userId: objectId } },
      {
        $group: {
          _id: { subject: '$subject', chapter: '$chapter' },
          totalTopics: { $sum: 1 },
          completedTopics: {
            $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
          },
          totalTimeSpent: { $sum: '$timeSpent' }
        }
      },
      {
        $project: {
          subject: '$_id.subject',
          chapter: '$_id.chapter',
          totalTopics: 1,
          completedTopics: 1,
          completionPercentage: {
            $multiply: [
              { $divide: ['$completedTopics', '$totalTopics'] },
              100
            ]
          },
          totalTimeSpent: 1
        }
      },
      { $sort: { subject: 1, chapter: 1 } }
    ])

    return createSuccessResponse({
      overall: overallStats[0] || {
        totalTopics: 0,
        completedTopics: 0,
        completionPercentage: 0,
        totalTimeSpent: 0,
        averageTimePerTopic: 0
      },
      subjects: subjectStats,
      chapters: chapterStats,
      recentActivity
    }, 'Marrow progress statistics fetched successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get marrow progress stats')
  }
}
