import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, Note } from '@/lib/database'
import { getUserFromToken } from '@/lib/auth-utils'
import mongoose from 'mongoose'

// GET /api/notes/tags - Get all unique tags
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

    // Get all unique tags for the user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tags = await (Note as any).distinct('tags', {
      userId: new mongoose.Types.ObjectId(userId)
    })

    // Filter out empty/null tags and sort alphabetically
    const uniqueTags = tags
      .filter((tag: string) => tag && tag.trim().length > 0)
      .sort((a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase()))

    return createSuccessResponse(uniqueTags, 'Tags retrieved successfully')

  } catch (error) {
    console.error('Get Tags API Route Error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    return handleApiError(error, 'Get tags')
  }
}
