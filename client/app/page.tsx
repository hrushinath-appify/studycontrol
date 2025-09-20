import { redirect } from "next/navigation"

export default function RootPage() {
  // Server-side redirect to login page
  // The auth logic will handle redirecting authenticated users to /home
  redirect("/login")
}
