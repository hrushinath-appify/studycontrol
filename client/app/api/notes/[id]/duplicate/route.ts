import { NextRequest } from 'next/server'
import { getUserFromToken } from '@/lib/auth-utils'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, Note } from '@/lib/database'
import { broadcastNoteEvent } from '@/lib/sse-broadcaster'
import mongoose from 'mongoose'

// POST /api/notes/[id]/duplicate - Duplicate note
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Get authenticated user
    const user = await getUserFromToken(request)
    
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }
    
    const userId = user.id

    // Connect to database
    await connectToDatabase()

    const { id } = await params
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createErrorResponse('Invalid note ID', 400)
    }

    // Find the original note
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalNote = await (Note as any).findOne({
      _id: new mongoose.Types.ObjectId(id),
      userId: new mongoose.Types.ObjectId(userId)
    }).lean()

    if (!originalNote) {
      return createErrorResponse('Note not found', 404)
    }

    // Create duplicated note
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const duplicatedNote = await (Note as any).create({
      userId: new mongoose.Types.ObjectId(userId),
      title: `${originalNote.title} (Copy)`,
      content: originalNote.content,
      category: originalNote.category,
      tags: originalNote.tags || [],
      isArchived: false,
      isPinned: false,
      color: originalNote.color || '#ffffff',
    })

    // Transform for frontend compatibility
    const transformedNote = {
      ...duplicatedNote.toObject(),
      id: duplicatedNote._id.toString(),
      wordCount: duplicatedNote.content ? duplicatedNote.content.trim().split(/\s+/).filter((word: string) => word.length > 0).length : 0,
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

    return createSuccessResponse(transformedNote, 'Note duplicated successfully')

  } catch (error) {
    console.error('Duplicate Note API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Duplicate note')
  }
}