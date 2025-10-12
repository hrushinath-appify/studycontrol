import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database'
import { Session } from '@/lib/session-model'
import { cookies } from 'next/headers'

export async function POST(_request: NextRequest) {
  try {
    console.log('🔵 Logout Flow Started')
    
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth-token')?.value

    // Step 1: Delete session from MongoDB if token exists
    if (authToken) {
      try {
        await connectToDatabase()
        console.log('✅ Database connected')

        // Step 2: Find and delete session from database
        console.log('🗑️ Deleting session from MongoDB...')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (Session as any).deleteOne({ 
          token: authToken,
          isActive: true 
        })

        if (result.deletedCount > 0) {
          console.log('✅ Session deleted from database')
        } else {
          console.log('⚠️ Session not found in database (may be expired)')
        }
      } catch (dbError) {
        console.error('⚠️ Database cleanup error (continuing):', dbError)
        // Continue with logout even if database operation fails
      }
    }

    // Step 3: Clear session cookie
    console.log('🍪 Clearing authentication cookies...')
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })

    // Step 4: Delete cookies
    response.cookies.delete('auth-token')
    response.cookies.delete('refresh-token')
    response.cookies.delete('session-token')

    console.log('✅ Cookies cleared')
    console.log('🎉 Logout complete')

    return response

  } catch (error) {
    console.error('❌ Logout error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
