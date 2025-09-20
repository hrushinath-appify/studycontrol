"use client"

import * as React from "react"
import { Moon, Sun, Flower2, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/custom/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9 border-border/60 hover:bg-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-primary" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-primary" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem 
          onClick={() => setTheme("light")} 
          className="cursor-pointer hover:bg-accent/50 transition-colors duration-200"
        >
          <Flower2 className="mr-2 h-4 w-4 text-pink-500" />
          Baby Pink Floral
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")} 
          className="cursor-pointer hover:bg-accent/50 transition-colors duration-200"
        >
          <Sparkles className="mr-2 h-4 w-4 text-violet-400" />
          Mysterious Violet
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className="cursor-pointer hover:bg-accent/50 transition-colors duration-200"
        >
          <Sun className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
