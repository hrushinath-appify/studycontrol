// Videos loader with lazy loading support
import type { VideosData } from '../mock-data/videos'

// Interface to match MysteryTopic structure for compatibility with existing components
export interface VideoTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: number; // minutes
  tags: string[];
  questions: string[];
  funFacts: string[];
  relatedTopics: string[];
}

let cachedVideoTopics: VideoTopic[] | null = null
let loadingPromise: Promise<VideoTopic[]> | null = null

/**
 * Convert videos data to topic format
 */
function convertVideosToTopics(videosData: VideosData[]): VideoTopic[] {
  const topics: VideoTopic[] = []
  
  videosData.forEach((subject) => {
    subject.topics.forEach((topic) => {
      topic.subtopics.forEach((subtopic, index) => {
        // Parse video length to get estimated time in minutes
        const timeMatch = subtopic.video_length.match(/(\d+)\s*Min/)
        const estimatedTime = timeMatch && timeMatch[1] ? parseInt(timeMatch[1], 10) : 0
        
        // Create a unique ID based on subject, topic, and subtopic
        const id = `${subject.subject.toLowerCase().replace(/\s+/g, '-')}-${topic.topic.toLowerCase().replace(/\s+/g, '-')}-${index}`
        
        const videoTopic: VideoTopic = {
          id,
          title: subtopic.title,
          description: `Learn about ${subtopic.title} in ${subject.subject}. This ${subtopic.video_length} video covers essential concepts in ${topic.topic}.`,
          category: subject.subject,
          difficulty: "", // No difficulty specified in videos data
          estimatedTime,
          tags: [topic.topic],
          questions: [
            `What are the key concepts covered in ${subtopic.title}?`,
            `How does ${subtopic.title} relate to ${topic.topic}?`,
            `What clinical applications are discussed in this video?`
          ],
          funFacts: [],
          relatedTopics: topic.subtopics
            .filter((_, i) => i !== index) // Exclude current subtopic
            .slice(0, 3) // Limit to 3 related topics
            .map(s => s.title)
        }
        
        topics.push(videoTopic)
      })
    })
  })
  
  return topics
}

/**
 * Lazy load video topics with caching
 * This prevents the large data file from being included in the initial bundle
 */
export async function loadVideoTopics(): Promise<VideoTopic[]> {
  // Return cached data if available
  if (cachedVideoTopics !== null) {
    return cachedVideoTopics
  }

  // Return existing loading promise if already loading
  if (loadingPromise !== null) {
    return loadingPromise
  }

  // Start loading
  loadingPromise = import('../mock-data/videos').then((module) => {
    cachedVideoTopics = convertVideosToTopics(module.VideosData)
    loadingPromise = null
    return cachedVideoTopics
  })

  return loadingPromise
}

/**
 * Get a random topic from the loaded topics
 */
export async function getRandomVideoTopic(): Promise<VideoTopic> {
  const topics = await loadVideoTopics()
  
  if (topics.length === 0) {
    throw new Error('No video topics available')
  }
  
  const randomIndex = Math.floor(Math.random() * topics.length)
  return topics[randomIndex]!
}

/**
 * Get topics by category (subject)
 */
export async function getVideoTopicsByCategory(category: string): Promise<VideoTopic[]> {
  const topics = await loadVideoTopics()
  return topics.filter(topic => topic.category === category)
}

/**
 * Get synchronous access to topics if already loaded
 * Returns empty array if not yet loaded
 */
export function getLoadedVideoTopics(): VideoTopic[] {
  return cachedVideoTopics || []
}

/**
 * Check if topics are already loaded
 */
export function areVideoTopicsLoaded(): boolean {
  return cachedVideoTopics !== null
}

/**
 * Preload topics in the background
 */
export function preloadVideoTopics(): void {
  if (cachedVideoTopics === null && loadingPromise === null) {
    loadVideoTopics().catch(console.error)
  }
}

/**
 * Get all unique subjects/categories
 */
export async function getVideoSubjects(): Promise<string[]> {
  const topics = await loadVideoTopics()
  const subjects = [...new Set(topics.map(topic => topic.category))]
  return subjects.sort()
}

/**
 * Get all unique topics within a subject
 */
export async function getVideoTopicsBySubject(subject: string): Promise<{ [topicName: string]: VideoTopic[] }> {
  const topics = await loadVideoTopics()
  const subjectTopics = topics.filter(topic => topic.category === subject)
  
  const grouped: { [topicName: string]: VideoTopic[] } = {}
  subjectTopics.forEach(topic => {
    const topicName = topic.tags[0] || "General"
    if (!grouped[topicName]) {
      grouped[topicName] = []
    }
    grouped[topicName].push(topic)
  })
  
  return grouped
}