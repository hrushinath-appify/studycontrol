"use client"

import React, { useState, useEffect, useCallback } from 'react'
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
import { fetchUserStats } from '@/lib/api-utils'
import { getMysteryExplorationCount, onMysteryExplorationUpdate, syncMysteryStatsWithServer } from '@/lib/mystery-tracker'
import { cn } from '@/lib/utils'

interface UserPreferences {
  studyReminders: boolean
}

interface UserStats {
  diaryHighestStreak: number
  mysteryClicks: number
  totalNotes: number
  totalTasks: number
  completedTasks: number
  focusSessionsTotal: number
  averageFocusTime: number
}

const SettingsPage = () => {
  const { user, updateProfile, changePassword } = useAuth()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Form state
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({})
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({})
  
  // User preferences state
  const [preferences, setPreferences] = useState<UserPreferences>({
    studyReminders: true
  })

  // User stats state
  const [userStats, setUserStats] = useState<UserStats>({
    diaryHighestStreak: 0,
    mysteryClicks: 0,
    totalNotes: 0,
    totalTasks: 0,
    completedTasks: 0,
    focusSessionsTotal: 0,
    averageFocusTime: 0
  })
  
  // Stats loading state
  const [statsError, setStatsError] = useState<string | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(false)

  const loadUserStats = useCallback(async () => {
    try {
      setIsLoadingStats(true)
      setStatsError(null) // Clear any previous errors
      const stats = await fetchUserStats()
      
      // Get mystery count from server (now async)
      const mysteryCount = await getMysteryExplorationCount()
      
      setUserStats({
        ...stats,
        mysteryClicks: mysteryCount
      })
    } catch (error) {
      console.error('Error loading user stats:', error)
      
      // Set user-friendly error message
      if (error instanceof Error) {
        setStatsError(error.message)
      } else {
        setStatsError('Failed to load statistics. Please try refreshing the page.')
      }
      
      // Fallback to localStorage for backward compatibility
      const diaryStreakData = localStorage.getItem('diaryStreakData')
      
      // Create fresh fallback stats
      const fallbackStats = {
        diaryHighestStreak: 0,
        mysteryClicks: 0,
        totalNotes: 0,
        totalTasks: 0,
        completedTasks: 0,
        focusSessionsTotal: 0,
        averageFocusTime: 0
      }
      
      if (diaryStreakData) {
        try {
          const streakData = JSON.parse(diaryStreakData)
          fallbackStats.diaryHighestStreak = streakData.diaryHighestStreak || streakData.longestStreak || 0
        } catch (parseError) {
          console.error('Error parsing diary streak data:', parseError)
        }
      }
      
      // Get mystery explorations from server (async)
      try {
        fallbackStats.mysteryClicks = await getMysteryExplorationCount()
      } catch {
        fallbackStats.mysteryClicks = 0 // Fallback to 0 if server fails
      }
      
      setUserStats(fallbackStats)
    } finally {
      setIsLoadingStats(false)
    }
  }, [setStatsError])

  useEffect(() => {
    setMounted(true)
    
    // Load initial mystery count from server
    const loadInitialMysteryCount = async () => {
      try {
        const mysteryCount = await getMysteryExplorationCount()
        setUserStats(prev => ({
          ...prev,
          mysteryClicks: mysteryCount
        }))
      } catch (error) {
        console.error('Error loading initial mystery count:', error)
        // Fallback to 0 if server fails
        setUserStats(prev => ({
          ...prev,
          mysteryClicks: 0
        }))
      }
    }
    
    loadInitialMysteryCount()
    
    // Sync mystery stats with server after a short delay to ensure initialization is complete
    const syncTimer = setTimeout(() => {
      syncMysteryStatsWithServer()
    }, 500)

    return () => clearTimeout(syncTimer)
  }, [])

  // Load initial data
  useEffect(() => {
    loadUserStats()
  }, [loadUserStats])

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email
      })
    }
  }, [user])

  // Listen for mystery exploration updates
  useEffect(() => {
    const cleanup = onMysteryExplorationUpdate((stats) => {
      setUserStats(prev => ({
        ...prev,
        mysteryClicks: stats.count
      }))
    })
    
    return cleanup
  }, [])

  // Listen for other events that might update stats
  useEffect(() => {
    const handleDiaryUpdate = () => {
      console.log('Diary entries updated, refreshing settings stats...')
      loadUserStats()
    }

    const handleStatsUpdate = () => {
      console.log('Stats updated event received, refreshing settings stats...')
      loadUserStats()
    }

    // Listen for diary entry updates
    window.addEventListener('diaryEntriesUpdated', handleDiaryUpdate)
    
    // Listen for general stats updates
    window.addEventListener('userStatsUpdated', handleStatsUpdate)

    return () => {
      window.removeEventListener('diaryEntriesUpdated', handleDiaryUpdate)
      window.removeEventListener('userStatsUpdated', handleStatsUpdate)
    }
  }, [loadUserStats])

  const handleProfileUpdate = useCallback(async () => {
    setIsUpdatingProfile(true)
    setProfileErrors({})
    
    try {
      // Basic validation
      if (!profileData.name.trim()) {
        setProfileErrors({ name: 'Name is required' })
        return
      }
      
      if (profileData.name.trim().length < 2) {
        setProfileErrors({ name: 'Name must be at least 2 characters long' })
        return
      }

      await updateProfile({
        name: profileData.name.trim()
      })
    } catch (error) {
      console.error('Profile update failed:', error)
      setProfileErrors({ general: 'Failed to update profile. Please try again.' })
    } finally {
      setIsUpdatingProfile(false)
    }
  }, [profileData.name, updateProfile])

  const handlePasswordChange = useCallback(async () => {
    setIsUpdatingPassword(true)
    setPasswordErrors({})
    
    try {
      // Validate password fields
      const errors: Record<string, string> = {}
      
      if (!passwordData.currentPassword) {
        errors.currentPassword = 'Current password is required'
      }
      
      if (!passwordData.newPassword) {
        errors.newPassword = 'New password is required'
      } else if (passwordData.newPassword.length < 8) {
        errors.newPassword = 'New password must be at least 8 characters long'
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(passwordData.newPassword)) {
        errors.newPassword = 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)'
      }
      
      if (!passwordData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your new password'
      } else if (passwordData.newPassword !== passwordData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }
      
      if (Object.keys(errors).length > 0) {
        setPasswordErrors(errors)
        return
      }

      await changePassword(passwordData.currentPassword, passwordData.newPassword)
      
      // Clear password fields on success
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.error('Password change failed:', error)
      setPasswordErrors({ general: 'Failed to change password. Please try again.' })
    } finally {
      setIsUpdatingPassword(false)
    }
  }, [passwordData, changePassword])

  const handlePreferenceChange = useCallback((key: keyof UserPreferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value }
    setPreferences(newPreferences)
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences))
  }, [preferences])

  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme)
  }, [setTheme])

  // Create callback functions to avoid inline arrow functions
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({ ...prev, name: e.target.value }))
  }, [])

  const handleCurrentPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))
  }, [])

  const handleNewPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))
  }, [])

  const handleConfirmPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))
  }, [])

  const handleLoginRedirect = useCallback(() => {
    window.location.href = '/login'
  }, [])

  const handleLightThemeClick = useCallback(() => {
    handleThemeChange('light')
  }, [handleThemeChange])

  const handleDarkThemeClick = useCallback(() => {
    handleThemeChange('dark')
  }, [handleThemeChange])

  const handleStudyRemindersChange = useCallback((checked: boolean) => {
    handlePreferenceChange('studyReminders', checked)
  }, [handlePreferenceChange])

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
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={handleNameChange}
                  className="bg-background border-border"
                  disabled={isUpdatingProfile}
                />
                {profileErrors.name && (
                  <p className="text-sm text-red-500">{profileErrors.name}</p>
                )}
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
            {profileErrors.general && (
              <p className="text-sm text-red-500">{profileErrors.general}</p>
            )}
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleProfileUpdate}
                disabled={isUpdatingProfile}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Password Change Section */}
        <Card className="mb-8 content-overlay">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-foreground font-medium">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handleCurrentPasswordChange}
                  className="bg-background border-border"
                  disabled={isUpdatingPassword}
                />
                {passwordErrors.currentPassword && (
                  <p className="text-sm text-red-500">{passwordErrors.currentPassword}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-foreground font-medium">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handleNewPasswordChange}
                  className="bg-background border-border"
                  disabled={isUpdatingPassword}
                />
                {passwordErrors.newPassword && (
                  <p className="text-sm text-red-500">{passwordErrors.newPassword}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground font-medium">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="bg-background border-border"
                  disabled={isUpdatingPassword}
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-sm text-red-500">{passwordErrors.confirmPassword}</p>
                )}
              </div>
            </div>
            {passwordErrors.general && (
              <p className="text-sm text-red-500">{passwordErrors.general}</p>
            )}
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handlePasswordChange}
                disabled={isUpdatingPassword}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                {isUpdatingPassword ? 'Changing...' : 'Change Password'}
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
                onClick={handleLightThemeClick}
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
                onClick={handleDarkThemeClick}
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
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Trophy className="h-5 w-5" />
                Your Statistics
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadUserStats}
                className="text-xs"
                disabled={isLoadingStats}
              >
                {isLoadingStats ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {statsError && (
              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  ⚠️ {statsError}
                </p>
                {statsError.includes('Authentication required') && (
                  <div className="mt-3">
                    <p className="text-yellow-700 dark:text-yellow-300 text-xs mb-2">
                      Please log in again to view your statistics.
                    </p>
                    <Button 
                      onClick={handleLoginRedirect}
                      size="sm"
                      variant="outline"
                      className="bg-yellow-100 dark:bg-yellow-800 hover:bg-yellow-200 dark:hover:bg-yellow-700 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-600"
                    >
                      Go to Login
                    </Button>
                  </div>
                )}
              </div>
            )}
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
                <div className="text-xs text-muted-foreground">
                  {userStats.mysteryClicks === 0 ? 'none yet' : userStats.mysteryClicks === 1 ? 'exploration' : 'explorations'}
                </div>
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
                onCheckedChange={handleStudyRemindersChange}
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
