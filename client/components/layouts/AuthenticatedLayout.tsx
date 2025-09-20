"use client"

import { AuthProvider } from "@/components/AuthProvider"
import AuthGuard from "@/components/AuthGuard"
import MainSidebar from "@/components/custom/MainSidebar"
import TopBar from "@/components/custom/TopBar"
import Footer from "@/components/custom/Footer"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <AuthProvider>
      <AuthGuard>
        <SidebarProvider>
          <MainSidebar />
          <SidebarInset>
            <TooltipProvider>
              <div className="flex min-h-screen flex-col overflow-hidden bg-background/30 backdrop-blur-sm">
                <TopBar />
                <main className="flex-1 p-6">
                  <div className="mx-auto max-w-7xl">
                    <div className="content-overlay animate-fade-in min-h-[calc(100vh-200px)] rounded-2xl border border-border/50 bg-card/80 p-6 shadow-lg backdrop-blur-sm">
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
    </AuthProvider>
  )
}
