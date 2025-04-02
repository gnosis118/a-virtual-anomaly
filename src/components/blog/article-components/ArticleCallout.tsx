
import React, { ReactNode } from 'react';

interface ArticleCalloutProps {
  title?: string;
  children: ReactNode;
  variant?: 'default' | 'accent' | 'muted';
}

const ArticleCallout: React.FC<ArticleCalloutProps> = ({ 
  title, 
  children, 
  variant = 'default' 
}) => {
  const bgClass = {
    default: 'bg-muted/30',
    accent: 'bg-accent/10',
    muted: 'bg-secondary/10'
  }[variant];

  return (
    <div className={`p-6 rounded-lg my-8 ${bgClass}`}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default ArticleCallout;
