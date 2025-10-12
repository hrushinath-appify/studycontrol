// Real-time notes functionality using WebSocket
// Provides real-time updates for notes across multiple browser tabs/sessions

import type { Note } from './api/notes'

export interface RealtimeNoteEvent {
  type: 'note_created' | 'note_updated' | 'note_deleted' | 'note_archived'
  noteId: string
  note?: Note
  userId: string
  timestamp: string
}

export type RealtimeNoteEventHandler = (event: RealtimeNoteEvent) => void

class RealtimeNotesManager {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private eventHandlers: Set<RealtimeNoteEventHandler> = new Set()
  private isConnected = false
  private heartbeatInterval: NodeJS.Timeout | null = null

  constructor() {
    this.connect()
  }

  private connect() {
    try {
      // Use Next.js API route for WebSocket upgrade
      const wsUrl = process.env.NODE_ENV === 'production' 
        ? `wss://${window.location.host}/api/notes/ws`
        : `ws://localhost:3000/api/notes/ws`
      
      this.ws = new WebSocket(wsUrl)
      
      this.ws.onopen = () => {
        console.log('🔗 Connected to real-time notes service')
        this.isConnected = true
        this.reconnectAttempts = 0
        this.startHeartbeat()
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type && data.type.startsWith('note_')) {
            this.handleRealtimeEvent(data as RealtimeNoteEvent)
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      this.ws.onclose = () => {
        console.log('🔌 Disconnected from real-time notes service')
        this.isConnected = false
        this.stopHeartbeat()
        this.scheduleReconnect()
      }

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error)
      }
    } catch (error) {
      console.error('Failed to connect to real-time notes service:', error)
      this.scheduleReconnect()
    }
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }))
      }
    }, 30000) // Send ping every 30 seconds
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
      
      console.log(`🔄 Reconnecting to real-time service in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
      
      setTimeout(() => {
        this.connect()
      }, delay)
    } else {
      console.error('❌ Max reconnection attempts reached. Real-time updates disabled.')
    }
  }

  private handleRealtimeEvent(event: RealtimeNoteEvent) {
    // Notify all registered event handlers
    this.eventHandlers.forEach(handler => {
      try {
        handler(event)
      } catch (error) {
        console.error('Error in real-time event handler:', error)
      }
    })
  }

  public subscribe(handler: RealtimeNoteEventHandler) {
    this.eventHandlers.add(handler)
    
    // Return unsubscribe function
    return () => {
      this.eventHandlers.delete(handler)
    }
  }

  public isConnectedToRealtime(): boolean {
    return this.isConnected
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.stopHeartbeat()
    this.isConnected = false
  }
}

// Singleton instance
let realtimeManager: RealtimeNotesManager | null = null

export function getRealtimeNotesManager(): RealtimeNotesManager {
  if (!realtimeManager) {
    realtimeManager = new RealtimeNotesManager()
  }
  return realtimeManager
}

// Hook for using real-time notes in React components
export function useRealtimeNotes() {
  const manager = getRealtimeNotesManager()
  
  return {
    subscribe: manager.subscribe.bind(manager),
    isConnected: manager.isConnectedToRealtime(),
    disconnect: manager.disconnect.bind(manager)
  }
}

// Utility function to sync real-time events with local storage (backup only)
export function syncRealtimeEventWithStorage(event: RealtimeNoteEvent) {
  try {
    // Only sync to localStorage as backup, not as primary storage
    const localNotes = JSON.parse(localStorage.getItem('studyControlNotes') || '[]')
    
    switch (event.type) {
      case 'note_created':
      case 'note_updated':
        if (event.note) {
          const existingIndex = localNotes.findIndex((note: Note) => note.id === event.noteId)
          if (existingIndex !== -1) {
            localNotes[existingIndex] = event.note
          } else {
            localNotes.unshift(event.note)
          }
          localStorage.setItem('studyControlNotes', JSON.stringify(localNotes))
        }
        break
        
      case 'note_deleted':
        const filteredNotes = localNotes.filter((note: Note) => note.id !== event.noteId)
        localStorage.setItem('studyControlNotes', JSON.stringify(filteredNotes))
        break
        
      case 'note_archived':
        if (event.note) {
          const noteIndex = localNotes.findIndex((note: Note) => note.id === event.noteId)
          if (noteIndex !== -1) {
            localNotes[noteIndex] = event.note
            localStorage.setItem('studyControlNotes', JSON.stringify(localNotes))
          }
        }
        break
    }
  } catch (error) {
    console.warn('Failed to sync real-time event with localStorage backup:', error)
    // Don't throw error, just log warning since this is backup only
  }
}

export default RealtimeNotesManager
