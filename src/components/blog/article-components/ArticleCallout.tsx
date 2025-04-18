
import React from 'react';

export interface ArticleCalloutProps {
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'error';
}

const ArticleCallout: React.FC<ArticleCalloutProps> = ({ children, variant = 'info' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`my-6 p-4 border-l-4 rounded-r ${getVariantStyles()}`}>
      {children}
    </div>
  );
};

export default ArticleCallout;
