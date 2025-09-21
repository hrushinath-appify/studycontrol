import { NextRequest, NextResponse } from 'next/server'
import { getUser, createSession } from '@/lib/dal'

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

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

    // Create updated user object
    const updatedUser = {
      ...user,
      ...(name && { name }),
      ...(email && { email }),
      ...(avatar && { avatar }),
    }

    // Create new session with updated user data
    await createSession(updatedUser)

    return NextResponse.json({
      success: true,
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        role: updatedUser.role
      }
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Also support PUT method for consistency with AuthProvider
export const PUT = PATCH
