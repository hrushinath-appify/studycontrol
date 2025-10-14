"use client"

import React, { useState, useEffect, useCallback } from 'react'
import FeatureCard from '@/components/custom/FeatureCard'
import { useAuth } from '@/components/AuthProvider'
import { getRandomQuote, type Quote } from '@/lib/api'
import { 
  BarChart3, 
  // Timer, 
  RefreshCw,
  Search,
  ListTodo,
  StickyNote,
  Calendar,
  Sparkles,
  Heart,
  Brain,
  Zap,
  Star
} from 'lucide-react'

const HomePage = () => {
  const { user, isInitializing } = useAuth()
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sparklePositions, setSparklePositions] = useState<Array<{id: number, x: number, y: number, delay: number}>>([])
  const [pulseCards, setPulseCards] = useState<Set<number>>(new Set())
  const [welcomeAnimation, setWelcomeAnimation] = useState(false)

  // Welcome animation on mount
  useEffect(() => {
    setWelcomeAnimation(true)
    const timer = setTimeout(() => setWelcomeAnimation(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Generate floating sparkles
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4
      }))
      setSparklePositions(newSparkles)
    }
    
    generateSparkles()
    const interval = setInterval(generateSparkles, 10000)
    return () => clearInterval(interval)
  }, [])


  // Add pulse effect to cards randomly
  useEffect(() => {
    const interval = setInterval(() => {
      const randomCard = Math.floor(Math.random() * 6)
      setPulseCards(prev => new Set(prev).add(randomCard))
      setTimeout(() => {
        setPulseCards(prev => {
          const newSet = new Set(prev)
          newSet.delete(randomCard)
          return newSet
        })
      }, 2000)
    }, 8000)
    return () => clearInterval(interval)
  }, [])


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
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 min-h-full relative overflow-hidden">
      {/* Floating sparkles background */}
      <div className="absolute inset-0 pointer-events-none">
        {sparklePositions.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute text-yellow-400/30 dark:text-yellow-300/20 animate-bounce"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: '3s'
            }}
          >
            <Sparkles className="w-4 h-4" />
          </div>
        ))}
      </div>


      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 relative z-10">
        {/* Animated welcome section */}
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Hey! {user?.name || 'Future Doctor'}
            </p>
          </div>
          <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-gradient ${welcomeAnimation ? 'animate-pulse-glow' : ''}`}>
            Your &quot;Study Control&quot; Hub
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            This is your personal companion for your studies, especially curated for you. <br className="hidden sm:block" /> 
            <span className="inline-flex items-center gap-1">
              Now, let&apos;s get started! 
              <Brain className="w-4 h-4 text-blue-500 animate-pulse ml-1" />
            </span>
          </p>
        </div>


        {/* Enhanced Goal Highlight Section */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="relative inline-block group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/50 via-yellow-300/60 to-yellow-200/50 dark:from-yellow-400/30 dark:via-yellow-300/40 dark:to-yellow-400/30 rounded-lg transform -skew-x-1 group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer" />
            <h2 className="relative px-3 sm:px-4 py-2 text-sm sm:text-base md:text-lg font-semibold text-foreground/90 text-center flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600 group-hover:animate-spin" />
              🎯 Goal: Kakatiya Medical College, below 3,000 rank in NEET PG
              <Star className="w-5 h-5 text-yellow-600 group-hover:animate-spin" />
            </h2>
          </div>
        </div>


        {/* Enhanced Feature Cards Grid */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
          <div className={`transform transition-all duration-500 hover:scale-105 ${pulseCards.has(0) ? 'animate-pulse ring-2 ring-purple-400' : ''}`}>
            <FeatureCard
              title="Unleash the Mystery"
              description="Discover the mystery of your studies, feed your curiosity."
              href="/mystery"
              icon={
                <div className="relative">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
                </div>
              }
            />
          </div>
          
          <div className={`transform transition-all duration-500 hover:scale-105 ${pulseCards.has(1) ? 'animate-pulse ring-2 ring-blue-400' : ''}`}>
            <FeatureCard
              title="Marrow Progress"
              description="Track your video learning progress across all subjects."
              href="/marrow-progress"
              icon={
                <div className="relative">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              }
            />
          </div>
          
          <div className={`transform transition-all duration-500 hover:scale-105 ${pulseCards.has(2) ? 'animate-pulse ring-2 ring-green-400' : ''}`}>
            <FeatureCard
              title="AI Assistants"
              description="Access powerful AI tools for medical education and study assistance."
              href="/ai-assistants"
              icon={
                <div className="relative">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  <Brain className="w-3 h-3 absolute -top-1 -right-1 text-green-400 animate-bounce" />
                </div>
              }
            />
          </div>
          
          <div className={`transform transition-all duration-500 hover:scale-105 ${pulseCards.has(3) ? 'animate-pulse ring-2 ring-orange-400' : ''}`}>
            <FeatureCard
              title="To-Do List"
              description="Organize and track your study tasks and goals."
              href="/todo-list"
              icon={
                <div className="relative">
                  <ListTodo className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  <Zap className="w-3 h-3 absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
                </div>
              }
            />
          </div>
          
          <div className={`transform transition-all duration-500 hover:scale-105 ${pulseCards.has(4) ? 'animate-pulse ring-2 ring-teal-400' : ''}`}>
            <FeatureCard
              title="Notes"
              description="Take and organize your study notes efficiently."
              href="/notes"
              icon={
                <div className="relative">
                  <StickyNote className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full animate-ping" />
                </div>
              }
            />
          </div>
          
          <div className={`transform transition-all duration-500 hover:scale-105 ${pulseCards.has(5) ? 'animate-pulse ring-2 ring-pink-400' : ''}`}>
            <FeatureCard
              title="Diary"
              description="Journal your study journey and track progress."
              href="/diary"
              icon={
                <div className="relative">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                  <Heart className="w-3 h-3 absolute -top-1 -right-1 text-red-400 animate-pulse" />
                </div>
              }
            />
          </div>
        </div>
        {/* Enhanced Motivational Quote Section */}
        <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-sm relative overflow-hidden group">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-blue-300 rounded-full animate-ping" />
            <div className="absolute bottom-6 right-6 w-6 h-6 border-2 border-purple-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 border-2 border-teal-300 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="text-center space-y-3 sm:space-y-4 relative z-10">
            <div className="flex justify-center items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl flex items-center animate-bounce">💡</span>
              <button
                onClick={loadQuote}
                disabled={isLoading}
                className="p-2 sm:p-2.5 md:p-3 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95 flex items-center justify-center group/btn hover:shadow-lg transform hover:scale-110"
                title="Get new inspirational quote from curated collection"
              >
                <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400 transition-transform duration-200 group-hover/btn:rotate-180 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <div className="flex gap-1">
                <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                <Star className="w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <Star className="w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-5 sm:h-6 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded mx-auto max-w-sm sm:max-w-md animate-shimmer" />
                <div className="h-3 sm:h-4 bg-gradient-to-r from-purple-200 to-teal-200 dark:from-purple-800 dark:to-teal-800 rounded mx-auto max-w-xs animate-shimmer" />
              </div>
            ) : currentQuote ? (
              <div className="animate-fade-in">
                <blockquote className="text-base sm:text-lg md:text-xl font-medium italic leading-relaxed px-2 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  &ldquo;{currentQuote.quote}&rdquo;
                </blockquote>
                <cite className="text-xs sm:text-sm text-muted-foreground font-semibold flex items-center justify-center gap-2">
                  <Brain className="w-4 h-4 text-blue-500" />
                  — {currentQuote.author}
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                </cite>
                {/* Enhanced quote tags */}
                {currentQuote.tags && currentQuote.tags.length > 0 && (
                  <div className="flex justify-center flex-wrap gap-1.5 sm:gap-2 mt-2">
                    {currentQuote.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 rounded-full transform hover:scale-110 transition-transform duration-200 cursor-default shadow-sm"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm sm:text-base animate-pulse">Loading inspiration...</p>
            )}
            
            {/* Progress indicator for medical students */}
            <div className="flex justify-center items-center gap-2 mt-4 pt-4 border-t border-blue-200/30 dark:border-blue-700/30">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-muted-foreground font-medium">Every step brings you closer to your white coat!</span>
              <Zap className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
        </div>




      </div>
    </div>
  )
}

export default HomePage