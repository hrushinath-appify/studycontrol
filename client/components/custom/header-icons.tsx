"use client"

import * as React from "react"
import { Bell, LogOut, Settings } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/custom/dropdown-menu"
import { useAuth } from "@/components/AuthProvider"

export function NotificationsIcon() {
  const [notificationCount, setNotificationCount] = React.useState(3)
  const [hasUnreadNotifications, setHasUnreadNotifications] = React.useState(true)

  const markAsRead = () => {
    setNotificationCount(0)
    setHasUnreadNotifications(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9 border-border/60 hover:bg-accent/50 transition-colors duration-200 relative">
          <Bell className="h-4 w-4" />
          {/* Notification badge - only show if there are unread notifications */}
          {hasUnreadNotifications && notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
              {notificationCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {hasUnreadNotifications && notificationCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
              onClick={markAsRead}
            >
              Mark as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Study session reminder</p>
            <p className="text-xs text-muted-foreground">Your focus session is starting in 5 minutes</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Daily goal achieved</p>
            <p className="text-xs text-muted-foreground">You&apos;ve completed your study goal for today!</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">New diary entry</p>
            <p className="text-xs text-muted-foreground">Don&apos;t forget to write your daily reflection</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ProfileIcon() {
  const { user, logout } = useAuth()

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-accent/50 transition-colors duration-200">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={`${user.name} avatar`} />
            <AvatarFallback className="text-xs font-medium">{initials}</AvatarFallback>
          </Avatar>
          <span className="sr-only">Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
