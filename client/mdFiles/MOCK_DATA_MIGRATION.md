# Mock Data Migration & API Integration Guide

This document outlines the comprehensive refactoring of StudyControl to extract mock data into separate modules and prepare the application for API integration.

## 📁 Project Structure

### Mock Data Organization
```
client/lib/mock-data/
├── index.ts                 # Main export file
├── quotes.ts               # Motivational quotes data
├── mystery-topics.ts       # Mystery topics for exploration
├── diary-entries.ts        # Sample diary entries
├── news-articles.ts        # News articles and research papers
└── user-data.ts           # User profiles, settings, goals
```

### API Service Layer
```
client/lib/api/
├── index.ts                # Base API client and utilities
├── auth.ts                # Authentication services
├── diary.ts               # Diary CRUD operations
├── tasks.ts               # Task management
├── notes.ts               # Notes management
├── news.ts                # News and research papers
├── quotes.ts              # Quote management
├── mystery.ts             # Mystery topic generation
├── focus.ts               # Pomodoro/focus sessions
└── user.ts                # User preferences and analytics
```

## 🔄 Migration Summary

### 1. Data Extraction
All hardcoded mock data has been extracted from components into dedicated modules:

- **Home Page**: 20 motivational quotes → `quotes.ts`
- **Mystery Page**: 8 mystery topics → `mystery-topics.ts`
- **Diary Page**: 5 detailed diary entries → `diary-entries.ts`
- **News Page**: 7 news articles + 5 research papers → `news-articles.ts`
- **User Data**: Profiles, settings, goals → `user-data.ts`

### 2. API Service Layer
Created comprehensive API services with:
- **Fallback Strategy**: API calls with localStorage/mock data fallback
- **Type Safety**: Full TypeScript interfaces for all data structures
- **Error Handling**: Graceful degradation when APIs are unavailable
- **Caching**: Built-in caching for performance optimization

### 3. Component Updates
Updated components to use new API services:
- Async data loading with proper loading states
- Error handling with user-friendly fallbacks
- Optimistic UI updates for better UX

## 🛠️ API Integration Features

### Base API Client
```typescript
// Automatic token management
// Request/response interceptors
// Error handling and retry logic
// Type-safe responses
const response = await apiClient.get<Quote[]>('/quotes')
```

### Service Examples
```typescript
// Quotes API
const quote = await getQuoteOfTheDay()
const quotes = await searchQuotes('motivation')

// Mystery API
const topic = await getRandomTopic()
const topics = await getTopicsByCategory('science')

// News API
const articles = await getArticles({ category: 'medical' })
const papers = await searchPapers('medical education')
```

## 📊 Data Models

### Core Interfaces
```typescript
interface Quote {
  id: string
  quote: string
  author: string
  category?: 'motivation' | 'education' | 'success' | 'learning'
  tags?: string[]
}

interface MysteryTopic {
  id: string
  title: string
  subtopics: string[]
  questions: string[]
  explanation: string
  category?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimatedReadTime?: number
}

interface MockNewsArticle {
  id: string
  title: string
  description: string
  url: string
  imageUrl?: string
  publishedAt: string
  source: { name: string; url?: string }
  author?: string
  category: 'general' | 'medical' | 'education' | 'research'
  relevanceScore?: number
  tags?: string[]
}
```

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.studycontrol.com
API_TIMEOUT=10000
RETRY_ATTEMPTS=3
```

### API Endpoints
```typescript
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
  },
  QUOTES: '/api/quotes',
  MYSTERY: '/api/mystery',
  NEWS: '/api/news',
  RESEARCH: '/api/research',
  DIARY: '/api/diary',
  TASKS: '/api/tasks',
  NOTES: '/api/notes',
  FOCUS: '/api/focus',
  USER: '/api/user',
}
```

## 🚀 Implementation Strategy

### Phase 1: Mock Data (✅ Complete)
- Extract all hardcoded data
- Create typed interfaces
- Implement utility functions
- Add search and filtering capabilities

### Phase 2: API Layer (✅ Complete)
- Build base API client
- Create service modules
- Implement fallback strategies
- Add error handling

### Phase 3: Component Integration (🔄 In Progress)
- Update components to use API services
- Add loading states
- Implement error boundaries
- Optimize performance

### Phase 4: Real API Integration (📋 Planned)
- Replace mock endpoints with real APIs
- Add authentication middleware
- Implement data validation
- Add monitoring and logging

## 🎯 Benefits

### For Development
- **Separation of Concerns**: Data logic separated from UI components
- **Type Safety**: Full TypeScript coverage for all data structures
- **Testability**: Easy to mock and test individual services
- **Maintainability**: Centralized data management

### For Production
- **API Ready**: Seamless transition to real APIs
- **Performance**: Built-in caching and optimization
- **Reliability**: Fallback strategies for offline scenarios
- **Scalability**: Modular architecture supports growth

## 📝 Usage Examples

### Loading Data with Loading States
```typescript
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true)
      const result = await getQuotes({ category: 'motivation' })
      setData(result)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  loadData()
}, [])
```

### Search and Filtering
```typescript
// Search across multiple fields
const results = await searchArticles('medical education')

// Filter by category and source
const filtered = await getArticles({
  category: 'medical',
  source: 'Healthcare Today',
  limit: 10
})
```

### CRUD Operations
```typescript
// Create
const newEntry = await createEntry({
  title: 'Today\'s Reflection',
  content: 'Had a great study session...',
  mood: 'good'
})

// Update
const updated = await updateEntry({
  id: '123',
  title: 'Updated Title'
})

// Delete
await deleteEntry('123')
```

## 🔍 Testing Strategy

### Unit Tests
- Test individual API service methods
- Mock external dependencies
- Validate data transformations

### Integration Tests
- Test API client with mock server
- Validate error handling scenarios
- Test fallback mechanisms

### E2E Tests
- Test complete user workflows
- Validate data persistence
- Test offline scenarios

## 📚 Next Steps

1. **Complete Component Migration**: Update remaining components to use API services
2. **Add Real API Integration**: Connect to actual backend services
3. **Implement Caching Strategy**: Add Redis/localStorage caching layer
4. **Add Monitoring**: Implement error tracking and performance monitoring
5. **Optimize Performance**: Add pagination, lazy loading, and data prefetching

## 🤝 Contributing

When adding new features:

1. **Add Mock Data**: Create mock data in appropriate module
2. **Create API Service**: Add service methods with fallback
3. **Update Types**: Add/update TypeScript interfaces
4. **Test Integration**: Ensure components work with new services
5. **Document Changes**: Update this guide with new patterns

## 📞 Support

For questions about the migration or API integration:
- Check existing service implementations for patterns
- Review mock data structures for examples
- Test with mock data before implementing real APIs
- Follow established error handling patterns

---

*This migration prepares StudyControl for seamless API integration while maintaining full functionality with mock data during development.*
