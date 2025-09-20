"use client"

import React, { useState, useEffect } from 'react'
import FeatureCard from '@/components/custom/FeatureCard'
import { useAuth } from '@/components/AuthProvider'
import { getQuoteOfTheDay, type Quote } from '@/lib/api'
import { 
  BarChart3, 
  Timer, 
  Calendar, 
  BookOpen, 
  CheckSquare, 
  FileText 
} from 'lucide-react'

const HomePage = () => {
  const { user } = useAuth()
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadQuote = async () => {
      try {
        setIsLoading(true)
        const quote = await getQuoteOfTheDay()
        setCurrentQuote(quote)
      } catch (error) {
        console.error('Failed to load quote:', error)
        // Fallback quote
        setCurrentQuote({
          id: 'fallback',
          quote: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          category: 'motivation'
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadQuote()
  }, [])
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Hey! {user?.name || 'Student'}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">            Your &quot;Study Control&quot; Hub</h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            This is your personal companion for your studies, especially curated for you. <br /> Now, lets get started!
          </p>
        </div>

        {/* Goal Highlight Section */}
        <div className="flex justify-center mt-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/50 via-yellow-300/60 to-yellow-200/50 dark:from-yellow-400/30 dark:via-yellow-300/40 dark:to-yellow-400/30 rounded-lg transform -skew-x-1"></div>
            <h2 className="relative px-4 py-2 text-base sm:text-lg font-semibold text-foreground/90">
              🎯 Goal: Kakatiya Medical College, below 3,000 rank in NEET PG
            </h2>
          </div>
        </div>


        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Unleash the Mystery"
            description="Discover the mystery of your studies."
            href="/mystery"
            icon={<BarChart3 className="w-6 h-6" />}
          />
          <FeatureCard
            title="Focus Mode"
            description="Track your study time and progress."
            href="/focus"
            icon={<Timer className="w-6 h-6" />}
          />
          <FeatureCard
            title="News Feed"
            description="Discover thes news in the world of medicine."
            href="/news"
            colSpan="2"
            icon={<Calendar className="w-6 h-6" />}
          />
          <FeatureCard
            title="Diary"
            description="Record your daily study reflections."
            href="/diary"
            icon={<BookOpen className="w-6 h-6" />}
          />
          <FeatureCard
            title="To-Do List"
            description="Keep track of your tasks and assignments."
            href="/to-do-list"
            icon={<CheckSquare className="w-6 h-6" />}
          />
          <FeatureCard
            title="Notes"
            description="Organize and review your study notes."
            href="/notes"
            icon={<FileText className="w-6 h-6" />}
          />
        </div>
        {/* Motivational Quote Section */}
        <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-sm">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <span className="text-4xl">💡</span>
            </div>
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-6 bg-muted rounded mx-auto max-w-md"></div>
                <div className="h-4 bg-muted rounded mx-auto max-w-xs"></div>
              </div>
            ) : currentQuote ? (
              <>
                <blockquote className="text-lg sm:text-xl font-medium text-foreground/90 italic leading-relaxed">
                  &ldquo;{currentQuote.quote}&rdquo;
                </blockquote>
                <cite className="text-sm text-muted-foreground font-semibold">
                  — {currentQuote.author}
                </cite>
              </>
            ) : (
              <p className="text-muted-foreground">Loading inspiration...</p>
            )}
          </div>
        </div>




      </div>
    </div>
  )
}

export default HomePage