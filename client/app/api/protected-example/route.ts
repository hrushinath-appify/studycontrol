import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken, hasRole } from '@/lib/auth-utils'
import { createErrorResponse } from '@/lib/api-utils'

/**
 * Example Protected API Route
 * Demonstrates the authentication flow as per the diagram:
 * 1. getServerSession / getUserFromToken
 * 2. Verify session
 * 3. Check role/permissions
 * 4. Execute business logic
 * 5. Return response
 */

export async function GET(request: NextRequest) {
  try {
    // Step 1: Get session and validate authentication
    console.log('🔍 [Protected Route] Validating user session...')
    const user = await getUserFromToken(request)

    // Step 2: Verify session
    if (!user) {
      console.log('❌ [Protected Route] Unauthorized - no valid session')
      return createErrorResponse('Unauthorized', 401)
    }

    console.log('✅ [Protected Route] User authenticated:', user.email)

    // Step 3: Check role/permissions (optional - depends on route requirements)
    // Example: Check if user is admin
    const requiresAdmin = false // Set to true if this route requires admin access
    
    if (requiresAdmin && !hasRole(user, 'admin')) {
      console.log('❌ [Protected Route] Forbidden - insufficient permissions')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Forbidden',
          message: 'You do not have permission to access this resource'
        },
        { status: 403 }
      )
    }

    // Step 4: Execute action / Business Logic
    console.log('⚙️ [Protected Route] Executing business logic...')
    
    // Example: Query MongoDB for user-specific data
    // const data = await queryUserData(user.id)
    
    // For this example, we'll just return user info
    const responseData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider
      },
      message: 'This is a protected route. You have access!',
      timestamp: new Date().toISOString()
    }

    console.log('✅ [Protected Route] Business logic executed successfully')

    // Step 5: Return response
    return NextResponse.json({
      success: true,
      data: responseData
    })

  } catch (error) {
    console.error('❌ [Protected Route] Error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

// Example POST endpoint with role-based access control
export async function POST(request: NextRequest) {
  try {
    // Step 1: Get session
    const user = await getUserFromToken(request)

    // Step 2: Verify session
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    // Step 3: Check permissions - this action requires admin role
    if (!hasRole(user, 'admin')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Forbidden',
          message: 'Only administrators can perform this action'
        },
        { status: 403 }
      )
    }

    // Step 4: Get request body and execute business logic
    const body = await request.json()
    console.log('⚙️ [Protected Route] Admin action:', body)

    // Execute admin-specific business logic here
    // Example: await updateSystemSettings(body)

    // Step 5: Return response
    return NextResponse.json({
      success: true,
      message: 'Admin action completed successfully'
    })

  } catch (error) {
    console.error('❌ [Protected Route] Error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
