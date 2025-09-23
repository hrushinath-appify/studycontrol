"use client"

import AuthGuard from "@/components/AuthGuard"
import { LazyComponents } from "@/components/LazyComponents"
import TopBar from "@/components/custom/TopBar"
import Footer from "@/components/custom/Footer"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <LazyComponents.MainSidebar />
        <SidebarInset>
          <TooltipProvider>
            <div className="flex min-h-dvh flex-col overflow-hidden bg-background/30 backdrop-blur-sm">
              <TopBar />
              <main className="flex-1 p-3 sm:p-4 md:p-6">
                <div className="mx-auto w-full max-w-7xl">
                  <div className="content-overlay animate-fade-in min-h-[calc(100dvh-180px)] rounded-xl sm:rounded-2xl border border-border/50 bg-card/80 p-3 sm:p-4 md:p-6 shadow-lg backdrop-blur-sm">
                    {children}
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
