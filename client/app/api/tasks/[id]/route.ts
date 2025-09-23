import { NextRequest } from 'next/server'
import { connectToDatabase, Task } from '@/lib/database'
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

// GET /api/tasks/[id] - Get specific task
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    const { id } = await params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createErrorResponse('Invalid task ID', 400)
    }

    // Find task and ensure it belongs to the authenticated user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const task = await (Task as any).findOne({
      _id: id,
      userId: userId
    }).lean()

    if (!task) {
      return createErrorResponse('Task not found', 404)
    }

    return createSuccessResponse(task, 'Task retrieved successfully')

  } catch (error) {
    console.error('Get Task API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get task')
  }
}

// PUT /api/tasks/[id] - Update specific task (including toggle completion)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    const { id } = await params
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createErrorResponse('Invalid task ID', 400)
    }

    // Get the request body
    const body = await request.json()
    const { title, description, completed, priority, dueDate, category, tags } = body

    // Build update object only with provided fields
    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (completed !== undefined) updateData.completed = completed
    if (priority !== undefined) updateData.priority = priority
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null
    if (category !== undefined) updateData.category = category
    if (tags !== undefined) updateData.tags = tags
    updateData.updatedAt = new Date()

    // Update task and ensure it belongs to the authenticated user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedTask = await (Task as any).findOneAndUpdate(
      { _id: id, userId: userId },
      updateData,
      { new: true, lean: true }
    )

    if (!updatedTask) {
      return createErrorResponse('Task not found', 404)
    }

    return createSuccessResponse(updatedTask, 'Task updated successfully')

  } catch (error) {
    console.error('Update Task API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Update task')
  }
}

// DELETE /api/tasks/[id] - Delete specific task
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    const { id } = await params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createErrorResponse('Invalid task ID', 400)
    }

    // Delete task and ensure it belongs to the authenticated user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deletedTask = await (Task as any).findOneAndDelete({
      _id: id,
      userId: userId
    })

    if (!deletedTask) {
      return createErrorResponse('Task not found', 404)
    }

    return createSuccessResponse({ id }, 'Task deleted successfully')

  } catch (error) {
    console.error('Delete Task API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Delete task')
  }
}