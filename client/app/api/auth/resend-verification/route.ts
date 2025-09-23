import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User } from '@/lib/database'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({
        success: false,
        error: 'Email is required'
      }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Find unverified user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (User as any).findOne({
      email: email.toLowerCase(),
      isEmailVerified: false
    })

    if (!user) {
      // Don't reveal if user exists or is already verified
      return NextResponse.json({
        success: true,
        message: 'If an unverified account with that email exists, a new verification email has been sent'
      })
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex')

    // Update user with new token
    user.emailVerificationToken = hashedVerificationToken
    user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    await user.save()

    // TODO: Send verification email (for now, just log the token for testing)
    console.log(`New verification token for ${email}: ${verificationToken}`)
    console.log(`Verification URL: ${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`)

    return NextResponse.json({
      success: true,
      message: 'Verification email sent! Please check your inbox.'
    })

  } catch (error) {
    console.error('Resend verification email error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}