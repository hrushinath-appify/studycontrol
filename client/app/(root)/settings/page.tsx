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
  Smartphone, 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  Shield,
  ChevronRight,
  Flower2,
  Sparkles,
  Award,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface UserPreferences {
  studyReminders: boolean
  appUpdates: boolean
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
    studyReminders: true,
    appUpdates: false
  })

  // Mock achievements data
  const [achievements] = useState([
    {
      id: 'knowledge-badges',
      icon: Award,
      title: 'Knowledge Badges',
      description: 'Earned for mastering various subjects.',
      count: 12,
      color: 'text-yellow-500'
    },
    {
      id: 'study-streaks',
      icon: Flame,
      title: 'Study Streaks',
      description: 'Maintain a consistent study routine.',
      count: 7,
      color: 'text-orange-500'
    }
  ])

  useEffect(() => {
    setMounted(true)
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('userPreferences')
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
  }, [])

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        password: '••••••••'
      })
    }
  }, [user])

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({
        name: profileData.name,
        email: profileData.email
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
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-background border-border"
                />
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

        {/* Achievements Section */}
        <Card className="mb-8 content-overlay">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={cn("p-3 rounded-full bg-background shadow-sm", achievement.color)}>
                  <achievement.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{achievement.count}</div>
                  <div className="text-xs text-muted-foreground">earned</div>
                </div>
              </div>
            ))}
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
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">App Updates</h4>
                  <p className="text-sm text-muted-foreground">Get updates on new features.</p>
                </div>
              </div>
              <Switch
                checked={preferences.appUpdates}
                onCheckedChange={(checked: boolean) => handlePreferenceChange('appUpdates', checked)}
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
