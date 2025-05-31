import { useEffect } from 'react';
import { useArticleGenerator } from '@/hooks/useArticleGenerator';

/**
 * Component to integrate the automatic article generator into the blog page
 */
export const ArticleGeneratorIntegration = () => {
  // Initialize the article generator
  useArticleGenerator();
  
  return null; // This is a non-visual component
};

export default ArticleGeneratorIntegration;
