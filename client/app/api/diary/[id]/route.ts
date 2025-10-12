import { NextRequest } from 'next/server'
import { connectToDatabase, DiaryEntry } from '@/lib/database'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { getUserFromToken } from '@/lib/auth-utils'
import { formatDate } from '@/lib/date-utils'
import mongoose from 'mongoose'

// GET /api/diary/[id] - Get specific diary entry
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
      return createErrorResponse('Invalid diary entry ID', 400)
    }

    // Find diary entry and ensure it belongs to the authenticated user - Convert userId to ObjectId
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const diaryEntry = await (DiaryEntry as any).findOne({
      _id: id,
      userId: new mongoose.Types.ObjectId(userId)
    }).lean()

    if (!diaryEntry) {
      return createErrorResponse('Diary entry not found', 404)
    }

    // Serialize MongoDB ObjectIds to strings for JSON and add formatted date
    const entryId = diaryEntry._id.toString()
    const entryUserId = diaryEntry.userId.toString()
    const entryDate = formatDate(diaryEntry.createdAt)
    
    const serializedEntry = {
      _id: entryId,
      id: entryId, // Include both _id and id for compatibility
      userId: entryUserId,
      title: diaryEntry.title,
      content: diaryEntry.content,
      date: entryDate,
      createdAt: diaryEntry.createdAt,
      updatedAt: diaryEntry.updatedAt,
      mood: diaryEntry.mood,
      tags: diaryEntry.tags || [],
      isPrivate: diaryEntry.isPrivate,
    }

    return createSuccessResponse(serializedEntry, 'Diary entry retrieved successfully')

  } catch (error) {
    console.error('Get Diary Entry API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get diary entry')
  }
}

// PUT /api/diary/[id] - Update specific diary entry
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
      return createErrorResponse('Invalid diary entry ID', 400)
    }

    // Get the request body
    const body = await request.json()
    const { title, content, mood, tags, isPrivate } = body

    // Validate required fields
    if (!title || !content) {
      return createErrorResponse('Title and content are required', 400)
    }

    // Update diary entry and ensure it belongs to the authenticated user - Convert userId to ObjectId
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedEntry = await (DiaryEntry as any).findOneAndUpdate(
      { _id: id, userId: new mongoose.Types.ObjectId(userId) },
      {
        title,
        content,
        mood: mood || 'neutral',
        tags: tags || [],
        isPrivate: isPrivate !== false, // Default to true if not specified
        updatedAt: new Date()
      },
      { new: true, lean: true }
    )

    if (!updatedEntry) {
      return createErrorResponse('Diary entry not found', 404)
    }

    // Serialize MongoDB ObjectIds to strings for JSON and add formatted date
    const entryId = updatedEntry._id.toString()
    const entryUserId = updatedEntry.userId.toString()
    const entryDate = formatDate(updatedEntry.createdAt)
    
    const serializedEntry = {
      _id: entryId,
      id: entryId, // Include both _id and id for compatibility
      userId: entryUserId,
      title: updatedEntry.title,
      content: updatedEntry.content,
      date: entryDate,
      createdAt: updatedEntry.createdAt,
      updatedAt: updatedEntry.updatedAt,
      mood: updatedEntry.mood,
      tags: updatedEntry.tags || [],
      isPrivate: updatedEntry.isPrivate,
    }

    return createSuccessResponse(serializedEntry, 'Diary entry updated successfully')

  } catch (error) {
    console.error('Update Diary Entry API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Update diary entry')
  }
}

// DELETE /api/diary/[id] - Delete specific diary entry
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
      return createErrorResponse('Invalid diary entry ID', 400)
    }

    // Delete diary entry and ensure it belongs to the authenticated user - Convert userId to ObjectId
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deletedEntry = await (DiaryEntry as any).findOneAndDelete({
      _id: id,
      userId: new mongoose.Types.ObjectId(userId)
    })

    if (!deletedEntry) {
      return createErrorResponse('Diary entry not found', 404)
    }

    return createSuccessResponse(null, 'Diary entry deleted successfully')

  } catch (error) {
    console.error('Delete Diary Entry API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Delete diary entry')
  }
}