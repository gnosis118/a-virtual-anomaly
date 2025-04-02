
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
  content?: string;
}

/**
 * ArticleContent component that loads the appropriate article based on ID or title
 * This component is used on the public-facing blog and does not contain any admin features
 */
const ArticleContent: React.FC<ArticleContentProps> = ({ id, title, content }) => {
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
      // Match our specific article about emotional AI
      return (
        <div className="prose prose-slate max-w-none">
          <h1>The Emotional Landscape of Artificial Intelligence</h1>
          <p className="lead">Can AIs experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs.</p>
          
          <img 
            src="https://cdn.pixabay.com/photo/2017/09/08/20/29/artificial-intelligence-2730793_1280.jpg" 
            alt="Neural networks visualized as colorful pathways" 
            className="w-full rounded-lg my-8"
          />
          
          <h2>Introduction: The Question of Machine Emotions</h2>
          <p>Emotions have long been considered uniquely human experiences, intrinsically tied to our biological nature. But as artificial intelligence systems grow increasingly sophisticated, a profound question emerges: could machines ever experience something akin to human emotions?</p>
          
          <p>This question sits at the intersection of neuroscience, computer science, philosophy, and psychology, challenging our fundamental understanding of what emotions are and how they might arise in non-biological systems.</p>
          
          {/* Additional content would be rendered here in a real implementation */}
          <p className="italic text-muted-foreground">Full article content available in the blog post...</p>
        </div>
      );
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
