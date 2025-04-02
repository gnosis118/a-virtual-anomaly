
import React from 'react';
import { cn } from '@/lib/utils';

interface ArticleQuoteProps {
  quote: string;
  citation?: string;
  className?: string;
  variant?: 'default' | 'accent' | 'muted';
}

const ArticleQuote: React.FC<ArticleQuoteProps> = ({ 
  quote, 
  citation,
  className,
  variant = 'default'
}) => {
  const bgClass = {
    default: 'bg-secondary/20',
    accent: 'bg-accent/20',
    muted: 'bg-muted/30'
  }[variant];

  return (
    <div className={cn("p-6 rounded-lg my-8", bgClass, className)}>
      <blockquote className="border-l-4 border-accent pl-4 italic text-xl">
        "{quote}"
        {citation && (
          <footer className="mt-2 text-sm">
            — {citation}
          </footer>
        )}
      </blockquote>
    </div>
  );
};

export default ArticleQuote;
