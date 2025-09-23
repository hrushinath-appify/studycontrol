import { NextRequest } from 'next/server'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { connectToDatabase, User } from '@/lib/database'

export async function POST(_request: NextRequest) {
  try {
    // Authenticate via JWT cookie like other API routes
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value
    if (!token) return createErrorResponse('Authentication required', 401)

    let userId: string
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string }
      userId = decoded.userId
    } catch {
      return createErrorResponse('Invalid authentication token', 401)
    }

    await connectToDatabase()

    // Update mystery click count in database
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedUser = await (User as any).findByIdAndUpdate(
      userId,
      { 
        $inc: { mysteryClicks: 1 },
        $set: { updatedAt: new Date() }
      },
      { new: true }
    )

    if (!updatedUser) {
      return createErrorResponse('User not found', 404)
    }

    return createSuccessResponse(
      { mysteryClicks: updatedUser.mysteryClicks },
      'Mystery exploration tracked successfully'
    )

  } catch (error) {
    console.error('Mystery tracking API error:', error)
    return handleApiError(error, 'Track mystery exploration')
  }
}