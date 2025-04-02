
import React from 'react';

interface ArticleHeaderProps {
  title: string;
  subtitle?: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default ArticleHeader;
