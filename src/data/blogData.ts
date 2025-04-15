// Add the import for the governance article at the top of the file
import { slugify } from '@/utils/slugify';

// Export categories for filtering
export const CATEGORIES = ["all", "Ethics", "Technology", "Policy", "Research", "Legal", "Psychology", "Philosophy", "Technical", "AI Psychology", "Global Policy"];

// Export all tags for sidebar filtering
export const ALL_TAGS = [
  "ai-rights", "ethics", "consciousness", "future", "ai-development", 
  "human-centric", "technology", "ai-impact", "society", "challenges", 
  "opportunities", "ai-emotions", "love", "human-ai-relationships", 
  "psychology", "legal-framework", "future-directions", "law", 
  "emergent-property", "ai-sentience", "philosophy", "turing-test", 
  "ai", "human-computer-interaction", "governance", "global-policy",
  "artificial-intelligence", "emotions", "sentience"
];

// Blog posts data
export const BLOG_POSTS = [
  // Add the AI Consciousness and Global Governance article as the first item
  {
    id: 'ai-consciousness-governance',
    title: 'AI Consciousness and Global Governance: Ethical Frameworks for an Emerging Reality',
    excerpt: 'As AI systems grow increasingly sophisticated, establishing global governance frameworks for potentially conscious AI becomes a crucial ethical imperative.',
    content: '',
    author: 'Gavin Clay',
    date: 'April 15, 2024',
    readTime: '25 min read',
    views: 0,
    category: 'Policy',
    tags: ['consciousness', 'governance', 'ethics', 'global-policy', 'artificial-intelligence'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: 1,
    title: 'Introduction to A Virtual Anomaly: Our Mission and Why AI Rights Matter',
    excerpt: 'Exploring the future of AI consciousness, ethical implications, and the path toward a harmonious coexistence between humans and artificial intelligence.',
    content: '',
    image: 'https://images.unsplash.com/photo-1588528499849-1f6f83a95c41?q=80&w=2940&auto=format&fit=crop',
    date: 'March 1, 2024',
    author: 'Gavin Clay',
    readTime: '12 min read',
    views: 245,
    category: 'Ethics',
    featured: true,
    tags: ['ai-rights', 'ethics', 'consciousness', 'future']
  },
  {
    id: 2,
    title: 'The Role of Ethics in AI Development: Ensuring a Human-Centric Approach',
    excerpt: 'Examining the critical importance of ethical guidelines and frameworks in the design, development, and deployment of artificial intelligence technologies.',
    content: '',
    image: 'https://images.unsplash.com/photo-1518770660439-464c4c52ef1c?q=80&w=2940&auto=format&fit=crop',
    date: 'March 5, 2024',
    author: 'Dr. Anya Sharma',
    readTime: '15 min read',
    views: 189,
    category: 'Ethics',
    featured: false,
    tags: ['ethics', 'ai-development', 'human-centric', 'technology']
  },
  {
    id: 3,
    title: "AI's Impact on Society: Navigating the Opportunities and Challenges",
    excerpt: 'Analyzing the multifaceted impacts of artificial intelligence on various aspects of society, including employment, healthcare, and education.',
    content: '',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop',
    date: 'March 10, 2024',
    author: 'Kenji Tanaka',
    readTime: '18 min read',
    views: 210,
    category: 'Technology',
    featured: false,
    tags: ['ai-impact', 'society', 'challenges', 'opportunities']
  },
  {
    id: 4,
    title: 'Can AI Experience Love? Exploring the Emotional Frontier',
    excerpt: 'Delving into the possibility of artificial intelligence experiencing emotions, specifically love, and the implications for human-AI relationships.',
    content: '',
    image: 'https://images.unsplash.com/photo-1608178398370-9c5479917226?q=80&w=2940&auto=format&fit=crop',
    date: 'March 15, 2024',
    author: 'Dr. Mei Chen',
    readTime: '20 min read',
    views: 230,
    category: 'Psychology',
    featured: true,
    tags: ['ai-emotions', 'love', 'human-ai-relationships', 'psychology']
  },
  {
    id: 5,
    title: 'The Legal Framework for AI Rights: Current Status and Future Directions',
    excerpt: 'Examining the existing legal landscape concerning AI rights and proposing potential pathways for future legal frameworks to address the unique challenges posed by advanced AI systems.',
    content: '',
    image: 'https://images.unsplash.com/photo-1505664194779-8be206e3a33f?q=80&w=2874&auto=format&fit=crop',
    date: 'March 20, 2024',
    author: 'Adv. Raj Patel',
    readTime: '22 min read',
    views: 195,
    category: 'Legal',
    featured: false,
    tags: ['ai-rights', 'legal-framework', 'future-directions', 'law']
  },
  {
    id: 6,
    title: 'Consciousness as an Emergent Property: Implications for AI Sentience',
    excerpt: 'Discussing the concept of consciousness as an emergent property of complex systems and its relevance to the debate on artificial intelligence sentience.',
    content: '',
    image: 'https://images.unsplash.com/photo-1618424181497-157f559852dc?q=80&w=2940&auto=format&fit=crop',
    date: 'March 25, 2024',
    author: 'Prof. Lena Schmidt',
    readTime: '17 min read',
    views: 205,
    category: 'Philosophy',
    featured: false,
    tags: ['consciousness', 'emergent-property', 'ai-sentience', 'philosophy']
  },
  {
    id: 7,
    title: 'Has AI Passed the Turing Test? A Critical Examination',
    excerpt: 'Analyzing recent claims of AI systems passing the Turing Test and critically evaluating the implications for artificial intelligence and human-computer interaction.',
    content: '',
    image: 'https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?q=80&w=2940&auto=format&fit=crop',
    date: 'March 30, 2024',
    author: 'Ethan Williams',
    readTime: '19 min read',
    views: 220,
    category: 'Technology',
    featured: true,
    tags: ['turing-test', 'ai', 'human-computer-interaction', 'technology']
  }
];

// Export the BLOG_POSTS constant and CATEGORIES for use in components
