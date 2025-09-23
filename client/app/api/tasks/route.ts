import { NextRequest } from 'next/server'
import { connectToDatabase, Task } from '@/lib/database'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

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

// GET /api/tasks - Get tasks
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
    const completed = searchParams.get('completed')
    const priority = searchParams.get('priority')

    // Build query
    const query: Record<string, unknown> = { userId }
    if (completed !== null) {
      query.completed = completed === 'true'
    }
    if (priority) {
      query.priority = priority
    }

    // Get tasks with pagination
    const skip = (page - 1) * limit
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tasks = await (Task as any)
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const total = await (Task as any).countDocuments(query)

    return createSuccessResponse({
      tasks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    }, 'Tasks retrieved successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get tasks')
  }
}

// POST /api/tasks - Create task
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    // Get the request body
    const body = await request.json()
    const { title, description, priority, dueDate, category, tags } = body

    // Validate required fields
    if (!title) {
      return createErrorResponse('Title is required', 400)
    }

    // Create new task
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const task = await (Task as any).create({
      userId,
      title,
      description: description || '',
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      category: category || '',
      tags: tags || [],
      completed: false,
    })

    return createSuccessResponse(task, 'Task created successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Create task')
  }
}

// PUT /api/tasks - Update task  
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
      return createErrorResponse('Task ID is required', 400)
    }

    // Update task
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const task = await (Task as any).findOneAndUpdate(
      { _id: id, userId }, // Ensure user owns the task
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!task) {
      return createErrorResponse('Task not found', 404)
    }

    return createSuccessResponse(task, 'Task updated successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Update task')
  }
}

// DELETE /api/tasks - Delete task
export async function DELETE(request: NextRequest) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    // Get task ID from query parameters
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return createErrorResponse('Task ID is required', 400)
    }

    // Delete task
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deletedTask = await (Task as any).findOneAndDelete({ _id: id, userId })

    if (!deletedTask) {
      return createErrorResponse('Task not found', 404)
    }

    return createSuccessResponse({ id }, 'Task deleted successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Delete task')
  }
}