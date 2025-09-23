import { NextRequest } from 'next/server'
import { connectToDatabase, Note } from '@/lib/database'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import mongoose from 'mongoose'

// Helper function to get authenticated user from token
async function getAuthenticatedUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) {
    throw new Error('Authentication token not found')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-for-development') as { userId: string; email: string }
    return decoded.userId
  } catch {
    throw new Error('Invalid authentication token')
  }
}

// GET /api/notes/[id] - Get specific note
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    const { id } = await params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createErrorResponse('Invalid note ID', 400)
    }

    // Find note and ensure it belongs to the authenticated user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const note = await (Note as any).findOne({
      _id: id,
      userId: userId
    }).lean()

    if (!note) {
      return createErrorResponse('Note not found', 404)
    }

    // Transform _id to id for frontend compatibility
    const transformedNote = {
      ...note,
      id: note._id.toString(),
      wordCount: note.content ? note.content.trim().split(/\s+/).filter((word: string) => word.length > 0).length : 0,
      _id: undefined
    }

    return createSuccessResponse(transformedNote, 'Note retrieved successfully')

  } catch (error) {
    console.error('Get Note API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get note')
  }
}

// PUT /api/notes/[id] - Update specific note
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    const { id } = await params
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createErrorResponse('Invalid note ID', 400)
    }

    // Get the request body
    const body = await request.json()
    const { title, content, category, tags, isArchived, isPinned, color } = body

    // Validate required fields
    if (!title) {
      return createErrorResponse('Title is required', 400)
    }

    // Update note and ensure it belongs to the authenticated user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedNote = await (Note as any).findOneAndUpdate(
      { _id: id, userId: userId },
      {
        title,
        content: content || '',
        category: category || '',
        tags: tags || [],
        isArchived: isArchived || false,
        isPinned: isPinned || false,
        color: color || '#ffffff',
        updatedAt: new Date()
      },
      { new: true, lean: true }
    )

    if (!updatedNote) {
      return createErrorResponse('Note not found', 404)
    }

    // Transform _id to id for frontend compatibility
    const transformedNote = {
      ...updatedNote,
      id: updatedNote._id.toString(),
      wordCount: updatedNote.content ? updatedNote.content.trim().split(/\s+/).filter((word: string) => word.length > 0).length : 0,
      _id: undefined
    }

    return createSuccessResponse(transformedNote, 'Note updated successfully')

  } catch (error) {
    console.error('Update Note API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Update note')
  }
}

// DELETE /api/notes/[id] - Delete specific note
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    const { id } = await params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createErrorResponse('Invalid note ID', 400)
    }

    // Delete note and ensure it belongs to the authenticated user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deletedNote = await (Note as any).findOneAndDelete({
      _id: id,
      userId: userId
    })

    if (!deletedNote) {
      return createErrorResponse('Note not found', 404)
    }

    return createSuccessResponse({ id }, 'Note deleted successfully')

  } catch (error) {
    console.error('Delete Note API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Delete note')
  }
}