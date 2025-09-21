// API service for tasks/todos
// Handles CRUD operations for tasks with backend integration

import { apiClient } from './index'

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: 'personal' | 'work' | 'study' | 'health' | 'other'
  createdAt: string
  completedAt?: string
  dueDate?: string
  tags?: string[]
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  estimatedTime?: number
  actualTime?: number
}

export interface TaskStats {
  total: number
  completed: number
  pending: number
  completionRate: number
  todayCompleted: number
  weekCompleted: number
  overdue: number
}

export interface TaskApiParams {
  limit?: number
  page?: number
  sortBy?: 'created' | 'updated' | 'dueDate' | 'priority'
  sortOrder?: 'asc' | 'desc'
  category?: Task['category']
  priority?: Task['priority']
  completed?: boolean
  overdue?: boolean
}

export interface CreateTaskData {
  title: string
  description?: string
  priority: Task['priority']
  category: Task['category']
  dueDate?: string
  tags?: string[]
  estimatedTime?: number
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  id: string
  completed?: boolean
  status?: Task['status']
}

export class TasksApi {
  private static readonly ENDPOINT = '/tasks'

  // Get tasks
  static async getTasks(params?: TaskApiParams): Promise<Task[]> {
    const response = await apiClient.get<Task[]>(this.ENDPOINT, params)
    return response.data || []
  }

  // Get task by ID
  static async getTaskById(id: string): Promise<Task | null> {
    const response = await apiClient.get<Task>(`${this.ENDPOINT}/${id}`)
    return response.data || null
  }

  // Create new task
  static async createTask(data: CreateTaskData): Promise<Task> {
    const response = await apiClient.post<Task>(this.ENDPOINT, data)
    return response.data!
  }

  // Update task
  static async updateTask(data: UpdateTaskData): Promise<Task> {
    const response = await apiClient.put<Task>(`${this.ENDPOINT}/${data.id}`, data)
    return response.data!
  }

  // Delete task
  static async deleteTask(id: string): Promise<boolean> {
    await apiClient.delete(`${this.ENDPOINT}/${id}`)
    return true
  }

  // Toggle task completion
  static async toggleTask(id: string): Promise<Task> {
    // Call backend API directly with auth token
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1').replace(/\/+$/, '')
    
    // Get auth token from localStorage (set by AuthProvider)
    const token = localStorage.getItem('auth-token')
    if (!token) {
      throw new Error('Authentication required. Please log in.')
    }

    try {
      const response = await fetch(`${backendUrl}/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        let errorMessage = 'Failed to toggle task'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
        } catch {
          // If we can't parse error, use default message
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return data.data // Return the task data from the backend response
    } catch (error) {
      console.error('Toggle task error:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Failed to toggle task')
    }
  }

  // Search tasks
  static async searchTasks(query: string, params?: Omit<TaskApiParams, 'limit'>): Promise<Task[]> {
    const response = await apiClient.get<Task[]>(`${this.ENDPOINT}/search`, { 
      q: query, 
      ...params 
    })
    return response.data || []
  }

  // Get task statistics
  static async getStats(): Promise<TaskStats> {
    const response = await apiClient.get<TaskStats>(`${this.ENDPOINT}/stats`)
    return response.data!
  }

  // Get tasks by category
  static async getTasksByCategory(category: Task['category']): Promise<Task[]> {
    const response = await apiClient.get<Task[]>(`${this.ENDPOINT}/category/${category}`)
    return response.data || []
  }

  // Get overdue tasks
  static async getOverdueTasks(): Promise<Task[]> {
    const response = await apiClient.get<Task[]>(`${this.ENDPOINT}/overdue`)
    return response.data || []
  }
}

// Export convenience functions
export const getTasks = TasksApi.getTasks
export const getTaskById = TasksApi.getTaskById
export const createTask = TasksApi.createTask
export const updateTask = TasksApi.updateTask
export const deleteTask = TasksApi.deleteTask
export const toggleTask = TasksApi.toggleTask
export const searchTasks = TasksApi.searchTasks
export const getStats = TasksApi.getStats
export const getTasksByCategory = TasksApi.getTasksByCategory
export const getOverdueTasks = TasksApi.getOverdueTasks
