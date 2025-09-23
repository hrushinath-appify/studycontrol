import type { Metadata } from "next"
import { GuestGuard } from "@/components/AuthGuard"

export const metadata: Metadata = {
  title: {
    template: "%s | StudyControl",
    default: "Authentication | StudyControl",
  },
  description: "Sign in to your StudyControl account to manage your studies effectively.",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GuestGuard>
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5">
        {children}
      </div>
    </GuestGuard>
  )
}
