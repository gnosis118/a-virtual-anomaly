
import React, { useState } from 'react';
import RoleOfEthicsArticle from './articles/RoleOfEthicsArticle';
import AIImpactArticle from './articles/AIImpactArticle';
import AIEmotionalFrontierArticle from './articles/AIEmotionalFrontierArticle';
import LegalFrameworkArticle from './articles/LegalFrameworkArticle';
import ConsciousnessEmergentArticle from './articles/ConsciousnessEmergentArticle';
import EmotionalLandscapeArticle from './articles/EmotionalLandscapeArticle';
import DefaultArticleState from './articles/DefaultArticleState';

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
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }
  
  // If we have direct content from the API, render it
  if (content) {
    return (
      <div className="prose prose-slate max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
      </div>
    );
  }
  
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
  
  // Special case for April 2nd article
  if (id === "april2" || id === "april-2") {
    return <EmotionalLandscapeArticle />;
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
    
    if (title.includes("Emotional Landscape")) {
      return <EmotionalLandscapeArticle />;
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
