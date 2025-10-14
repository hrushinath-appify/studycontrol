import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { updateMysteryStats } from './statsController';

// For now, we'll use in-memory mock data for mystery topics
// In production, this would fetch from a database

const mockMysteryTopics = [
  {
    id: '1',
    title: 'The Paradox of Free Will',
    description: 'Explore the philosophical and scientific debate about whether humans truly have free will or if our actions are predetermined.',
    subtopics: [
      'Determinism vs Indeterminism',
      'Neuroscience of Decision Making',
      'Compatibilism',
      'Moral Responsibility'
    ],
    questions: [
      'Do we really make choices, or do choices make us?',
      'How do quantum mechanics relate to free will?',
      'Can we be held responsible for actions if free will is an illusion?',
      'What does neuroscience tell us about consciousness and choice?'
    ],
    explanation: 'The question of free will has puzzled philosophers and scientists for centuries. Recent neuroscience research shows that brain activity can predict decisions before we\'re consciously aware of making them, challenging our intuitive sense of being in control.',
    category: 'philosophy',
    difficulty: 'advanced',
    estimatedReadTime: 15,
    tags: ['philosophy', 'neuroscience', 'consciousness', 'ethics']
  },
  {
    id: '2',
    title: 'The Placebo Effect Mystery',
    description: 'Discover how belief and expectation can create real, measurable changes in the human body, and why this effect is so powerful.',
    subtopics: [
      'Mind-Body Connection',
      'Neurobiological Mechanisms',
      'Cultural Variations',
      'Clinical Applications'
    ],
    questions: [
      'How can a sugar pill cure real symptoms?',
      'What happens in the brain during a placebo response?',
      'Why do some people respond to placebos more than others?',
      'Can we harness the placebo effect for better treatments?'
    ],
    explanation: 'The placebo effect demonstrates the remarkable power of the mind to influence physical health. When patients believe they\'re receiving treatment, their brains can release real neurotransmitters and hormones that promote healing.',
    category: 'science',
    difficulty: 'intermediate',
    estimatedReadTime: 12,
    tags: ['medicine', 'psychology', 'neuroscience', 'healing']
  },
  {
    id: '3',
    title: 'The Fermi Paradox',
    description: 'If the universe is so vast with billions of potentially habitable planets, where is everybody? Explore the mystery of why we haven\'t found aliens.',
    subtopics: [
      'Drake Equation',
      'Great Filter Theory',
      'Technological Civilizations',
      'SETI Research'
    ],
    questions: [
      'Are we alone in the universe?',
      'What could prevent civilizations from becoming detectable?',
      'Have we already passed the Great Filter?',
      'Why might advanced civilizations choose to hide?'
    ],
    explanation: 'Named after physicist Enrico Fermi, this paradox highlights the contradiction between the high probability of extraterrestrial life and the lack of evidence for it. Various theories attempt to explain this cosmic silence.',
    category: 'astronomy',
    difficulty: 'intermediate',
    estimatedReadTime: 10,
    tags: ['space', 'aliens', 'astronomy', 'physics', 'SETI']
  },
  {
    id: '4',
    title: 'The Hard Problem of Consciousness',
    description: 'Why do we have subjective experiences? Explore the deepest mystery in science - how physical processes create conscious awareness.',
    subtopics: [
      'Qualia and Subjective Experience',
      'Neural Correlates of Consciousness',
      'Integrated Information Theory',
      'The Binding Problem'
    ],
    questions: [
      'Why is there something it\'s like to be you?',
      'How does matter become aware of itself?',
      'Can machines ever be truly conscious?',
      'What makes the hard problem so hard to solve?'
    ],
    explanation: 'While we can explain many aspects of the mind through neuroscience, the subjective nature of experience remains mysterious. Why should there be an inner, first-person perspective at all?',
    category: 'consciousness',
    difficulty: 'advanced',
    estimatedReadTime: 18,
    tags: ['consciousness', 'philosophy', 'neuroscience', 'AI', 'qualia']
  },
  {
    id: '5',
    title: 'Quantum Entanglement Explained',
    description: 'Dive into the "spooky action at a distance" that Einstein found so troubling, and discover how particles can be mysteriously connected.',
    subtopics: [
      'Bell\'s Theorem',
      'Quantum Superposition',
      'Non-locality',
      'Quantum Communication'
    ],
    questions: [
      'How can particles affect each other instantly across vast distances?',
      'Is quantum entanglement faster than light?',
      'What are the practical applications of entanglement?',
      'Does entanglement challenge our understanding of reality?'
    ],
    explanation: 'Quantum entanglement is one of the most counterintuitive phenomena in physics. When particles become entangled, measuring one instantly affects the other, regardless of the distance between them.',
    category: 'physics',
    difficulty: 'intermediate',
    estimatedReadTime: 14,
    tags: ['quantum-physics', 'entanglement', 'Einstein', 'non-locality']
  }
];

