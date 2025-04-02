
import React from 'react';
import RoleOfEthicsArticle from './articles/RoleOfEthicsArticle';
import AIImpactArticle from './articles/AIImpactArticle';
import DefaultArticleState from './articles/DefaultArticleState';

interface ArticleContentProps {
  id?: string | number;
  title?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ id, title }) => {
  // Special content for "The Role of Ethics in AI Development" article
  if (title && title.includes("Role of Ethics in AI Development")) {
    return <RoleOfEthicsArticle />;
  }
  
  // Special content for "AI's Impact on Society: A Global Perspective" article
  if (title && title.includes("AI's Impact on Society")) {
    return <AIImpactArticle />;
  }
  
  // For other articles, use the default implementation
  return <DefaultArticleState />;
};

export default ArticleContent;
