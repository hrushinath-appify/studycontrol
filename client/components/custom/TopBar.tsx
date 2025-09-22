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
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/60 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <SidebarTrigger className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-accent/50 transition-colors duration-200 rounded-md flex-shrink-0" />
          <div className="h-4 sm:h-6 w-px bg-border/60 flex-shrink-0" />
          <h1 className="text-base sm:text-lg font-semibold tracking-tight truncate">{title}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <ThemeToggle />
          <NotificationsIcon />
          <ProfileIcon />
        </div>
      </div>
    </header>
  )
}
