import type { Metadata } from "next"
import AuthenticatedLayout from "@/components/server/AuthenticatedLayout"
import ClientAuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthenticatedLayout>
      <ClientAuthenticatedLayout>{children}</ClientAuthenticatedLayout>
    </AuthenticatedLayout>
  )
}
