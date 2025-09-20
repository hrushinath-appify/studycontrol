// Mock data for mystery topics
// Used in: Mystery page

export interface MysteryTopic {
  id: string
  title: string
  subtopics: string[]
  questions: string[]
  explanation: string
  category?: 'history' | 'science' | 'psychology' | 'linguistics' | 'physics'
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimatedReadTime?: number // in minutes
}

export const sampleTopics: MysteryTopic[] = [
  {
    id: '1',
    title: "The History of Ancient Egypt",
    subtopics: ["Pharaohs", "Pyramids", "Hieroglyphics", "Daily Life"],
    questions: [
      "What were the major achievements of the pharaohs?",
      "How did the pyramids evolve over time?",
      "What can hieroglyphics tell us about ancient Egyptian society?",
      "What was daily life like for ordinary people in ancient Egypt?"
    ],
    explanation: "Ancient Egypt was a civilization in North Africa, known for its pyramids, pharaohs, and rich culture. It lasted for over 3,000 years, from around 3100 BC to 30 BC, and was famous for its advancements in mathematics, medicine, and engineering.",
    category: 'history',
    difficulty: 'intermediate',
    estimatedReadTime: 15
  },
  {
    id: '2',
    title: "The Mysteries of Deep Ocean Life",
    subtopics: ["Bioluminescence", "Pressure Adaptation", "Food Chains", "Undiscovered Species"],
    questions: [
      "How do deep-sea creatures produce their own light?",
      "What adaptations help organisms survive extreme pressure?",
      "How do deep ocean food webs function without sunlight?",
      "What new species might we discover in unexplored depths?"
    ],
    explanation: "The deep ocean remains one of Earth's least explored frontiers. Below 200 meters, where sunlight cannot penetrate, unique ecosystems thrive in perpetual darkness, featuring bizarre creatures adapted to extreme pressure and cold temperatures.",
    category: 'science',
    difficulty: 'intermediate',
    estimatedReadTime: 12
  },
  {
    id: '3',
    title: "The Science of Dreams and Sleep",
    subtopics: ["REM Sleep", "Dream Psychology", "Sleep Disorders", "Brain Activity"],
    questions: [
      "What happens in our brains during REM sleep?",
      "Why do we dream and what do dreams mean?",
      "How do sleep disorders affect our daily lives?",
      "What brain waves are active during different sleep stages?"
    ],
    explanation: "Sleep is a complex biological process essential for physical and mental health. During sleep, our brains consolidate memories, repair cellular damage, and process emotions through various sleep stages, including the mysterious REM phase where most vivid dreams occur.",
    category: 'psychology',
    difficulty: 'intermediate',
    estimatedReadTime: 18
  },
  {
    id: '4',
    title: "The Evolution of Human Language",
    subtopics: ["Proto-Languages", "Writing Systems", "Linguistic Diversity", "Communication Theory"],
    questions: [
      "How did the first human languages develop?",
      "What led to the creation of different writing systems?",
      "Why are there so many different languages worldwide?",
      "How do children naturally acquire language skills?"
    ],
    explanation: "Human language is one of our species' most remarkable achievements, allowing complex communication, abstract thinking, and cultural transmission. The evolution of language involved biological, cognitive, and social factors that shaped how we express ideas and connect with others.",
    category: 'linguistics',
    difficulty: 'advanced',
    estimatedReadTime: 20
  },
  {
    id: '5',
    title: "The Physics of Time Travel",
    subtopics: ["Relativity Theory", "Wormholes", "Paradoxes", "Quantum Mechanics"],
    questions: [
      "What does Einstein's theory say about time travel?",
      "Could wormholes actually allow travel through time?",
      "How would time travel paradoxes be resolved?",
      "What role does quantum mechanics play in time travel theories?"
    ],
    explanation: "Time travel has fascinated scientists and science fiction writers alike. While Einstein's theory of relativity suggests that time dilation is possible, the practical challenges and theoretical paradoxes of time travel remain some of physics' most intriguing unsolved mysteries.",
    category: 'physics',
    difficulty: 'advanced',
    estimatedReadTime: 25
  },
  {
    id: '6',
    title: "The Secrets of Human Memory",
    subtopics: ["Memory Formation", "Forgetting", "False Memories", "Memory Enhancement"],
    questions: [
      "How are memories formed and stored in the brain?",
      "Why do we forget things and is forgetting beneficial?",
      "How can false memories feel so real?",
      "What techniques can improve memory retention?"
    ],
    explanation: "Human memory is a complex system that allows us to encode, store, and retrieve information. Understanding how memory works helps us appreciate both its remarkable capabilities and its surprising limitations, including the creation of false memories.",
    category: 'psychology',
    difficulty: 'intermediate',
    estimatedReadTime: 16
  },
  {
    id: '7',
    title: "The Mystery of Dark Matter",
    subtopics: ["Cosmic Observations", "Particle Physics", "Detection Methods", "Alternative Theories"],
    questions: [
      "What evidence suggests dark matter exists?",
      "What could dark matter particles be made of?",
      "How are scientists trying to detect dark matter?",
      "Are there alternative explanations for dark matter observations?"
    ],
    explanation: "Dark matter represents one of the biggest mysteries in modern physics. Although it makes up about 85% of all matter in the universe, it doesn't interact with light, making it invisible to direct observation. Its existence is inferred from gravitational effects on visible matter.",
    category: 'physics',
    difficulty: 'advanced',
    estimatedReadTime: 22
  },
  {
    id: '8',
    title: "The Origins of Human Consciousness",
    subtopics: ["Neural Correlates", "Self-Awareness", "Animal Consciousness", "Philosophical Implications"],
    questions: [
      "What brain processes give rise to consciousness?",
      "How did self-awareness evolve in humans?",
      "Do animals experience consciousness like humans?",
      "What are the philosophical implications of consciousness studies?"
    ],
    explanation: "Consciousness - our subjective experience of being aware and having thoughts - remains one of the greatest puzzles in science and philosophy. Despite advances in neuroscience, the 'hard problem' of how physical brain processes create subjective experience continues to challenge researchers.",
    category: 'psychology',
    difficulty: 'advanced',
    estimatedReadTime: 24
  }
]

// Utility functions for working with mystery topics
export const getRandomTopic = (): MysteryTopic => {
  const randomIndex = Math.floor(Math.random() * sampleTopics.length)
  return sampleTopics[randomIndex]!
}

export const getTopicsByCategory = (category: MysteryTopic['category']): MysteryTopic[] => {
  return sampleTopics.filter(topic => topic.category === category)
}

export const getTopicsByDifficulty = (difficulty: MysteryTopic['difficulty']): MysteryTopic[] => {
  return sampleTopics.filter(topic => topic.difficulty === difficulty)
}

export const searchTopics = (query: string): MysteryTopic[] => {
  const lowercaseQuery = query.toLowerCase()
  return sampleTopics.filter(topic => 
    topic.title.toLowerCase().includes(lowercaseQuery) ||
    topic.explanation.toLowerCase().includes(lowercaseQuery) ||
    topic.subtopics.some(subtopic => subtopic.toLowerCase().includes(lowercaseQuery))
  )
}

export const getTopicsByReadTime = (maxMinutes: number): MysteryTopic[] => {
  return sampleTopics.filter(topic => 
    !topic.estimatedReadTime || topic.estimatedReadTime <= maxMinutes
  )
}
