
import React from 'react';
import RoleOfEthicsArticle from './articles/RoleOfEthicsArticle';
import AIImpactArticle from './articles/AIImpactArticle';
import AIEmotionalFrontierArticle from './articles/AIEmotionalFrontierArticle';
import LegalFrameworkArticle from './articles/LegalFrameworkArticle';
import ConsciousnessEmergentArticle from './articles/ConsciousnessEmergentArticle';
import DefaultArticleState from './articles/DefaultArticleState';

interface ArticleContentProps {
  id?: string | number;
  title?: string;
}

/**
 * ArticleContent component that loads the appropriate article based on ID or title
 * This component is used on the public-facing blog and does not contain any admin features
 */
const ArticleContent: React.FC<ArticleContentProps> = ({ id, title }) => {
  // Check for specific article by ID first (most reliable)
  if (id === 4 || id === "4") {
    return <AIEmotionalFrontierArticle />;
  }
  
  if (id === 5 || id === "5") {
    return <LegalFrameworkArticle />;
  }
  
  if (id === 6 || id === "6") {
    return <ConsciousnessEmergentArticle />;
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
  
  // Match Consciousness as an Emergent Property article
  if (title && title.includes("Consciousness as an Emergent Property")) {
    return <ConsciousnessEmergentArticle />;
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
