'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ListTodo, 
  Lock, 
  BarChart3, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Zap,
  Shield,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  Star,
  CheckCircle,
  Bell,
  Heart,
  Loader2
} from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import { getLocalStorageItem } from '@/lib/utils/localStorage'
import { loadVideoTopics } from '@/lib/utils/videos-loader'

const TodoListPage = () => {
  const router = useRouter()
  const { isAuthenticated, isInitializing } = useAuth()
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isLoadingProgress, setIsLoadingProgress] = useState(true)
  const [isWatchingProgress, setIsWatchingProgress] = useState(false)
  const [showNoCheatingHint, setShowNoCheatingHint] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([])

  const requiredProgress = 5.0
  const progressPercentage = (currentProgress / requiredProgress) * 100

  // Generate random sparkles for animation
  useEffect(() => {
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }))
    setSparkles(newSparkles)
  }, [])

  // Fetch actual progress from Marrow Progress - use EXACT same method as Marrow Progress page
  const fetchCurrentProgress = useCallback(async () => {
    try {
      setIsLoadingProgress(true)
      
      // Load video topics first
      const videoTopics = await loadVideoTopics()
      console.log(`Total video topics loaded: ${videoTopics.length}`)
      
      let progressData: Record<string, boolean> = {}
      
      if (isAuthenticated) {
        // Try to get data from API first (same as Marrow Progress page)
        try {
          const response = await fetch('/api/marrow-progress', {
            method: 'GET',
            credentials: 'include',
          })
          
          if (response.ok) {
            const data = await response.json()
            progressData = data.data.progress || {}
            console.log('Loaded progress from API:', Object.keys(progressData).length, 'completed topics')
          } else {
            throw new Error(`API response not ok: ${response.status}`)
          }
        } catch (apiError) {
          console.error('API fetch failed, using localStorage:', apiError)
          // Fall back to localStorage
          const savedProgress = getLocalStorageItem("marrow-progress")
          progressData = savedProgress ? JSON.parse(savedProgress) : {}
          console.log('Loaded progress from localStorage:', Object.keys(progressData).length, 'completed topics')
        }
      } else {
        // Use localStorage for unauthenticated users
        const savedProgress = getLocalStorageItem("marrow-progress")
        progressData = savedProgress ? JSON.parse(savedProgress) : {}
        console.log('Loaded progress from localStorage (unauth):', Object.keys(progressData).length, 'completed topics')
      }
      
      // Calculate progress exactly like Marrow Progress page does
      const completedTopics = videoTopics.filter(topic => progressData[topic.id] === true)
      const totalTopics = videoTopics.length
      
      // Use the exact same calculation as calculateProgressPercentage function
      const percentage = totalTopics > 0 
        ? Math.round((completedTopics.length / totalTopics) * 100) 
        : 0
      
      console.log(`Progress calculation: ${completedTopics.length}/${totalTopics} = ${percentage}%`)
      setCurrentProgress(percentage)
    } catch (error) {
      console.error('Failed to fetch progress:', error)
      setCurrentProgress(0)
    } finally {
      setIsLoadingProgress(false)
    }
  }, [isAuthenticated])

  // Load progress when component mounts and auth is ready
  useEffect(() => {
    if (!isInitializing) {
      fetchCurrentProgress()
    }
  }, [isInitializing, fetchCurrentProgress])

  const handleGoToMarrowProgress = () => {
    router.push('/marrow-progress')
  }

  const handleGoBack = () => {
    router.back()
  }

  const handleWatchProgress = () => {
    setIsWatchingProgress(!isWatchingProgress)
  }

  const handleNoCheatingClick = () => {
    setShowNoCheatingHint(true)
    setTimeout(() => setShowNoCheatingHint(false), 3000)
  }

  const handleRefreshProgress = () => {
    fetchCurrentProgress()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-500/80 dark:to-purple-500/80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 dark:from-yellow-500/80 dark:to-pink-500/80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 dark:from-green-500/80 dark:to-blue-500/80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Floating sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute w-2 h-2 bg-white/60 dark:bg-white/40 rounded-full animate-ping"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 text-purple-700 dark:text-purple-300 font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 hover:shadow-purple-500/25 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Go Back
            </Button>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8">
            {/* Header Section */}
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-20 blur-3xl rounded-full animate-pulse" />
              </div>
              
              {/* Icon and Title */}
              <div className="relative flex flex-col items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 dark:shadow-purple-400/25 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10">
                    <ListTodo className="w-12 h-12 text-white" />
                  </div>
                  {/* Lock overlay for locked state */}
                  <div className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                    <Lock className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                    <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                      To-Do List
                    </span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Organize, prioritize, and track all your study tasks and goals in one intelligent dashboard designed for medical students.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Requirement Card - Interactive */}
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-xl shadow-2xl shadow-orange-500/10 dark:shadow-orange-400/10 rounded-3xl overflow-hidden hover:shadow-orange-500/20 dark:hover:shadow-orange-400/20 transition-all duration-500 border-2 border-orange-200/80 dark:border-orange-800/50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Unlock Requirements Header */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                      Unlock Requirements
                    </h2>
                  </div>

                  {/* Main Requirement Text - Highlighted */}
                  <div className="relative p-6 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-900/30 dark:via-orange-900/30 dark:to-red-900/30 rounded-2xl border-2 border-yellow-300/50 dark:border-yellow-700/50 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-2xl animate-pulse" />
                    <div className="relative text-center space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400 animate-pulse" />
                        <span className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200">
                          Feature Unlock Condition
                        </span>
                        <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400 animate-pulse" />
                      </div>
                      <p className="text-xl md:text-2xl font-black text-orange-700 dark:text-orange-300 leading-tight">
                        🎯 5% of Overall Progress from Marrow Progress will unlock this Feature
                      </p>
                    </div>
                  </div>

                  {/* Current Progress Display */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Current Progress</span>
                        {isLoadingProgress && (
                          <Loader2 className="w-3 h-3 animate-spin text-orange-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                          {isLoadingProgress ? "..." : `${currentProgress.toFixed(1)}%`} / {requiredProgress}%
                        </span>
                        <button
                          onClick={handleRefreshProgress}
                          disabled={isLoadingProgress}
                          className="p-1 rounded-md hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors disabled:opacity-50"
                          title="Refresh progress"
                        >
                          <BarChart3 className={`w-3 h-3 text-orange-500 ${isLoadingProgress ? 'animate-pulse' : ''}`} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Interactive Progress Bar */}
                    <div className="relative pt-6">
                      {/* Progress indicator - moved above the bar */}
                      <div className="absolute -top-1 left-0 flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 font-semibold mb-2">
                        <BarChart3 className="w-3 h-3" />
                        {isLoadingProgress ? "Loading..." : `${progressPercentage.toFixed(1)}% Complete`}
                      </div>
                      
                      <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                            isLoadingProgress 
                              ? 'bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse' 
                              : 'bg-gradient-to-r from-orange-400 via-red-400 to-pink-400'
                          }`}
                          style={{ width: `${isLoadingProgress ? 30 : Math.min(progressPercentage, 100)}%` }}
                        >
                          {!isLoadingProgress && (
                            <div className="absolute inset-0 bg-white/30 animate-pulse" />
                          )}
                        </div>
                      </div>
                      
                      {/* Show sync status */}
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {isAuthenticated ? "🔄 Synced with database" : "💾 Local storage only"}
                        </span>
                        <span>
                          {isLoadingProgress ? "Fetching..." : `${(requiredProgress - currentProgress).toFixed(1)}% to unlock`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* No Cheating Section - Interactive & Funny */}
                  <div className="relative">
                    <div 
                      className="group cursor-pointer p-4 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200/50 dark:border-red-800/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                      onClick={handleNoCheatingClick}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:animate-bounce">
                            <AlertTriangle className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="text-lg font-bold text-red-700 dark:text-red-300 group-hover:text-red-800 dark:group-hover:text-red-200">
                              🚫 No Cheating! 🕵️‍♂️
                            </p>
                            <p className="text-sm text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">
                              We&apos;re watching your progress... with love! 👀❤️
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleWatchProgress()
                            }}
                            className="p-2 rounded-lg hover:bg-red-200/50 dark:hover:bg-red-800/30 transition-colors"
                          >
                            {isWatchingProgress ? (
                              <Eye className="w-5 h-5 text-red-600 dark:text-red-400 animate-pulse" />
                            ) : (
                              <EyeOff className="w-5 h-5 text-red-500 dark:text-red-500" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Fun hint popup */}
                      {showNoCheatingHint && (
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap animate-bounce z-10">
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black/90" />
                          Just study hard! We believe in you! 🌟
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      onClick={handleGoToMarrowProgress}
                      className="group bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <BarChart3 className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      <span>Go to Marrow Progress</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>

                    <Button
                      variant="outline"
                      className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600 text-orange-700 dark:text-orange-300 font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <Bell className="w-5 h-5 mr-2" />
                      Notify When Unlocked
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Preview Card */}
            <Card className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-400/10 rounded-3xl overflow-hidden hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20 transition-all duration-500 border border-purple-100/50 dark:border-purple-800/50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Coming Soon Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold text-sm shadow-lg">
                    <Zap className="w-4 h-4 animate-pulse" />
                    Coming Soon
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      What to Expect
                    </h3>
                    <div className="grid gap-3">
                      {[
                        "Smart task organization and prioritization",
                        "Study schedule integration",
                        "Progress tracking with analytics",
                        "Deadline reminders and notifications",
                        "Subject-wise task categorization",
                        "Collaboration features for study groups",
                        "Goal setting and milestone tracking"
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-100/50 dark:border-purple-800/30 opacity-60"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-500 dark:text-gray-400 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Motivational Message */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                      <span>
                        {isLoadingProgress 
                          ? "Loading your progress..." 
                          : currentProgress >= requiredProgress 
                            ? "🎉 Congratulations! You've unlocked the To-Do List feature!" 
                            : `Keep studying! You're ${(requiredProgress - currentProgress).toFixed(1)}% away from unlocking this!`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoListPage