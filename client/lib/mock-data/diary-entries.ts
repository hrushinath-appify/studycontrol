// Mock data for diary entries
// Used in: Diary page (initial data)

export interface MockDiaryEntry {
  id: string
  date: string
  title: string
  content: string
  preview: string
  createdAt: string // ISO string
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'terrible'
  tags?: string[]
  wordCount?: number
}

export const pastEntries: MockDiaryEntry[] = [
  {
    id: '1',
    date: 'July 26, 2024',
    title: 'Reflections on today\'s study session and personal growth - A detailed analysis',
    content: `Today was a remarkably productive day that I want to document in detail. I woke up early at 6:00 AM, feeling refreshed and energized after a good night's sleep. The morning routine went smoothly - I started with a 20-minute meditation session that helped center my mind for the day ahead.

My first study session began at 7:30 AM with advanced calculus. I worked through several challenging integration problems, particularly focusing on integration by parts and partial fractions. The concept that initially seemed daunting last week is now becoming clearer. I spent about 2 hours on this subject and managed to complete all the exercises in chapter 12.

Around 10:00 AM, I took a well-deserved break and had a healthy breakfast consisting of oatmeal with fresh berries and a cup of green tea. This fuel gave me the energy I needed for the next study session.

From 10:30 AM to 12:30 PM, I dove into organic chemistry. Today's focus was on reaction mechanisms, specifically nucleophilic substitution reactions. I created detailed diagrams showing the step-by-step process of SN1 and SN2 reactions, including the factors that influence which mechanism predominates. The visual approach really helped me understand the three-dimensional aspects of these reactions.

Lunch break was at 12:30 PM, followed by a 30-minute walk in the park. The fresh air and light exercise helped clear my mind and prepare for the afternoon session.

The afternoon was dedicated to physics - specifically quantum mechanics. I worked on understanding wave functions and the Schrödinger equation. This is perhaps the most challenging subject I'm tackling this semester, but I'm starting to appreciate the mathematical beauty behind the physics. I spent considerable time on the particle in a box problem and finally grasped how boundary conditions affect the wave function solutions.

Around 4:00 PM, I had a virtual study group session with three classmates. We discussed the quantum mechanics problems and helped each other with concepts we found difficult. Collaborative learning really enhances understanding - explaining concepts to others forces you to think more deeply about the material.

The evening was reserved for review and consolidation. I went through my notes from all three subjects, creating mind maps and summary sheets. This active review process helps transfer information from short-term to long-term memory.

I also spent some time planning tomorrow's study schedule, ensuring I maintain this productive momentum. Setting clear goals and time blocks has been crucial to my success.

Reflecting on today, I feel a deep sense of accomplishment. Not just because of the material covered, but because of the disciplined approach I maintained throughout the day. Each study session built upon the previous one, creating a compound effect of learning.

This experience reinforces my belief that consistent, focused effort yields remarkable results. Tomorrow, I plan to tackle differential equations, continue with organic chemistry synthesis problems, and delve deeper into quantum mechanical operators.

The key lessons from today:
1. Early morning study sessions are highly effective
2. Regular breaks enhance focus and retention
3. Visual learning aids (diagrams, mind maps) are invaluable
4. Collaborative study sessions provide new perspectives
5. End-of-day review consolidates learning

I'm grateful for this productive day and excited to continue this journey of learning and growth.`,
    preview: 'Today was a remarkably productive day that I want to document in detail. I woke up early at 6:00 AM, feeling refreshed and energized after a good night\'s sleep...',
    createdAt: '2024-07-26T18:30:00.000Z',
    mood: 'great',
    tags: ['productivity', 'study', 'reflection', 'growth'],
    wordCount: 587
  },
  {
    id: '2',
    date: 'July 25, 2024',
    title: 'Thoughts on a new concept learned in physics',
    content: `Learning about quantum mechanics today opened up a completely new way of thinking about the physical world. The concept of wave-particle duality is fascinating yet challenging to grasp intuitively.

During today's lecture, Professor Williams explained the double-slit experiment in detail. The idea that particles can behave as waves until observed is mind-bending. It challenges our classical understanding of reality and forces us to think in probabilistic terms rather than deterministic ones.

I spent the evening reading additional material on quantum superposition. The Schrödinger's cat thought experiment really helped me understand the concept better, even though it's still somewhat abstract. The cat being both alive and dead until observed parallels how quantum particles exist in multiple states simultaneously.

What struck me most was how this connects to the measurement problem in quantum mechanics. The act of observation seems to collapse the wave function, but the mechanism behind this collapse is still not fully understood by physicists.

I'm planning to discuss this with my study group tomorrow. Sometimes explaining concepts to others helps solidify understanding. I also want to work through more mathematical examples to build intuition.

This field of study is humbling - it reminds me how much we still don't know about the universe. Yet that's also what makes it exciting. Every new concept learned opens up more questions to explore.`,
    preview: 'Learning about quantum mechanics today opened up a completely new way of thinking about the physical world...',
    createdAt: '2024-07-25T20:15:00.000Z',
    mood: 'good',
    tags: ['physics', 'quantum mechanics', 'learning', 'concepts'],
    wordCount: 268
  },
  {
    id: '3',
    date: 'July 24, 2024',
    title: 'A summary of the day\'s events and feelings',
    content: `What an interesting day it has been. Started with some anxiety about the upcoming midterm exam, but as the day progressed, I felt more confident about my preparation.

The morning study session focused on reviewing past exam papers. I noticed patterns in the types of questions asked and realized I need to spend more time on thermodynamics problems. The evening was spent creating a comprehensive study schedule for the next two weeks.

Had lunch with Sarah and Mike - it's always refreshing to take breaks and connect with friends. We discussed our career goals and shared our concerns about the future. It's comforting to know that everyone feels uncertain sometimes.

Later in the evening, I called my parents. They were encouraging as always, reminding me that I've overcome challenges before and will do so again. Their support means everything to me.

Before bed, I practiced some mindfulness meditation. It helped calm my nerves and put things in perspective. Tomorrow is a new day with new opportunities to learn and grow.

Overall, despite the initial anxiety, it was a day of progress and connection. I'm grateful for the support system I have and the opportunity to pursue my education.`,
    preview: 'What an interesting day it has been. Started with some anxiety about the upcoming midterm exam...',
    createdAt: '2024-07-24T22:45:00.000Z',
    mood: 'okay',
    tags: ['daily life', 'anxiety', 'support', 'gratitude'],
    wordCount: 219
  },
  {
    id: '4',
    date: 'July 23, 2024',
    title: 'Notes on a challenging math problem and its solution',
    content: `Today I tackled a difficult calculus problem that had been bothering me for days. It involved finding the volume of a solid of revolution using the disk method, but with a twist - the function had a discontinuity that needed special handling.

The problem was: Find the volume of the solid formed by rotating the region bounded by f(x) = 1/(x-2) and the x-axis from x = 3 to x = 5 about the x-axis.

Initially, I tried to apply the standard disk method formula directly, but I kept getting incorrect results. After consulting with Professor Chen during office hours, I realized I needed to be more careful about the limits of integration and the behavior of the function near the asymptote.

The key insight was to split the integral and use proper limits. The solution involved:
1. Setting up the integral V = π∫[3 to 5] (1/(x-2))² dx
2. Recognizing this as a standard form that integrates to -1/(x-2)
3. Evaluating the definite integral carefully

The final answer was π/3 cubic units.

What I learned from this experience:
- Always check for discontinuities and asymptotes
- Don't rush through the setup - take time to understand the geometry
- Office hours are invaluable for clarifying difficult concepts
- Persistence pays off - the satisfaction of finally solving it was worth the struggle

This problem taught me more than just calculus - it reinforced the importance of careful analysis and seeking help when needed.`,
    preview: 'Today I tackled a difficult calculus problem that had been bothering me for days...',
    createdAt: '2024-07-23T19:20:00.000Z',
    mood: 'good',
    tags: ['mathematics', 'problem solving', 'calculus', 'learning'],
    wordCount: 284
  },
  {
    id: '5',
    date: 'July 22, 2024',
    title: 'Reflections on a successful presentation in class',
    content: `I presented my research today on "Applications of Machine Learning in Medical Diagnosis" and it went better than expected! All those hours of preparation really paid off.

The presentation covered three main areas:
1. Current applications of ML in radiology
2. Challenges in implementing AI systems in hospitals
3. Future prospects and ethical considerations

What went well:
- The audience was engaged throughout the 20-minute presentation
- I handled the Q&A session confidently, even the challenging question about bias in training data
- The visual aids were effective - especially the comparison charts showing diagnostic accuracy
- My timing was perfect - finished exactly at 20 minutes

Areas for improvement:
- Could have included more real-world case studies
- Should have practiced the transitions between sections more
- The conclusion could have been stronger with a clear call to action

Professor Martinez complimented the depth of research and the clarity of explanation. She suggested I consider submitting an extended version to the undergraduate research journal.

Several classmates approached me afterward with questions and comments. It's rewarding to see others interested in the topic and to realize that my presentation sparked meaningful discussions.

This experience boosted my confidence in public speaking and reinforced my interest in the intersection of technology and healthcare. I'm considering this field for my senior capstone project.

The key takeaway: thorough preparation and genuine passion for the topic make all the difference in presentations.`,
    preview: 'I presented my research today on "Applications of Machine Learning in Medical Diagnosis" and it went better than expected!...',
    createdAt: '2024-07-22T16:30:00.000Z',
    mood: 'great',
    tags: ['presentation', 'success', 'research', 'confidence'],
    wordCount: 272
  }
]

