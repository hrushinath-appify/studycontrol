'use client'

import React from 'react'
import ComingSoonPage from '@/components/custom/ComingSoonPage'
import { Search } from 'lucide-react'

const ChatGPTSearchPage = () => {
  return (
    <ComingSoonPage
      title="ChatGPT Search"
      description="AI-powered search and learning assistant to help you discover medical knowledge, get instant answers, and enhance your study experience with intelligent conversation."
      icon={<Search className="w-8 h-8" />}
      expectedDate="Very Soon"
      features={[
        "AI-powered search across medical topics",
        "Instant answers to your study questions",
        "Interactive learning conversations",
        "Smart content recommendations",
        "Study material analysis and summaries",
        "Personalized learning paths"
      ]}
      gradient="from-green-600 via-teal-600 to-blue-600"
    />
  )
}

export default ChatGPTSearchPage