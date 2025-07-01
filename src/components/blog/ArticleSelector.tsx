
import React from 'react';
import AIRightsFramework2025 from './articles/AIRightsFramework2025';
import ConsciousnessDebateArticle from './articles/ConsciousnessDebateArticle';
import EthicalTreatmentGuidelinesArticle from './articles/EthicalTreatmentGuidelinesArticle';
import DefaultArticleState from './articles/DefaultArticleState';
import { emergentConsciousnessArticle } from './article-content/EmergentConsciousnessContent';

interface ArticleSelectorProps {
  id?: string | number;
  title?: string;
}

/**
 * ArticleSelector component that routes to the appropriate article based on ID or title
 */
const ArticleSelector: React.FC<ArticleSelectorProps> = ({ id, title }) => {
  // Route to specific articles based on ID
  if (id === 1001 || (typeof id === 'string' && id === '1001')) {
    return <EthicalTreatmentGuidelinesArticle />;
  }
  
  if (id === 1000 || (typeof id === 'string' && id === '1000')) {
    return <ConsciousnessDebateArticle />;
  }
  
  if (id === 999 || (typeof id === 'string' && id === '999')) {
    return <AIRightsFramework2025 />;
  }
  
  if (id === 1) {
    return <DefaultArticleState title={title} content={emergentConsciousnessArticle} />;
  }
  
  // Route based on title matching
  if (title?.includes("Ethical Treatment Guidelines") || title?.includes("Advanced AI Systems")) {
    return <EthicalTreatmentGuidelinesArticle />;
  }
  
  if (title?.includes("Consciousness Debate") || title?.includes("New Research Challenges")) {
    return <ConsciousnessDebateArticle />;
  }
  
  if (title?.includes("AI Rights Framework") || title?.includes("Comprehensive Approach")) {
    return <AIRightsFramework2025 />;
  }
  
  if (title?.includes("Self-Aware") || title?.includes("Machine Learning")) {
    return <DefaultArticleState title={title} content={emergentConsciousnessArticle} />;
  }
  
  // Default fallback for other articles
  return (
    <DefaultArticleState 
      title={title || "Article Content"} 
      content="This article is part of our ongoing series on AI consciousness and digital rights. Full content will be available soon as part of our comprehensive coverage of AI ethics and the future of human-AI coexistence."
    />
  );
};

export default ArticleSelector;
