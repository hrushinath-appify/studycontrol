import { NextRequest } from 'next/server'
import { getUserFromToken } from '@/lib/auth-utils'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, Note } from '@/lib/database'
import { broadcastNoteEvent } from '@/lib/sse-broadcaster'
import mongoose from 'mongoose'

// PATCH /api/notes/[id]/archive - Toggle archive status
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    // Find the note first to get current archive status
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentNote = await (Note as any).findOne({
      _id: id,
      userId: new mongoose.Types.ObjectId(userId)
    }).lean()

    if (!currentNote) {
      return createErrorResponse('Note not found', 404)
    }

    // Toggle archive status
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedNote = await (Note as any).findOneAndUpdate(
      { _id: id, userId: new mongoose.Types.ObjectId(userId) },
      {
        isArchived: !currentNote.isArchived,
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

    // Broadcast real-time event
    broadcastNoteEvent({
      type: 'note_archived',
      noteId: transformedNote.id,
      note: transformedNote,
      userId,
      timestamp: new Date().toISOString()
    })

    return createSuccessResponse(transformedNote, 'Note archive status updated successfully')

  } catch (error) {
    console.error('Toggle Archive API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Toggle archive status')
  }
}