import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User } from '@/lib/database'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Verification token is required'
      }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    // Find user with valid verification token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (User as any).findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: new Date() }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid or expired verification token'
      }, { status: 400 })
    }

    // Update user as verified
    user.isEmailVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationExpires = undefined
    
    await user.save()

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isEmailVerified: user.isEmailVerified
        }
      },
      message: 'Email verified successfully! You can now log in to your account.'
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}