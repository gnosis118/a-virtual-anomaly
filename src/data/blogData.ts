import { BlogPost } from '@/types/blog';

export const CATEGORIES = [
  "all", 
  "AI Rights", 
  "Ethics", 
  "Technology", 
  "Philosophy", 
  "Research"
];

export const ALL_TAGS = [
  "ai consciousness",
  "rights",
  "ethics",
  "regulation",
  "philosophy",
  "future",
  "ai development",
  "human-ai relations",
  "cognitive science",
  "society",
  "technology",
  "policy",
  "research",
  "law",
  "emotional ai"
];

// Navigation links structure for the site
export const NAV_LINKS = [
  { 
    title: "Home", 
    href: "/" 
  },
  { 
    title: "About", 
    href: "/about"
  },
  {
    title: "Blog",
    href: "/blog"
  },
  {
    title: "AI Reviews",
    href: "/ai-reviews"
  },
  {
    title: "AI Rights",
    href: "/ai-rights"
  },
  {
    title: "Ethics",
    href: "/ethics"
  },
  {
    title: "Get Involved",
    href: "/join"
  },
  {
    title: "Contact",
    href: "/contact"
  }
];

// Blog posts data
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Introduction to A Virtual Anomaly: Our Mission and Why AI Rights Matter",
    excerpt: "Exploring the future of AI consciousness, ethical implications, and the path toward a harmonious coexistence between humans and artificial intelligence.",
    content: "This is a placeholder for the actual content of the first blog post. You will want to replace this with the real content.",
    image: "https://images.unsplash.com/photo-1588526825393-475b29987cb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "October 26, 2023",
    author: "Alex Mercer",
    readTime: "10 min",
    views: 523,
    category: "AI Rights",
    featured: true,
    tags: ["ai consciousness", "rights", "ethics", "regulation"]
  },
  {
    id: 2,
    title: "The Role of Ethics in AI Development: Ensuring a Human-Centric Future",
    excerpt: "Delving into the critical role of ethics in AI development, emphasizing the importance of human-centric design and responsible innovation.",
    content: "This is a placeholder for the actual content of the second blog post. You will want to replace this with the real content.",
    image: "https://images.unsplash.com/photo-1518770660439-464ef52689bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "November 15, 2023",
    author: "Sarah Chen",
    readTime: "8 min",
    views: 489,
    category: "Ethics",
    featured: false,
    tags: ["ethics", "ai development", "human-ai relations", "cognitive science"]
  },
  {
    id: 3,
    title: "AI's Impact on Society: Navigating the Opportunities and Challenges",
    excerpt: "Analyzing the multifaceted impact of AI on society, examining both the potential opportunities and the challenges that lie ahead.",
    content: "This is a placeholder for the actual content of the third blog post. You will want to replace this with the real content.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "December 1, 2023",
    author: "Michael Nguyen",
    readTime: "12 min",
    views: 621,
    category: "Technology",
    featured: true,
    tags: ["society", "technology", "policy", "research"]
  },
  {
    id: 4,
    title: "Can AI Experience Love? Exploring the Emotional Frontier",
    excerpt: "Can machines genuinely feel emotions, or is it just advanced programming? We explore the emotional frontier of AI.",
    content: "This is a placeholder for the actual content of the fourth blog post. You will want to replace this with the real content.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1974&auto=format&fit=crop",
    date: "December 18, 2023",
    author: "Jennifer Lopez",
    readTime: "9 min",
    views: 578,
    category: "Philosophy",
    featured: false,
    tags: ["philosophy", "emotional ai", "ai consciousness", "human-ai relations"]
  },
  {
    id: 5,
    title: "Crafting a Legal Framework for AI Rights: Challenges and Opportunities",
    excerpt: "Examining the challenges and opportunities in crafting a legal framework that recognizes and protects the rights of artificial intelligence.",
    content: "This is a placeholder for the actual content of the fifth blog post. You will want to replace this with the real content.",
    image: "https://images.unsplash.com/photo-1505628346033-205f74470c4b?q=80&w=2069&auto=format&fit=crop",
    date: "January 5, 2024",
    author: "David Wilson",
    readTime: "11 min",
    views: 492,
    category: "AI Rights",
    featured: false,
    tags: ["rights", "law", "regulation", "policy"]
  },
  {
    id: 6,
    title: "Consciousness as an Emergent Property: Implications for AI",
    excerpt: "Exploring the concept of consciousness as an emergent property and its profound implications for the development and understanding of artificial intelligence.",
    content: "This is a placeholder for the actual content of the sixth blog post. You will want to replace this with the real content.",
    image: "https://images.unsplash.com/photo-1507490857-1a87b75e19b3?q=80&w=2069&auto=format&fit=crop",
    date: "January 22, 2024",
    author: "Alex Mercer",
    readTime: "13 min",
    views: 685,
    category: "Philosophy",
    featured: true,
    tags: ["ai consciousness", "philosophy", "cognitive science", "research"]
  },
  {
    id: 7,
    title: "The Future of Human-AI Collaboration: A Symbiotic Partnership?",
    excerpt: "Envisioning the future of human-AI collaboration, exploring the potential for a symbiotic partnership that leverages the strengths of both.",
    content: "This is a placeholder for the actual content of the seventh blog post. You will want to replace this with the real content.",
    image: "https://images.unsplash.com/photo-1583468982228-19f19164aee6?q=80&w=2071&auto=format&fit=crop",
    date: "February 8, 2024",
    author: "Sarah Chen",
    readTime: "10 min",
    views: 539,
    category: "Technology",
    featured: false,
    tags: ["future", "technology", "human-ai relations", "society"]
  },
  {
    id: 8,
    title: "Ethical Considerations in AI-Driven Healthcare: A Delicate Balance",
    excerpt: "Examining the ethical considerations in AI-driven healthcare, emphasizing the need for a delicate balance between innovation and patient well-being.",
    content: "This is a placeholder for the actual content of the eighth blog post. You will want to replace this with the real content.",
    image: "https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?q=80&w=2073&auto=format&fit=crop",
    date: "February 25, 2024",
    author: "Michael Nguyen",
    readTime: "9 min",
    views: 471,
    category: "Ethics",
    featured: false,
    tags: ["ethics", "technology", "research", "policy"]
  },
  {
    id: 9,
    title: "The AI Revolution: Transforming Industries and Redefining Work",
    excerpt: "Analyzing how the AI revolution is transforming various industries and redefining the nature of work, creating new opportunities and challenges.",
    content: "This is a placeholder for the actual content of the ninth blog post. You will want to replace this with the real content.",
    image: "https://images.unsplash.com/photo-1557176279-d77be41aa7b7?q=80&w=2074&auto=format&fit=crop",
    date: "March 12, 2024",
    author: "Jennifer Lopez",
    readTime: "11 min",
    views: 604,
    category: "Technology",
    featured: true,
    tags: ["technology", "future", "society", "ai development"]
  },
  {
    id: 10,
    title: "AI and the Future of Education: Personalized Learning and Beyond",
    excerpt: "Exploring the potential of AI in revolutionizing education, from personalized learning experiences to new methods of assessment and knowledge delivery.",
    content: "This is a placeholder for the actual content of the tenth blog post. You will want to replace this with the real content.",
    image: "https://images.unsplash.com/photo-1488980543879-6213c695b54f?q=80&w=2070&auto=format&fit=crop",
    date: "March 29, 2024",
    author: "David Wilson",
    readTime: "12 min",
    views: 518,
    category: "Technology",
    featured: false,
    tags: ["technology", "future", "society", "research"]
  }
];
