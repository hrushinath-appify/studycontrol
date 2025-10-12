// SSE Event Broadcaster
// Manages SSE connections and broadcasts events to all connected clients

export interface SSEClient {
  id: string
  userId?: string
  controller: ReadableStreamDefaultController
  encoder: TextEncoder
}

class SSEBroadcaster {
  private clients: Map<string, SSEClient> = new Map()

  // Add a new SSE client
  addClient(id: string, controller: ReadableStreamDefaultController, userId?: string): void {
    const client: SSEClient = {
      id,
      ...(userId && { userId }),
      controller,
      encoder: new TextEncoder()
    }
    this.clients.set(id, client)
    console.log(`✅ SSE client ${id} connected. Total clients: ${this.clients.size}`)
  }

  // Remove a client
  removeClient(id: string): void {
    this.clients.delete(id)
    console.log(`❌ SSE client ${id} disconnected. Total clients: ${this.clients.size}`)
  }

  // Broadcast event to all clients (optionally filtered by userId)
  broadcast(event: any, userId?: string): void {
    const data = JSON.stringify(event)
    const message = `data: ${data}\n\n`
    
    let broadcastCount = 0
    
    this.clients.forEach((client) => {
      // If userId is provided, only send to that user's connections
      if (userId && client.userId !== userId) {
        return
      }
      
      try {
        client.controller.enqueue(client.encoder.encode(message))
        broadcastCount++
      } catch (error) {
        console.error(`Failed to send to client ${client.id}:`, error)
        this.removeClient(client.id)
      }
    })
    
    console.log(`📡 Broadcasted event to ${broadcastCount} client(s):`, event.type)
  }

  // Get number of connected clients
  getClientCount(): number {
    return this.clients.size
  }

  // Get number of clients for a specific user
  getUserClientCount(userId: string): number {
    let count = 0
    this.clients.forEach((client) => {
      if (client.userId === userId) {
        count++
      }
    })
    return count
  }
}

// Singleton instance
let broadcaster: SSEBroadcaster | null = null

export function getSSEBroadcaster(): SSEBroadcaster {
  if (!broadcaster) {
    broadcaster = new SSEBroadcaster()
  }
  return broadcaster
}


