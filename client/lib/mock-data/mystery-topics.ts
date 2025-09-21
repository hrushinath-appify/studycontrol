// Mock data for mystery topics
// This provides sample mystery topics for exploration

export interface MysteryTopic {
  id: string
  title: string
  description: string
  category: 'science' | 'history' | 'nature' | 'space' | 'technology' | 'psychology'
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number // minutes
  tags: string[]
  questions: string[]
  funFacts: string[]
  relatedTopics: string[]
}

export const mysteryTopics: MysteryTopic[] = [
  {
    id: 'mystery-1',
    title: 'The Mystery of Black Holes',
    description: 'Explore the enigmatic cosmic phenomena that challenge our understanding of space and time.',
    category: 'space',
    difficulty: 'hard',
    estimatedTime: 30,
    tags: ['physics', 'cosmology', 'relativity'],
    questions: [
      'What happens to matter when it crosses the event horizon?',
      'How do black holes evaporate according to Hawking radiation?',
      'What is the information paradox?'
    ],
    funFacts: [
      'The first image of a black hole was captured in 2019',
      'Time dilates infinitely at the event horizon from an outside observer\'s perspective',
      'Black holes can spin at nearly the speed of light'
    ],
    relatedTopics: ['General Relativity', 'Quantum Mechanics', 'Event Horizons']
  },
  {
    id: 'mystery-2',
    title: 'The Placebo Effect',
    description: 'Uncover how the mind can heal the body through belief and expectation.',
    category: 'psychology',
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['neuroscience', 'psychology', 'medicine'],
    questions: [
      'How does belief trigger real physiological changes?',
      'What role do neurotransmitters play in the placebo effect?',
      'Can the placebo effect work even when patients know it\'s a placebo?'
    ],
    funFacts: [
      'Placebo surgeries can sometimes be as effective as real ones',
      'The color and size of pills can affect their placebo strength',
      'Expensive placebos work better than cheap ones'
    ],
    relatedTopics: ['Neuroscience', 'Psychology', 'Medical Ethics']
  },
  {
    id: 'mystery-3',
    title: 'The Origin of Language',
    description: 'Investigate how humans developed the complex ability to communicate through language.',
    category: 'science',
    difficulty: 'medium',
    estimatedTime: 25,
    tags: ['linguistics', 'evolution', 'anthropology'],
    questions: [
      'What evolutionary pressures led to language development?',
      'How did grammar and syntax emerge?',
      'Are there universal principles in all languages?'
    ],
    funFacts: [
      'Babies can distinguish between all language sounds at birth',
      'There are over 7,000 languages spoken today',
      'Some languages have no words for specific numbers beyond "few" and "many"'
    ],
    relatedTopics: ['Evolution', 'Cognitive Science', 'Anthropology']
  },
  {
    id: 'mystery-4',
    title: 'Quantum Entanglement',
    description: 'Explore the spooky action at a distance that Einstein couldn\'t accept.',
    category: 'science',
    difficulty: 'hard',
    estimatedTime: 35,
    tags: ['quantum physics', 'entanglement', 'non-locality'],
    questions: [
      'How can particles be instantly connected across vast distances?',
      'What are the implications for our understanding of reality?',
      'How is quantum entanglement used in quantum computing?'
    ],
    funFacts: [
      'Entangled particles maintain their connection regardless of distance',
      'Quantum entanglement is being used to develop unhackable communication',
      'The phenomenon was proven real through Bell\'s theorem experiments'
    ],
    relatedTopics: ['Quantum Mechanics', 'Bell\'s Theorem', 'Quantum Computing']
  },
  {
    id: 'mystery-5',
    title: 'The Fermi Paradox',
    description: 'Why haven\'t we encountered alien life despite the vast number of stars and planets?',
    category: 'space',
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['extraterrestrial life', 'SETI', 'astrobiology'],
    questions: [
      'What is the Great Filter hypothesis?',
      'Could advanced civilizations be hiding from us?',
      'Are we alone in the universe?'
    ],
    funFacts: [
      'There are estimated to be 2 trillion galaxies in the observable universe',
      'The Drake equation attempts to estimate the number of alien civilizations',
      'Some scientists think we might be living in a simulation'
    ],
    relatedTopics: ['Astrobiology', 'SETI', 'Drake Equation']
  },
  {
    id: 'mystery-6',
    title: 'The Lost City of Atlantis',
    description: 'Examine the historical and mythological evidence for Plato\'s legendary civilization.',
    category: 'history',
    difficulty: 'easy',
    estimatedTime: 15,
    tags: ['ancient history', 'mythology', 'archaeology'],
    questions: [
      'Did Plato base Atlantis on a real civilization?',
      'What natural disasters could have inspired the story?',
      'Where have archaeologists searched for Atlantis?'
    ],
    funFacts: [
      'Plato is the only ancient source for the Atlantis story',
      'Some theories link Atlantis to the Minoan civilization on Crete',
      'The story might be an allegory about the ideal state'
    ],
    relatedTopics: ['Ancient Greece', 'Minoan Civilization', 'Archaeological Methods']
  },
  {
    id: 'mystery-7',
    title: 'How Birds Navigate',
    description: 'Discover the incredible navigation abilities that guide migrating birds across continents.',
    category: 'nature',
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['biology', 'migration', 'navigation'],
    questions: [
      'How do birds use magnetic fields for navigation?',
      'What role do celestial cues play in migration?',
      'How do young birds learn migration routes?'
    ],
    funFacts: [
      'Some birds can see magnetic fields through special proteins in their eyes',
      'Arctic terns migrate from Arctic to Antarctic annually',
      'Birds use infrasound (low-frequency sound) for long-distance communication'
    ],
    relatedTopics: ['Animal Behavior', 'Magnetoreception', 'Circadian Rhythms']
  },
  {
    id: 'mystery-8',
    title: 'The Hard Problem of Consciousness',
    description: 'Explore why subjective experience exists and how it emerges from brain activity.',
    category: 'psychology',
    difficulty: 'hard',
    estimatedTime: 40,
    tags: ['consciousness', 'neuroscience', 'philosophy'],
    questions: [
      'Why do we have subjective experiences?',
      'How does consciousness emerge from neural activity?',
      'What is the difference between consciousness and intelligence?'
    ],
    funFacts: [
      'We still don\'t have a complete theory of consciousness',
      'Some theories suggest consciousness is fundamental like mass or charge',
      'Anesthesia can temporarily eliminate consciousness without affecting basic brain functions'
    ],
    relatedTopics: ['Neuroscience', 'Philosophy of Mind', 'Integrated Information Theory']
  }
]

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