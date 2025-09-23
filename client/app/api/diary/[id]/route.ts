import { NextRequest } from 'next/server'
import { connectToDatabase, DiaryEntry } from '@/lib/database'
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

// GET /api/diary/[id] - Get specific diary entry
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    const { id } = await params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createErrorResponse('Invalid diary entry ID', 400)
    }

    // Find diary entry and ensure it belongs to the authenticated user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const diaryEntry = await (DiaryEntry as any).findOne({
      _id: id,
      userId: userId
    }).lean()

    if (!diaryEntry) {
      return createErrorResponse('Diary entry not found', 404)
    }

    return createSuccessResponse(diaryEntry, 'Diary entry retrieved successfully')

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
    const userId = await getAuthenticatedUser()

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

    // Update diary entry and ensure it belongs to the authenticated user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedEntry = await (DiaryEntry as any).findOneAndUpdate(
      { _id: id, userId: userId },
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

    return createSuccessResponse(updatedEntry, 'Diary entry updated successfully')

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
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    const { id } = await params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createErrorResponse('Invalid diary entry ID', 400)
    }

    // Delete diary entry and ensure it belongs to the authenticated user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deletedEntry = await (DiaryEntry as any).findOneAndDelete({
      _id: id,
      userId: userId
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