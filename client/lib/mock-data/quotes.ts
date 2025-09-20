// Mock data for motivational quotes
// Used in: Home page

export interface Quote {
  id: string
  quote: string
  author: string
  category?: 'motivation' | 'education' | 'success' | 'learning'
  tags?: string[]
}

export const motivationalQuotes: Quote[] = [
  {
    id: '1',
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: 'motivation',
    tags: ['success', 'failure', 'courage']
  },
  {
    id: '2',
    quote: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
    category: 'learning',
    tags: ['expertise', 'learning', 'growth']
  },
  {
    id: '3',
    quote: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    category: 'education',
    tags: ['education', 'power', 'change']
  },
  {
    id: '4',
    quote: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
    category: 'learning',
    tags: ['learning', 'knowledge', 'permanent']
  },
  {
    id: '5',
    quote: "Study hard, for the well is deep, and our brains are shallow.",
    author: "Richard Baxter",
    category: 'education',
    tags: ['study', 'knowledge', 'depth']
  },
  {
    id: '6',
    quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
    category: 'learning',
    tags: ['reading', 'knowledge', 'opportunities']
  },
  {
    id: '7',
    quote: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
    category: 'learning',
    tags: ['learning', 'mind', 'endless']
  },
  {
    id: '8',
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: 'motivation',
    tags: ['journey', 'beginning', 'action']
  },
  {
    id: '9',
    quote: "Your limitation—it's only your imagination.",
    author: "Anonymous",
    category: 'motivation',
    tags: ['limitations', 'imagination', 'potential']
  },
  {
    id: '10',
    quote: "Dream it. Wish it. Do it.",
    author: "Anonymous",
    category: 'motivation',
    tags: ['dreams', 'action', 'achievement']
  },
  {
    id: '11',
    quote: "Great things never come from comfort zones.",
    author: "Anonymous",
    category: 'motivation',
    tags: ['comfort zone', 'growth', 'achievement']
  },
  {
    id: '12',
    quote: "Success doesn't just find you. You have to go out and get it.",
    author: "Anonymous",
    category: 'success',
    tags: ['success', 'action', 'initiative']
  },
  {
    id: '13',
    quote: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Anonymous",
    category: 'success',
    tags: ['hard work', 'achievement', 'satisfaction']
  },
  {
    id: '14',
    quote: "Don't stop when you're tired. Stop when you're done.",
    author: "Anonymous",
    category: 'motivation',
    tags: ['perseverance', 'completion', 'endurance']
  },
  {
    id: '15',
    quote: "Wake up with determination. Go to bed with satisfaction.",
    author: "Anonymous",
    category: 'motivation',
    tags: ['determination', 'satisfaction', 'daily']
  },
  {
    id: '16',
    quote: "A goal without a plan is just a wish.",
    author: "Antoine de Saint-Exupéry",
    category: 'success',
    tags: ['goals', 'planning', 'strategy']
  },
  {
    id: '17',
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: 'motivation',
    tags: ['future', 'dreams', 'belief']
  },
  {
    id: '18',
    quote: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: 'motivation',
    tags: ['darkness', 'focus', 'hope']
  },
  {
    id: '19',
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: 'motivation',
    tags: ['belief', 'confidence', 'achievement']
  },
  {
    id: '20',
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: 'success',
    tags: ['great work', 'passion', 'love']
  }
]

// Utility functions for working with quotes
export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
  return motivationalQuotes[randomIndex]!
}

export const getQuotesByCategory = (category: Quote['category']): Quote[] => {
  return motivationalQuotes.filter(quote => quote.category === category)
}

export const getQuotesByTag = (tag: string): Quote[] => {
  return motivationalQuotes.filter(quote => quote.tags?.includes(tag))
}

export const searchQuotes = (query: string): Quote[] => {
  const lowercaseQuery = query.toLowerCase()
  return motivationalQuotes.filter(quote => 
    quote.quote.toLowerCase().includes(lowercaseQuery) ||
    quote.author.toLowerCase().includes(lowercaseQuery) ||
    quote.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
