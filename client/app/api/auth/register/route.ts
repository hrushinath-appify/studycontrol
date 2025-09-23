import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User, generateAvatarUrl } from '@/lib/database'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Password validation
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectToDatabase()

    // Check if user already exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingUser = await (User as any).findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex')

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      avatar: generateAvatarUrl(name),
      isEmailVerified: false, // Require email verification for all environments
      emailVerificationToken: hashedVerificationToken,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isActive: true,
      role: 'user'
    })

    await newUser.save()

    // TODO: Send verification email (for now, just log the token for testing)
    console.log(`Verification token for ${email}: ${verificationToken}`)
    console.log(`Verification URL: ${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`)

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          isEmailVerified: newUser.isEmailVerified
        }
      },
      message: 'Registration successful! Please check your email to verify your account before logging in.'
    })

  } catch (error) {
    console.error('Registration error:', error)
    
    // Handle MongoDB duplicate key error
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
