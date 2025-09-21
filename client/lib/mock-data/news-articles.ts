// Mock data for news articles
// This provides sample data for development and testing

export interface MockNewsArticle {
  id: string
  title: string
  description: string
  content: string
  author?: string
  publishedAt: string
  source: {
    id: string
    name: string
  }
  category: 'general' | 'medical' | 'education' | 'research'
  tags?: string[]
  imageUrl?: string
  url?: string
  relevanceScore?: number
  readTime?: number
}

export interface MockResearchPaper {
  id: string
  title: string
  abstract: string
  authors: string[]
  publishedAt: string
  journal: string
  doi?: string
  tags?: string[]
  category: 'medical' | 'education' | 'research'
  citationCount?: number
  url?: string
}

export const mockNewsData: MockNewsArticle[] = [
  {
    id: '1',
    title: 'Breakthrough in Study Techniques Shows 40% Better Retention',
    description: 'New research reveals that spaced repetition combined with active recall significantly improves long-term retention rates among students.',
    content: 'A comprehensive study conducted across multiple universities has shown that students who use spaced repetition techniques combined with active recall show 40% better retention rates compared to traditional studying methods. The research, published in the Journal of Educational Psychology, followed 1,200 students over six months...',
    author: 'Dr. Sarah Johnson',
    publishedAt: '2025-09-20T10:30:00Z',
    source: {
      id: 'edu-today',
      name: 'Education Today'
    },
    category: 'education',
    tags: ['study techniques', 'spaced repetition', 'active recall', 'retention'],
    imageUrl: '/images/study-techniques.jpg',
    url: 'https://education-today.com/spaced-repetition-study',
    relevanceScore: 95,
    readTime: 8
  },
  {
    id: '2',
    title: 'Digital Note-Taking vs. Handwritten Notes: Which is Better?',
    description: 'A comparative study examines the effectiveness of digital note-taking tools versus traditional handwritten notes for learning outcomes.',
    content: 'The debate between digital and handwritten note-taking has been ongoing in academic circles. This new study provides concrete evidence about which method leads to better learning outcomes. Researchers found that while digital notes allow for better organization and searching, handwritten notes showed superior retention for conceptual understanding...',
    author: 'Prof. Michael Chen',
    publishedAt: '2025-09-19T14:15:00Z',
    source: {
      id: 'learning-lab',
      name: 'Learning Lab Research'
    },
    category: 'education',
    tags: ['note-taking', 'digital learning', 'handwriting', 'cognition'],
    imageUrl: '/images/note-taking.jpg',
    url: 'https://learning-lab.org/digital-vs-handwritten',
    relevanceScore: 88,
    readTime: 6
  },
  {
    id: '3',
    title: 'The Science of Sleep and Academic Performance',
    description: 'New research highlights the critical relationship between sleep quality and academic performance in college students.',
    content: 'Sleep deprivation among college students has reached epidemic proportions, with serious consequences for academic performance. This groundbreaking study shows that students who maintain consistent sleep schedules and get 7-9 hours of sleep per night show 25% better academic performance...',
    author: 'Dr. Emily Rodriguez',
    publishedAt: '2025-09-18T08:45:00Z',
    source: {
      id: 'sleep-research',
      name: 'Sleep Research Institute'
    },
    category: 'medical',
    tags: ['sleep', 'academic performance', 'health', 'cognitive function'],
    imageUrl: '/images/sleep-study.jpg',
    url: 'https://sleep-research.org/academic-performance',
    relevanceScore: 92,
    readTime: 10
  },
  {
    id: '4',
    title: 'Mindfulness Meditation Reduces Test Anxiety by 35%',
    description: 'A randomized controlled trial demonstrates significant reduction in test anxiety through mindfulness meditation practices.',
    content: 'Test anxiety affects millions of students worldwide, often leading to underperformance despite adequate preparation. This study shows that just 10 minutes of daily mindfulness meditation for 4 weeks can reduce test anxiety by 35% and improve test performance by 15%...',
    author: 'Dr. Amanda Thompson',
    publishedAt: '2025-09-17T16:20:00Z',
    source: {
      id: 'mindful-edu',
      name: 'Mindful Education'
    },
    category: 'medical',
    tags: ['mindfulness', 'meditation', 'test anxiety', 'mental health'],
    imageUrl: '/images/meditation.jpg',
    url: 'https://mindful-education.com/test-anxiety-study',
    relevanceScore: 89,
    readTime: 7
  },
  {
    id: '5',
    title: 'AI-Powered Study Assistants: The Future of Personalized Learning',
    description: 'Exploring how artificial intelligence is revolutionizing personalized learning experiences for students.',
    content: 'Artificial intelligence is transforming education through personalized study assistants that adapt to individual learning styles and pace. These AI systems can identify knowledge gaps, suggest optimal study schedules, and provide targeted practice exercises...',
    author: 'Dr. Robert Kim',
    publishedAt: '2025-09-16T12:10:00Z',
    source: {
      id: 'tech-edu',
      name: 'Technology in Education'
    },
    category: 'research',
    tags: ['AI', 'personalized learning', 'technology', 'education'],
    imageUrl: '/images/ai-learning.jpg',
    url: 'https://tech-education.org/ai-study-assistants',
    relevanceScore: 87,
    readTime: 9
  },
  {
    id: '6',
    title: 'The Pomodoro Technique: Maximizing Focus in the Digital Age',
    description: 'Research validates the effectiveness of the Pomodoro Technique for maintaining focus and productivity in our distraction-filled world.',
    content: 'With endless digital distractions competing for our attention, maintaining focus has become increasingly challenging. The Pomodoro Technique, developed by Francesco Cirillo, offers a simple yet effective solution. Recent studies show that this time management method can increase productivity by up to 45%...',
    author: 'Dr. Lisa Martinez',
    publishedAt: '2025-09-15T09:30:00Z',
    source: {
      id: 'productivity-plus',
      name: 'Productivity Plus'
    },
    category: 'general',
    tags: ['pomodoro technique', 'focus', 'productivity', 'time management'],
    imageUrl: '/images/pomodoro.jpg',
    url: 'https://productivity-plus.com/pomodoro-research',
    relevanceScore: 85,
    readTime: 5
  },
  {
    id: '7',
    title: 'Nutrition and Brain Health: Foods That Boost Cognitive Performance',
    description: 'Discover which foods can enhance cognitive function and support optimal brain health for better academic performance.',
    content: 'The connection between nutrition and cognitive performance is stronger than many realize. Research shows that certain foods can significantly impact memory, focus, and overall brain function. Omega-3 fatty acids, antioxidants, and complex carbohydrates play crucial roles in maintaining optimal cognitive performance...',
    author: 'Dr. Jennifer Walsh',
    publishedAt: '2025-09-14T11:45:00Z',
    source: {
      id: 'brain-nutrition',
      name: 'Brain Nutrition Research'
    },
    category: 'medical',
    tags: ['nutrition', 'brain health', 'cognitive performance', 'diet'],
    imageUrl: '/images/brain-food.jpg',
    url: 'https://brain-nutrition.org/cognitive-foods',
    relevanceScore: 84,
    readTime: 8
  },
  {
    id: '8',
    title: 'Study Groups vs. Solo Study: Finding the Right Balance',
    description: 'New research examines when collaborative learning is most effective and when individual study yields better results.',
    content: 'The debate between group study and individual study continues in educational research. This comprehensive analysis reveals that the effectiveness depends largely on the type of material being studied and individual learning preferences. For complex problem-solving, group study shows significant advantages...',
    author: 'Prof. David Lee',
    publishedAt: '2025-09-13T15:20:00Z',
    source: {
      id: 'collaborative-learning',
      name: 'Collaborative Learning Institute'
    },
    category: 'education',
    tags: ['study groups', 'collaborative learning', 'solo study', 'learning styles'],
    imageUrl: '/images/study-group.jpg',
    url: 'https://collaborative-learning.edu/group-vs-solo',
    relevanceScore: 82,
    readTime: 7
  }
]

