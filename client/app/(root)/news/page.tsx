'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Newspaper, 
  Search, 
  ExternalLink, 
  Calendar,
  Clock,
  Globe,
  BookOpen,
  Stethoscope,
  GraduationCap,
  TrendingUp,
  RefreshCw,
  Star,
  Share2
} from 'lucide-react'
import { 
  getArticles, 
  type MockNewsArticle
} from '@/lib/api'

const NewsPage = () => {
  const [articles, setArticles] = useState<MockNewsArticle[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'medical' | 'education' | 'research'>('all')
  const [selectedSource, setSelectedSource] = useState<string>('all')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [showAllArticles, setShowAllArticles] = useState(false)

  // Load data on component mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const articlesData = await getArticles()
      setArticles(articlesData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to load news data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter articles based on search and category
  const filteredArticles = React.useMemo(() => {
    let filtered = articles

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.author?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    // Apply source filter
    if (selectedSource !== 'all') {
      filtered = filtered.filter(article => article.source.name === selectedSource)
    }

    return filtered
  }, [articles, searchQuery, selectedCategory, selectedSource])

  // Get articles to display (limited to 3 unless showAllArticles is true)
  const displayedArticles = React.useMemo(() => {
    return showAllArticles ? filteredArticles : filteredArticles.slice(0, 3)
  }, [filteredArticles, showAllArticles])


  const refreshNews = async () => {
    await loadData()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medical': return <Stethoscope className="w-4 h-4" />
      case 'education': return <GraduationCap className="w-4 h-4" />
      case 'research': return <BookOpen className="w-4 h-4" />
      default: return <Newspaper className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical': return 'text-red-500 bg-red-500/10'
      case 'education': return 'text-blue-500 bg-blue-500/10'
      case 'research': return 'text-purple-500 bg-purple-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              MBBS News Hub
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Stay updated with the latest medical education news.
            </p>
          </div>
          <div className="text-primary flex-shrink-0">
            <Newspaper className="w-10 h-10 md:w-12 md:h-12" />
          </div>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
            <Clock className="w-4 h-4" />
            Last updated: {lastUpdated.toLocaleString()}
            <Button
              onClick={refreshNews}
              variant="ghost"
              size="sm"
              disabled={loading}
              className="ml-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <Newspaper className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              {articles.length}
            </div>
            <div className="text-muted-foreground text-sm">
              News Articles
            </div>
          </div>

          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-500 mb-2">
              {articles.length > 0 ? Math.round(articles.reduce((acc, article) => acc + (article.relevanceScore || 0), 0) / articles.length) : 0}%
            </div>
            <div className="text-muted-foreground text-sm">
              Avg Relevance
            </div>
          </div>

          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <Globe className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-2">
              {new Set(articles.map(a => a.source.name)).size}
            </div>
            <div className="text-muted-foreground text-sm">
              News Sources
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search MBBS news..."
                className="pl-10 bg-background/50"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="bg-background/50 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Content</option>
              <option value="general">General</option>
              <option value="medical">Medical</option>
              <option value="education">Education</option>
              <option value="research">Research</option>
            </select>
            
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-background/50 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Sources</option>
              {Array.from(new Set(articles.map(a => a.source.name))).map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All', icon: Globe },
              { value: 'general', label: 'General', icon: Newspaper },
              { value: 'medical', label: 'Medical', icon: Stethoscope },
              { value: 'education', label: 'Education', icon: GraduationCap },
              { value: 'research', label: 'Research', icon: BookOpen }
            ].map(category => (
              <Button
                key={category.value}
                onClick={() => setSelectedCategory(category.value as any)}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading latest MBBS news...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* News Articles */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Newspaper className="w-6 h-6" />
                Latest News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden hover:bg-card/50 transition-all duration-300 group"
                    >
                      {article.imageUrl && (
                        <div className="aspect-video overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                            {getCategoryIcon(article.category)}
                            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                          </span>
                          {article.relevanceScore && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-yellow-500 bg-yellow-500/10">
                              <Star className="w-3 h-3" />
                              {article.relevanceScore}%
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {article.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {article.source.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatTimeAgo(article.publishedAt)}
                          </span>
                        </div>
                        
                        {article.author && (
                          <div className="text-xs text-muted-foreground mb-4">
                            By {article.author}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => window.open(article.url, '_blank')}
                            size="sm"
                            className="flex-1 bg-primary hover:bg-primary/90"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Read More
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View More Button */}
                {filteredArticles.length > 3 && (
                  <div className="text-center mt-6">
                    <Button
                      onClick={() => setShowAllArticles(!showAllArticles)}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      {showAllArticles ? 'Show Less' : `View More (${filteredArticles.length - 3} more)`}
                    </Button>
                  </div>
                )}
              </div>
          
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsPage
