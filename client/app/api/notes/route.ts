import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, Note } from '@/lib/database'
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

// GET /api/notes - Get notes
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    // Extract query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    // Build query
    const query: Record<string, unknown> = { userId }
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
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    // Get the request body
    const body = await request.json()
    const { title, content, category, tags, isPublic } = body

    // Validate required fields
    if (!title) {
      return createErrorResponse('Title is required', 400)
    }

    // Create new note
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const note = await (Note as any).create({
      userId,
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

    return createSuccessResponse(transformedNote, 'Note created successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Create note')
  }
}

// PUT /api/notes - Update note
export async function PUT(request: NextRequest) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    // Get the request body
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return createErrorResponse('Note ID is required', 400)
    }

    // Update note
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const note = await (Note as any).findOneAndUpdate(
      { _id: id, userId }, // Ensure user owns the note
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!note) {
      return createErrorResponse('Note not found', 404)
    }

    // Transform for frontend compatibility
    const transformedNote = {
      ...note.toObject(),
      id: note._id.toString(),
      wordCount: note.content ? note.content.trim().split(/\s+/).filter((word: string) => word.length > 0).length : 0,
      _id: undefined
    }

    return createSuccessResponse(transformedNote, 'Note updated successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Update note')
  }
}

// DELETE /api/notes - Delete note
export async function DELETE(request: NextRequest) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    // Get note ID from query parameters
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return createErrorResponse('Note ID is required', 400)
    }

    // Delete note
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deletedNote = await (Note as any).findOneAndDelete({ _id: id, userId })

    if (!deletedNote) {
      return createErrorResponse('Note not found', 404)
    }

    return createSuccessResponse({ id }, 'Note deleted successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Delete note')
  }
}