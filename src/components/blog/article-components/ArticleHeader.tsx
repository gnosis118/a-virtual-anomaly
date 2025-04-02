
import React from 'react';
import { cn } from '@/lib/utils';

interface ArticleHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ 
  title, 
  subtitle,
  className,
  titleClassName,
  subtitleClassName
}) => {
  return (
    <header className={cn("mb-8", className)}>
      <h1 className={cn("text-3xl md:text-4xl font-bold mb-4", titleClassName)}>
        {title}
      </h1>
      {subtitle && (
        <p className={cn("text-lg md:text-xl text-muted-foreground leading-relaxed", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default ArticleHeader;