export const mockResearchPapers: MockResearchPaper[] = [
  {
    id: 'rp1',
    title: 'Cognitive Load Theory and Its Applications in Digital Learning Environments',
    abstract: 'This paper examines how cognitive load theory can be applied to optimize digital learning environments. We present findings from a controlled study of 500 students using different interface designs.',
    authors: ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Robert Kim'],
    publishedAt: '2025-09-01T00:00:00Z',
    journal: 'Journal of Educational Technology',
    doi: '10.1000/182',
    tags: ['cognitive load', 'digital learning', 'interface design'],
    category: 'education',
    citationCount: 42,
    url: 'https://journals.edu/cognitive-load-digital'
  },
  {
    id: 'rp2',
    title: 'The Neurological Basis of Spaced Repetition Learning',
    abstract: 'Using fMRI imaging, we investigate the neural mechanisms underlying spaced repetition learning and its superior effectiveness compared to massed practice.',
    authors: ['Dr. Emily Rodriguez', 'Dr. Amanda Thompson'],
    publishedAt: '2025-08-15T00:00:00Z',
    journal: 'Neuroscience of Learning',
    doi: '10.1000/183',
    tags: ['spaced repetition', 'neuroscience', 'fMRI', 'memory'],
    category: 'research',
    citationCount: 67,
    url: 'https://journals.neuro/spaced-repetition-brain'
  }
]

export default mockNewsData