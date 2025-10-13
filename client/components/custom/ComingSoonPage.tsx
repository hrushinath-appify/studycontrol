'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Star, 
  Rocket, 
  Bell, 
  CheckCircle,
  Zap,
  Heart
} from 'lucide-react'

interface ComingSoonPageProps {
  title: string
  description: string
  icon: React.ReactNode
  expectedDate?: string
  features?: string[]
  gradient?: string
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  title,
  description,
  icon,
  expectedDate = "Soon",
  features = [],
  gradient = "from-purple-600 via-blue-600 to-indigo-600"
}) => {
  const router = useRouter()
  const [isNotifyClicked, setIsNotifyClicked] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([])

  // Generate random sparkles for animation
  useEffect(() => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }))
    setSparkles(newSparkles)
  }, [])

  const handleNotifyMe = () => {
    setIsNotifyClicked(true)
    setTimeout(() => setIsNotifyClicked(false), 3000)
  }

  const handleGoBack = () => {
    router.back()
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
                <div className={`w-full h-32 bg-gradient-to-r ${gradient} opacity-20 blur-3xl rounded-full animate-pulse`} />
              </div>
              
              {/* Icon and Title */}
              <div className="relative flex flex-col items-center gap-6 mb-8">
                <div className="relative">
                  <div className={`w-24 h-24 bg-gradient-to-br ${gradient} rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 dark:shadow-purple-400/25 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10`}>
                    <div className="text-white text-3xl">
                      {icon}
                    </div>
                  </div>
                  {/* Floating decoration */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Rocket className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                    <span className={`block bg-gradient-to-r ${gradient} bg-clip-text text-transparent drop-shadow-sm`}>
                      {title}
                    </span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            {/* Coming Soon Card */}
            <Card className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-400/10 rounded-3xl overflow-hidden hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20 transition-all duration-500 border border-purple-100/50 dark:border-purple-800/50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Coming Soon Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold text-sm shadow-lg">
                    <Zap className="w-4 h-4 animate-pulse" />
                    Coming {expectedDate}
                  </div>

                  {/* Features List */}
                  {features.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        What to Expect
                      </h3>
                      <div className="grid gap-3">
                        {features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-100/50 dark:border-purple-800/30"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleNotifyMe}
                      disabled={isNotifyClicked}
                      className={`group relative overflow-hidden ${
                        isNotifyClicked 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : `bg-gradient-to-r ${gradient} hover:scale-105`
                      } text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300`}
                    >
                      {isNotifyClicked ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span>Thanks! We&apos;ll notify you</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                          <span>Notify Me When Ready</span>
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={handleGoBack}
                      variant="outline"
                      className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 text-purple-700 dark:text-purple-300 font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                      Back to Dashboard
                    </Button>
                  </div>

                  {/* Motivational Message */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                      <span>Great things are coming! Stay tuned for updates.</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Background Decorations */}
            <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-purple-400/60 dark:bg-purple-300/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-blue-400/60 dark:bg-blue-300/60 rounded-full animate-bounce" style={{ animationDelay: '3s' }} />
            <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-indigo-400/60 dark:bg-indigo-300/60 rounded-full animate-bounce" style={{ animationDelay: '5s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoonPage