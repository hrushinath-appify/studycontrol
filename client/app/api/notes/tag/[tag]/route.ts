import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, Note } from '@/lib/database'
import { getUserFromToken } from '@/lib/auth-utils'
import mongoose from 'mongoose'

// GET /api/notes/tag/[tag] - Get notes by tag
export async function GET(request: NextRequest, { params }: { params: Promise<{ tag: string }> }) {
  try {
    // Get authenticated user
    const user = await getUserFromToken(request)
    
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }
    
    const userId = user.id

    // Connect to database
    await connectToDatabase()

    const { tag } = await params

    // Extract query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Build query - Convert userId string to ObjectId for proper matching
    const query: Record<string, unknown> = { 
      userId: new mongoose.Types.ObjectId(userId),
      tags: { $in: [tag] }
    }

    // Get notes with pagination
    const skip = (page - 1) * limit
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const notes = await (Note as any)
      .find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Transform notes for frontend compatibility
    const transformedNotes = notes.map((note: { _id: string; content?: string; [key: string]: unknown }) => ({
      ...note,
      id: note._id.toString(),
      wordCount: note.content ? note.content.toString().trim().split(/\s+/).filter(word => word.length > 0).length : 0,
      _id: undefined
    }))

    // Get total count
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const total = await (Note as any).countDocuments(query)

    return createSuccessResponse({
      notes: transformedNotes,
      tag,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    }, 'Notes by tag retrieved successfully')

  } catch (error) {
    console.error('Get Notes by Tag API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get notes by tag')
  }
}
