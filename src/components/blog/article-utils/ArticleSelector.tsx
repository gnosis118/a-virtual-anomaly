
import React from 'react';
import RoleOfEthicsArticle from '../articles/RoleOfEthicsArticle';
import AIImpactArticle from '../articles/AIImpactArticle';
import AIEmotionalFrontierArticle from '../articles/AIEmotionalFrontierArticle';
import LegalFrameworkArticle from '../articles/LegalFrameworkArticle';
import ConsciousnessEmergentArticle from '../articles/ConsciousnessEmergentArticle';
import EmotionalLandscapeArticle from '../articles/EmotionalLandscapeArticle';
import TuringTestArticle from '../articles/TuringTestArticle';
import ConsciousnessMeasurementArticle from '../articles/ConsciousnessMeasurementArticle';
import GeoffreyHintonArticle from '../articles/GeoffreyHintonArticle';
import DefaultArticleState from '../articles/DefaultArticleState';

interface ArticleSelectorProps {
  id?: string | number;
  title?: string;
}

/**
 * Component for selecting the appropriate article based on ID or title
 */
const ArticleSelector: React.FC<ArticleSelectorProps> = ({ id, title }) => {
  // Check for specific article by ID first (most reliable)
  if (id === 7 || id === "7") {
    return <TuringTestArticle />;
  }
  
  if (id === 4 || id === "4") {
    return <AIEmotionalFrontierArticle />;
  }
  
  if (id === 5 || id === "5") {
    return <LegalFrameworkArticle />;
  }
  
  if (id === 6 || id === "6") {
    return <ConsciousnessEmergentArticle />;
  }
  
  if (id === 8 || id === "8" || id === "april4") {
    return <ConsciousnessMeasurementArticle />;
  }
  
  if (id === 9 || id === "9" || id === "geoffrey-hinton") {
    return <GeoffreyHintonArticle />;
  }
  
  // Special case for April 2nd article
  if (id === "april2" || id === "april-2") {
    return <EmotionalLandscapeArticle />;
  }
  
  // Match by title for flexibility
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
    
    if (title.includes("Turing Test") || title.includes("AI Passes")) {
      return <TuringTestArticle />;
    }
    
    if (title.includes("Measuring Consciousness") || title.includes("Quantitative Approaches")) {
      return <ConsciousnessMeasurementArticle />;
    }
    
    if (title.includes("Geoffrey Hinton") || title.includes("Will AI Save the World")) {
      return <GeoffreyHintonArticle />;
    }
    
    // For all other titles, use the title to generate somewhat relevant content
    if (title.length > 0) {
      return <DefaultArticleState title={title} />;
    }
  }
  
  // For other articles, use the default implementation
  return <DefaultArticleState />;
};

export default ArticleSelector;
