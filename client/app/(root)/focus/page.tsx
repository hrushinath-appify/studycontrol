'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, Timer, Coffee, Target } from 'lucide-react'
import type { TimerSettings } from '@/types'


const FocusPage = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [currentMode, setCurrentMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work')
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [totalFocusTime, setTotalFocusTime] = useState(0)

  const [settings] = useState<TimerSettings>({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    sessionsUntilLongBreak: 4
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const getCurrentDuration = useCallback(() => {
    switch (currentMode) {
      case 'work':
        return settings.workDuration * 60
      case 'shortBreak':
        return settings.shortBreakDuration * 60
      case 'longBreak':
        return settings.longBreakDuration * 60
    }
  }, [currentMode, settings.workDuration, settings.shortBreakDuration, settings.longBreakDuration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    const totalDuration = getCurrentDuration()
    return ((totalDuration - timeLeft) / totalDuration) * 100
  }

  const playNotificationSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

    const handleTimerComplete = useCallback(() => {
    playNotificationSound()

    if (currentMode === 'work') {
      const newSessionsCompleted = sessionsCompleted + 1
      setSessionsCompleted(newSessionsCompleted)
      setTotalFocusTime(prev => prev + settings.workDuration)

      // Determine next break type
      if (newSessionsCompleted % settings.sessionsUntilLongBreak === 0) {
        setCurrentMode('longBreak')
        setTimeLeft(settings.longBreakDuration * 60)
      } else {
        setCurrentMode('shortBreak')
        setTimeLeft(settings.shortBreakDuration * 60)
      }
    } else {
      // Break completed, switch back to work
      setCurrentMode('work')
      setTimeLeft(settings.workDuration * 60)
    }

    setIsRunning(false)
  }, [currentMode, sessionsCompleted, settings.workDuration, settings.longBreakDuration, settings.shortBreakDuration, settings.sessionsUntilLongBreak])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, handleTimerComplete])

  const toggleTimer = useCallback(() => {
    setIsRunning(!isRunning)
  }, [isRunning])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(getCurrentDuration())
  }, [getCurrentDuration])

  const switchMode = useCallback((mode: 'work' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false)
    setCurrentMode(mode)
    const duration = mode === 'work' ? settings.workDuration :
      mode === 'shortBreak' ? settings.shortBreakDuration :
        settings.longBreakDuration
    setTimeLeft(duration * 60)
  }, [settings.workDuration, settings.shortBreakDuration, settings.longBreakDuration])

  // Specific handler functions for each mode
  const handleWorkMode = useCallback(() => switchMode('work'), [switchMode])
  const handleShortBreakMode = useCallback(() => switchMode('shortBreak'), [switchMode])
  const handleLongBreakMode = useCallback(() => switchMode('longBreak'), [switchMode])

  const getModeConfig = () => {
    switch (currentMode) {
      case 'work':
        return {
          title: 'Focus Time',
          icon: Target,
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          description: 'Time to focus and be productive'
        }
      case 'shortBreak':
        return {
          title: 'Short Break',
          icon: Coffee,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          description: 'Take a quick break and recharge'
        }
      case 'longBreak':
        return {
          title: 'Long Break',
          icon: Coffee,
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
          description: 'Enjoy a longer break, you earned it!'
        }
    }
  }

  const modeConfig = getModeConfig()

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Focus Mode
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Stay productive with the Pomodoro Technique.
            </p>
          </div>
          <div className="text-primary flex-shrink-0">
            <Timer className="w-10 h-10 md:w-12 md:h-12" />
          </div>
        </div>
      </div>

      {/* Main Timer Section */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Mode Indicator */}
          <div className={`flex items-center justify-center gap-3 mb-8 p-4 rounded-xl ${modeConfig.bgColor}`}>
            <modeConfig.icon className={`w-6 h-6 ${modeConfig.color}`} />
            <div className="text-center">
              <h2 className={`text-xl font-semibold ${modeConfig.color}`}>
                {modeConfig.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {modeConfig.description}
              </p>
            </div>
          </div>

          {/* Circular Timer */}
          <div className="relative flex items-center justify-center mb-8">
            <svg className="w-64 h-64 md:w-80 md:h-80 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted/20"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                className={modeConfig.color}
                style={{
                  transition: 'stroke-dashoffset 1s ease-in-out',
                  filter: 'drop-shadow(0 0 8px currentColor)'
                }}
              />
            </svg>

            {/* Timer Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-6xl font-mono font-bold text-foreground mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-muted-foreground text-sm">
                {isRunning ? 'Running' : 'Paused'}
              </div>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>

            <Button
              onClick={resetTimer}
              variant="outline"
              size="lg"
              className="rounded-full px-6 py-3"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Mode Selection */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <Button
              onClick={handleWorkMode}
              variant={currentMode === 'work' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
            >
              <Target className="w-4 h-4 mr-2" />
              Focus
            </Button>
            <Button
              onClick={handleShortBreakMode}
              variant={currentMode === 'shortBreak' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
            >
              Short Break
            </Button>
            <Button
              onClick={handleLongBreakMode}
              variant={currentMode === 'longBreak' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
            >
              Long Break
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Sessions Completed */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 text-center hover:bg-card/50 transition-all duration-200">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              {sessionsCompleted}
            </div>
            <div className="text-muted-foreground">
              Sessions Completed
            </div>
          </div>

          {/* Total Focus Time */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 text-center hover:bg-card/50 transition-all duration-200">
            <div className="text-2xl md:text-3xl font-bold text-green-500 mb-2">
              {Math.floor(totalFocusTime / 60)}h {totalFocusTime % 60}m
            </div>
            <div className="text-muted-foreground">
              Total Focus Time
            </div>
          </div>

          {/* Current Streak */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 text-center hover:bg-card/50 transition-all duration-200">
            <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-2">
              {sessionsCompleted % settings.sessionsUntilLongBreak}
            </div>
            <div className="text-muted-foreground">
              Until Long Break
            </div>
          </div>


        </div>

      </div>
      {/* Forest App Section */}
      <div className="bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/20 dark:to-green-950/20 rounded-3xl p-8 border border-emerald-200/50 dark:border-emerald-800/30 backdrop-blur-sm shadow-lg">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              Forest Focus
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto rounded-full" />
          </div>

          <div className="flex justify-center">
            <span className="text-6xl">🌲</span>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-foreground/80">
              Wanna focus using Forest App? Of course! Who knows Ammu&apos;s taste better than Chinnu! 🌿
            </p>

            <div className="bg-white/60 dark:bg-gray-900/40 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-700/30">
              <p className="text-foreground/80 leading-relaxed mb-4">
                Just like how I know you love the gentle rustle of leaves and the peaceful feeling of being surrounded by nature,
                I also know that Forest App&apos;s beautiful tree-growing mechanism perfectly matches your aesthetic sense and focus style.
                Every tree planted during your focus sessions will be a little reminder of how much I care about your productivity and well-being.
              </p>

               <div className="flex justify-center">
                 <a 
                   href="https://play.google.com/store/apps/details?id=cc.forestapp&pcampaignid=web_share"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
                 >
                   🌲 Open Forest App
                 </a>
               </div>
            </div>

            <div className="pt-4 border-t border-emerald-200/50 dark:border-emerald-700/30">
              <p className="text-sm text-muted-foreground italic">
                💚 Because even your focus time should be as beautiful as you are, Ammu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FocusPage