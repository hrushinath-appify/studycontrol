// Centralized mock data exports
// This file serves as the main entry point for all mock data modules

export * from './quotes'
export * from './mystery-topics'
export * from './diary-entries'
export * from './news-articles'
export * from './user-data'

// Re-export types for convenience
export type { Quote } from './quotes'
export type { MysteryTopic } from './mystery-topics'
export type { MockDiaryEntry } from './diary-entries'
export type { MockNewsArticle, MockResearchPaper } from './news-articles'
