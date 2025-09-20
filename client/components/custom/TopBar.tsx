"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/custom/theme-toggle"
import { NotificationsIcon, ProfileIcon } from "@/components/custom/header-icons"

interface TopBarProps {
  title?: string
  showKeyboardShortcut?: boolean
}

export default function TopBar({ 
  title = "StudyControl", 
  showKeyboardShortcut: _showKeyboardShortcut = true 
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/60 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-9 w-9 hover:bg-accent/50 transition-colors duration-200 rounded-md" />
          <div className="h-6 w-px bg-border/60" />
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <NotificationsIcon />
          <ProfileIcon />
        </div>
      </div>
    </header>
  )
}
