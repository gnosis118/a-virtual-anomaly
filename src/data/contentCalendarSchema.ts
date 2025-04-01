
// This file contains the database schema types for the content calendar
// These types should match the tables in Supabase

export interface ScheduledPost {
  id: number | string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  category: string;
  tags: string;
  publishDate: Date;
  status: 'draft' | 'scheduled' | 'published';
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  views: number;
  category: string;
  featured: boolean;
  tags: string[];
}

// Convert a ScheduledPost to a BlogPost
export function convertToBlogPost(scheduledPost: ScheduledPost, imageUrl: string): Partial<BlogPost> {
  return {
    title: scheduledPost.title,
    excerpt: scheduledPost.excerpt,
    content: scheduledPost.content || '',
    image: imageUrl,
    category: scheduledPost.category,
    tags: scheduledPost.tags.split(',').map(tag => tag.trim()),
    author: scheduledPost.author,
    date: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    readTime: '20 min read', // Placeholder, will be calculated based on content length
    views: 0,
    featured: false
  };
}
