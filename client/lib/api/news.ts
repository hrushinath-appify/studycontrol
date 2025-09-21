// API service for news articles
// Uses mock data for news functionality

import { 
  mockNewsData, 
  type MockNewsArticle
} from '../mock-data/news-articles'

export interface NewsApiParams {
  category?: 'general' | 'medical' | 'education' | 'research'
  source?: string
  limit?: number
  page?: number
  sortBy?: 'relevance' | 'date' | 'popularity'
}

export class NewsApi {
  // Get news articles
  static async getArticles(params?: NewsApiParams): Promise<MockNewsArticle[]> {
    console.log('Using mock news data for articles')
    return NewsApi.getMockArticles(params)
  }

  // Get article by ID
  static async getArticleById(id: string): Promise<MockNewsArticle | null> {
    console.log('Using mock news data for article by ID')
    return mockNewsData.find(article => article.id === id) || null
  }

  // Search articles
  static async searchArticles(query: string, _params?: Omit<NewsApiParams, 'limit'>): Promise<MockNewsArticle[]> {
    console.log('Searching mock articles for:', query)
    const lowercaseQuery = query.toLowerCase()
    return mockNewsData.filter(article =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.description.toLowerCase().includes(lowercaseQuery) ||
      article.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      article.author?.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Get trending articles
  static async getTrendingArticles(limit: number = 5): Promise<MockNewsArticle[]> {
    console.log('Using mock data for trending articles')
    return mockNewsData
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, limit)
  }

  // Get articles by category
  static async getArticlesByCategory(category: MockNewsArticle['category']): Promise<MockNewsArticle[]> {
    console.log('Using mock data for articles in category:', category)
    return mockNewsData.filter(article => article.category === category)
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

    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'date':
          articles = articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          break
        case 'popularity':
          articles = articles.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
          break
        case 'relevance':
        default:
          // Already in relevance order from mock data
          break
      }
    }

    if (params?.limit) {
      articles = articles.slice(0, params.limit)
    }

    return articles
  }
}

// Export wrapper functions for backwards compatibility
export const getArticles = NewsApi.getArticles
export const getArticleById = NewsApi.getArticleById
export const searchArticles = NewsApi.searchArticles
export const getTrendingArticles = NewsApi.getTrendingArticles
export const getArticlesByCategory = NewsApi.getArticlesByCategory

export default NewsApi
