import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { AuthProvider } from "@/components/AuthProvider"
import { Toaster } from "@/components/ui/sonner"
// import { SpeedInsights } from "@vercel/speed-insights/next"

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
  description: "Comprehensive study management platform with focus tools and progress tracking.",
  keywords: ["study", "focus", "productivity", "education"],
  authors: [{ name: "StudyControl Team" }],
  creator: "StudyControl",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/favicon.png"
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "StudyControl — Your Study Companion",
    description: "Comprehensive study management platform with focus tools and progress tracking.",
    siteName: "StudyControl",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyControl — Your Study Companion",
    description: "Comprehensive study management platform with focus tools and progress tracking.",
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
      <body className={`${manrope.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster position="top-center" />
          {/* <SpeedInsights /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
