import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, Note } from '@/lib/database'
import { getUserFromToken } from '@/lib/auth-utils'
import { broadcastNoteEvent } from '@/lib/sse-broadcaster'
import mongoose from 'mongoose'

// GET /api/notes - Get notes
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

    // Extract query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    // Build query - Convert userId string to ObjectId for proper matching
    const query: Record<string, unknown> = { userId: new mongoose.Types.ObjectId(userId) }
    if (category) {
      query.category = category
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
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
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    }, 'Notes retrieved successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get notes')
  }
}

// POST /api/notes - Create note
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
    const { title, content, category, tags, isPublic } = body

    // Validate required fields
    if (!title) {
      return createErrorResponse('Title is required', 400)
    }

    // Create new note - Convert userId string to ObjectId for proper storage
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const note = await (Note as any).create({
      userId: new mongoose.Types.ObjectId(userId),
      title,
      content: content || '',
      category: category || '',
      tags: tags || [],
      isPublic: isPublic || false,
    })

    // Transform for frontend compatibility
    const transformedNote = {
      ...note.toObject(),
      id: note._id.toString(),
      wordCount: note.content ? note.content.trim().split(/\s+/).filter((word: string) => word.length > 0).length : 0,
      _id: undefined
    }

    // Broadcast real-time event
    broadcastNoteEvent({
      type: 'note_created',
      noteId: transformedNote.id,
      note: transformedNote,
      userId,
      timestamp: new Date().toISOString()
    })

    return createSuccessResponse(transformedNote, 'Note created successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Create note')
  }
}

