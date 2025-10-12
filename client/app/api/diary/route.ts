import { NextRequest } from 'next/server'
import { connectToDatabase, DiaryEntry } from '@/lib/database'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { getUserFromToken } from '@/lib/auth-utils'
import { formatDate } from '@/lib/date-utils'
import mongoose from 'mongoose'

// GET /api/diary - Get diary entries
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

    // Extract query parameters for filtering
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    // Build query - Convert userId string to ObjectId for proper matching
    const query: Record<string, unknown> = { userId: new mongoose.Types.ObjectId(userId) }
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

    // Serialize MongoDB ObjectIds to strings for JSON and add formatted date
    const serializedEntries = diaryEntries.map((entry: any) => {
      // Convert ObjectIds to strings FIRST, then create the object
      const entryId = entry._id.toString()
      const entryUserId = entry.userId.toString()
      const entryDate = formatDate(entry.createdAt)
      
      // Debug logging to verify ID format
      console.log('📝 Diary Entry Serialization:', {
        rawId: entry._id,
        stringId: entryId,
        idLength: entryId.length,
        isValidObjectId: /^[0-9a-fA-F]{24}$/.test(entryId),
        title: entry.title
      })
      
      return {
        _id: entryId,
        id: entryId, // Include both _id and id for compatibility
        userId: entryUserId,
        title: entry.title,
        content: entry.content,
        date: entryDate,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        mood: entry.mood,
        tags: entry.tags || [],
        isPrivate: entry.isPrivate,
      }
    })

    return createSuccessResponse({
      entries: serializedEntries,
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
    const user = await getUserFromToken(request)
    
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }
    
    const userId = user.id

    // Connect to database
    await connectToDatabase()

    // Get the request body
    const body = await request.json()
    const { title, content, mood, tags, isPrivate } = body

    // Validate required fields
    if (!title || !content) {
      return createErrorResponse('Title and content are required', 400)
    }

    // Create new diary entry - Convert userId string to ObjectId for proper storage
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const diaryEntry = await (DiaryEntry as any).create({
      userId: new mongoose.Types.ObjectId(userId),
      title,
      content,
      mood: mood || 'neutral',
      tags: tags || [],
      isPrivate: isPrivate !== false, // Default to true if not specified
    })

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

    return createSuccessResponse(serializedEntry, 'Diary entry created successfully')

  } catch (error) {
    console.error('API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Create diary entry')
  }
}