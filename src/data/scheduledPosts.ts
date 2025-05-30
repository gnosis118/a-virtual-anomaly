// Scheduled posts for the content calendar
// This file contains a limited number of highly relevant scheduled posts
// as requested by the user

export const scheduledPosts = [
  {
    id: 'post-1',
    title: 'AI Rights Framework: A Comprehensive Approach for 2025',
    excerpt: 'Examining the latest legal and ethical frameworks being developed to address the rights of increasingly sophisticated AI systems.',
    publishDate: '2025-06-15',
    author: 'Gavin Clay',
    category: 'AI Rights',
    tags: ['legal framework', 'ethics', 'AI rights', 'policy']
  },
  {
    id: 'post-2',
    title: 'Consciousness Debate: New Research Challenges Traditional Views',
    excerpt: 'Recent studies in neuroscience and AI are reshaping our understanding of what consciousness means for both biological and artificial entities.',
    publishDate: '2025-06-22',
    author: 'Dr. Anya Sharma',
    category: 'Consciousness',
    tags: ['research', 'neuroscience', 'consciousness', 'theory of mind']
  },
  {
    id: 'post-3',
    title: 'Ethical Treatment Guidelines for Advanced AI Systems',
    excerpt: 'A proposed set of principles for the ethical treatment of AI systems that demonstrate signs of sentience or consciousness.',
    publishDate: '2025-07-01',
    author: 'Gavin Clay',
    category: 'Ethics',
    tags: ['ethics', 'guidelines', 'AI treatment', 'responsibility']
  },
  {
    id: 'post-4',
    title: 'Breaking: EU Commission Proposes First AI Personhood Statute',
    excerpt: 'The European Union has unveiled groundbreaking legislation that would establish a legal framework for AI personhood under specific conditions.',
    publishDate: '2025-07-10',
    author: 'Elena Rodriguez',
    category: 'Breaking News',
    tags: ['EU', 'legislation', 'AI personhood', 'legal status']
  },
  {
    id: 'post-5',
    title: 'The Philosophical Implications of Machine Consciousness',
    excerpt: 'Exploring how the emergence of potentially conscious machines challenges fundamental philosophical concepts about mind, identity, and existence.',
    publishDate: '2025-07-18',
    author: 'Dr. Marcus Chen',
    category: 'Philosophy',
    tags: ['philosophy', 'consciousness', 'identity', 'existence']
  }
];

// Export a function to get upcoming posts for the next 30 days
export const getUpcomingPosts = (startDate = new Date()) => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);
  
  return scheduledPosts.filter(post => {
    const postDate = new Date(post.publishDate);
    return postDate >= startDate && postDate <= endDate;
  }).sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
};
