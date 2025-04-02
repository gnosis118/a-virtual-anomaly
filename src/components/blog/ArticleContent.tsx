
import React from 'react';
import RoleOfEthicsArticle from './articles/RoleOfEthicsArticle';
import AIImpactArticle from './articles/AIImpactArticle';
import AIEmotionalFrontierArticle from './articles/AIEmotionalFrontierArticle';
import LegalFrameworkArticle from './articles/LegalFrameworkArticle';
import DefaultArticleState from './articles/DefaultArticleState';

interface ArticleContentProps {
  id?: string | number;
  title?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ id, title }) => {
  // Check for specific article by ID first (most reliable)
  if (id === 4 || id === "4") {
    return <AIEmotionalFrontierArticle />;
  }
  
  if (id === 5 || id === "5") {
    return <LegalFrameworkArticle />;
  }
  
  // Also match by title for flexibility
  if (title && (
    title.includes("Can AI Experience Love?") || 
    title.includes("Emotional Frontier")
  )) {
    return <AIEmotionalFrontierArticle />;
  }
  
  // Match The Legal Framework for AI Rights article
  if (title && title.includes("Legal Framework for AI Rights")) {
    return <LegalFrameworkArticle />;
  }
  
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
