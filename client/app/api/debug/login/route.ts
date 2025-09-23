import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('Debug login started...')
    const body = await request.json()
    console.log('Request body received:', { email: body.email, hasPassword: !!body.password })
    
    const { connectToDatabase, User } = await import('@/lib/database')
    const bcrypt = await import('bcryptjs')
    
    // Connect to database
    console.log('Connecting to database...')
    await connectToDatabase()
    console.log('Database connected successfully')
    
    // Find user
    console.log('Searching for user:', body.email)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (User as any).findOne(
      { email: body.email.toLowerCase() },
      '+password'
    ).lean()
    
    if (!user) {
      console.log('User not found')
      return Response.json({
        success: false,
        debug: {
          step: 'user_lookup',
          found: false,
          email: body.email.toLowerCase()
        }
      })
    }
    
    console.log('User found:', {
      id: user._id,
      email: user.email,
      hasPassword: !!user.password,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive
    })
    
    // Test password
    console.log('Testing password...')
    const isValidPassword = await bcrypt.compare(body.password, user.password)
    console.log('Password valid:', isValidPassword)
    
    return Response.json({
      success: true,
      debug: {
        step: 'complete',
        userFound: true,
        passwordValid: isValidPassword,
        user: {
          id: user._id,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          isActive: user.isActive,
          hasPassword: !!user.password
        }
      }
    })
    
  } catch (error) {
    console.error('Debug login error:', error)
    return Response.json({
      success: false,
      debug: {
        step: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }
    }, { status: 500 })
  }
}