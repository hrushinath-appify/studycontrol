import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({
        success: false,
        error: 'Email is required'
      }, { status: 400 })
    }

    await connectToDatabase()

    // Find user with this email (include emailVerificationToken)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (User as any).findOne({ 
      email: email.toLowerCase()
    }).select('+emailVerificationToken +emailVerificationExpires')

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Return debug info
    return NextResponse.json({
      success: true,
      data: {
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        emailVerificationToken: user.emailVerificationToken,
        emailVerificationExpires: user.emailVerificationExpires,
        hasToken: !!user.emailVerificationToken
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get user info',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}