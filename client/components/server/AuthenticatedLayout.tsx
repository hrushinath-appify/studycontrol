import { ReactNode } from 'react'

interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default async function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  // Authentication is now handled by middleware.ts
  // No need for double authentication checking
  return <>{children}</>
}
