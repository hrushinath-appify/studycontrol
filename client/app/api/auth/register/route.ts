import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User, generateAvatarUrl } from '@/lib/database'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { createErrorResponse } from '@/lib/api-utils'
import { emailService } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    // Step 1: Get and validate input
    const body = await request.json()
    const { name, email, password } = body

    console.log('🔵 Registration Flow Started')
    console.log('📝 Input received:', { name, email: email ? 'provided' : 'missing' })

    // Step 2: Validate input
    if (!name || !email || !password) {
      console.log('❌ Validation failed: Missing required fields')
      return createErrorResponse('Name, email, and password are required', 400)
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format')
      return createErrorResponse('Please enter a valid email address', 400)
    }

    // Password validation - at least 8 characters
    if (password.length < 8) {
      console.log('❌ Validation failed: Password too short')
      return createErrorResponse('Password must be at least 8 characters long', 400)
    }

    // Name validation
    if (name.trim().length < 2) {
      console.log('❌ Validation failed: Name too short')
      return createErrorResponse('Name must be at least 2 characters long', 400)
    }

    console.log('✅ Input validation passed')

    // Step 3: Connect to database
    await connectToDatabase()
    console.log('✅ Database connected')

    // Step 4: Check if user exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingUser = await (User as any).findOne({ email: email.toLowerCase() })
    if (existingUser) {
      console.log('❌ User already exists:', email)
      return createErrorResponse('User with this email already exists', 409)
    }

    console.log('✅ Email is available')

    // Step 5: Hash password with bcrypt (10 rounds as per diagram)
    const saltRounds = 10
    console.log('🔐 Hashing password with bcrypt (10 rounds)...')
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    console.log('✅ Password hashed successfully')

    // Step 6: Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex')
    console.log('✅ Verification token generated')

    // Step 7: Save to MongoDB (users collection)
    console.log('💾 Saving user to MongoDB...')
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      avatar: generateAvatarUrl(name),
      isEmailVerified: false, // Require email verification
      emailVerificationToken: hashedVerificationToken,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isActive: true,
      role: 'user',
      provider: 'credentials', // Credentials-based registration
      mysteryClicks: 0
    })

    await newUser.save()
    console.log('✅ User saved to MongoDB:', newUser._id)

    // Step 8: Send verification email
    console.log('📧 Sending verification email...')
    const emailSent = await emailService.sendVerificationEmail(
      newUser.email,
      newUser.name,
      verificationToken
    )

    if (emailSent) {
      console.log('✅ Verification email sent successfully')
    } else {
      console.warn('⚠️  Verification email could not be sent - check SMTP configuration')
      console.log('📧 Verification token (for testing):')
      console.log(`   Token: ${verificationToken}`)
      console.log(`   URL: ${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`)
    }

    // Step 9: Registration success
    console.log('🎉 Registration successful!')
    
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          isEmailVerified: newUser.isEmailVerified,
          role: newUser.role
        }
      },
      message: 'Registration successful! Please check your email to verify your account before logging in.'
    })

  } catch (error) {
    console.error('❌ Registration error:', error)
    
    // Handle MongoDB duplicate key error (race condition)
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return createErrorResponse('User with this email already exists', 409)
    }
    
    return createErrorResponse('Internal server error', 500)
  }
}
