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
      { url: "/favicon.ico", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
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
      <head>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
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
