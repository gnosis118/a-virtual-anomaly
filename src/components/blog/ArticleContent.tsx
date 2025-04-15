import React from 'react';
import { ArticleLoadingState } from './article-utils/ArticleLoaders';
import ArticleRenderer from './article-content/ArticleRenderer';
import ArticleRouter from './article-content/ArticleRouter';

interface ArticleContentProps {
  id?: string | number;
  title?: string;
  content?: string;
  loading?: boolean;
}

/**
 * Main ArticleContent component that orchestrates the article loading process
 * This component is used on the public-facing blog and does not contain any admin features
 */
const ArticleContent: React.FC<ArticleContentProps> = ({ id, title, content, loading }) => {
  // Show loading state if loading prop is true
  if (loading) {
    return <ArticleLoadingState />;
  }
  
  // First try to render content directly if available
  const renderedContent = <ArticleRenderer id={id} title={title} content={content} />;
  
  // If the renderer returned content, use it
  if (renderedContent) {
    return renderedContent;
  }
  
  // Otherwise use the router to find the right article component
  return <ArticleRouter id={id} title={title} />;
};

export default ArticleContent;
