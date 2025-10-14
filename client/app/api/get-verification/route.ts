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
      email: email.toLowerCase(),
      isEmailVerified: false 
    }).select('+emailVerificationToken +emailVerificationExpires')

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found or already verified'
      }, { status: 404 })
    }

    // Return the verification URL
    const verificationUrl = user.emailVerificationToken ? 
      `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${user.emailVerificationToken}` : 
      null

    return NextResponse.json({
      success: true,
      data: {
        email: user.email,
        verificationUrl,
        message: 'Copy this URL to verify your email manually'
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get verification URL',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}