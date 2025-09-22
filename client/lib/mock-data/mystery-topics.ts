// Mock data for mystery topics
// This provides sample mystery topics for exploration
import { MysteryTopic } from './medicine'
import { mysteryTopics } from './medicine'

// Utility functions
export function getRandomTopic(): MysteryTopic {
  if (mysteryTopics.length === 0) {
    throw new Error('No mystery topics available')
  }
  const randomIndex = Math.floor(Math.random() * mysteryTopics.length)
  return mysteryTopics[randomIndex]!
}

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