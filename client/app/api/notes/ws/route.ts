import { NextRequest } from 'next/server'
import { getUserFromToken } from '@/lib/auth-utils'
import { getSSEBroadcaster } from '@/lib/sse-broadcaster'

// Server-Sent Events endpoint for real-time notes updates
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getUserFromToken(request)
    const userId = user?.id
    
    // Generate unique client ID
    const clientId = `${userId || 'anonymous'}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Create a readable stream for Server-Sent Events
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder()
        
        // Register this client with the broadcaster
        const broadcaster = getSSEBroadcaster()
        broadcaster.addClient(clientId, controller, userId)
        
        // Send initial connection message
        const data = JSON.stringify({
          type: 'connection',
          message: 'Connected to real-time notes updates',
          timestamp: new Date().toISOString()
        })
        
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        
        // Keep connection alive with periodic pings
        const pingInterval = setInterval(() => {
          const pingData = JSON.stringify({
            type: 'ping',
            timestamp: new Date().toISOString()
          })
          
          try {
            controller.enqueue(encoder.encode(`data: ${pingData}\n\n`))
          } catch {
            clearInterval(pingInterval)
            broadcaster.removeClient(clientId)
            controller.close()
          }
        }, 30000)
        
        // Clean up on close
        request.signal.addEventListener('abort', () => {
          clearInterval(pingInterval)
          broadcaster.removeClient(clientId)
          controller.close()
        })
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
      },
    })
  } catch (error) {
    console.error('SSE connection error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

// POST method for SSE connection (alternative endpoint)
export async function POST(request: NextRequest) {
  return GET(request)
}
