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

export const LazyNotesPage = createLazyRoute(
  () => import('@/app/(root)/notes/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Notes...</p>
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

export const LazyMysteryPage = createLazyRoute(
  () => import('@/app/(root)/mystery/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Mystery...</p>
    </div>
  </div>
)

export const LazyMarrowProgressPage = createLazyRoute(
  () => import('@/app/(root)/marrow-progress/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Marrow Progress...</p>
    </div>
  </div>
)

export const LazyDeveloperNotesPage = createLazyRoute(
  () => import('@/app/(root)/developer-notes/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Developer Notes...</p>
    </div>
  </div>
)

export const LazyHelpPage = createLazyRoute(
  () => import('@/app/(root)/help/page'),
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground">Loading Help...</p>
    </div>
  </div>
)

// Utility to preload route components for better UX
export const preloadRoutes = {
  home: () => import('@/app/(root)/home/page'),
  notes: () => import('@/app/(root)/notes/page'),
  focus: () => import('@/app/(root)/focus/page'),
  settings: () => import('@/app/(root)/settings/page'),
  mystery: () => import('@/app/(root)/mystery/page'),
  'marrow-progress': () => import('@/app/(root)/marrow-progress/page'),
  'developer-notes': () => import('@/app/(root)/developer-notes/page'),
  help: () => import('@/app/(root)/help/page'),
}

// Hook to preload routes on user interaction (hover, focus, etc.)
export const useRoutePreloading = () => {
  const preloadRoute = (routeName: keyof typeof preloadRoutes) => {
    preloadRoutes[routeName]()
  }

  return { preloadRoute }
}