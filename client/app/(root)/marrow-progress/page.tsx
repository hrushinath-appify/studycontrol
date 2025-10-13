"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VideoTopic } from "@/lib/utils/videos-loader";
import { loadVideoTopics } from "@/lib/utils/videos-loader";
import { BookOpen, CheckCircle, Clock, Trophy, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setLocalStorageItem, getLocalStorageItem } from "@/lib/utils/localStorage";
import { useAuth } from "@/components/AuthProvider";
import {
  fetchMarrowProgress,
  updateMarrowProgress,
  MarrowProgressResponse,
  MarrowProgressUpdate,
  calculateProgressPercentage
} from "@/lib/api/marrow-progress";

interface ProgressState {
  [topicId: string]: boolean;
}

interface SubjectData {
  name: string;
  chapters: {
    [chapterName: string]: VideoTopic[];
  };
}

// Memoized TopicItem component for better performance
const TopicItem = React.memo(({ 
  topic, 
  isCompleted, 
  isUpdating, 
  onToggle 
}: { 
  topic: VideoTopic; 
  isCompleted: boolean; 
  isUpdating: boolean; 
  onToggle: (topic: VideoTopic) => void;
}) => {
  return (
    <div
      className={`flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border transition-colors ${
        isCompleted
          ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
          : "bg-card hover:bg-muted/50 active:bg-muted/70"
      } ${isUpdating ? "opacity-70" : ""}`}
    >
      <div className="relative flex-shrink-0">
        <Checkbox
          id={topic.id}
          checked={isCompleted}
          onCheckedChange={() => onToggle(topic)}
          disabled={isUpdating}
          className="mt-0.5 sm:mt-1"
        />
        {isUpdating && (
          <Loader2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 animate-spin absolute -top-1 -right-1 text-primary" />
        )}
      </div>
      
      <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
        <label
          htmlFor={topic.id}
          className={`block text-xs sm:text-sm font-medium cursor-pointer transition-all ${
            isCompleted ? "line-through text-muted-foreground" : ""
          } ${isUpdating ? "cursor-wait" : ""}`}
        >
          {topic.title}
        </label>
        
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {topic.estimatedTime > 0 && (
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
              {topic.estimatedTime}m
            </Badge>
          )}
          {topic.difficulty && (
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              {topic.difficulty}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
});

TopicItem.displayName = 'TopicItem';

export default function MarrowProgressPage() {
  const [progress, setProgress] = useState<ProgressState>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingTopics, setUpdatingTopics] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);
  const [videoTopics, setVideoTopics] = useState<VideoTopic[]>([]);
  const { isAuthenticated, isInitializing } = useAuth();

  // Ensure we're on the client side and load topics
  useEffect(() => {
    setIsClient(true);
    
    // Lazy load video topics for better initial page load
    loadVideoTopics()
      .then((topics: VideoTopic[]) => {
        setVideoTopics(topics);
      })
      .catch((err: Error) => {
        console.error('Failed to load video topics:', err);
        setError('Failed to load topics');
      });
  }, []);

  // Organize topics by subject and chapter (memoized for performance)
  const organizedData: { [subject: string]: SubjectData } = useMemo(() => {
    if (videoTopics.length === 0) {
      return {};
    }

    const organized: { [subject: string]: SubjectData } = {};

    videoTopics.forEach((topic) => {
      const subject = topic.category;
      const chapter = topic.tags[0] || "General";

      if (!organized[subject]) {
        organized[subject] = {
          name: subject,
          chapters: {},
        };
      }

      if (!organized[subject].chapters[chapter]) {
        organized[subject].chapters[chapter] = [];
      }

      organized[subject].chapters[chapter].push(topic);
    });

    return organized;
  }, [videoTopics]);

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // If user is authenticated, try to load from database
      if (isAuthenticated) {
        try {
          const response: MarrowProgressResponse = await fetchMarrowProgress();
          setProgress(response.progress || {});
          return; // Successfully loaded from database
        } catch (apiError) {
          console.error('Failed to load from API:', apiError);
          // Fall through to localStorage
        }
      }
      
      // Load from localStorage (for unauthenticated users or if API fails)
      const savedProgress = getLocalStorageItem("marrow-progress");
      if (savedProgress) {
        try {
          setProgress(JSON.parse(savedProgress));
          if (!isAuthenticated) {
            // Only show message for unauthenticated users
            toast.info("Progress is saved locally. Sign in to sync across devices.");
          }
        } catch (localError) {
          console.error('Failed to parse localStorage data:', localError);
        }
      }
    } catch (err) {
      console.error('Failed to load progress:', err);
      setError(err instanceof Error ? err.message : 'Failed to load progress');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load progress from database on component mount (client-side only)
  useEffect(() => {
    // Ensure we're on the client side and auth is initialized
    if (isClient && !isInitializing) {
      loadProgress();
    }
  }, [isClient, isInitializing, loadProgress]);

  const toggleTopicCompletion = useCallback(async (topic: VideoTopic) => {
    const topicId = topic.id;
    const newCompleted = !progress[topicId];
    
    // Optimistically update UI
    setProgress((prev) => ({
      ...prev,
      [topicId]: newCompleted,
    }));

    // Always save to localStorage as backup
    const updatedProgress = { ...progress, [topicId]: newCompleted };
    setLocalStorageItem("marrow-progress", JSON.stringify(updatedProgress));

    // Only sync with database if user is authenticated
    if (!isAuthenticated) {
      toast.success(
        newCompleted 
          ? `✅ Completed: ${topic.title}` 
          : `↩️ Unmarked: ${topic.title}`,
        { duration: 2000 }
      );
      return; // Exit early for unauthenticated users
    }

    // Add to updating set
    setUpdatingTopics(prev => new Set(prev).add(topicId));

    try {
      const update: MarrowProgressUpdate = {
        topicId,
        completed: newCompleted,
        subject: topic.category,
        chapter: topic.tags[0] || "General",
        topicTitle: topic.title,
        ...(topic.difficulty && { difficulty: topic.difficulty }),
        ...(topic.estimatedTime && topic.estimatedTime > 0 && { estimatedTime: topic.estimatedTime }),
      };

      await updateMarrowProgress(update);
      
      toast.success(
        newCompleted 
          ? `✅ Completed: ${topic.title}` 
          : `↩️ Unmarked: ${topic.title}`,
        { duration: 2000 }
      );
    } catch (err) {
      console.error('Failed to update progress:', err);
      
      // Revert optimistic update on error
      setProgress((prev) => ({
        ...prev,
        [topicId]: !newCompleted,
      }));
      
      // Revert localStorage (client-side only)
      const revertedProgress = { ...progress, [topicId]: !newCompleted };
      setLocalStorageItem("marrow-progress", JSON.stringify(revertedProgress));
      
      toast.error(
        err instanceof Error 
          ? `Failed to sync progress: ${err.message}` 
          : 'Failed to sync progress. Saved locally only.'
      );
    } finally {
      // Remove from updating set
      setUpdatingTopics(prev => {
        const newSet = new Set(prev);
        newSet.delete(topicId);
        return newSet;
      });
    }
  }, [progress, isAuthenticated]);

  const getSubjectProgress = useCallback((subject: SubjectData) => {
    const allTopics = Object.values(subject.chapters).flat();
    const completedTopics = allTopics.filter((topic) => progress[topic.id]);
    const totalMinutes = allTopics.reduce((sum, topic) => sum + topic.estimatedTime, 0);
    const completedMinutes = completedTopics.reduce((sum, topic) => sum + topic.estimatedTime, 0);
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10; // Round to 1 decimal place
    const completedHours = Math.round((completedMinutes / 60) * 10) / 10;
    
    return {
      completed: completedTopics.length,
      total: allTopics.length,
      percentage: calculateProgressPercentage(completedTopics.length, allTopics.length),
      totalHours,
      completedHours,
    };
  }, [progress]);

  const getChapterProgress = useCallback((topics: VideoTopic[]) => {
    const completedTopics = topics.filter((topic) => progress[topic.id]);
    return {
      completed: completedTopics.length,
      total: topics.length,
      percentage: calculateProgressPercentage(completedTopics.length, topics.length),
    };
  }, [progress]);

  const overallProgress = useMemo(() => {
    if (videoTopics.length === 0) {
      return { completed: 0, total: 0, percentage: 0, totalHours: 0, completedHours: 0 };
    }
    const completedTopics = videoTopics.filter((topic) => progress[topic.id]);
    const totalMinutes = videoTopics.reduce((sum, topic) => sum + topic.estimatedTime, 0);
    const completedMinutes = completedTopics.reduce((sum, topic) => sum + topic.estimatedTime, 0);
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10; // Round to 1 decimal place
    const completedHours = Math.round((completedMinutes / 60) * 10) / 10;
    
    return {
      completed: completedTopics.length,
      total: videoTopics.length,
      percentage: calculateProgressPercentage(completedTopics.length, videoTopics.length),
      totalHours,
      completedHours,
    };
  }, [videoTopics, progress]);

  if (!isClient || loading || isInitializing || videoTopics.length === 0) {
    return (
      <div className="container mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
          <div className="text-center space-y-3 sm:space-y-4">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mx-auto text-primary" />
            <p className="text-sm sm:text-base text-muted-foreground">Loading your video progress...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Marrow Progress</h1>
          </div>
          
          {error && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive flex-shrink-0" />
                <span className="text-xs sm:text-sm text-destructive">Database connection issues</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={loadProgress}
                disabled={loading}
                className="text-xs sm:text-sm h-8"
              >
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Retry
              </Button>
            </div>
          )}
        </div>
        
        {/* Overall Progress Card */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              <span>Overall Progress</span>
              {!isAuthenticated && (
                <Badge variant="outline" className="text-[10px] sm:text-xs">
                  Local Only
                </Badge>
              )}
              {isAuthenticated && (
                <Badge variant="default" className="text-[10px] sm:text-xs">
                  Synced
                </Badge>
              )}
              {error && (
                <Badge variant="destructive" className="text-[10px] sm:text-xs">
                  Offline Mode
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {overallProgress.completed} of {overallProgress.total} videos completed
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {overallProgress.completedHours}h / {overallProgress.totalHours}h total
                  </span>
                </div>
                <Badge variant={overallProgress.percentage === 100 ? "default" : "secondary"} className="text-xs sm:text-sm w-fit">
                  {overallProgress.percentage}%
                </Badge>
              </div>
              <Progress value={overallProgress.percentage} className="h-1.5 sm:h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subjects Section */}
      <div className="space-y-4 sm:space-y-6">
        {Object.entries(organizedData).map(([subjectName, subjectData]) => {
          const subjectProgress = getSubjectProgress(subjectData);
          
          return (
            <Card key={subjectName} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 pb-3 sm:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{subjectName}</span>
                  </CardTitle>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {subjectProgress.completed}/{subjectProgress.total}
                    </Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {subjectProgress.totalHours}h
                    </Badge>
                    <Badge variant={subjectProgress.percentage === 100 ? "default" : "secondary"} className="text-xs sm:text-sm">
                      {subjectProgress.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={subjectProgress.percentage} className="h-1.5 sm:h-2 mt-2" />
              </CardHeader>
              
              <CardContent className="p-0">
                <Accordion type="multiple" className="w-full">
                  {Object.entries(subjectData.chapters).map(([chapterName, topics]) => {
                    const chapterProgress = getChapterProgress(topics);
                    
                    return (
                      <AccordionItem key={chapterName} value={chapterName} className="border-0 border-b last:border-b-0">
                        <AccordionTrigger className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 hover:bg-muted/50">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mr-2 sm:mr-4 gap-2 sm:gap-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 min-w-0">
                              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-left truncate">{chapterName}</h3>
                              <Badge variant="outline" className="text-[10px] sm:text-xs w-fit">
                                {topics.length} videos
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                                {chapterProgress.completed}/{chapterProgress.total}
                              </span>
                              <div className="w-12 sm:w-16">
                                <Progress value={chapterProgress.percentage} className="h-1" />
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        
                        <AccordionContent className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4">
                          <div className="space-y-2 sm:space-y-3">
                            {topics.map((topic) => (
                              <TopicItem
                                key={topic.id}
                                topic={topic}
                                isCompleted={progress[topic.id] || false}
                                isUpdating={updatingTopics.has(topic.id)}
                                onToggle={toggleTopicCompletion}
                              />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
