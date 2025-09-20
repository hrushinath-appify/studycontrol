// API service for news and research papers
// Handles fetching news articles and research papers with fallback to mock data

import { apiClient } from './index'
import { 
  mockNewsData, 
  mockResearchData, 
  type MockNewsArticle, 
  type MockResearchPaper 
} from '../mock-data/news-articles'

export interface NewsApiParams {
  category?: 'general' | 'medical' | 'education' | 'research'
  source?: string
  limit?: number
  page?: number
  sortBy?: 'relevance' | 'date' | 'popularity'
}

export interface ResearchApiParams {
  category?: 'medical education' | 'clinical research' | 'technology' | 'methodology'
  openAccess?: boolean
  limit?: number
  page?: number
  sortBy?: 'citations' | 'date' | 'relevance'
}

export class NewsApi {
  private static readonly ENDPOINT = '/news'

  // Get news articles
  static async getArticles(params?: NewsApiParams): Promise<MockNewsArticle[]> {
    try {
      const response = await apiClient.get<MockNewsArticle[]>(this.ENDPOINT, params)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch news articles from API, using mock data:', error)
      return this.getMockArticles(params)
    }
  }

  // Get article by ID
  static async getArticleById(id: string): Promise<MockNewsArticle | null> {
    try {
      const response = await apiClient.get<MockNewsArticle>(`${this.ENDPOINT}/${id}`)
      return response.data || null
    } catch (error) {
      console.warn('Failed to fetch article by ID from API, using mock data:', error)
      return mockNewsData.find(article => article.id === id) || null
    }
  }

  // Search articles
  static async searchArticles(query: string, params?: Omit<NewsApiParams, 'limit'>): Promise<MockNewsArticle[]> {
    try {
      const response = await apiClient.get<MockNewsArticle[]>(`${this.ENDPOINT}/search`, { 
        q: query, 
        ...params 
      })
      return response.data || []
    } catch (error) {
      console.warn('Failed to search articles from API, using mock data:', error)
      const lowercaseQuery = query.toLowerCase()
      return mockNewsData.filter(article =>
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.description.toLowerCase().includes(lowercaseQuery) ||
        article.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
        article.author?.toLowerCase().includes(lowercaseQuery)
      )
    }
  }

  // Get trending articles
  static async getTrendingArticles(limit: number = 5): Promise<MockNewsArticle[]> {
    try {
      const response = await apiClient.get<MockNewsArticle[]>(`${this.ENDPOINT}/trending`, { limit })
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch trending articles from API, using mock data:', error)
      return mockNewsData
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
        .slice(0, limit)
    }
  }

  // Get articles by category
  static async getArticlesByCategory(category: MockNewsArticle['category']): Promise<MockNewsArticle[]> {
    try {
      const response = await apiClient.get<MockNewsArticle[]>(`${this.ENDPOINT}/category/${category}`)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch articles by category from API, using mock data:', error)
      return mockNewsData.filter(article => article.category === category)
    }
  }

  // Private helper for mock data
  private static getMockArticles(params?: NewsApiParams): MockNewsArticle[] {
    let articles = [...mockNewsData]

    if (params?.category) {
      articles = articles.filter(article => article.category === params.category)
    }

    if (params?.source) {
      articles = articles.filter(article => article.source.name === params.source)
    }

    // Sort articles
    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'date':
          articles = articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          break
        case 'relevance':
          articles = articles.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
          break
        case 'popularity':
          // Mock popularity based on relevance score
          articles = articles.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
          break
      }
    }

    if (params?.limit) {
      articles = articles.slice(0, params.limit)
    }

    return articles
  }
}

export class ResearchApi {
  private static readonly ENDPOINT = '/research'

  // Get research papers
  static async getPapers(params?: ResearchApiParams): Promise<MockResearchPaper[]> {
    try {
      const response = await apiClient.get<MockResearchPaper[]>(this.ENDPOINT, params)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch research papers from API, using mock data:', error)
      return this.getMockPapers(params)
    }
  }

  // Get paper by ID
  static async getPaperById(id: string): Promise<MockResearchPaper | null> {
    try {
      const response = await apiClient.get<MockResearchPaper>(`${this.ENDPOINT}/${id}`)
      return response.data || null
    } catch (error) {
      console.warn('Failed to fetch paper by ID from API, using mock data:', error)
      return mockResearchData.find(paper => paper.id === id) || null
    }
  }

  // Search papers
  static async searchPapers(query: string, params?: Omit<ResearchApiParams, 'limit'>): Promise<MockResearchPaper[]> {
    try {
      const response = await apiClient.get<MockResearchPaper[]>(`${this.ENDPOINT}/search`, { 
        q: query, 
        ...params 
      })
      return response.data || []
    } catch (error) {
      console.warn('Failed to search papers from API, using mock data:', error)
      const lowercaseQuery = query.toLowerCase()
      return mockResearchData.filter(paper =>
        paper.title.toLowerCase().includes(lowercaseQuery) ||
        paper.abstract.toLowerCase().includes(lowercaseQuery) ||
        paper.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
        paper.authors.some(author => author.toLowerCase().includes(lowercaseQuery))
      )
    }
  }

  // Get trending papers (by citations)
  static async getTrendingPapers(limit: number = 5): Promise<MockResearchPaper[]> {
    try {
      const response = await apiClient.get<MockResearchPaper[]>(`${this.ENDPOINT}/trending`, { limit })
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch trending papers from API, using mock data:', error)
      return mockResearchData
        .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
        .slice(0, limit)
    }
  }

  // Get open access papers
  static async getOpenAccessPapers(limit?: number): Promise<MockResearchPaper[]> {
    try {
      const response = await apiClient.get<MockResearchPaper[]>(`${this.ENDPOINT}/open-access`, { limit })
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch open access papers from API, using mock data:', error)
      const openAccessPapers = mockResearchData.filter(paper => paper.openAccess === true)
      return limit ? openAccessPapers.slice(0, limit) : openAccessPapers
    }
  }

  // Get papers by category
  static async getPapersByCategory(category: MockResearchPaper['category']): Promise<MockResearchPaper[]> {
    try {
      const response = await apiClient.get<MockResearchPaper[]>(`${this.ENDPOINT}/category/${category}`)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch papers by category from API, using mock data:', error)
      return mockResearchData.filter(paper => paper.category === category)
    }
  }

  // Private helper for mock data
  private static getMockPapers(params?: ResearchApiParams): MockResearchPaper[] {
    let papers = [...mockResearchData]

    if (params?.category) {
      papers = papers.filter(paper => paper.category === params.category)
    }

    if (params?.openAccess !== undefined) {
      papers = papers.filter(paper => paper.openAccess === params.openAccess)
    }

    // Sort papers
    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'date':
          papers = papers.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          break
        case 'citations':
          papers = papers.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
          break
        case 'relevance':
          // Mock relevance based on citation count
          papers = papers.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
          break
      }
    }

    if (params?.limit) {
      papers = papers.slice(0, params.limit)
    }

    return papers
  }
}

// Export convenience functions
export const getArticles = NewsApi.getArticles
export const getArticleById = NewsApi.getArticleById
export const searchArticles = NewsApi.searchArticles
export const getTrendingArticles = NewsApi.getTrendingArticles
export const getArticlesByCategory = NewsApi.getArticlesByCategory

export const getPapers = ResearchApi.getPapers
export const getPaperById = ResearchApi.getPaperById
export const searchPapers = ResearchApi.searchPapers
export const getTrendingPapers = ResearchApi.getTrendingPapers
export const getOpenAccessPapers = ResearchApi.getOpenAccessPapers
export const getPapersByCategory = ResearchApi.getPapersByCategory
