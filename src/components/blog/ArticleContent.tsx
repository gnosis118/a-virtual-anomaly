
import React from 'react';
import { ArticleLoadingState, DynamicArticleContent } from './article-utils/ArticleLoaders';
import ArticleSelector from './ArticleSelector';
import DefaultArticleState from './articles/DefaultArticleState';
import { emergentConsciousnessArticle } from './article-content/EmergentConsciousnessContent';

interface ArticleContentProps {
  id?: string | number;
  title?: string;
  content?: string;
  loading?: boolean;
}

/**
 * ArticleContent component that loads the appropriate article based on ID or title
 * This component is used on the public-facing blog and does not contain any admin features
 */
const ArticleContent: React.FC<ArticleContentProps> = ({ id, title, content, loading }) => {
  // Show loading state if loading prop is true
  if (loading) {
    return <ArticleLoadingState />;
  }
  
  // If we have direct content from the API, render it
  if (content) {
    return <DynamicArticleContent content={content} />;
  }
  
  // For post ID 1, always use the hardcoded emergent consciousness article
  if (id === 1) {
    return <DefaultArticleState title={title} content={emergentConsciousnessArticle} />;
  }
  
  // Return the appropriate article component based on ID or title
  return <ArticleSelector id={id} title={title} />;
};

export default ArticleContent;
