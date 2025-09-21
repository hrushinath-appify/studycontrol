"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/components/AuthProvider'
import { useTheme } from 'next-themes'
import { 
  User, 
  Palette, 
  Trophy, 
  Flame, 
  Bell, 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  Shield,
  ChevronRight,
  Flower2,
  Sparkles,
  Target,
  Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface UserPreferences {
  studyReminders: boolean
}

interface UserStats {
  diaryHighestStreak: number
  mysteryClicks: number
}

const SettingsPage = () => {
  const { user, updateProfile } = useAuth()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '••••••••'
  })
  
  // User preferences state
  const [preferences, setPreferences] = useState<UserPreferences>({
    studyReminders: true
  })

  // User stats state
  const [userStats, setUserStats] = useState<UserStats>({
    diaryHighestStreak: 0,
    mysteryClicks: 0
  })

  useEffect(() => {
    setMounted(true)
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('userPreferences')
    if (savedPreferences) {
      const parsed = JSON.parse(savedPreferences)
      // Remove appUpdates if it exists in saved preferences
      if (parsed.appUpdates !== undefined) {
        delete parsed.appUpdates
      }
      setPreferences(parsed)
    }
    
    // Load user stats
    loadUserStats()
  }, [])

  const loadUserStats = () => {
    // Load diary streak data
    const diaryStreakData = localStorage.getItem('diaryStreakData')
    if (diaryStreakData) {
      try {
        const streakData = JSON.parse(diaryStreakData)
        setUserStats(prev => ({
          ...prev,
          diaryHighestStreak: streakData.longestStreak || 0
        }))
      } catch (error) {
        console.error('Error loading diary streak data:', error)
      }
    }
    
    // Load mystery clicks count
    const mysteryClicks = localStorage.getItem('mysteryClicks')
    if (mysteryClicks) {
      try {
        setUserStats(prev => ({
          ...prev,
          mysteryClicks: parseInt(mysteryClicks) || 0
        }))
      } catch (error) {
        console.error('Error loading mystery clicks:', error)
      }
    }
  }

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        password: '••••••••'
      })
    }
  }, [user])

  // Listen for diary updates and mystery clicks
  useEffect(() => {
    const handleDiaryUpdate = () => {
      loadUserStats()
    }

    const handleMysteryClick = () => {
      loadUserStats()
    }

    // Listen for diary entries updates
    window.addEventListener('diaryEntriesUpdated', handleDiaryUpdate)
    
    // Listen for mystery clicks (custom event)
    window.addEventListener('mysteryClicked', handleMysteryClick)

    // Cleanup
    return () => {
      window.removeEventListener('diaryEntriesUpdated', handleDiaryUpdate)
      window.removeEventListener('mysteryClicked', handleMysteryClick)
    }
  }, [])

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({
        name: profileData.name
      })
      // Show success message (you could add a toast here)
    } catch (error) {
      console.error('Profile update failed:', error)
    }
  }

  const handlePreferenceChange = (key: keyof UserPreferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value }
    setPreferences(newPreferences)
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences))
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  const helpItems = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact Support', icon: MessageSquare },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield }
  ]

  if (!mounted) {
    return <div className="animate-pulse">Loading settings...</div>
  }

  return (
    <div className="min-h-screen p-6 space-y-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <Card className="mb-8 content-overlay">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  className="bg-muted border-border text-muted-foreground cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed for security reasons</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={profileData.password}
                onChange={(e) => setProfileData(prev => ({ ...prev, password: e.target.value }))}
                className="bg-background border-border max-w-md"
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleProfileUpdate}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card className="mb-8 content-overlay">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className={cn(
                  "p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02]",
                  theme === 'light' 
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/20" 
                    : "border-border bg-card hover:border-primary/50"
                )}
                onClick={() => handleThemeChange('light')}
              >
                <div className="flex items-center justify-center mb-4">
                  <Flower2 className="h-12 w-12 text-pink-500" />
                </div>
                <h3 className="text-center font-medium text-foreground">
                  Light Mode (Floral)
                </h3>
              </div>
              
              <div 
                className={cn(
                  "p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02]",
                  theme === 'dark' 
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/20" 
                    : "border-border bg-card hover:border-primary/50"
                )}
                onClick={() => handleThemeChange('dark')}
              >
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-12 w-12 text-violet-400" />
                </div>
                <h3 className="text-center font-medium text-foreground">
                  Dark Mode (Mysterious)
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Stats Section */}
        <Card className="mb-8 content-overlay">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Trophy className="h-5 w-5" />
              Your Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="p-3 rounded-full bg-background shadow-sm text-orange-500">
                <Flame className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Diary Highest Streak</h4>
                <p className="text-sm text-muted-foreground">Your longest consecutive diary entry streak.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{userStats.diaryHighestStreak}</div>
                <div className="text-xs text-muted-foreground">days</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="p-3 rounded-full bg-background shadow-sm text-purple-500">
                <Eye className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Mystery Explorations</h4>
                <p className="text-sm text-muted-foreground">Number of mystery topics you&apos;ve discovered.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{userStats.mysteryClicks}</div>
                <div className="text-xs text-muted-foreground">explorations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="mb-8 content-overlay">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">Study Reminders</h4>
                  <p className="text-sm text-muted-foreground">Receive reminders for study sessions.</p>
                </div>
              </div>
              <Switch
                checked={preferences.studyReminders}
                onCheckedChange={(checked: boolean) => handlePreferenceChange('studyReminders', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Help & Legal Section */}
        <Card className="content-overlay">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <HelpCircle className="h-5 w-5" />
              Help & Legal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {helpItems.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage
