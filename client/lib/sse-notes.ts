// Server-Sent Events implementation for real-time notes updates
// This provides a simpler alternative to WebSockets for real-time functionality

import type { Note } from './api/notes'

export interface NotesSSEEvent {
  type: 'note_created' | 'note_updated' | 'note_deleted' | 'note_archived' | 'connection' | 'ping'
  noteId?: string
  note?: Note
  userId?: string
  timestamp: string
  message?: string
}

export type NotesSSEEventHandler = (event: NotesSSEEvent) => void

class NotesSSEManager {
  private eventSource: EventSource | null = null
  private eventHandlers: Set<NotesSSEEventHandler> = new Set()
  private isConnected = false
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  constructor() {
    this.connect()
  }

  private connect() {
    try {
      const sseUrl = '/api/notes/ws'
      
      this.eventSource = new EventSource(sseUrl, {
        withCredentials: true
      })
      
      this.eventSource.onopen = () => {
        console.log('🔗 Connected to real-time notes updates')
        this.isConnected = true
        this.reconnectAttempts = 0
      }

      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as NotesSSEEvent
          this.handleSSEEvent(data)
        } catch (error) {
          console.error('Failed to parse SSE message:', error)
        }
      }

      this.eventSource.onerror = () => {
        console.log('🔌 SSE connection lost, attempting to reconnect...')
        this.isConnected = false
        this.scheduleReconnect()
      }
    } catch (error) {
      console.error('Failed to connect to SSE:', error)
      this.scheduleReconnect()
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = 1000 * Math.pow(2, this.reconnectAttempts - 1)
      
      console.log(`🔄 Reconnecting to real-time updates in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
      
      setTimeout(() => {
        this.disconnect()
        this.connect()
      }, delay)
    } else {
      console.error('❌ Max reconnection attempts reached. Real-time updates disabled.')
    }
  }

  private handleSSEEvent(event: NotesSSEEvent) {
    // Handle different event types
    switch (event.type) {
      case 'connection':
        console.log('✅ Real-time notes connection established')
        break
      case 'ping':
        // Just keep connection alive, no action needed
        break
      default:
        // Notify all registered event handlers
        this.eventHandlers.forEach(handler => {
          try {
            handler(event)
          } catch (error) {
            console.error('Error in SSE event handler:', error)
          }
        })
    }
  }

  public subscribe(handler: NotesSSEEventHandler) {
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
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
    this.isConnected = false
  }
}

// Singleton instance
let sseManager: NotesSSEManager | null = null

export function getNotesSSEManager(): NotesSSEManager {
  if (!sseManager) {
    sseManager = new NotesSSEManager()
  }
  return sseManager
}

// Hook for using real-time notes in React components
export function useRealtimeNotes() {
  const manager = getNotesSSEManager()
  
  return {
    subscribe: manager.subscribe.bind(manager),
    isConnected: manager.isConnectedToRealtime(),
    disconnect: manager.disconnect.bind(manager)
  }
}

// Utility function to sync real-time events with local storage (backup only)
export function syncSSEEventWithStorage(event: NotesSSEEvent) {
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
    console.warn('Failed to sync SSE event with localStorage backup:', error)
    // Don't throw error, just log warning since this is backup only
  }
}

export default NotesSSEManager
