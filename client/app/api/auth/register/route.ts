import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User } from '@/lib/database'
import { sendVerificationEmail } from '@/lib/email'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

// Helper function to generate avatar URL
function generateAvatarUrl(name: string): string {
  const generateInitials = (name: string) => {
    if (!name || name.trim() === '') return 'U'
    
    const trimmedName = name.trim()
    const words = trimmedName.split(/\s+/).filter(word => word.length > 0)
    
    if (words.length === 0) return 'U'
    
    // If single word, take first 2 characters
    if (words.length === 1) {
      return trimmedName.substring(0, 2).toUpperCase()
    }
    
    // If multiple words, take first character of each word (max 2)
    return words
      .slice(0, 2)
      .map(word => word[0])
      .join("")
      .toUpperCase()
  }

  const initials = generateInitials(name)
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=200`
}

// Helper function to send verification email
async function sendVerificationEmailToUser(email: string, name: string, token: string): Promise<{ success: boolean; error?: string; verificationUrl?: string }> {
  try {
    console.log('🔧 Attempting to send email to:', email)
    const result = await sendVerificationEmail(email, name, token)
    return result
  } catch (error) {
    console.error('❌ Email sending failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email error'
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Name, email, and password are required'
      }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Check if user already exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingUser = await (User as any).findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'User already exists with this email'
      }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    // Store the plain token for manual verification during development
    // In production, you'd want to hash this for security

    // Create user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = new (User as any)({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      avatar: generateAvatarUrl(name),
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isActive: true,
      role: 'user',
      provider: 'credentials',
      mysteryClicks: 0,
      preferences: {
        theme: 'system',
        studyReminders: true,
        appUpdates: true,
        emailNotifications: true,
        soundEnabled: true,
        language: 'en',
      },
      profile: {
        timezone: 'UTC',
      },
    })

    // Save user to database
    await user.save()
    console.log('✅ User saved successfully:', user.email)

    // Attempt to send verification email
    let emailSent = false
    let emailError = null
    let verificationUrl = null
    try {
      const emailResult = await sendVerificationEmailToUser(user.email, user.name, verificationToken)
      emailSent = emailResult.success
      emailError = emailResult.error || null
      verificationUrl = emailResult.verificationUrl || null
      
      if (emailSent) {
        console.log('✅ Verification email sent successfully to:', user.email)
      } else {
        console.log('⚠️ Verification email sending failed:', emailError)
      }
    } catch (error) {
      console.error('❌ Failed to send verification email:', error)
      emailError = error instanceof Error ? error.message : 'Unknown email error'
    }

    // Prepare response message
    const responseMessage = emailSent 
      ? 'Registration successful! Please check your email to verify your account before logging in.'
      : emailError 
        ? `Registration successful! However, we could not send the verification email (${emailError}). Please contact support to verify your account.`
        : 'Registration successful! However, we could not send the verification email. Please contact support to verify your account.'
    
    // Return success response (password is excluded by the User model)
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt
        },
        emailSent,
        emailError: emailError || undefined,
        verificationUrl: emailSent ? verificationUrl : undefined,
      },
      message: responseMessage
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
    }, { status: 500 })
  }
}