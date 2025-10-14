import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Verification token is required'
      }, { status: 400 })
    }

    await connectToDatabase()

    // Find user with this verification token (include token field)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (User as any).findOne({ 
      emailVerificationToken: token,
      isEmailVerified: false 
    }).select('+emailVerificationToken +emailVerificationExpires')

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid or expired verification token'
      }, { status: 404 })
    }

    // Update user to verified
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (User as any).findByIdAndUpdate(user._id, {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerifiedAt: new Date()
    })

    return NextResponse.json({
      success: true,
      data: {
        email: user.email,
        message: 'Email verified successfully! You can now login.'
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to verify email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}