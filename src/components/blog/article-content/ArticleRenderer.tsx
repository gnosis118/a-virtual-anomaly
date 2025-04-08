
import React from 'react';
import DefaultArticleState from '../articles/DefaultArticleState';
import { DynamicArticleContent } from '../article-utils/ArticleLoaders';
import { emergentConsciousnessArticle } from './EmergentConsciousnessContent';

interface ArticleRendererProps {
  id?: string | number;
  title?: string;
  content?: string;
}

/**
 * Component responsible for rendering the appropriate article content
 * based on the available data
 */
const ArticleRenderer: React.FC<ArticleRendererProps> = ({ id, title, content }) => {
  // If we have direct content from the API, render it
  if (content) {
    return <DynamicArticleContent content={content} />;
  }
  
  // For post ID 1, always use the hardcoded emergent consciousness article
  if (id === 1) {
    return <DefaultArticleState title={title} content={emergentConsciousnessArticle} />;
  }
  
  return null;
};

export default ArticleRenderer;
