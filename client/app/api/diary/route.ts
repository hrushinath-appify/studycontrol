import { NextRequest } from 'next/server'
import { connectToDatabase, DiaryEntry } from '@/lib/database'
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

// GET /api/diary - Get diary entries
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    // Extract query parameters for filtering
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    // Build query
    const query: Record<string, unknown> = { userId }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ]
    }

    // Get diary entries with pagination
    const skip = (page - 1) * limit
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const diaryEntries = await (DiaryEntry as any)
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count for pagination
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const total = await (DiaryEntry as any).countDocuments(query)

    return createSuccessResponse({
      entries: diaryEntries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    }, 'Diary entries retrieved successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get diary entries')
  }
}

// POST /api/diary - Create diary entry
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    // Get the request body
    const body = await request.json()
    const { title, content, mood, tags, isPrivate } = body

    // Validate required fields
    if (!title || !content) {
      return createErrorResponse('Title and content are required', 400)
    }

    // Create new diary entry
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const diaryEntry = await (DiaryEntry as any).create({
      userId,
      title,
      content,
      mood: mood || 'neutral',
      tags: tags || [],
      isPrivate: isPrivate !== false, // Default to true if not specified
    })

    return createSuccessResponse(diaryEntry, 'Diary entry created successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Create diary entry')
  }
}