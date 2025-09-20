// API service for quotes
// Handles fetching motivational quotes with fallback to mock data

import { apiClient } from './index'
import { motivationalQuotes, getRandomQuote as getMockRandomQuote, type Quote } from '../mock-data/quotes'

// Re-export the Quote type for external use
export type { Quote }

export interface QuotesApiParams {
  category?: 'motivation' | 'education' | 'success' | 'learning'
  tag?: string
  limit?: number
  random?: boolean
}

export class QuotesApi {
  private static readonly ENDPOINT = '/quotes'

  // Get all quotes with optional filtering
  static async getQuotes(params?: QuotesApiParams): Promise<Quote[]> {
    try {
      const response = await apiClient.get<Quote[]>(this.ENDPOINT, params)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch quotes from API, using mock data:', error)
      return this.getMockQuotes(params)
    }
  }

  // Get a random quote
  static async getMockRandomQuote(): Promise<Quote> {
    try {
      const response = await apiClient.get<Quote>(`${this.ENDPOINT}/random`)
      return response.data || getMockRandomQuote()
    } catch (error) {
      console.warn('Failed to fetch random quote from API, using mock data:', error)
      return getMockRandomQuote()
    }
  }

  // Search quotes
  static async searchQuotes(query: string): Promise<Quote[]> {
    try {
      const response = await apiClient.get<Quote[]>(`${this.ENDPOINT}/search`, { q: query })
      return response.data || []
    } catch (error) {
      console.warn('Failed to search quotes from API, using mock data:', error)
      return motivationalQuotes.filter(quote =>
        quote.quote.toLowerCase().includes(query.toLowerCase()) ||
        quote.author.toLowerCase().includes(query.toLowerCase()) ||
        quote.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    }
  }

  // Get quotes by category
  static async getQuotesByCategory(category: Quote['category']): Promise<Quote[]> {
    try {
      const response = await apiClient.get<Quote[]>(`${this.ENDPOINT}/category/${category}`)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch quotes by category from API, using mock data:', error)
      return motivationalQuotes.filter(quote => quote.category === category)
    }
  }

  // Get quote of the day
  static async getQuoteOfTheDay(): Promise<Quote> {
    try {
      const response = await apiClient.get<Quote>(`${this.ENDPOINT}/daily`)
      return response.data || QuotesApi.getDailyMockQuote()
    } catch (error) {
      console.warn('Failed to fetch quote of the day from API, using mock data:', error)
      return QuotesApi.getDailyMockQuote()
    }
  }

  // Private helper methods for mock data fallback
  private static getDailyMockQuote(): Quote {
    // Return a consistent "daily" quote based on the current date
    const today = new Date().toDateString()
    const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const index = hash % motivationalQuotes.length
    return motivationalQuotes[index] ?? motivationalQuotes[0]!
  }

  private static getMockQuotes(params?: QuotesApiParams): Quote[] {
    let quotes = [...motivationalQuotes]

    // Apply filters
    if (params?.category) {
      quotes = quotes.filter(quote => quote.category === params.category)
    }

    if (params?.tag) {
      quotes = quotes.filter(quote => quote.tags?.includes(params.tag!))
    }

    if (params?.random) {
      quotes = quotes.sort(() => Math.random() - 0.5)
    }

    if (params?.limit) {
      quotes = quotes.slice(0, params.limit)
    }

    return quotes
  }
}

// Export convenience functions
export const getQuotes = QuotesApi.getQuotes
export const getRandomQuote = QuotesApi.getMockRandomQuote
export const searchQuotes = QuotesApi.searchQuotes
export const getQuotesByCategory = QuotesApi.getQuotesByCategory
export const getQuoteOfTheDay = QuotesApi.getQuoteOfTheDay
