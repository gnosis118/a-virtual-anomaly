
import { BlogPost } from '@/types/blog';

export interface ScheduledPost {
  id: string | number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  category: string;
  tags: string;
  publishDate: Date; // Frontend representation uses camelCase
  status: 'draft' | 'scheduled' | 'published';
  image_url?: string; // Explicitly defined as optional
}

// Convert a ScheduledPost to a BlogPost
export function convertToBlogPost(scheduledPost: ScheduledPost, imageUrl: string): Partial<BlogPost> {
  return {
    title: scheduledPost.title,
    excerpt: scheduledPost.excerpt,
    content: scheduledPost.content || '',
    image: imageUrl || scheduledPost.image_url || '',
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
