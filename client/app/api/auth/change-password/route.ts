import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User } from '@/lib/database'
import { getUserFromToken } from '@/lib/auth-utils'
import bcrypt from 'bcryptjs'
import { createErrorResponse } from '@/lib/api-utils'

export async function PUT(request: NextRequest) {
  try {
    // Get authenticated user
    const authUser = await getUserFromToken(request)
    
    if (!authUser) {
      return createErrorResponse('Unauthorized', 401)
    }
    
    const userId = authUser.id

    // Connect to database
    await connectToDatabase()

    const body = await request.json()
    const { currentPassword, newPassword } = body

    // Validate input
    if (!currentPassword || !newPassword) {
      return createErrorResponse('Current password and new password are required', 400)
    }

    if (newPassword.length < 8) {
      return createErrorResponse('New password must be at least 8 characters long', 400)
    }

    // Get the user with password field
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userDoc = await (User as any).findById(userId).select('+password')
    
    if (!userDoc) {
      return createErrorResponse('User not found', 404)
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userDoc.password)
    if (!isCurrentPasswordValid) {
      return createErrorResponse('Current password is incorrect', 400)
    }

    // Hash new password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12', 10)
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    // Update password in database
    await userDoc.updateOne({ password: hashedNewPassword })

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully'
    })

  } catch (error) {
    console.error('Password change error:', error)
    
    if (error instanceof Error && error.message.includes('Authentication')) {
      return createErrorResponse('Authentication required. Please log in again.', 401)
    }
    
    return createErrorResponse('Internal server error', 500)
  }
}