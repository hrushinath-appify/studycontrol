import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  try {
    // Get GitHub OAuth credentials from environment
    const clientId = process.env.GITHUB_CLIENT_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/oauth/github/callback`
    
    if (!clientId) {
      return NextResponse.json(
        { success: false, error: 'GitHub OAuth not configured' },
        { status: 500 }
      )
    }

    // Build GitHub OAuth URL
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize')
    githubAuthUrl.searchParams.set('client_id', clientId)
    githubAuthUrl.searchParams.set('redirect_uri', redirectUri)
    githubAuthUrl.searchParams.set('scope', 'read:user user:email')
    githubAuthUrl.searchParams.set('allow_signup', 'true')

    // Redirect to GitHub OAuth consent page
    return NextResponse.redirect(githubAuthUrl.toString())
  } catch (error) {
    console.error('GitHub OAuth initiation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to initiate GitHub OAuth' },
      { status: 500 }
    )
  }
}
