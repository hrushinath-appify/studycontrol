import { NextRequest } from 'next/server'
import { getUserFromToken } from '@/lib/auth-utils'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { connectToDatabase, Note } from '@/lib/database'
import mongoose from 'mongoose'

// GET /api/notes/stats - Get note statistics
export async function GET(request: NextRequest) {
  try {
    // Check if user has a valid session
    const user = await getUserFromToken(request)
    if (!user) {
      return createErrorResponse('Authentication required', 401)
    }

    const userId = user.id

    // Connect to database
    await connectToDatabase()

    // Get all notes for the user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const notes = await (Note as any)
      .find({ userId: new mongoose.Types.ObjectId(userId) })
      .lean()

    // Calculate statistics
    const totalNotes = notes.length
    const archivedNotes = notes.filter((n: { isArchived: boolean }) => n.isArchived).length
    const pinnedNotes = notes.filter((n: { isPinned: boolean }) => n.isPinned).length
    
    const totalWords = notes.reduce((sum: number, note: { content: string }) => {
      return sum + (note.content?.trim().split(/\s+/).filter((w: string) => w.length > 0).length || 0)
    }, 0)
    const averageWordsPerNote = totalNotes > 0 ? Math.round(totalWords / totalNotes) : 0

    // Category distribution
    const categoryDistribution: Record<string, number> = {}
    notes.forEach((note: { category?: string }) => {
      const category = note.category || 'Uncategorized'
      categoryDistribution[category] = (categoryDistribution[category] || 0) + 1
    })

    // Tag distribution
    const tagDistribution: Record<string, number> = {}
    notes.forEach((note: { tags?: string[] }) => {
      if (note.tags && Array.isArray(note.tags)) {
        note.tags.forEach((tag: string) => {
          tagDistribution[tag] = (tagDistribution[tag] || 0) + 1
        })
      }
    })

    // Notes this month and week
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    const notesThisMonth = notes.filter((n: { createdAt: Date }) => 
      new Date(n.createdAt) >= startOfMonth
    ).length
    
    const notesThisWeek = notes.filter((n: { createdAt: Date }) => 
      new Date(n.createdAt) >= startOfWeek
    ).length

    const stats = {
      totalNotes,
      archivedNotes,
      pinnedNotes,
      totalWords,
      averageWordsPerNote,
      categoryDistribution,
      tagDistribution,
      notesThisMonth,
      notesThisWeek
    }

    return createSuccessResponse(stats, 'Note statistics retrieved successfully')

  } catch (error) {
    console.error('Notes Stats API Route Error:', error)
    return handleApiError(error, 'Get note statistics')
  }
}