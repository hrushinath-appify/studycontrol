'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Clock, BookOpen, Zap, PlayCircle, Star, ArrowRight, Youtube, NotebookPen, Filter, ListTodo } from 'lucide-react'
import { loadMysteryTopics } from '@/lib/utils/topic-loader'
import type { MysteryTopic } from '@/lib/mock-data/videos'
import { VideosData } from '@/lib/mock-data/videos'
import { 
  incrementMysteryExploration
} from '@/lib/mystery-tracker'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/custom/dropdown-menu"

const MysteryPage = () => {
  const router = useRouter()
  const [currentTopic, setCurrentTopic] = useState<MysteryTopic | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState<string>('All')
  
  // Get unique subjects from the videos data
  const availableSubjects = ['All', ...Array.from(new Set(VideosData.map(data => data.subject)))]

  // Handler for Google search for topic title
  const handleTopicTitleClick = useCallback(() => {
    if (currentTopic?.title) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(currentTopic.title)}`, '_blank')
    }
  }, [currentTopic])

  // Handler for YouTube video search
  const handleWatchVideo = useCallback(() => {
    if (currentTopic?.title) {
      const searchQuery = encodeURIComponent(`${currentTopic.title} medical education`)
      window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank')
    }
  }, [currentTopic])

  // Handler for notes redirect
  const handleTakeNotes = useCallback(() => {
    router.push('/notes')
  }, [router])

  // Handler for todos redirect
  const handleAddToTodos = useCallback(() => {
    // Note: /todolist route doesn't exist yet. Using /notes as fallback.
    // Create /todolist route if needed, or update this to the correct todo route
    router.push('/notes')
  }, [router])

  // Filter topics based on selected subject
  const getFilteredTopics = useCallback(async () => {
    const topics = await loadMysteryTopics()
    
    if (selectedSubject === 'All') {
      return topics
    }
    
    return topics.filter(topic => topic.category === selectedSubject)
  }, [selectedSubject])

  // Get random topic from filtered list
  const getRandomFilteredTopic = useCallback(async () => {
    const filteredTopics = await getFilteredTopics()
    
    if (filteredTopics.length === 0) {
      throw new Error('No topics available for the selected subject')
    }
    
    const randomIndex = Math.floor(Math.random() * filteredTopics.length)
    return filteredTopics[randomIndex]!
  }, [getFilteredTopics])

  useEffect(() => {
    const loadInitialTopic = async () => {
      try {
        setIsInitialLoading(true)
        // Load initial topic based on filter
        const topic = await getRandomFilteredTopic()
        setCurrentTopic(topic)
      } catch (error) {
        console.error('Failed to load initial topic:', error)
      } finally {
        setIsInitialLoading(false)
      }
    }

    loadInitialTopic()
  }, [getRandomFilteredTopic])

  const handleGenerateNewMystery = useCallback(async () => {
    setIsGenerating(true)
    try {
      // Increment mystery exploration count (now syncs with database)
      await incrementMysteryExploration()
      
      // Get a random topic based on filter
      const topic = await getRandomFilteredTopic()
      setCurrentTopic(topic)
    } catch (error) {
      console.error('Failed to generate new mystery:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [getRandomFilteredTopic])

  const handleButtonClick = useCallback(() => {
    handleGenerateNewMystery()
  }, [handleGenerateNewMystery])

  const handleSubjectFilter = useCallback((subject: string) => {
    setSelectedSubject(subject)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 relative overflow-hidden">
      {/* Enhanced animated background pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-500/80 dark:to-purple-500/80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 dark:from-yellow-500/80 dark:to-pink-500/80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 dark:from-green-500/80 dark:to-blue-500/80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Additional floating elements for modern look */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-purple-400/60 dark:bg-purple-300/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-blue-400/60 dark:bg-blue-300/60 rounded-full animate-bounce" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-indigo-400/60 dark:bg-indigo-300/60 rounded-full animate-bounce" style={{ animationDelay: '5s' }} />
      </div>

      <div className="relative z-10 p-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-6">
            {/* Modern Mystery Mode Heading */}
            <div className="relative mb-6">
              {/* Background glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-20 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 dark:from-purple-400/30 dark:via-blue-400/30 dark:to-indigo-400/30 blur-3xl rounded-full animate-pulse" />
              </div>
              
              {/* Main heading container */}
              <div className="relative flex items-center justify-center gap-3 sm:gap-4 mb-4">
                {/* Sparkle icon with modern styling */}
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 dark:shadow-purple-400/25 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-lg animate-pulse" />
                  </div>
                  {/* Floating sparkle decoration */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                  </div>
                </div>

                {/* Typography with modern styling */}
                <div className="flex flex-col items-start">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-none">
                    {/* Split text for individual styling */}
                    <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                      Mystery
                    </span>
                    <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-sm -mt-1 sm:-mt-2">
                      Mode
                    </span>
                  </h1>
                  
                  {/* Star rating with enhanced styling */}
                  <div className="flex items-center gap-1 mt-2 ml-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500 drop-shadow-sm animate-pulse" style={{ animationDelay: '0ms' }} />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500 drop-shadow-sm animate-pulse" style={{ animationDelay: '200ms' }} />
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500 drop-shadow-sm animate-pulse" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              <div className="absolute top-8 right-1/4 w-1 h-1 bg-blue-400 dark:bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-0 left-1/3 w-1.5 h-1.5 bg-indigo-400 dark:bg-indigo-300 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
            </div>
            
            {/* Enhanced description */}
            <div className="relative">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 px-4">
                <span className="inline-flex items-center gap-2 mb-2">
                  <span className="text-2xl">🚀</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Discover random medical topics</span>
                </span>
                <br className="hidden sm:block" />
                <span className="text-gray-500 dark:text-gray-400">and expand your knowledge horizons!</span>
                <br />
                <span className="inline-flex items-center gap-2 mt-2 text-base sm:text-lg font-medium">
                  <span className="text-xl">✨</span>
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    Let curiosity be your guide
                  </span>
                </span>
              </p>
            </div>
            
            {/* Filter and Generate Button Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              {/* Subject Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 text-purple-700 dark:text-purple-300 font-semibold px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base rounded-xl shadow-lg transition-all duration-300 hover:shadow-purple-500/25 hover:scale-105"
                  >
                    <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="text-xs sm:text-sm">
                      {selectedSubject === 'All' ? 'All Subjects' : selectedSubject}
                    </span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by Subject</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {availableSubjects.map((subject) => (
                    <DropdownMenuItem
                      key={subject}
                      onClick={() => handleSubjectFilter(subject)}
                      className={`cursor-pointer ${selectedSubject === subject ? 'bg-purple-100 dark:bg-purple-900/50' : ''}`}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      {subject}
                      {selectedSubject === subject && (
                        <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full" />
                      )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <div className="px-3 py-2 text-xs text-muted-foreground italic text-center">
                    New subjects are coming soon...
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Enhanced Generate Button */}
              <div className="relative inline-block">
                <Button 
                  onClick={handleButtonClick}
                  disabled={isGenerating || isInitialLoading}
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-5 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-purple-500/25 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-1 sm:gap-2">
                    {isGenerating ? (
                      <>
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                        <span className="text-xs sm:text-sm">Discovering Magic...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-spin" />
                        <span className="text-xs sm:text-sm">Unleash New Mystery</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </div>
                </Button>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          {isInitialLoading ? (
            <Card className="max-w-4xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-4 md:p-6">
                <div className="animate-pulse space-y-4 lg:space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl flex-shrink-0" />
                    <div className="flex-1 space-y-2 sm:space-y-3 text-center sm:text-left">
                      <div className="h-5 sm:h-6 bg-gradient-to-r from-purple-200 to-blue-200 rounded-xl max-w-md mx-auto sm:mx-0" />
                      <div className="flex gap-2 justify-center sm:justify-start">
                        <div className="h-4 sm:h-5 bg-blue-100 rounded-full w-16 sm:w-20" />
                        <div className="h-4 sm:h-5 bg-green-100 rounded-full w-20 sm:w-24" />
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-3">
                      <div className="h-5 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg w-32" />
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-5 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg w-32" />
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-5/6" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : currentTopic ? (
            <div className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-400/10 rounded-3xl overflow-hidden hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20 transition-all duration-500 border border-purple-100/50 dark:border-purple-800/50">
              {/* Topic Header with Enhanced Gradient Background */}
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-500 dark:via-blue-500 dark:to-indigo-500 p-4 md:p-5 lg:p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-white/5 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 dark:bg-white/5 rounded-full translate-y-24 -translate-x-24" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                        <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                        <h2 className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                          Video Topic
                        </h2>
                        <div className="h-px bg-white/30 flex-1 hidden sm:block" />
                      </div>
                      <h3
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 cursor-pointer hover:text-yellow-200 transition-colors duration-200 leading-tight"
                        onClick={handleTopicTitleClick}
                        title={`Search Google for ${currentTopic.title}`}
                      >
                        {currentTopic.title}
                      </h3>
                      
                      {/* Enhanced Tags */}
                      <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start mb-4">
                        {currentTopic.category && (
                          <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/30">
                            <BookOpen className="w-3 h-3" />
                            {currentTopic.category}
                          </span>
                        )}
                        {currentTopic.tags && currentTopic.tags.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/30">
                            <BookOpen className="w-3 h-3" />
                            {currentTopic.tags.join(', ')}
                          </span>
                        )}
                        {currentTopic.estimatedTime && (
                          <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/30">
                            <Clock className="w-3 h-3" />
                            {currentTopic.estimatedTime} min
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-start">
                        <Button
                          onClick={handleWatchVideo}
                          className="group bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <Youtube className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                          <span className="text-sm">Watch Video</span>
                        </Button>
                        
                        <Button
                          onClick={handleTakeNotes}
                          className="group bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <NotebookPen className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                          <span className="text-sm">Take Notes</span>
                        </Button>

                        <Button
                          onClick={handleAddToTodos}
                          className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <ListTodo className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                          <span className="text-sm">Add to Todos</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topic Content Section */}
              {currentTopic.funFacts && currentTopic.funFacts.length > 0 && (
                <div className="p-4 md:p-6">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-4 md:p-5">
                    <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Fun Facts
                    </h4>
                    <ul className="space-y-2">
                      {currentTopic.funFacts.slice(0, 5).map((fact, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed flex items-start">
                          <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default MysteryPage