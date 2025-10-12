// Mock data for mystery topics
// This provides sample mystery topics for exploration
// NOTE: This file is deprecated. Use @/lib/utils/topic-loader instead for better performance
// The topic-loader uses lazy loading to avoid including the large data file in the initial bundle

import { MysteryTopic } from './medicine'
import { mysteryTopics } from './medicine'

// Legacy utility functions - kept for backward compatibility
// For new code, use the async versions from @/lib/utils/topic-loader

/**
 * @deprecated Use getRandomTopic from @/lib/utils/topic-loader instead
 */
export function getRandomTopic(): MysteryTopic {
  if (mysteryTopics.length === 0) {
    throw new Error('No mystery topics available')
  }
  const randomIndex = Math.floor(Math.random() * mysteryTopics.length)
  return mysteryTopics[randomIndex]!
}

/**
 * @deprecated Use getTopicsByCategory from @/lib/utils/topic-loader instead
 */
export function getTopicsByCategory(category: MysteryTopic['category']): MysteryTopic[] {
  return mysteryTopics.filter(topic => topic.category === category)
}

export function getTopicsByDifficulty(difficulty: MysteryTopic['difficulty']): MysteryTopic[] {
  return mysteryTopics.filter(topic => topic.difficulty === difficulty)
}

export function searchTopics(query: string): MysteryTopic[] {
  const lowercaseQuery = query.toLowerCase()
  return mysteryTopics.filter(topic =>
    topic.title.toLowerCase().includes(lowercaseQuery) ||
    topic.description.toLowerCase().includes(lowercaseQuery) ||
    topic.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    topic.questions.some(q => q.toLowerCase().includes(lowercaseQuery))
  )
}

export default mysteryTopics