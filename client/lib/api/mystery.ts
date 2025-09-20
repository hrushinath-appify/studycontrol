// API service for mystery topics
// Handles fetching mystery topics with fallback to mock data

// Types and interfaces
import { sampleTopics, getRandomTopic as getMockRandomTopic, type MysteryTopic } from '../mock-data/mystery-topics'
import { apiClient } from './index'

export interface MysteryApiParams {
  category?: 'history' | 'science' | 'psychology' | 'linguistics' | 'physics'
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  maxReadTime?: number
  limit?: number
}

export class MysteryApi {
  private static readonly ENDPOINT = '/mystery'

  // Get all mystery topics with optional filtering
  static async getTopics(params?: MysteryApiParams): Promise<MysteryTopic[]> {
    try {
      const response = await apiClient.get<MysteryTopic[]>(this.ENDPOINT, params)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch mystery topics from API, using mock data:', error)
      return this.getMockTopics(params)
    }
  }

  // Get a random mystery topic
  static async getRandomTopic(): Promise<MysteryTopic> {
    try {
      const response = await apiClient.get<MysteryTopic>(`${this.ENDPOINT}/random`)
      return response.data || getMockRandomTopic()
    } catch (error) {
      console.warn('Failed to fetch random mystery topic from API, using mock data:', error)
      return getMockRandomTopic()
    }
  }

  // Get mystery topic by ID
  static async getTopicById(id: string): Promise<MysteryTopic | null> {
    try {
      const response = await apiClient.get<MysteryTopic>(`${this.ENDPOINT}/${id}`)
      return response.data || null
    } catch (error) {
      console.warn('Failed to fetch mystery topic by ID from API, using mock data:', error)
      return sampleTopics.find(topic => topic.id === id) || null
    }
  }

  // Search mystery topics
  static async searchTopics(query: string): Promise<MysteryTopic[]> {
    try {
      const response = await apiClient.get<MysteryTopic[]>(`${this.ENDPOINT}/search`, { q: query })
      return response.data || []
    } catch (error) {
      console.warn('Failed to search mystery topics from API, using mock data:', error)
      const lowercaseQuery = query.toLowerCase()
      return sampleTopics.filter(topic =>
        topic.title.toLowerCase().includes(lowercaseQuery) ||
        topic.explanation.toLowerCase().includes(lowercaseQuery) ||
        topic.subtopics.some(subtopic => subtopic.toLowerCase().includes(lowercaseQuery))
      )
    }
  }

  // Get topics by category
  static async getTopicsByCategory(category: MysteryTopic['category']): Promise<MysteryTopic[]> {
    try {
      const response = await apiClient.get<MysteryTopic[]>(`${this.ENDPOINT}/category/${category}`)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch mystery topics by category from API, using mock data:', error)
      return sampleTopics.filter(topic => topic.category === category)
    }
  }

  // Get topics by difficulty
  static async getTopicsByDifficulty(difficulty: MysteryTopic['difficulty']): Promise<MysteryTopic[]> {
    try {
      const response = await apiClient.get<MysteryTopic[]>(`${this.ENDPOINT}/difficulty/${difficulty}`)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch mystery topics by difficulty from API, using mock data:', error)
      return sampleTopics.filter(topic => topic.difficulty === difficulty)
    }
  }

  // Get featured/recommended topics
  static async getFeaturedTopics(limit: number = 3): Promise<MysteryTopic[]> {
    try {
      const response = await apiClient.get<MysteryTopic[]>(`${this.ENDPOINT}/featured`, { limit })
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch featured mystery topics from API, using mock data:', error)
      return sampleTopics.slice(0, limit)
    }
  }

  // Generate a new mystery topic (AI-powered in production)
  static async generateTopic(preferences?: {
    category?: MysteryTopic['category']
    difficulty?: MysteryTopic['difficulty']
    interests?: string[]
  }): Promise<MysteryTopic> {
    try {
      const response = await apiClient.post<MysteryTopic>(`${this.ENDPOINT}/generate`, preferences)
      return response.data || getMockRandomTopic()
    } catch (error) {
      console.warn('Failed to generate mystery topic from API, using random mock data:', error)
      // In mock mode, just return a random topic that matches preferences
      let filteredTopics = [...sampleTopics]
      
      if (preferences?.category) {
        filteredTopics = filteredTopics.filter(topic => topic.category === preferences.category)
      }
      
      if (preferences?.difficulty) {
        filteredTopics = filteredTopics.filter(topic => topic.difficulty === preferences.difficulty)
      }
      
      if (filteredTopics.length === 0) {
        filteredTopics = sampleTopics
      }
      
      return filteredTopics[Math.floor(Math.random() * filteredTopics.length)]!
    }
  }

  // Private helper methods for mock data fallback
  private static getMockTopics(params?: MysteryApiParams): MysteryTopic[] {
    let topics = [...sampleTopics]

    // Apply filters
    if (params?.category) {
      topics = topics.filter(topic => topic.category === params.category)
    }

    if (params?.difficulty) {
      topics = topics.filter(topic => topic.difficulty === params.difficulty)
    }

    if (params?.maxReadTime) {
      topics = topics.filter(topic => 
        !topic.estimatedReadTime || topic.estimatedReadTime <= params.maxReadTime!
      )
    }

    if (params?.limit) {
      topics = topics.slice(0, params.limit)
    }

    return topics
  }
}

// Export convenience functions
export const getTopics = MysteryApi.getTopics
export const getRandomTopic = MysteryApi.getRandomTopic
export const getTopicById = MysteryApi.getTopicById
export const searchTopics = MysteryApi.searchTopics
export const getTopicsByCategory = MysteryApi.getTopicsByCategory
export const getTopicsByDifficulty = MysteryApi.getTopicsByDifficulty
export const getFeaturedTopics = MysteryApi.getFeaturedTopics
export const generateTopic = MysteryApi.generateTopic
