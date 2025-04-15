
import React from 'react';
import RoleOfEthicsArticle from '../articles/RoleOfEthicsArticle';
import AIImpactArticle from '../articles/AIImpactArticle';
import AIEmotionalFrontierArticle from '../articles/AIEmotionalFrontierArticle';
import EmotionalLandscapeArticle from '../articles/EmotionalLandscapeArticle';
import TuringTestArticle from '../articles/TuringTestArticle';
import AIConsciousnessGovernanceArticle from '../articles/ai-governance/AIConsciousnessGovernanceArticle';
import DefaultArticleState from '../articles/DefaultArticleState';

interface ArticleSelectorProps {
  id?: string | number;
  title?: string;
}

const ArticleSelector: React.FC<ArticleSelectorProps> = ({ id, title }) => {
  // Handle special cases by ID
  if (typeof id === 'string') {
    // Special case for AI Consciousness and Global Governance
    if (id === "ai-consciousness-governance") {
      return <AIConsciousnessGovernanceArticle />;
    }

    // Special case for AI Emotional Frontier
    if (id === "ai-emotional-frontier") {
      return <AIEmotionalFrontierArticle />;
    }

    // Special case for Turing Test article
    if (id === "turing-test") {
      return <TuringTestArticle />;
    }

    // Special case for April 2nd article
    if (id === "april2" || id === "april-2") {
      return <EmotionalLandscapeArticle />;
    }
  }

  // Handle special cases by numeric ID
  if (typeof id === 'number') {
    switch (id) {
      case 1:
        return <DefaultArticleState title="Introduction to A Virtual Anomaly" />;
      case 2:
        return <RoleOfEthicsArticle />;
      case 3:
        return <AIImpactArticle />;
      case 4:
        return <AIEmotionalFrontierArticle />;
      case 7:
        return <TuringTestArticle />;
    }
  }

  // Match by title as fallback
  if (title) {
    if (title.includes("AI Consciousness and Global Governance")) {
      return <AIConsciousnessGovernanceArticle />;
    }
    if (title.includes("Role of Ethics in AI Development")) {
      return <RoleOfEthicsArticle />;
    }
    if (title.includes("AI's Impact on Society")) {
      return <AIImpactArticle />;
    }
    if (title.includes("Can AI Experience Love?")) {
      return <AIEmotionalFrontierArticle />;
    }
    if (title.includes("Turing Test")) {
      return <TuringTestArticle />;
    }
    if (title.includes("Emotional Landscape")) {
      return <EmotionalLandscapeArticle />;
    }
  }

  // For any other articles or if no match is found
  return <DefaultArticleState title={title} />;
};

export default ArticleSelector;
