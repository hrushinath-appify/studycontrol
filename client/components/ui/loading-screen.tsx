"use client"

import React from "react"
import { BookOpen } from "lucide-react"
import type { LoadingScreenProps } from "@/types"

const LoadingScreen = React.memo<LoadingScreenProps>(({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="flex aspect-square size-16 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 shadow-lg">
            <BookOpen className="size-8 text-primary animate-pulse" />
          </div>
          <div className="absolute -inset-2 rounded-xl border-2 border-primary/20 animate-ping"></div>
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">StudyControl</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  )
})

LoadingScreen.displayName = 'LoadingScreen'

export default LoadingScreen