// Get all mystery topics
export const getMysteryTopics = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      limit = 10,
      page = 1,
      category,
      difficulty,
      tags,
      search
    } = req.query;

    let filteredTopics = [...mockMysteryTopics];

    // Apply filters
    if (category) {
      filteredTopics = filteredTopics.filter(topic => topic.category === category);
    }

    if (difficulty) {
      filteredTopics = filteredTopics.filter(topic => topic.difficulty === difficulty);
    }

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      filteredTopics = filteredTopics.filter(topic =>
        tagArray.some(tag => topic.tags.includes(tag as string))
      );
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredTopics = filteredTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm) ||
        topic.description.toLowerCase().includes(searchTerm) ||
        topic.explanation.toLowerCase().includes(searchTerm) ||
        topic.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedTopics = filteredTopics.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedTopics,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: filteredTopics.length,
        totalPages: Math.ceil(filteredTopics.length / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching mystery topics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mystery topics'
    });
  }
};

// Get mystery topic by ID
export const getMysteryTopicById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const topic = mockMysteryTopics.find(topic => topic.id === id);

    if (!topic) {
      res.status(404).json({
        success: false,
        error: 'Mystery topic not found'
      });
      return;
    }

    res.json({
      success: true,
      data: topic
    });
  } catch (error) {
    console.error('Error fetching mystery topic:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mystery topic'
    });
  }
};

// Get mystery topic categories
export const getMysteryCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = [...new Set(mockMysteryTopics.map(topic => topic.category))];

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching mystery categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mystery categories'
    });
  }
};

// Get random mystery topic
export const getRandomMysteryTopic = async (req: Request, res: Response): Promise<void> => {
  try {
    const randomIndex = Math.floor(Math.random() * mockMysteryTopics.length);
    const randomTopic = mockMysteryTopics[randomIndex];

    res.json({
      success: true,
      data: randomTopic
    });
  } catch (error) {
    console.error('Error fetching random mystery topic:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch random mystery topic'
    });
  }
};

// Search mystery topics
export const searchMysteryTopics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q) {
      res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
      return;
    }

    const searchTerm = (q as string).toLowerCase();
    const filteredTopics = mockMysteryTopics.filter(topic =>
      topic.title.toLowerCase().includes(searchTerm) ||
      topic.description.toLowerCase().includes(searchTerm) ||
      topic.explanation.toLowerCase().includes(searchTerm) ||
      topic.subtopics.some(subtopic => subtopic.toLowerCase().includes(searchTerm)) ||
      topic.questions.some(question => question.toLowerCase().includes(searchTerm)) ||
      topic.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    res.json({
      success: true,
      data: filteredTopics
    });
  } catch (error) {
    console.error('Error searching mystery topics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search mystery topics'
    });
  }
};

// Get mystery topics by difficulty
export const getMysteryTopicsByDifficulty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { difficulty } = req.params;

    if (!difficulty || !['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
      res.status(400).json({
        success: false,
        error: 'Invalid difficulty level'
      });
      return;
    }

    const filteredTopics = mockMysteryTopics.filter(topic => topic.difficulty === difficulty);

    res.json({
      success: true,
      data: filteredTopics
    });
  } catch (error) {
    console.error('Error fetching mystery topics by difficulty:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mystery topics by difficulty'
    });
  }
};

// Track mystery exploration
export const trackMysteryExploration = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Handle both _id and id fields for compatibility
    const userId = req.user!._id || req.user!.id;

    // Update mystery stats in database
    await updateMysteryStats(userId);

    res.json({
      success: true,
      message: 'Mystery exploration tracked successfully'
    });
  } catch (error) {
    console.error('Error tracking mystery exploration:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track mystery exploration'
    });
  }
};