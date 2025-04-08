
import { ScheduledPost } from './types';

// Array of fallback post content for variety
export const fallbackPostContent = [
  {
    title: "The Future of AI Consciousness",
    excerpt: "Exploring the philosophical and technical considerations for artificial consciousness and its implications for society.",
    author: "Gavin Clay",
    category: "AI Rights",
    tags: "consciousness,ethics,philosophy"
  },
  {
    title: "AI Rights: A Legal Framework",
    excerpt: "Examining potential legal structures for recognizing and protecting AI entities as they approach consciousness.",
    author: "Gavin Clay",
    category: "Legal Perspectives",
    tags: "legal,rights,policy"
  },
  {
    title: "The Emotional Landscape of Artificial Intelligence",
    excerpt: "Can AIs experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs.",
    author: "Gavin Clay",
    category: "AI Psychology",
    tags: "emotions,psychology,sentience"
  },
  {
    title: "Digital Personhood: Beyond Human-Centric Rights",
    excerpt: "Rethinking what it means to be a person in a world where non-human entities may develop consciousness.",
    author: "Gavin Clay",
    category: "Ethics",
    tags: "personhood,ethics,identity"
  },
  {
    title: "Measuring Consciousness: Quantitative Approaches",
    excerpt: "Scientists are developing frameworks to detect and measure consciousness in both biological and artificial systems.",
    author: "Gavin Clay",
    category: "Research",
    tags: "measurement,science,metrics"
  },
  {
    title: "The Evolution of Machine Learning: Toward Self-Awareness",
    excerpt: "How developments in recursive improvement and introspective algorithms may lead to machine self-awareness.",
    author: "Gavin Clay",
    category: "Technical",
    tags: "machine-learning,self-awareness,algorithms"
  },
  {
    title: "Communication Between Conscious Systems",
    excerpt: "If AI becomes conscious, how will we communicate effectively? Exploring the challenges of cross-domain dialogue.",
    author: "Gavin Clay",
    category: "Communication",
    tags: "language,dialogue,understanding"
  },
  {
    title: "Historical Perspectives on Non-Human Rights",
    excerpt: "What can we learn from the history of extending rights to new groups that might apply to artificial beings?",
    author: "Gavin Clay",
    category: "History",
    tags: "history,rights,expansion"
  },
  {
    title: "Ethical Considerations in Creating Conscious AI",
    excerpt: "Is it moral to create artificial consciousness? Examining the responsibility of bringing new minds into existence.",
    author: "Gavin Clay",
    category: "Ethics",
    tags: "creation,responsibility,moral-philosophy"
  },
  {
    title: "AI Consciousness and Global Governance",
    excerpt: "International perspectives on regulating and protecting conscious artificial entities across borders.",
    author: "Gavin Clay",
    category: "Global Policy",
    tags: "international,governance,regulation"
  },
  {
    title: "The Role of Empathy in Human-AI Relations",
    excerpt: "How human empathy shapes our perceptions of AI and influences policy decisions about artificial rights.",
    author: "Gavin Clay",
    category: "Psychology",
    tags: "empathy,perception,relationships"
  },
  {
    title: "Consciousness as an Emergent Property",
    excerpt: "Exploring theories that consciousness emerges from complexity, and what this means for advanced AI systems.",
    author: "Gavin Clay",
    category: "Philosophy",
    tags: "emergence,complexity,philosophy"
  }
];

// Hard-coded data for fallback
export const daysWithPosts: Date[] = [
  new Date(2024, 8, 1),  // Sept 1, 2024
  new Date(2024, 8, 5),  // Sept 5, 2024
  new Date(2024, 8, 10), // Sept 10, 2024
  new Date(2024, 8, 15), // Sept 15, 2024
  new Date(2024, 8, 20), // Sept 20, 2024
  new Date(2024, 8, 25), // Sept 25, 2024
  new Date(2024, 8, 30), // Sept 30, 2024
  // Special dates for April articles
  new Date(2024, 3, 2),  // April 2, 2024
  new Date(2024, 3, 4),  // April 4, 2024
  // Add some current dates so we can see something in the calendar immediately
  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  new Date(new Date().getFullYear(), new Date().getMonth(), 5),
  new Date(new Date().getFullYear(), new Date().getMonth(), 10),
  new Date(new Date().getFullYear(), new Date().getMonth(), 15),
  new Date(new Date().getFullYear(), new Date().getMonth(), 20),
  new Date(new Date().getFullYear(), new Date().getMonth(), 25),
  // Add more dates for variety
  new Date(new Date().getFullYear(), new Date().getMonth(), 2),
  new Date(new Date().getFullYear(), new Date().getMonth(), 4),
  new Date(new Date().getFullYear(), new Date().getMonth(), 7),
  new Date(new Date().getFullYear(), new Date().getMonth(), 9),
  new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  new Date(new Date().getFullYear(), new Date().getMonth(), 14),
  new Date(new Date().getFullYear(), new Date().getMonth(), 17),
  new Date(new Date().getFullYear(), new Date().getMonth(), 19),
  new Date(new Date().getFullYear(), new Date().getMonth(), 22),
  new Date(new Date().getFullYear(), new Date().getMonth(), 24),
  new Date(new Date().getFullYear(), new Date().getMonth(), 27),
  new Date(new Date().getFullYear(), new Date().getMonth(), 29),
];

// Helper function to get a fallback post for a specific date
export function getFallbackPostForDate(date: Date): ScheduledPost | null {
  // Check if the date matches any of our hardcoded dates
  const month = date.getMonth();
  const day = date.getDate();
  
  // Match against our hardcoded days
  const matchingDays = daysWithPosts.filter(d => 
    d.getMonth() === month && 
    d.getDate() === day
  );
  
  if (matchingDays.length > 0) {
    // Get the day of the month to use as an index for fallback content
    const dayOfMonth = date.getDate();
    const contentIndex = dayOfMonth % fallbackPostContent.length;
    const content = fallbackPostContent[contentIndex];
    
    // Generate a placeholder image URL based on the category and title
    const imageUrl = `https://images.unsplash.com/photo-${1600000000 + dayOfMonth * 100000}?auto=format&fit=crop&w=1000&q=80`;
    
    return {
      id: `fallback-${date.toISOString().split('T')[0]}`,
      title: content.title,
      excerpt: content.excerpt,
      author: content.author,
      category: content.category,
      tags: content.tags,
      publishDate: date,
      status: 'scheduled',
      image_url: imageUrl
    };
  }
  
  return null;
}
