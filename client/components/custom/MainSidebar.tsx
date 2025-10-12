"use client"

import Link from "next/link"
import { useCallback } from "react"
import { usePathname } from "next/navigation"
import { useRoutePreloading } from "@/components/LazyRoutes"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Home,
  Settings,
  BookOpen,
  LogOut,
  HelpCircle,
  FileText,
  Focus,
  Sparkles,
  Heart,
  BarChart3,
  // Newspaper,
} from "lucide-react"
import { useAuth } from "@/components/AuthProvider"

// Main navigation items
const mainItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Mystery",
    url: "/mystery",
    icon: Sparkles,
  },
  {
    title: "Marrow Progress",
    url: "/marrow-progress",
    icon: BarChart3,
  },
  {
    title: "Focus",
    url: "/focus",
    icon: Focus,
  },
  // {
  //   title: "MBBS News",
  //   url: "/news",
  //   icon: Newspaper,
  // },
  
  {
    title: "Notes",
    url: "/notes",
    icon: FileText,
  },
]



export default function MainSidebar() {
  const { logout } = useAuth()
  const pathname = usePathname()
  const { preloadRoute } = useRoutePreloading()

  const createHoverHandler = useCallback((url: string) => () => {
    // Map URL to route names for preloading
    const routeMap: Record<string, keyof typeof import('@/components/LazyRoutes').preloadRoutes> = {
      '/home': 'home',
      '/notes': 'notes',
      '/focus': 'focus',
      '/settings': 'settings',
      '/mystery': 'mystery',
      '/marrow-progress': 'marrow-progress',
      '/developer-notes': 'developer-notes',
      '/help': 'help',
    }
    
    const routeName = routeMap[url]
    if (routeName) {
      preloadRoute(routeName)
    }
  }, [preloadRoute])

  return (
    <Sidebar
      className="border-r border-border/60 bg-sidebar/80 backdrop-blur-sm shadow-xl"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border/60 px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <BookOpen className="size-5 text-primary drop-shadow-sm" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-bold text-lg tracking-tight bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">StudyControl</span>
            <span className="truncate text-xs text-muted-foreground font-medium">To My Only Ammu ❤️ </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6 space-y-8">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`group-data-[collapsible=icon]:px-3 h-11 rounded-xl transition-all duration-200 ${isActive
                          ? 'bg-primary/10 border border-primary/20 shadow-sm'
                          : 'hover:bg-accent/50 hover:border-border/50'
                        }`}
                    >
                      <Link 
                        href={item.url} 
                        className="flex items-center gap-4 h-full px-3"
                        onMouseEnter={createHoverHandler(item.url)}
                      >
                        <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="group-data-[collapsible=icon]:hidden font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 px-3 py-4 bg-muted/20">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:px-3 h-11 rounded-xl hover:bg-accent/50 transition-all duration-200"
            >
              <Link 
                href="/settings" 
                className="flex items-center gap-4 h-full px-3"
                onMouseEnter={createHoverHandler('/settings')}
              >
                <Settings className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <span className="group-data-[collapsible=icon]:hidden font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:px-3 h-11 rounded-xl hover:bg-accent/50 transition-all duration-200"
            >
              <Link 
                href="/developer-notes" 
                className="flex items-center gap-4 h-full px-3"
                onMouseEnter={createHoverHandler('/developer-notes')}
              >
                <Heart className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <span className="group-data-[collapsible=icon]:hidden font-medium">Developer Notes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:px-3 h-11 rounded-xl hover:bg-accent/50 transition-all duration-200"
            >
              <Link 
                href="/help" 
                className="flex items-center gap-4 h-full px-3"
                onMouseEnter={createHoverHandler('/help')}
              >
                <HelpCircle className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <span className="group-data-[collapsible=icon]:hidden font-medium">About & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 group-data-[collapsible=icon]:px-3 h-11 rounded-xl transition-all duration-200"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
