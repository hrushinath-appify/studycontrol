import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User } from '@/lib/database'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

// Helper function to get authenticated user ID
async function getAuthenticatedUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    throw new Error('Authentication token not found')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string }
    return decoded.userId
  } catch (error) {
    console.error('JWT verification failed:', error)
    throw new Error('Invalid authentication token')
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Get authenticated user
    const userId = await getAuthenticatedUser()

    // Connect to database
    await connectToDatabase()

    const body = await request.json()
    const { name, email, avatar } = body

    // Validate input
    if (name && name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      )
    }

    if (email && (!email.includes('@') || email.length < 5)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if email is already taken by another user
    if (email) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existingUser = await (User as any).findOne({ 
        email, 
        _id: { $ne: userId } 
      })
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email is already taken by another user' },
          { status: 409 }
        )
      }
    }

    // Build update object
    const updateData: Record<string, unknown> = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (avatar !== undefined) updateData.avatar = avatar

    // Update user in database
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedUser = await (User as any).findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: updatedUser._id.toString(),
        email: updatedUser.email,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        role: updatedUser.role,
        isEmailVerified: updatedUser.isEmailVerified,
        lastLogin: updatedUser.lastLogin,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      }
    })

  } catch (error) {
    console.error('Profile update error:', error)
    if (error instanceof Error && error.message.includes('Authentication')) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in again.' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Also support PUT method for consistency with AuthProvider
export const PUT = PATCH
