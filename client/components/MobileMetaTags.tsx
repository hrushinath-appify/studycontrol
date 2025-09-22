"use client"

import Head from 'next/head'

interface MobileMetaTagsProps {
  title?: string
  description?: string
  themeColor?: string
}

export default function MobileMetaTags({ 
  title = "StudyControl - Your Personal Study Companion",
  description = "Track your study progress, take notes, and achieve your NEET PG goals with StudyControl.",
  themeColor = "#ec4899" // Your primary pink color
}: MobileMetaTagsProps) {
  return (
    <Head>
      {/* Essential mobile meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="StudyControl" />
      
      {/* Theme colors */}
      <meta name="theme-color" content={themeColor} />
      <meta name="msapplication-navbutton-color" content={themeColor} />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Touch icons for various devices */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Prevent zoom on input focus (iOS) */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      
      {/* Preconnect to improve performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  )
}