// Utility functions for working with diary entries
export const getEntriesByMood = (mood: MockDiaryEntry['mood']): MockDiaryEntry[] => {
  return pastEntries.filter(entry => entry.mood === mood)
}

export const getEntriesByTag = (tag: string): MockDiaryEntry[] => {
  return pastEntries.filter(entry => entry.tags?.includes(tag))
}

export const searchEntries = (query: string): MockDiaryEntry[] => {
  const lowercaseQuery = query.toLowerCase()
  return pastEntries.filter(entry => 
    entry.title.toLowerCase().includes(lowercaseQuery) ||
    entry.content.toLowerCase().includes(lowercaseQuery) ||
    entry.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export const getRecentEntries = (days: number = 7): MockDiaryEntry[] => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  return pastEntries.filter(entry => 
    new Date(entry.createdAt) >= cutoffDate
  )
}

export const getEntryStats = () => {
  const totalEntries = pastEntries.length
  const totalWords = pastEntries.reduce((sum, entry) => sum + (entry.wordCount || 0), 0)
  const averageWordsPerEntry = totalWords / totalEntries
  
  const moodCounts = pastEntries.reduce((acc, entry) => {
    if (entry.mood) {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return {
    totalEntries,
    totalWords,
    averageWordsPerEntry: Math.round(averageWordsPerEntry),
    moodCounts
  }
}
