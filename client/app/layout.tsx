import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    template: "Ammu's | StudyControl",
    default: "StudyControl — Your Study Companion",
  },
  description: "Comprehensive study management platform with diary, focus tools, and progress tracking.",
  keywords: ["study", "diary", "focus", "productivity", "education", "notes"],
  authors: [{ name: "StudyControl Team" }],
  creator: "StudyControl",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "StudyControl — Your Study Companion",
    description: "Comprehensive study management platform with diary, focus tools, and progress tracking.",
    siteName: "StudyControl",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyControl — Your Study Companion",
    description: "Comprehensive study management platform with diary, focus tools, and progress tracking.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${manrope.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
