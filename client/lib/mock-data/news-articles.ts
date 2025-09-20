// Mock data for news articles and research papers
// Used in: News page

export interface MockNewsArticle {
  id: string
  title: string
  description: string
  url: string
  imageUrl?: string
  publishedAt: string // ISO string
  source: {
    name: string
    url?: string
  }
  author?: string
  category: 'general' | 'medical' | 'education' | 'research'
  relevanceScore?: number
  tags?: string[]
  readTime?: number // estimated read time in minutes
}

export interface MockResearchPaper {
  id: string
  title: string
  abstract: string
  authors: string[]
  publishedAt: string // ISO string
  journal?: string
  doi?: string
  url: string
  keywords: string[]
  citationCount?: number
  openAccess?: boolean
  category: 'medical education' | 'clinical research' | 'technology' | 'methodology'
}

export const mockNewsData: MockNewsArticle[] = [
  {
    id: '1',
    title: 'NMC Announces New Guidelines for MBBS Curriculum 2024',
    description: 'The National Medical Commission has released updated guidelines for MBBS curriculum focusing on practical training and digital health integration.',
    url: 'https://example.com/nmc-guidelines',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
    publishedAt: '2024-01-15T10:00:00.000Z',
    source: { 
      name: 'Medical Education Today',
      url: 'https://medicaleducationtoday.com'
    },
    author: 'Dr. Priya Sharma',
    category: 'education',
    relevanceScore: 95,
    tags: ['NMC', 'MBBS', 'curriculum', 'guidelines', 'medical education'],
    readTime: 8
  },
  {
    id: '2',
    title: 'AIIMS Delhi Introduces AI-Powered Medical Training Modules',
    description: 'All India Institute of Medical Sciences Delhi has launched innovative AI-powered training modules for MBBS students to enhance clinical decision-making skills.',
    url: 'https://example.com/aiims-ai-training',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
    publishedAt: '2024-01-12T14:30:00.000Z',
    source: { 
      name: 'Healthcare Innovation Weekly',
      url: 'https://healthcareinnovation.com'
    },
    author: 'Rajesh Kumar',
    category: 'medical',
    relevanceScore: 88,
    tags: ['AIIMS', 'AI', 'medical training', 'technology', 'clinical skills'],
    readTime: 6
  },
  {
    id: '3',
    title: 'Medical Colleges Across India Report 15% Increase in MBBS Applications',
    description: 'Latest data shows a significant surge in MBBS applications nationwide, reflecting growing interest in medical careers post-pandemic.',
    url: 'https://example.com/mbbs-applications-surge',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=200&fit=crop',
    publishedAt: '2024-01-10T09:15:00.000Z',
    source: { 
      name: 'Education Times',
      url: 'https://educationtimes.com'
    },
    author: 'Meera Patel',
    category: 'education',
    relevanceScore: 82,
    tags: ['MBBS applications', 'medical colleges', 'admissions', 'statistics'],
    readTime: 5
  },
  {
    id: '4',
    title: 'Revolutionary Study on Medical Student Mental Health Published',
    description: 'New research reveals critical insights into stress management and wellness programs needed for MBBS students during clinical rotations.',
    url: 'https://example.com/medical-student-wellness',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
    publishedAt: '2024-01-08T16:45:00.000Z',
    source: { 
      name: 'Journal of Medical Education',
      url: 'https://jme.com'
    },
    author: 'Dr. Ankit Verma',
    category: 'research',
    relevanceScore: 78,
    tags: ['mental health', 'medical students', 'wellness', 'stress management'],
    readTime: 7
  },
  {
    id: '5',
    title: 'Digital Health Integration in MBBS: A Comprehensive Guide',
    description: 'Medical educators discuss the importance of integrating digital health technologies into MBBS curriculum to prepare future doctors.',
    url: 'https://example.com/digital-health-mbbs',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop',
    publishedAt: '2024-01-05T11:20:00.000Z',
    source: { 
      name: 'Digital Medicine Today',
      url: 'https://digitalmedicine.com'
    },
    author: 'Dr. Sarah Johnson',
    category: 'medical',
    relevanceScore: 85,
    tags: ['digital health', 'MBBS', 'curriculum', 'technology', 'medical education'],
    readTime: 9
  },
  {
    id: '6',
    title: 'New NEET PG Pattern Changes Announced for 2024',
    description: 'Medical Council announces significant changes to NEET PG examination pattern, including new question formats and scoring methodology.',
    url: 'https://example.com/neet-pg-changes',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop',
    publishedAt: '2024-01-03T13:00:00.000Z',
    source: { 
      name: 'Medical Entrance News',
      url: 'https://medicalentrance.com'
    },
    author: 'Dr. Kavitha Reddy',
    category: 'education',
    relevanceScore: 92,
    tags: ['NEET PG', 'examination', 'pattern changes', 'medical entrance'],
    readTime: 6
  },
  {
    id: '7',
    title: 'Telemedicine Training Now Mandatory for Medical Students',
    description: 'Medical universities across India are making telemedicine training a mandatory part of MBBS curriculum to address healthcare accessibility.',
    url: 'https://example.com/telemedicine-training',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=200&fit=crop',
    publishedAt: '2024-01-01T08:30:00.000Z',
    source: { 
      name: 'Healthcare Policy Today',
      url: 'https://healthcarepolicy.com'
    },
    author: 'Dr. Ramesh Singh',
    category: 'medical',
    relevanceScore: 79,
    tags: ['telemedicine', 'mandatory training', 'healthcare accessibility', 'MBBS'],
    readTime: 7
  }
]

