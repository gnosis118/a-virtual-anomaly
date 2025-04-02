
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ArticleSectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ 
  id, 
  title, 
  children, 
  className,
  titleClassName
}) => {
  return (
    <section id={id} className={cn("mb-12", className)}>
      {title && (
        <h2 className={cn("text-2xl font-semibold mt-10 mb-4", titleClassName)}>
          {title}
        </h2>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
};

export default ArticleSection;
