"use client"

import { createLazyRoute } from '@/components/LazyComponents'

// Lazy loaded route components for better initial bundle size
export const LazyHomePage = createLazyRoute(
  () => import('@/app/(root)/home/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Dashboard...</p>
    </div>
  </div>
)

export const LazyDiaryPage = createLazyRoute(
  () => import('@/app/(root)/diary/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Diary...</p>
    </div>
  </div>
)

export const LazyNotesPage = createLazyRoute(
  () => import('@/app/(root)/notes/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Notes...</p>
    </div>
  </div>
)

export const LazyToDoListPage = createLazyRoute(
  () => import('@/app/(root)/to-do-list/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Tasks...</p>
    </div>
  </div>
)

export const LazyFocusPage = createLazyRoute(
  () => import('@/app/(root)/focus/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Focus Timer...</p>
    </div>
  </div>
)

export const LazySettingsPage = createLazyRoute(
  () => import('@/app/(root)/settings/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Settings...</p>
    </div>
  </div>
)

// Utility to preload route components for better UX
export const preloadRoutes = {
  home: () => import('@/app/(root)/home/page'),
  diary: () => import('@/app/(root)/diary/page'),
  notes: () => import('@/app/(root)/notes/page'),
  todoList: () => import('@/app/(root)/to-do-list/page'),
  focus: () => import('@/app/(root)/focus/page'),
  settings: () => import('@/app/(root)/settings/page'),
}

// Hook to preload routes on user interaction (hover, focus, etc.)
export const useRoutePreloading = () => {
  const preloadRoute = (routeName: keyof typeof preloadRoutes) => {
    preloadRoutes[routeName]()
  }

  return { preloadRoute }
}