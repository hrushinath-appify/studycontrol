// Mock data for motivational quotes
// This provides inspirational quotes for the study app

export interface Quote {
  id: string
  text: string
  author: string
  category: 'motivation' | 'learning' | 'success' | 'perseverance' | 'growth' | 'study' | 'inspiration'
  tags: string[]
}

export const motivationalQuotes: Quote[] = [
  {
    id: 'quote-1',
    text: 'The future belongs to those who prepare for it today.',
    author: 'Malcolm X',
    category: 'study',
    tags: ['future', 'preparation', 'learning']
  },
  {
    id: 'quote-2',
    text: 'Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.',
    author: 'Richard Feynman',
    category: 'study',
    tags: ['study', 'curiosity', 'learning']
  },
  {
    id: 'quote-3',
    text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.',
    author: 'Mahatma Gandhi',
    category: 'inspiration',
    tags: ['learning', 'life', 'wisdom']
  },
  {
    id: 'quote-4',
    text: 'The expert in anything was once a beginner.',
    author: 'Helen Hayes',
    category: 'motivation',
    tags: ['beginner', 'growth', 'study']
  },
  {
    id: 'quote-5',
    text: 'Push yourself, because no one else is going to do it for you.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['self-discipline', 'drive', 'focus']
  },
  {
    id: 'quote-6',
    text: 'Don’t let what you cannot do interfere with what you can do.',
    author: 'John Wooden',
    category: 'inspiration',
    tags: ['focus', 'possibility', 'confidence']
  },
  {
    id: 'quote-7',
    text: 'Success is the sum of small efforts repeated day in and day out.',
    author: 'Robert Collier',
    category: 'success',
    tags: ['discipline', 'persistence', 'study']
  },
  {
    id: 'quote-8',
    text: 'Learning never exhausts the mind.',
    author: 'Leonardo da Vinci',
    category: 'study',
    tags: ['learning', 'wisdom', 'curiosity']
  },
  {
    id: 'quote-9',
    text: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney',
    category: 'motivation',
    tags: ['action', 'focus', 'success']
  },
  {
    id: 'quote-10',
    text: 'Discipline is the bridge between goals and accomplishment.',
    author: 'Jim Rohn',
    category: 'motivation',
    tags: ['discipline', 'goals', 'success']
  },
  {
    id: 'quote-11',
    text: 'A little progress each day adds up to big results.',
    author: 'Unknown',
    category: 'study',
    tags: ['progress', 'consistency', 'learning']
  },
  {
    id: 'quote-12',
    text: 'Dream big and dare to fail.',
    author: 'Norman Vaughan',
    category: 'inspiration',
    tags: ['dreams', 'courage', 'success']
  },
  {
    id: 'quote-13',
    text: 'Motivation is what gets you started. Habit is what keeps you going.',
    author: 'Jim Ryun',
    category: 'motivation',
    tags: ['motivation', 'habit', 'success']
  },
  {
    id: 'quote-14',
    text: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
    category: 'study',
    tags: ['education', 'change', 'knowledge']
  },
  {
    id: 'quote-15',
    text: 'You don’t have to be great to start, but you have to start to be great.',
    author: 'Zig Ziglar',
    category: 'motivation',
    tags: ['beginner', 'growth', 'success']
  },
  {
    id: 'quote-16',
    text: 'Your limitation—it’s only your imagination.',
    author: 'Unknown',
    category: 'inspiration',
    tags: ['imagination', 'limitless', 'motivation']
  },
  {
    id: 'quote-17',
    text: 'Work hard in silence, let your success be your noise.',
    author: 'Frank Ocean',
    category: 'success',
    tags: ['hard work', 'success', 'discipline']
  },
  {
    id: 'quote-18',
    text: 'Great things never come from comfort zones.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['growth', 'comfort zone', 'success']
  },
  {
    id: 'quote-19',
    text: 'Genius is 1% talent and 99% hard work.',
    author: 'Albert Einstein',
    category: 'study',
    tags: ['hard work', 'talent', 'study']
  },
  {
    id: 'quote-20',
    text: 'Don’t watch the clock; do what it does. Keep going.',
    author: 'Sam Levenson',
    category: 'motivation',
    tags: ['time', 'discipline', 'perseverance']
  },
  {
    id: 'quote-21',
    text: 'Success doesn’t come to you, you go to it.',
    author: 'Marva Collins',
    category: 'success',
    tags: ['success', 'effort', 'discipline']
  },
  {
    id: 'quote-22',
    text: 'Knowledge is power.',
    author: 'Francis Bacon',
    category: 'study',
    tags: ['knowledge', 'education', 'learning']
  },
  {
    id: 'quote-23',
    text: 'It always seems impossible until it’s done.',
    author: 'Nelson Mandela',
    category: 'inspiration',
    tags: ['perseverance', 'possibility', 'motivation']
  },
  {
    id: 'quote-24',
    text: 'Strive for progress, not perfection.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['progress', 'discipline', 'growth']
  },
  {
    id: 'quote-25',
    text: 'The beautiful thing about learning is nobody can take it away from you.',
    author: 'B.B. King',
    category: 'study',
    tags: ['learning', 'education', 'wisdom']
  },
  {
    id: 'quote-26',
    text: 'Failure is the opportunity to begin again more intelligently.',
    author: 'Henry Ford',
    category: 'inspiration',
    tags: ['failure', 'learning', 'growth']
  },
  {
    id: 'quote-27',
    text: 'Winners are not people who never fail, but people who never quit.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['persistence', 'failure', 'success']
  },
  {
    id: 'quote-28',
    text: 'Education is not the filling of a pail, but the lighting of a fire.',
    author: 'William Butler Yeats',
    category: 'study',
    tags: ['education', 'inspiration', 'learning']
  },
  {
    id: 'quote-29',
    text: 'Hard work beats talent when talent doesn’t work hard.',
    author: 'Tim Notke',
    category: 'motivation',
    tags: ['hard work', 'talent', 'discipline']
  },
  {
    id: 'quote-30',
    text: 'The secret of getting ahead is getting started.',
    author: 'Mark Twain',
    category: 'motivation',
    tags: ['action', 'growth', 'success']
  },
  {
    id: 'quote-31',
    text: 'Self-belief and hard work will always earn you success.',
    author: 'Virat Kohli',
    category: 'success',
    tags: ['confidence', 'hard work', 'success']
  },
  {
    id: 'quote-32',
    text: 'Learning is a treasure that will follow its owner everywhere.',
    author: 'Chinese Proverb',
    category: 'study',
    tags: ['learning', 'wisdom', 'education']
  },
  {
    id: 'quote-33',
    text: 'Start where you are. Use what you have. Do what you can.',
    author: 'Arthur Ashe',
    category: 'motivation',
    tags: ['action', 'focus', 'discipline']
  },
  {
    id: 'quote-34',
    text: 'Don’t be afraid to give up the good to go for the great.',
    author: 'John D. Rockefeller',
    category: 'inspiration',
    tags: ['ambition', 'success', 'growth']
  },
  {
    id: 'quote-35',
    text: 'Procrastination makes easy things hard and hard things harder.',
    author: 'Mason Cooley',
    category: 'study',
    tags: ['procrastination', 'discipline', 'time']
  },
  {
    id: 'quote-36',
    text: 'Do something today that your future self will thank you for.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['future', 'discipline', 'success']
  },
  {
    id: 'quote-37',
    text: 'Your education is a dress rehearsal for a life that is yours to lead.',
    author: 'Nora Ephron',
    category: 'study',
    tags: ['education', 'life', 'learning']
  },
  {
    id: 'quote-38',
    text: 'The harder you work for something, the greater you’ll feel when you achieve it.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['hard work', 'success', 'discipline']
  },
  {
    id: 'quote-39',
    text: 'An investment in knowledge pays the best interest.',
    author: 'Benjamin Franklin',
    category: 'study',
    tags: ['knowledge', 'education', 'success']
  },
  {
    id: 'quote-40',
    text: 'Small daily improvements over time lead to stunning results.',
    author: 'Robin Sharma',
    category: 'inspiration',
    tags: ['growth', 'discipline', 'progress']
  },
  {
    id: 'quote-41',
    text: 'The secret of success is to do the common things uncommonly well.',
    author: 'John D. Rockefeller',
    category: 'success',
    tags: ['success', 'excellence', 'discipline']
  },
  {
    id: 'quote-42',
    text: 'Success doesn’t just find you. You have to go out and get it.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['success', 'hard work', 'discipline']
  },
  {
    id: 'quote-43',
    text: 'Work gives you meaning and purpose, and life is empty without it.',
    author: 'Stephen Hawking',
    category: 'inspiration',
    tags: ['purpose', 'work', 'life']
  },
  {
    id: 'quote-44',
    text: 'There are no shortcuts to any place worth going.',
    author: 'Beverly Sills',
    category: 'study',
    tags: ['discipline', 'journey', 'success']
  },
  {
    id: 'quote-45',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'motivation',
    tags: ['success', 'failure', 'perseverance']
  },
  {
    id: 'quote-46',
    text: 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.',
    author: 'Malcolm X',
    category: 'study',
    tags: ['education', 'future', 'preparation']
  },
  {
    id: 'quote-47',
    text: 'Fall seven times and stand up eight.',
    author: 'Japanese Proverb',
    category: 'inspiration',
    tags: ['perseverance', 'resilience', 'growth']
  },
  {
    id: 'quote-48',
    text: 'The difference between ordinary and extraordinary is that little extra.',
    author: 'Jimmy Johnson',
    category: 'success',
    tags: ['effort', 'success', 'excellence']
  },
  {
    id: 'quote-49',
    text: 'Don’t stop when you are tired. Stop when you are done.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['perseverance', 'discipline', 'success']
  },
  {
    id: 'quote-50',
    text: 'Once you learn to read, you will be forever free.',
    author: 'Frederick Douglass',
    category: 'study',
    tags: ['reading', 'education', 'freedom']
  },
  {
    id: 'quote-51',
    text: 'With the new day comes new strength and new thoughts.',
    author: 'Eleanor Roosevelt',
    category: 'inspiration',
    tags: ['renewal', 'strength', 'hope']
  },
  {
    id: 'quote-52',
    text: 'Success is how high you bounce when you hit bottom.',
    author: 'George S. Patton',
    category: 'success',
    tags: ['resilience', 'success', 'perseverance']
  },
  {
    id: 'quote-53',
    text: 'Reading is to the mind what exercise is to the body.',
    author: 'Joseph Addison',
    category: 'study',
    tags: ['reading', 'mind', 'learning']
  },
  {
    id: 'quote-54',
    text: 'The harder the battle, the sweeter the victory.',
    author: 'Les Brown',
    category: 'motivation',
    tags: ['struggle', 'victory', 'success']
  },
  {
    id: 'quote-55',
    text: 'Don’t limit your challenges. Challenge your limits.',
    author: 'Unknown',
    category: 'inspiration',
    tags: ['limits', 'challenge', 'growth']
  },
  {
    id: 'quote-56',
    text: 'There is no substitute for hard work.',
    author: 'Thomas Edison',
    category: 'motivation',
    tags: ['hard work', 'discipline', 'success']
  },
  {
    id: 'quote-57',
    text: 'Learning without thought is labor lost; thought without learning is perilous.',
    author: 'Confucius',
    category: 'study',
    tags: ['learning', 'thinking', 'wisdom']
  },
  {
    id: 'quote-58',
    text: 'Act as if what you do makes a difference. It does.',
    author: 'William James',
    category: 'inspiration',
    tags: ['action', 'purpose', 'motivation']
  },
  {
    id: 'quote-59',
    text: 'If you really want to do something, you’ll find a way. If you don’t, you’ll find an excuse.',
    author: 'Jim Rohn',
    category: 'motivation',
    tags: ['effort', 'discipline', 'determination']
  },
  {
    id: 'quote-60',
    text: 'Learning is not attained by chance, it must be sought for with ardor and diligence.',
    author: 'Abigail Adams',
    category: 'study',
    tags: ['learning', 'diligence', 'education']
  },
  {
    id: 'quote-61',
    text: 'Don’t let yesterday take up too much of today.',
    author: 'Will Rogers',
    category: 'inspiration',
    tags: ['present', 'focus', 'growth']
  },
  {
    id: 'quote-62',
    text: 'Excellence is not a skill. It is an attitude.',
    author: 'Ralph Marston',
    category: 'motivation',
    tags: ['excellence', 'attitude', 'discipline']
  },
  {
    id: 'quote-63',
    text: 'The roots of education are bitter, but the fruit is sweet.',
    author: 'Aristotle',
    category: 'study',
    tags: ['education', 'growth', 'learning']
  },
  {
    id: 'quote-64',
    text: 'A dream does not become reality through magic; it takes sweat, determination, and hard work.',
    author: 'Colin Powell',
    category: 'motivation',
    tags: ['dreams', 'hard work', 'success']
  },
  {
    id: 'quote-65',
    text: 'The best way to predict your future is to create it.',
    author: 'Abraham Lincoln',
    category: 'inspiration',
    tags: ['future', 'success', 'action']
  },
  {
    id: 'quote-66',
    text: 'The man who does not read has no advantage over the man who cannot read.',
    author: 'Mark Twain',
    category: 'study',
    tags: ['reading', 'knowledge', 'education']
  },
  {
    id: 'quote-67',
    text: 'What we learn with pleasure we never forget.',
    author: 'Alfred Mercier',
    category: 'study',
    tags: ['learning', 'memory', 'education']
  },
  {
    id: 'quote-68',
    text: 'Do not wait to strike till the iron is hot, but make it hot by striking.',
    author: 'William Butler Yeats',
    category: 'motivation',
    tags: ['action', 'effort', 'discipline']
  },
  {
    id: 'quote-69',
    text: 'Believe you can and you’re halfway there.',
    author: 'Theodore Roosevelt',
    category: 'inspiration',
    tags: ['belief', 'confidence', 'success']
  },
  {
    id: 'quote-70',
    text: 'A person who never made a mistake never tried anything new.',
    author: 'Albert Einstein',
    category: 'study',
    tags: ['mistakes', 'learning', 'growth']
  },
  {
    id: 'quote-71',
    text: 'Don’t be pushed by your problems. Be led by your dreams.',
    author: 'Ralph Waldo Emerson',
    category: 'inspiration',
    tags: ['dreams', 'motivation', 'focus']
  },
  {
    id: 'quote-72',
    text: 'Success is the result of preparation, hard work, and learning from failure.',
    author: 'Colin Powell',
    category: 'success',
    tags: ['success', 'hard work', 'failure']
  },
  {
    id: 'quote-73',
    text: 'Teachers can open the door, but you must enter it yourself.',
    author: 'Chinese Proverb',
    category: 'study',
    tags: ['teachers', 'learning', 'self-motivation']
  },
  {
    id: 'quote-74',
    text: 'Go as far as you can see; when you get there, you’ll be able to see further.',
    author: 'Thomas Carlyle',
    category: 'inspiration',
    tags: ['vision', 'growth', 'progress']
  },
  {
    id: 'quote-75',
    text: 'Don’t wish it were easier. Wish you were better.',
    author: 'Jim Rohn',
    category: 'motivation',
    tags: ['growth', 'self-improvement', 'discipline']
  },
  {
    id: 'quote-76',
    text: 'Knowledge will bring you the opportunity to make a difference.',
    author: 'Claire Fagin',
    category: 'study',
    tags: ['knowledge', 'education', 'opportunity']
  },
  {
    id: 'quote-77',
    text: 'The only place where success comes before work is in the dictionary.',
    author: 'Vidal Sassoon',
    category: 'success',
    tags: ['hard work', 'success', 'discipline']
  },
  {
    id: 'quote-78',
    text: 'Challenges are what make life interesting. Overcoming them is what makes life meaningful.',
    author: 'Joshua Marine',
    category: 'inspiration',
    tags: ['challenges', 'growth', 'life']
  },
  {
    id: 'quote-79',
    text: 'Learning without practice is like love without care.',
    author: 'Unknown',
    category: 'study',
    tags: ['learning', 'practice', 'wisdom']
  },
  {
    id: 'quote-80',
    text: 'Perseverance is not a long race; it is many short races one after the other.',
    author: 'Walter Elliot',
    category: 'motivation',
    tags: ['perseverance', 'discipline', 'success']
  },
  {
    id: 'quote-81',
    text: 'Success usually comes to those who are too busy to be looking for it.',
    author: 'Henry David Thoreau',
    category: 'success',
    tags: ['success', 'focus', 'hard work']
  },
  {
    id: 'quote-82',
    text: 'Education is not preparation for life; education is life itself.',
    author: 'John Dewey',
    category: 'study',
    tags: ['education', 'life', 'learning']
  },
  {
    id: 'quote-83',
    text: 'Don’t count the days, make the days count.',
    author: 'Muhammad Ali',
    category: 'motivation',
    tags: ['time', 'discipline', 'focus']
  },
  {
    id: 'quote-84',
    text: 'Success is walking from failure to failure with no loss of enthusiasm.',
    author: 'Winston Churchill',
    category: 'success',
    tags: ['success', 'failure', 'perseverance']
  },
  {
    id: 'quote-85',
    text: 'Learning is a lifelong process of keeping abreast of change.',
    author: 'Peter Drucker',
    category: 'study',
    tags: ['learning', 'change', 'growth']
  },
  {
    id: 'quote-86',
    text: 'Hardships often prepare ordinary people for an extraordinary destiny.',
    author: 'C.S. Lewis',
    category: 'inspiration',
    tags: ['destiny', 'hardship', 'growth']
  },
  {
    id: 'quote-87',
    text: 'If you can dream it, you can do it.',
    author: 'Walt Disney',
    category: 'inspiration',
    tags: ['dreams', 'belief', 'success']
  },
  {
    id: 'quote-88',
    text: 'Learn as much as you can while you are young, since life becomes too busy later.',
    author: 'Dana Stewart Scott',
    category: 'study',
    tags: ['youth', 'learning', 'time']
  },
  {
    id: 'quote-89',
    text: 'Great minds discuss ideas; average minds discuss events; small minds discuss people.',
    author: 'Eleanor Roosevelt',
    category: 'inspiration',
    tags: ['ideas', 'thinking', 'wisdom']
  },
  {
    id: 'quote-90',
    text: 'Motivation gets you going, but discipline keeps you growing.',
    author: 'John C. Maxwell',
    category: 'motivation',
    tags: ['motivation', 'discipline', 'growth']
  },
  {
    id: 'quote-91',
    text: 'Learning never stops. If you have a teacher, you are lucky. If you don’t, books will teach you.',
    author: 'Unknown',
    category: 'study',
    tags: ['learning', 'teachers', 'books']
  },
  {
    id: 'quote-92',
    text: 'Success is not how high you have climbed, but how you make a positive difference to the world.',
    author: 'Roy T. Bennett',
    category: 'success',
    tags: ['success', 'impact', 'life']
  },
  {
    id: 'quote-93',
    text: 'You can never be overdressed or overeducated.',
    author: 'Oscar Wilde',
    category: 'study',
    tags: ['education', 'learning', 'wisdom']
  },
  {
    id: 'quote-94',
    text: 'The difference between who you are and who you want to be is what you do.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['action', 'growth', 'discipline']
  },
  {
    id: 'quote-95',
    text: 'An investment in yourself pays the best dividends.',
    author: 'Benjamin Franklin',
    category: 'inspiration',
    tags: ['self-growth', 'investment', 'wisdom']
  },
  {
    id: 'quote-96',
    text: 'You don’t learn to walk by following rules. You learn by doing and by falling over.',
    author: 'Richard Branson',
    category: 'study',
    tags: ['learning', 'experience', 'growth']
  },
  {
    id: 'quote-97',
    text: 'Motivation is temporary. Discipline is permanent.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['discipline', 'consistency', 'success']
  },
  {
    id: 'quote-98',
    text: 'The only thing standing between you and your goal is the story you keep telling yourself.',
    author: 'Jordan Belfort',
    category: 'motivation',
    tags: ['mindset', 'goals', 'success']
  },
  {
    id: 'quote-99',
    text: 'Formal education will make you a living; self-education will make you a fortune.',
    author: 'Jim Rohn',
    category: 'study',
    tags: ['education', 'self-learning', 'growth']
  },
  {
    id: 'quote-100',
    text: 'Start now. Start where you are. Start with fear. Start with pain. Just start.',
    author: 'Iyanla Vanzant',
    category: 'inspiration',
    tags: ['action', 'courage', 'motivation']
  },
  {
    id: 'quote-101',
    text: 'The man who moves a mountain begins by carrying away small stones.',
    author: 'Confucius',
    category: 'study',
    tags: ['perseverance', 'study', 'discipline']
  },
  {
    id: 'quote-102',
    text: 'Don’t downgrade your dream just to fit your reality. Upgrade your conviction to match your destiny.',
    author: 'Unknown',
    category: 'inspiration',
    tags: ['dreams', 'destiny', 'belief']
  }
];

// Utility functions
export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
  return motivationalQuotes[randomIndex]!
}

export function getQuotesByCategory(category: Quote['category']): Quote[] {
  return motivationalQuotes.filter(quote => quote.category === category)
}

export function getQuotesByTag(tag: string): Quote[] {
  return motivationalQuotes.filter(quote => 
    quote.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  )
}

export function searchQuotes(query: string): Quote[] {
  const lowercaseQuery = query.toLowerCase()
  return motivationalQuotes.filter(quote =>
    quote.text.toLowerCase().includes(lowercaseQuery) ||
    quote.author.toLowerCase().includes(lowercaseQuery) ||
    quote.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export default motivationalQuotes
