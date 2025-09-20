'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, FileText, ChevronLeft, ChevronRight, Share2, Edit3, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DiaryEntry } from '@/app/(root)/diary/page'

interface DiaryDetailViewProps {
  entry: DiaryEntry
  previousEntry?: DiaryEntry | null
  nextEntry?: DiaryEntry | null
  onPrevious?: () => void
  onNext?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onShare?: () => void
  showBackButton?: boolean
  backHref?: string
  className?: string
}

const DiaryDetailView: React.FC<DiaryDetailViewProps> = ({
  entry,
  previousEntry,
  nextEntry,
  onPrevious,
  onNext,
  onEdit,
  onDelete,
  onShare,
  showBackButton = true,
  backHref = '/diary',
  className = ''
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = () => {
    if (onShare) {
      onShare()
    } else if (navigator.share) {
      navigator.share({
        title: entry.title,
        text: entry.preview,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className={`min-h-screen bg-background overflow-hidden ${className}`}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <Link href={backHref}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent/50"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              <div className="min-w-0 overflow-hidden">
                <h1 className="text-lg font-semibold text-foreground">Diary Entry</h1>
                <p className="text-sm text-muted-foreground truncate">{entry.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="hover:bg-accent/50"
                title="Share entry"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              {onEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onEdit}
                  className="hover:bg-accent/50"
                  title="Edit entry"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  className="hover:bg-destructive/10 text-destructive hover:text-destructive"
                  title="Delete entry"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12 min-w-0 overflow-hidden">
        {/* Content Card */}
        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl shadow-xl shadow-black/5 overflow-hidden">
          {/* Entry Header */}
          <div className="border-b border-border/30 bg-gradient-to-r from-card/80 to-card/60 p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border border-border/30">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">{formatDate(entry.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border border-border/30">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{formatTime(entry.createdAt)}</span>
              </div>
            </div>
            
            {/* Only show title if it's meaningful and not redundant */}
            {entry.title && 
             entry.title !== 'Untitled Entry' && 
             !entry.content.startsWith(entry.title) && 
             !entry.title.includes(entry.date) && (
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight diary-title force-word-break">
                {entry.title}
              </h1>
            )}
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground/80">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{entry.content.length} characters</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <span>Entry ID: {entry.id.slice(-8)}</span>
              </div>
            </div>
          </div>

          {/* Entry Content */}
          <div className="p-8 sm:p-10">
            <div className="prose prose-lg max-w-none">
              <div className="text-foreground leading-relaxed text-lg diary-content force-word-break min-h-[200px]">
                {entry.content}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {(previousEntry || nextEntry) && (
          <div className="mt-8">
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  {previousEntry && (
                    <Button
                      variant="outline"
                      onClick={onPrevious}
                      className="w-full sm:w-auto bg-background/50 hover:bg-background/80 border-border/50"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2 flex-shrink-0" />
                      <div className="text-left min-w-0 overflow-hidden">
                        <div className="text-xs text-muted-foreground">Previous</div>
                        <div className="font-medium force-word-break max-w-32 overflow-hidden">{previousEntry.title || 'Previous Entry'}</div>
                      </div>
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 flex justify-end">
                  {nextEntry && (
                    <Button
                      variant="outline"
                      onClick={onNext}
                      className="w-full sm:w-auto bg-background/50 hover:bg-background/80 border-border/50"
                    >
                      <div className="text-right min-w-0 overflow-hidden">
                        <div className="text-xs text-muted-foreground">Next</div>
                        <div className="font-medium force-word-break max-w-32 overflow-hidden">{nextEntry.title || 'Next Entry'}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 ml-2 flex-shrink-0" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiaryDetailView
