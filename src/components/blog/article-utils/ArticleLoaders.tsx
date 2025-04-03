
import React from 'react';

/**
 * Loading state component for articles
 */
export const ArticleLoadingState: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

/**
 * Component for rendering dynamic content from API
 */
export const DynamicArticleContent: React.FC<{ content: string }> = ({ content }) => (
  <div className="prose prose-slate max-w-none">
    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
  </div>
);
