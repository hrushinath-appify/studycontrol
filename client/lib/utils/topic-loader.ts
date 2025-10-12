// Optimized topic loader with lazy loading support
import type { MysteryTopic } from '../mock-data/medicine'

let cachedTopics: MysteryTopic[] | null = null
let loadingPromise: Promise<MysteryTopic[]> | null = null

/**
 * Lazy load mystery topics with caching
 * This prevents the large data file from being included in the initial bundle
 */
export async function loadMysteryTopics(): Promise<MysteryTopic[]> {
  // Return cached data if available
  if (cachedTopics !== null) {
    return cachedTopics
  }

  // Return existing loading promise if already loading
  if (loadingPromise !== null) {
    return loadingPromise
  }

  // Start loading
  loadingPromise = import('../mock-data/medicine').then((module) => {
    cachedTopics = module.mysteryTopics
    loadingPromise = null
    return cachedTopics
  })

  return loadingPromise
}

/**
 * Get a random topic from the loaded topics
 */
export async function getRandomTopic(): Promise<MysteryTopic> {
  const topics = await loadMysteryTopics()
  
  if (topics.length === 0) {
    throw new Error('No mystery topics available')
  }
  
  const randomIndex = Math.floor(Math.random() * topics.length)
  return topics[randomIndex]!
}

/**
 * Get topics by category
 */
export async function getTopicsByCategory(category: string): Promise<MysteryTopic[]> {
  const topics = await loadMysteryTopics()
  return topics.filter(topic => topic.category === category)
}

/**
 * Get synchronous access to topics if already loaded
 * Returns empty array if not yet loaded
 */
export function getLoadedTopics(): MysteryTopic[] {
  return cachedTopics || []
}

/**
 * Check if topics are already loaded
 */
export function areTopicsLoaded(): boolean {
  return cachedTopics !== null
}

/**
 * Preload topics in the background
 */
export function preloadTopics(): void {
  if (cachedTopics === null && loadingPromise === null) {
    loadMysteryTopics().catch(console.error)
  }
}

