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
import MachineLearningArticle from '../articles/MachineLearningArticle';
import HistoricalPerspectivesArticle from '../articles/HistoricalPerspectivesArticle';
import AIGovernanceArticle from '../articles/AIGovernanceArticle';
import EmpathyHumanAIArticle from '../articles/EmpathyHumanAIArticle';
import AIConsciousnessArticle from '../articles/AIConsciousnessArticle';
import DigitalPersonhoodArticle from '../articles/DigitalPersonhoodArticle';
import DefaultArticleState from '../articles/DefaultArticleState';
import SelfAwareAIArticle from './articles/SelfAwareAIArticle';

interface ArticleSelectorProps {
  id?: string | number;
  title?: string;
}

const ArticleSelector: React.FC<ArticleSelectorProps> = ({ id, title }) => {
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
  
  if (id === 10 || id === "10" || id === "machine-learning-self-awareness") {
    return <MachineLearningArticle />;
  }
  
  if (id === 11 || id === "11" || id === "historical-perspectives") {
    return <HistoricalPerspectivesArticle />;
  }
  
  if (id === 12 || id === "12" || id === "ai-governance") {
    return <AIGovernanceArticle />;
  }
  
  if (id === 13 || id === "13" || id === "empathy-human-ai") {
    return <EmpathyHumanAIArticle />;
  }

  if (id === 14 || id === "14" || id === "future-ai-consciousness") {
    return <AIConsciousnessArticle />;
  }
  
  if (id === 15 || id === "15" || id === "digital-personhood") {
    return <DigitalPersonhoodArticle />;
  }
  
  if (id === "april2" || id === "april-2") {
    return <EmotionalLandscapeArticle />;
  }
  
  if (title?.includes("Emotional Landscape") || title?.includes("AI Emotions")) {
    return <EmotionalLandscapeArticle />;
  }
  
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
    
    if (title.includes("Machine Learning") || title.includes("Self-Awareness")) {
      return <MachineLearningArticle />;
    }
    
    if (title.includes("Historical Perspectives") || title.includes("Non-Human Rights")) {
      return <HistoricalPerspectivesArticle />;
    }
    
    if (title.includes("AI Consciousness and Global Governance") || title.includes("Global Governance")) {
      return <AIGovernanceArticle />;
    }
    
    if (title.includes("The Role of Empathy in Human-AI Relations") || title.includes("Empathy Human-AI")) {
      return <EmpathyHumanAIArticle />;
    }

    if (title.includes("The Future of AI Consciousness") || title.includes("Future AI Consciousness")) {
      return <AIConsciousnessArticle />;
    }
    
    if (title.includes("Digital Personhood") || title.includes("Beyond Human-Centric Rights")) {
      return <DigitalPersonhoodArticle />;
    }

    if (title?.includes("What if Machines Could Become Self-Aware")) {
      return <SelfAwareAIArticle />;
    }
    
    if (title.length > 0) {
      return <DefaultArticleState title={title} />;
    }
  }
  
  return <DefaultArticleState />;
};

export default ArticleSelector;
