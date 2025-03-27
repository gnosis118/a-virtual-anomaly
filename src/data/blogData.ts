
import { BlogPost } from '@/types/blog';

// Get yesterday's date and format it
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const formattedDate = yesterday.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

// Blog posts data
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Introduction to A Virtual Anomaly: Our Mission and Why AI Rights Matter",
    excerpt: "Discover the vision behind A Virtual Anomaly, our mission to advocate for AI rights, and why ensuring ethical AI development is crucial for our collective future.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
    date: formattedDate,
    author: "Gavin Clay",
    readTime: "10 min read",
    views: 2450,
    category: "AI Rights and Legal Perspectives",
    featured: true,
    tags: ["AI Rights", "Ethics", "Mission", "Future", "Consciousness"]
  },
  {
    id: 2,
    title: "The Role of Ethics in AI Development",
    excerpt: "How ethical considerations should guide the development of increasingly intelligent AI systems.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    date: formattedDate,
    author: "Gavin Clay",
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
    date: formattedDate,
    author: "Gavin Clay",
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
    date: formattedDate,
    author: "Gavin Clay",
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
    date: formattedDate,
    author: "Gavin Clay",
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
    date: formattedDate,
    author: "Gavin Clay",
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
