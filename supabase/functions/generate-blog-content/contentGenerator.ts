
import { BlogPost } from './types.ts';
import { generateImageUrl } from './utils.ts';
import { generateEmotionalAIArticle, generateDefaultArticle } from './generators/index.ts';

// Function to generate article content based on the post metadata
export async function generateArticleContent(post: BlogPost): Promise<string> {
  const title = post.title || '';
  const tags = typeof post.tags === 'string' ? post.tags.split(',') : post.tags || [];
  const category = post.category || '';
  
  console.log(`Generating content for "${title}" in category "${category}"`);
  
  // Check if this is about emotional AI
  if (title.toLowerCase().includes('emotional') || 
      (Array.isArray(tags) && tags.some(tag => tag.toLowerCase().includes('emotion'))) ||
      category.toLowerCase().includes('psychology')) {
    return generateEmotionalAIArticle(title);
  }
  
  // Default to a general AI rights article
  return generateDefaultArticle(title);
}