export const mockResearchData: MockResearchPaper[] = [
  {
    id: 'r1',
    title: 'Effectiveness of Problem-Based Learning in MBBS Curriculum: A Systematic Review',
    abstract: 'This systematic review examines the effectiveness of problem-based learning approaches in medical education, specifically focusing on MBBS programs across various institutions. The study analyzes data from 45 medical schools and over 12,000 students to evaluate learning outcomes, student satisfaction, and clinical competency development.',
    authors: ['Dr. Rajesh Gupta', 'Dr. Priya Singh', 'Dr. Amit Sharma'],
    publishedAt: '2024-01-14T00:00:00.000Z',
    journal: 'Medical Education Research',
    doi: '10.1000/medical.education.2024.001',
    url: 'https://example.com/research/pbl-effectiveness',
    keywords: ['medical education', 'problem-based learning', 'MBBS', 'curriculum', 'systematic review'],
    citationCount: 23,
    openAccess: true,
    category: 'medical education'
  },
  {
    id: 'r2',
    title: 'Impact of Simulation Training on Clinical Skills Development in Medical Students',
    abstract: 'A comprehensive study analyzing how simulation-based training enhances clinical skills acquisition among MBBS students during their clinical rotations. This multi-center study involved 8 medical colleges and tracked 2,400 students over 18 months to measure skill improvement and confidence levels.',
    authors: ['Dr. Neha Patel', 'Dr. Vikram Rao'],
    publishedAt: '2024-01-11T00:00:00.000Z',
    journal: 'Clinical Skills Development',
    doi: '10.1000/clinical.skills.2024.002',
    url: 'https://example.com/research/simulation-training',
    keywords: ['simulation training', 'clinical skills', 'medical students', 'education', 'competency'],
    citationCount: 18,
    openAccess: false,
    category: 'medical education'
  },
  {
    id: 'r3',
    title: 'Mental Health Interventions for Medical Students: A Randomized Controlled Trial',
    abstract: 'This randomized controlled trial evaluates the effectiveness of targeted mental health interventions for medical students experiencing academic stress and burnout. The study included 1,200 MBBS students from 6 institutions and tested various intervention strategies over 12 months.',
    authors: ['Dr. Anjali Mehta', 'Dr. Suresh Kumar', 'Dr. Lisa Thompson'],
    publishedAt: '2024-01-08T00:00:00.000Z',
    journal: 'Medical Student Wellness',
    doi: '10.1000/student.wellness.2024.003',
    url: 'https://example.com/research/mental-health-interventions',
    keywords: ['mental health', 'medical students', 'interventions', 'stress management', 'burnout'],
    citationCount: 31,
    openAccess: true,
    category: 'clinical research'
  },
  {
    id: 'r4',
    title: 'Digital Assessment Tools in Medical Education: Validity and Reliability Study',
    abstract: 'This study examines the validity and reliability of digital assessment tools used in medical education, comparing traditional paper-based exams with computer-based testing systems. Data from 15 medical schools and over 5,000 assessments were analyzed.',
    authors: ['Dr. Kiran Joshi', 'Dr. Manish Agarwal'],
    publishedAt: '2024-01-05T00:00:00.000Z',
    journal: 'Educational Technology in Medicine',
    doi: '10.1000/edtech.medicine.2024.004',
    url: 'https://example.com/research/digital-assessment-tools',
    keywords: ['digital assessment', 'medical education', 'validity', 'reliability', 'computer-based testing'],
    citationCount: 15,
    openAccess: false,
    category: 'technology'
  },
  {
    id: 'r5',
    title: 'Peer Learning Networks in Medical Education: A Social Network Analysis',
    abstract: 'This study uses social network analysis to understand how peer learning networks form and evolve among medical students. The research tracked communication patterns and study group formations among 800 MBBS students over two academic years.',
    authors: ['Dr. Ravi Shankar', 'Dr. Deepika Malhotra', 'Dr. James Wilson'],
    publishedAt: '2024-01-02T00:00:00.000Z',
    journal: 'Social Networks in Education',
    doi: '10.1000/social.networks.2024.005',
    url: 'https://example.com/research/peer-learning-networks',
    keywords: ['peer learning', 'social networks', 'medical students', 'collaborative learning', 'network analysis'],
    citationCount: 9,
    openAccess: true,
    category: 'methodology'
  }
]

// Utility functions for working with news and research data
export const getArticlesByCategory = (category: MockNewsArticle['category']): MockNewsArticle[] => {
  return mockNewsData.filter(article => article.category === category)
}

export const getResearchByCategory = (category: MockResearchPaper['category']): MockResearchPaper[] => {
  return mockResearchData.filter(paper => paper.category === category)
}

export const searchArticles = (query: string): MockNewsArticle[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockNewsData.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.description.toLowerCase().includes(lowercaseQuery) ||
    article.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    article.author?.toLowerCase().includes(lowercaseQuery)
  )
}

export const searchResearch = (query: string): MockResearchPaper[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockResearchData.filter(paper => 
    paper.title.toLowerCase().includes(lowercaseQuery) ||
    paper.abstract.toLowerCase().includes(lowercaseQuery) ||
    paper.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    paper.authors.some(author => author.toLowerCase().includes(lowercaseQuery))
  )
}

export const getTopArticles = (limit: number = 5): MockNewsArticle[] => {
  return mockNewsData
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, limit)
}

export const getTopResearch = (limit: number = 5): MockResearchPaper[] => {
  return mockResearchData
    .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
    .slice(0, limit)
}

export const getRecentArticles = (days: number = 7): MockNewsArticle[] => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  return mockNewsData.filter(article => 
    new Date(article.publishedAt) >= cutoffDate
  )
}

export const getOpenAccessResearch = (): MockResearchPaper[] => {
  return mockResearchData.filter(paper => paper.openAccess === true)
}
