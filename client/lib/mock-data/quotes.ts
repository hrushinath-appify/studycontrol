// Mock data for motivational quotes
// This provides inspirational quotes for the study app

export interface Quote {
  id: string
  text: string
  author: string
  category: 'motivation' | 'learning' | 'success' | 'perseverance' | 'growth'
  tags: string[]
}

export const motivationalQuotes: Quote[] = [
  {
    id: 'quote-1',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'success',
    tags: ['work', 'passion', 'success']
  },
  {
    id: 'quote-2',
    text: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
    category: 'learning',
    tags: ['education', 'change', 'power']
  },
  {
    id: 'quote-3',
    text: 'The expert in anything was once a beginner.',
    author: 'Helen Hayes',
    category: 'growth',
    tags: ['expertise', 'practice', 'beginning']
  },
  {
    id: 'quote-4',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'perseverance',
    tags: ['success', 'failure', 'courage', 'persistence']
  },
  {
    id: 'quote-5',
    text: 'The beautiful thing about learning is that no one can take it away from you.',
    author: 'B.B. King',
    category: 'learning',
    tags: ['learning', 'knowledge', 'permanent']
  },
  {
    id: 'quote-6',
    text: 'It is during our darkest moments that we must focus to see the light.',
    author: 'Aristotle',
    category: 'motivation',
    tags: ['hope', 'focus', 'light', 'difficult times']
  },
  {
    id: 'quote-7',
    text: 'In the middle of difficulty lies opportunity.',
    author: 'Albert Einstein',
    category: 'growth',
    tags: ['opportunity', 'difficulty', 'potential']
  },
  {
    id: 'quote-8',
    text: 'Believe you can and you\'re halfway there.',
    author: 'Theodore Roosevelt',
    category: 'motivation',
    tags: ['belief', 'confidence', 'achievement']
  },
  {
    id: 'quote-9',
    text: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney',
    category: 'motivation',
    tags: ['action', 'starting', 'doing']
  },
  {
    id: 'quote-10',
    text: 'Learning never exhausts the mind.',
    author: 'Leonardo da Vinci',
    category: 'learning',
    tags: ['learning', 'mind', 'endless']
  },
  {
    id: 'quote-11',
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    category: 'success',
    tags: ['future', 'dreams', 'belief']
  },
  {
    id: 'quote-12',
    text: 'It always seems impossible until it\'s done.',
    author: 'Nelson Mandela',
    category: 'perseverance',
    tags: ['impossible', 'achievement', 'completion']
  },
  {
    id: 'quote-13',
    text: 'Don\'t watch the clock; do what it does. Keep going.',
    author: 'Sam Levenson',
    category: 'perseverance',
    tags: ['persistence', 'time', 'progress']
  },
  {
    id: 'quote-14',
    text: 'The only impossible journey is the one you never begin.',
    author: 'Tony Robbins',
    category: 'motivation',
    tags: ['journey', 'beginning', 'action']
  },
  {
    id: 'quote-15',
    text: 'What we learn with pleasure we never forget.',
    author: 'Alfred Mercier',
    category: 'learning',
    tags: ['pleasure', 'memory', 'enjoyment']
  }
]

// Utility functions
export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
  return motivationalQuotes[randomIndex] || motivationalQuotes[0]
}

export function getQuotesByCategory(category: Quote['category']): Quote[] {
  return motivationalQuotes.filter(quote => quote.category === category)
}

export function getQuotesByTag(tag: string): Quote[] {
  return motivationalQuotes.filter(quote => 
    quote.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  )
}

export function searchQuotes(query: string): Quote[] {
  const lowercaseQuery = query.toLowerCase()
  return motivationalQuotes.filter(quote =>
    quote.text.toLowerCase().includes(lowercaseQuery) ||
    quote.author.toLowerCase().includes(lowercaseQuery) ||
    quote.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export default motivationalQuotes