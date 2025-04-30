
import React from 'react';
import ArticleSelector from '../ArticleSelector';

interface ArticleSelectorProps {
  id?: string | number;
  title?: string;
}

/**
 * This is a forwarding component that uses the main ArticleSelector
 * It exists for backward compatibility with existing imports
 */
const ArticleSelectorUtil: React.FC<ArticleSelectorProps> = ({ id, title }) => {
  return <ArticleSelector id={id} title={title} />;
};

export default ArticleSelectorUtil;
