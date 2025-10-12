'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, HelpCircle, Lightbulb } from 'lucide-react'
import { getRandomTopic } from '@/lib/utils/topic-loader'
import type { MysteryTopic } from '@/lib/mock-data/medicine'
import { 
  incrementMysteryExploration
} from '@/lib/mystery-tracker'

const MysteryPage = () => {
  const [currentTopic, setCurrentTopic] = useState<MysteryTopic | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // Handler for Google search for topic title
  const handleTopicTitleClick = useCallback(() => {
    if (currentTopic?.title) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(currentTopic.title)}`, '_blank')
    }
  }, [currentTopic])

  // Handler for Google search for related topics
  const handleRelatedTopicClick = useCallback((topic: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(topic)}`, '_blank')
  }, [])

  // Handler for Google search for guiding questions
  const handleQuestionClick = useCallback((question: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(question)}`, '_blank')
  }, [])

  useEffect(() => {
    const loadInitialTopic = async () => {
      try {
        setIsInitialLoading(true)
        // Lazy load topic data for better performance
        const topic = await getRandomTopic()
        setCurrentTopic(topic)
      } catch (error) {
        console.error('Failed to load initial topic:', error)
      } finally {
        setIsInitialLoading(false)
      }
    }

    loadInitialTopic()
  }, [])

  const handleGenerateNewMystery = useCallback(async () => {
    setIsGenerating(true)
    try {
      // Increment mystery exploration count (now syncs with database)
      await incrementMysteryExploration()
      
      // Get a random topic (optimized with lazy loading)
      const topic = await getRandomTopic()
      setCurrentTopic(topic)
    } catch (error) {
      console.error('Failed to generate new mystery:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [])

  const handleButtonClick = useCallback(() => {
    handleGenerateNewMystery()
  }, [handleGenerateNewMystery])

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-3 sm:space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="relative">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />
              <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Mystery Mode
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Embark on a journey of discovery. Generate a random topic and let your curiosity lead the way.
          </p>
          
          {/* Generate Button */}
          <Button 
            onClick={handleButtonClick}
            disabled={isGenerating || isInitialLoading}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 sm:hover:scale-105"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
            {isGenerating ? "Unleashing Mystery..." : "Unleash a New Mystery"}
          </Button>
        </div>

        {/* Main Content Card */}
        <Card className="content-overlay border-2 border-primary/20 shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
            {isInitialLoading ? (
              <div className="animate-pulse space-y-6 sm:space-y-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex-shrink-0" />
                  <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                    <div className="h-6 sm:h-8 bg-muted rounded max-w-md" />
                    <div className="h-px bg-muted" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="h-5 sm:h-6 bg-muted rounded max-w-xs" />
                    <div className="space-y-2">
                      <div className="h-3 sm:h-4 bg-muted rounded max-w-sm" />
                      <div className="h-3 sm:h-4 bg-muted rounded max-w-xs" />
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="h-5 sm:h-6 bg-muted rounded max-w-xs" />
                    <div className="space-y-2 sm:space-y-3">
                      <div className="h-3 sm:h-4 bg-muted rounded" />
                      <div className="h-3 sm:h-4 bg-muted rounded" />
                      <div className="h-3 sm:h-4 bg-muted rounded max-w-md" />
                    </div>
                  </div>
                </div>
              </div>
            ) : currentTopic ? (
              <>
                {/* Topic Header */}
                <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 cursor-pointer hover:underline break-words"
                      onClick={handleTopicTitleClick}
                      title={`Search Google for ${currentTopic.title}`}
                    >
                      Topic: {currentTopic.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-2">
                      {currentTopic.category && (
                        <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded-full text-[10px] sm:text-xs font-semibold border border-blue-200">
                          Subject: {currentTopic.category}
                        </span>
                      )}
                      {currentTopic.tags && currentTopic.tags.length > 0 && (
                        <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-green-100 text-green-800 rounded-full text-[10px] sm:text-xs font-semibold border border-green-200">
                          Chapter: {currentTopic.tags.join(', ')}
                        </span>
                      )}
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                  </div>
                </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Left Column - Related Topics */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground flex items-center gap-2">
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {currentTopic.relatedTopics.map((topic: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary text-secondary-foreground rounded-full text-xs sm:text-sm font-medium border border-secondary-foreground/20 hover:bg-secondary/80 active:bg-secondary/70 transition-colors cursor-pointer"
                      onClick={() => handleRelatedTopicClick(topic)}
                      title={`Search Google for ${topic}`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column - Guiding Questions */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground flex items-center gap-2">
                  Guiding Questions
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {currentTopic.questions.map((question: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 group cursor-pointer active:opacity-80"
                      onClick={() => handleQuestionClick(question)}
                      title={`Search Google for ${question}`}
                    >
                      <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary/80 transition-colors" />
                      </div>
                      <p className="text-sm sm:text-base text-foreground/90 group-hover:text-foreground transition-colors leading-relaxed">
                        {question}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Explanation Section */}
            <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                  Glimpse
                </h3>
              </div>
              <div className="bg-muted/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-muted">
                <p className="text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed">
                  {currentTopic.description}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <Lightbulb className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              Failed to load mystery topic
            </p>
            <Button 
              onClick={handleButtonClick}
              className="mt-3 sm:mt-4 text-sm sm:text-base"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>

    {/* Decorative Elements - Hidden on mobile for better performance */}
    <div className="hidden md:block fixed top-20 right-10 opacity-20 pointer-events-none">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 animate-pulse" />
    </div>
    <div className="hidden md:block fixed bottom-20 left-10 opacity-20 pointer-events-none">
      <div className="w-24 h-24 rounded-full bg-gradient-to-tl from-primary/20 to-primary/5 animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  </div>
</div>
  )
}

export default MysteryPage