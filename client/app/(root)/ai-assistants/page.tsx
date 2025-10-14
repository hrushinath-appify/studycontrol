'use client'

import React from 'react'
import { Github, ExternalLink, Bot, Sparkles, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ChatGPTSearchPage = () => {
  const aiTools = [
    {
      name: "ChatGPT",
      description: "Advanced conversational AI for medical education and healthcare topics",
      url: "https://chat.openai.com",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-green-600 to-green-800",
      features: ["Medical concept explanations", "Study guide creation", "Case study analysis", "Exam preparation"]
    },
    {
      name: "Claude AI",
      description: "Anthropic's AI assistant for detailed medical research and analysis",
      url: "https://claude.ai",
      icon: <Bot className="w-6 h-6" />,
      color: "from-orange-600 to-orange-800",
      features: ["Long medical discussions", "Research paper analysis", "Clinical reasoning", "Academic writing help"]
    },
    {
      name: "Perplexity AI",
      description: "AI-powered search for latest medical research and information",
      url: "https://www.perplexity.ai",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-blue-600 to-blue-800",
      features: ["Current medical research", "Evidence-based information", "Cited sources", "Clinical guidelines"]
    },
    {
      name: "Copilot - Unlimited ChatGPT",
      description: "AI assistant for medical data analysis and research tools",
      url: "https://github.com/copilot",
      icon: <Github className="w-6 h-6" />,
      color: "from-gray-600 to-gray-800",
      features: ["Medical data analysis", "Research automation", "Statistical tools", "Documentation help"]
    }
  ]

  const openTool = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-full">
            <Bot className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Medical AI Assistant Hub</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access powerful AI tools designed for medical education and healthcare learning. 
          Get instant help with medical concepts, research, and study preparation.
        </p>
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {aiTools.map((tool, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => openTool(tool.url)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-full bg-gradient-to-r ${tool.color} text-white`}>
                  {tool.icon}
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg">{tool.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Features:</h4>
                <ul className="space-y-1">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  openTool(tool.url)
                }}
              >
                Open {tool.name}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Section removed as requested */}

      {/* Tips Section */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">🩺 Tips for Medical Students</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">📚 Study Assistance</h4>
                <p className="text-muted-foreground">
                  Ask specific questions about diseases, symptoms, treatments, and medical procedures. 
                  Request study guides and concept summaries.
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">� Research Help</h4>
                <p className="text-muted-foreground">
                  Use Perplexity for current medical research with citations. 
                  Ask for evidence-based information and clinical guidelines.
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">🧠 Case Analysis</h4>
                <p className="text-muted-foreground">
                  Present clinical cases for analysis and differential diagnosis. 
                  Practice clinical reasoning and decision-making skills.
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              <strong>Note:</strong> Always verify medical information with authoritative sources and consult healthcare professionals for clinical decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatGPTSearchPage