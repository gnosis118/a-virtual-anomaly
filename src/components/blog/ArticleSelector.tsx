
import React from 'react';
import DefaultArticleState from './articles/DefaultArticleState';
import ArtificialConsciousnessArticle from './articles/ArtificialConsciousnessArticle';

interface ArticleSelectorProps {
  id?: string | number;
  title?: string;
}

const ArticleSelector: React.FC<ArticleSelectorProps> = ({ id, title }) => {
  if (title?.includes("The Birth of Artificial Consciousness")) {
    return <ArtificialConsciousnessArticle />;
  }
  
  return <DefaultArticleState title={title || "Article Coming Soon"} />;
};

export default ArticleSelector;
