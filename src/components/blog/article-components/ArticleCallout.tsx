
import React from 'react';

export interface ArticleCalloutProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'info' | 'warning' | 'success' | 'error' | 'accent';
}

const ArticleCallout: React.FC<ArticleCalloutProps> = ({ 
  children, 
  title,
  variant = 'info' 
}) => {
  // Determine background and border color based on variant
  let bgClass = 'bg-blue-50 border-blue-300'; // Default (info)
  
  if (variant === 'warning') {
    bgClass = 'bg-amber-50 border-amber-300';
  } else if (variant === 'success') {
    bgClass = 'bg-emerald-50 border-emerald-300';
  } else if (variant === 'error') {
    bgClass = 'bg-red-50 border-red-300';
  } else if (variant === 'accent') {
    bgClass = 'bg-accent/10 border-accent';
  }

  return (
    <div className={`p-6 my-8 rounded-lg border-l-4 ${bgClass}`}>
      {title && (
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
      )}
      {children}
    </div>
  );
};

export default ArticleCallout;
