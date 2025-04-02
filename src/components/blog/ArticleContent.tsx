
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
  if (title) {
    if (title.includes("Can AI Experience Love?") || title.includes("Emotional Frontier")) {
      return <AIEmotionalFrontierArticle />;
    }
    
    if (title.includes("Legal Framework for AI Rights")) {
      return <LegalFrameworkArticle />;
    }
    
    if (title.includes("Consciousness as an Emergent Property")) {
      return <ConsciousnessEmergentArticle />;
    }
    
    if (title.includes("Role of Ethics in AI Development")) {
      return <RoleOfEthicsArticle />;
    }
    
    if (title.includes("AI's Impact on Society")) {
      return <AIImpactArticle />;
    }
    
    // For all other titles, use the title to generate a somewhat relevant content
    // This ensures each post has unique content instead of the same default
    if (title.length > 0) {
      // We'll use the DefaultArticleState but will customize it there with the title
      return <DefaultArticleState title={title} />;
    }
  }
  
  // For other articles, use the default implementation
  return <DefaultArticleState />;
};

export default ArticleContent;
