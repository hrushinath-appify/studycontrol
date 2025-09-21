'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, HelpCircle, Lightbulb } from 'lucide-react'
import { getRandomTopic as getMockRandomTopic, type MysteryTopic } from '@/lib/mock-data/mystery-topics'
import { 
  incrementMysteryExploration
} from '@/lib/mystery-tracker'

const MysteryPage = () => {
  const [currentTopic, setCurrentTopic] = useState<MysteryTopic | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    const loadInitialTopic = async () => {
      try {
        setIsInitialLoading(true)
        // Use mock data directly instead of API
        const topic = getMockRandomTopic()
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
      // Increment mystery exploration count
      incrementMysteryExploration()
      
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Get a random topic from mock data
      const topic = getMockRandomTopic()
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
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Mystery Mode
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Embark on a journey of discovery. Generate a random topic and let your curiosity lead the way.
          </p>
          
          {/* Generate Button */}
          <Button 
            onClick={handleButtonClick}
            disabled={isGenerating || isInitialLoading}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {isGenerating ? "Unleashing Mystery..." : "Unleash a New Mystery"}
          </Button>
        </div>

        {/* Main Content Card */}
        <Card className="content-overlay border-2 border-primary/20 shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {isInitialLoading ? (
              <div className="animate-pulse space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted" />
                  <div className="flex-1 space-y-3">
                    <div className="h-8 bg-muted rounded max-w-md" />
                    <div className="h-px bg-muted" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded max-w-xs" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded max-w-sm" />
                      <div className="h-4 bg-muted rounded max-w-xs" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded max-w-xs" />
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded max-w-md" />
                    </div>
                  </div>
                </div>
              </div>
            ) : currentTopic ? (
              <>
                {/* Topic Header */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      Topic: {currentTopic.title}
                    </h2>
                    <div className="w-full h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                  </div>
                </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Left Column - Related Topics */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {currentTopic.relatedTopics.map((topic: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-secondary-foreground/20 hover:bg-secondary/80 transition-colors cursor-pointer"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column - Guiding Questions */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                  Guiding Questions
                </h3>
                <div className="space-y-4">
                  {currentTopic.questions.map((question: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 mt-1">
                        <HelpCircle className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" />
                      </div>
                      <p className="text-foreground/90 group-hover:text-foreground transition-colors leading-relaxed">
                        {question}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

                {/* AI Explanation Section */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold text-foreground">
                      AI Explanation
                    </h3>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-6 border border-muted">
                    <p className="text-foreground/90 leading-relaxed text-lg">
                      {currentTopic.description}
                    </p>
                    {currentTopic.estimatedTime && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        Estimated time: {currentTopic.estimatedTime} minutes
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Lightbulb className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  Failed to load mystery topic
                </p>
                <Button 
                  onClick={handleButtonClick}
                  className="mt-4"
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Decorative Elements */}
        <div className="fixed top-20 right-10 opacity-20 pointer-events-none">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 animate-pulse" />
        </div>
        <div className="fixed bottom-20 left-10 opacity-20 pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tl from-primary/20 to-primary/5 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  )
}

export default MysteryPage