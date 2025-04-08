
import React from 'react';
import ArticleSelector from '../article-utils/ArticleSelector';

interface ArticleRouterProps {
  id?: string | number;
  title?: string;
}

/**
 * Component responsible for routing to the correct article component
 * based on the ID or title
 */
const ArticleRouter: React.FC<ArticleRouterProps> = ({ id, title }) => {
  return <ArticleSelector id={id} title={title} />;
};

export default ArticleRouter;
