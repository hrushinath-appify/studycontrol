import { getAuthenticatedUser } from '@/lib/dal'
import { ReactNode } from 'react'

interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default async function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  // This will redirect to login if user is not authenticated
  await getAuthenticatedUser()

  return <>{children}</>
}
