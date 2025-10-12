"use client"

import React, { useState, useEffect, useCallback } from 'react'
import FeatureCard from '@/components/custom/FeatureCard'
import { useAuth } from '@/components/AuthProvider'
import { getRandomQuote, type Quote } from '@/lib/api'
import { 
  BarChart3, 
  Timer, 
  // Calendar, 
  BookOpen, 
  FileText,
  RefreshCw
} from 'lucide-react'

const HomePage = () => {
  const { user, isInitializing } = useAuth()
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Function to load a new quote (can be called manually or on mount)
  const loadQuote = useCallback(async () => {
    try {
      setIsLoading(true)
      
      console.log('🔄 Fetching inspirational quote from local collection...')
      const quote = await getRandomQuote()
      
      setCurrentQuote(quote)
      console.log('✅ Quote loaded:', quote)
    } catch (error) {
      console.error('❌ Error loading quote:', error)
      // Note: With fallback system, this should rarely happen
      // But if it does, we can still show a basic fallback
      setCurrentQuote({
        id: 'fallback-' + Date.now(),
        quote: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
        category: 'motivation',
        tags: ['journey', 'beginning']
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Load quote immediately when component mounts (regardless of auth state for quotes)
    loadQuote()
  }, [loadQuote])

  // Also refresh quote when user logs in (but don't wait for auth to show quotes)
  useEffect(() => {
    if (!isInitializing && user && !currentQuote) {
      loadQuote()
    }
  }, [isInitializing, user, currentQuote, loadQuote])
  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 min-h-full">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Hey! {user?.name || 'Student'}
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">            Your &quot;Study Control&quot; Hub</h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            This is your personal companion for your studies, especially curated for you. <br className="hidden sm:block" /> Now, lets get started!
          </p>
        </div>

        {/* Goal Highlight Section */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/50 via-yellow-300/60 to-yellow-200/50 dark:from-yellow-400/30 dark:via-yellow-300/40 dark:to-yellow-400/30 rounded-lg transform -skew-x-1" />
            <h2 className="relative px-3 sm:px-4 py-2 text-sm sm:text-base md:text-lg font-semibold text-foreground/90 text-center">
              🎯 Goal: Kakatiya Medical College, below 3,000 rank in NEET PG
            </h2>
          </div>
        </div>


        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Unleash the Mystery"
            description="Discover the mystery of your studies."
            href="/mystery"
            icon={<BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />}
          />
          <FeatureCard
            title="Marrow Progress"
            description="Track your Marrow learning progress."
            href="/marrow-progress"
            icon={<BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />}
          />
          <FeatureCard
            title="Focus Mode"
            description="Track your study time and progress."
            href="/focus"
            icon={<Timer className="w-5 h-5 sm:w-6 sm:h-6" />}
          />
          <FeatureCard
            title="Notes"
            description="Organize and review your study notes."
            href="/notes"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" />}
          />
        </div>
        {/* Motivational Quote Section */}
        <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-sm">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex justify-center items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-4xl">💡</span>
              <button
                onClick={loadQuote}
                disabled={isLoading}
                className="p-1.5 sm:p-2 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Get new inspirational quote from curated collection"
              >
                <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-5 sm:h-6 bg-muted rounded mx-auto max-w-sm sm:max-w-md" />
                <div className="h-3 sm:h-4 bg-muted rounded mx-auto max-w-xs" />
              </div>
            ) : currentQuote ? (
              <>
                <blockquote className="text-base sm:text-lg md:text-xl font-medium text-foreground/90 italic leading-relaxed px-2">
                  &ldquo;{currentQuote.quote}&rdquo;
                </blockquote>
                <cite className="text-xs sm:text-sm text-muted-foreground font-semibold">
                  — {currentQuote.author}
                </cite>
                {/* Show quote tags if available */}
                {currentQuote.tags && currentQuote.tags.length > 0 && (
                  <div className="flex justify-center flex-wrap gap-1.5 sm:gap-2 mt-2">
                    {currentQuote.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground text-sm sm:text-base">Loading inspiration...</p>
            )}
          </div>
        </div>




      </div>
    </div>
  )
}

export default HomePage