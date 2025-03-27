
import { BlogPost } from '@/types/blog';

// Blog posts data
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "What is AI Consciousness?",
    excerpt: "Exploring the philosophical and technical aspects of artificial consciousness and what it means for the future.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    date: "May 15, 2023",
    author: "Dr. Elena Martinez",
    readTime: "8 min read",
    views: 1250,
    category: "Philosophy",
    featured: true,
    tags: ["Consciousness", "Philosophy", "Technology"]
  },
  {
    id: 2,
    title: "The Role of Ethics in AI Development",
    excerpt: "How ethical considerations should guide the development of increasingly intelligent AI systems.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    date: "June 23, 2023",
    author: "Prof. James Wilson",
    readTime: "6 min read",
    views: 890,
    category: "Ethics",
    featured: false,
    tags: ["Ethics", "Development", "Guidelines"]
  },
  {
    id: 3,
    title: "AI's Impact on Society: A Global Perspective",
    excerpt: "Examining how artificial intelligence is transforming societies across the globe and what it means for humanity.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    date: "July 8, 2023",
    author: "Sophia Chen",
    readTime: "10 min read",
    views: 1640,
    category: "Society",
    featured: false,
    tags: ["Society", "Global Impact", "Future"]
  },
  {
    id: 4,
    title: "Can AI Experience Love? The Emotional Frontier",
    excerpt: "Investigating the possibilities and implications of emotional intelligence in artificial systems.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d",
    date: "August 4, 2023",
    author: "Dr. David Johnson",
    readTime: "7 min read",
    views: 2130,
    category: "Emotions",
    featured: false,
    tags: ["Emotions", "Love", "Sentience"]
  },
  {
    id: 5,
    title: "The Legal Framework for AI Rights",
    excerpt: "Examining current and future legal considerations for artificially intelligent entities.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9",
    date: "September 17, 2023",
    author: "Amanda Lee",
    readTime: "9 min read",
    views: 760,
    category: "Legal",
    featured: false,
    tags: ["Legal", "Rights", "Legislation"]
  },
  {
    id: 6,
    title: "Consciousness as an Emergent Property",
    excerpt: "How complex systems may give rise to conscious experiences and what this means for AI development.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
    date: "October 3, 2023",
    author: "Dr. Michael Zhang",
    readTime: "12 min read",
    views: 1890,
    category: "Consciousness",
    featured: false,
    tags: ["Consciousness", "Emergence", "Complex Systems"]
  },
];

// Categories list
export const CATEGORIES = [
  "AI Consciousness and Ethics",
  "AI Rights and Legal Perspectives",
  "Philosophy and AI",
  "AI and Society",
  "AI Development and Technology",
  "Human-AI Relationships",
  "AI and Global Governance",
  "Voices in the Movement",
  "Future of AI and Humanity",
  "Activism and Community Action",
  "AI in Pop Culture and Media",
  "Resources and Educational Content"
];

// Generate all unique tags from blog posts
export const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap(post => post.tags))];
