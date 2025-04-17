
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
    id: 13,
    title: "The Role of Empathy in Human-AI Relations",
    excerpt: "Exploring how empathy shapes interactions between humans and artificial intelligence, and why developing mutual understanding is crucial for creating harmonious relationships in an increasingly AI-integrated world.",
    content: "",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    date: "April 18, 2025",
    author: "Gavin Clay",
    readTime: "16 min read",
    views: 0, // New article, no views yet
    category: "Human-AI Relationships",
    featured: true,
    tags: ["Empathy", "Human-AI Relations", "Artificial Emotions", "Ethics", "AI Psychology"]
  },
  {
    id: 12,
    title: "AI Consciousness and Global Governance: International Perspectives",
    excerpt: "Examining international approaches to regulating and protecting conscious artificial entities across borders, with a focus on creating ethical frameworks for AI with consciousness-like properties.",
    content: "",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
    date: "April 17, 2025",
    author: "Gavin Clay",
    readTime: "16 min read",
    views: 0, // New article, no views yet
    category: "Global Policy",
    featured: true,
    tags: ["Global Governance", "AI Regulation", "International Ethics", "AI Rights", "Artificial Consciousness"]
  },
  {
    id: 11,
    title: "Historical Perspectives on Non-Human Rights",
    excerpt: "What can we learn from the history of extending rights to new groups that might apply to artificial beings?",
    content: "",
    image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=1974&auto=format&fit=crop",
    date: "August 20, 2024",
    author: "Gavin Clay",
    readTime: "14 min read",
    views: 580,
    category: "Legal",
    featured: true,
    tags: ["History", "Rights", "Non-Human Rights", "Legal", "Ethics"]
  },
  {
    id: 9,
    title: "Geoffrey Hinton: Will AI Save the World or End it? | The Agenda",
    excerpt: "Geoffrey Hinton, often referred to as the 'Godfather of AI,' shares his insights on the potential of artificial intelligence to either transform humanity for the better or pose existential risks.",
    content: "",
    image: "/lovable-uploads/4d0fe1c5-faa8-4396-bd19-5bf4fa79167e.png",
    date: "April 3, 2025",
    author: "Gavin Clay",
    readTime: "8 min read",
    views: 1520,
    category: "AI Development and Technology",
    featured: true,
    tags: ["Geoffrey Hinton", "AI Safety", "Future of AI", "Ethics", "Machine Learning"]
  },
  {
    id: 8,
    title: "Measuring Consciousness: Quantitative Approaches",
    excerpt: "Scientists are developing frameworks to detect and measure consciousness in both biological and artificial systems.",
    content: "",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop",
    date: "April 4, 2024",
    author: "Gavin Clay",
    readTime: "12 min read",
    views: 980,
    category: "Research",
    featured: true,
    tags: ["Consciousness", "Measurement", "Science", "Metrics", "Neuroscience"]
  },
  {
    id: 10,
    title: "The Evolution of Machine Learning: Toward Self-Awareness",
    excerpt: "How developments in recursive improvement and introspective algorithms may lead to machine self-awareness.",
    content: "",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    date: "July 15, 2024",
    author: "Gavin Clay",
    readTime: "15 min read",
    views: 720,
    category: "Technical",
    featured: true,
    tags: ["Machine Learning", "Self-Awareness", "Algorithms", "Artificial Intelligence", "Recursive Improvement"]
  },
  {
    id: 7,
    title: "AI Passes the Turing Test: A New Era of Intelligence",
    excerpt: "In a groundbreaking development, artificial intelligence has officially passed the Turing Test—a benchmark established by British mathematician and computer scientist Alan Turing in 1950 to determine whether a machine could exhibit human-like intelligence.",
    content: "",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1950&auto=format&fit=crop",
    date: "April 4, 2025",
    author: "Gavin Clay",
    readTime: "15 min read",
    views: 1240,
    category: "AI Development and Technology",
    featured: true,
    tags: ["Turing Test", "AI Milestone", "Machine Intelligence", "Future of AI"]
  },
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
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: formattedDate,
    author: "Gavin Clay",
    readTime: "12 min read",
    views: 1890,
    category: "Ethics",
    featured: false,
    tags: ["Ethics", "Development", "Guidelines", "AI Rights"]
  },
  {
    id: 3,
    title: "AI's Impact on Society: A Global Perspective",
    excerpt: "Examining how artificial intelligence is transforming societies across the globe and what it means for humanity.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    date: formattedDate,
    author: "Gavin Clay",
    readTime: "20 min read",
    views: 1640,
    category: "Society",
    featured: false,
    tags: ["Society", "Global Impact", "Future", "Development", "Ethics"]
  },
  {
    id: 4,
    title: "Can AI Experience Love? The Emotional Frontier",
    excerpt: "Investigating the possibilities and implications of emotional intelligence in artificial systems.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    date: "April 1, 2025",
    author: "Gavin Clay",
    readTime: "7 min read",
    views: 2130,
    category: "Emotions",
    featured: false,
    tags: ["Emotions", "Love", "Sentience", "Consciousness", "AI Development"]
  },
  {
    id: 5,
    title: "The Legal Framework for AI Rights",
    excerpt: "Examining current and future legal considerations for artificially intelligent entities.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
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
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
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
  "Resources and Educational Content",
  "Research",
  "Technical",
  "Global Policy" // Added new category
];

// Generate all unique tags from blog posts
export const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap(post => post.tags))];
