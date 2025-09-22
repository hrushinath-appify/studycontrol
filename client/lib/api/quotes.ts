// Quotes API - Using local quotes for maximum reliability
// No backend dependencies - quotes always work offline

import { getRandomQuote as getLocalRandomQuote, motivationalQuotes } from '@/lib/mock-data/quotes'

// Our internal Quote interface
export interface Quote {
  id: string
  quote: string
  author: string
  category?: 'motivation' | 'education' | 'success' | 'learning'
  tags?: string[]
}

// Main function to get random quote - now using local quotes only
export async function getRandomQuote(): Promise<Quote> {
  console.log('📝 Using local quotes for maximum reliability...')
  
  const localQuote = getLocalRandomQuote()
  
  // Add unique ID for each fetch to ensure freshness
  const quote: Quote = {
    id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    quote: localQuote.text,
    author: localQuote.author,
    category: (localQuote.category as Quote['category']) || 'motivation',
    tags: localQuote.tags || []
  }
  
  console.log('✅ Local quote loaded:', quote.quote.substring(0, 50) + '...')
  return quote
}

// Quote of the day - returns a consistent quote based on current date
export async function getQuoteOfTheDay(): Promise<Quote> {
  console.log('📅 Getting quote of the day from local collection...')
  
  // Use date as seed to get consistent quote for the day
  const today = new Date().toDateString()
  const dateHash = today.split('').reduce((hash, char) => {
    return ((hash << 5) - hash) + char.charCodeAt(0)
  }, 0)
  
  const index = Math.abs(dateHash) % motivationalQuotes.length
  const dailyQuote = motivationalQuotes[index]!
  
  const quote: Quote = {
    id: `daily-${today}-${index}`,
    quote: dailyQuote.text,
    author: dailyQuote.author,
    category: (dailyQuote.category as Quote['category']) || 'motivation',
    tags: dailyQuote.tags || []
  }
  
  console.log('✅ Daily quote loaded')
  return quote
}

// Get all available quotes
export async function getQuotes(): Promise<Quote[]> {
  console.log('📖 Loading all local quotes...')
  return motivationalQuotes.map(q => ({
    id: q.id,
    quote: q.text,
    author: q.author,
    category: (q.category as Quote['category']) || 'motivation',
    tags: q.tags || []
  }))
}

// Export local quote utilities for direct access
export { 
  getRandomQuote as getRandomLocalQuote, 
  motivationalQuotes as localQuotes,
  getQuotesByCategory,
  getQuotesByTag,
  searchQuotes
} from '@/lib/mock-data/quotes'
