
import React from 'react';
import DefaultArticleState from './articles/DefaultArticleState';
import SelfAwareAIArticle from './articles/SelfAwareAIArticle';

interface ArticleSelectorProps {
  id?: string | number;
  title?: string;
}

const ArticleSelector: React.FC<ArticleSelectorProps> = ({ id, title }) => {
  // Check if this is the Self-Aware AI article
  if (title?.includes("What if Machines Could Become Self-Aware")) {
    return <SelfAwareAIArticle />;
  }
  
  return <DefaultArticleState title={title || "Article Coming Soon"} />;
};

export default ArticleSelector;
