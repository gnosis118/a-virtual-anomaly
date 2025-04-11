
import React from 'react';

export interface ArticleHeaderProps {
  title: string;
  subtitle?: string;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
    </header>
  );
};

export interface ArticleSectionProps {
  title?: string;
  children: React.ReactNode;
}

export const ArticleSection: React.FC<ArticleSectionProps> = ({ title, children }) => {
  return (
    <section className="mb-8">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <div>{children}</div>
    </section>
  );
};

export interface ArticleQuoteProps {
  children: React.ReactNode;
  author?: string;
  citation?: string;
}

export const ArticleQuote: React.FC<ArticleQuoteProps> = ({ children, author, citation }) => {
  return (
    <blockquote className="border-l-4 border-accent pl-4 italic my-6 py-2">
      <p className="mb-2">{children}</p>
      {(author || citation) && (
        <footer className="text-sm text-muted-foreground">
          {author && <span className="font-semibold">{author}</span>}
          {author && citation && <span>, </span>}
          {citation && <cite>{citation}</cite>}
        </footer>
      )}
    </blockquote>
  );
};

export interface ArticleCalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success' | 'error';
}

export const ArticleCallout: React.FC<ArticleCalloutProps> = ({ children, type = 'info' }) => {
  const colorMap = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  return (
    <div className={`p-4 border-l-4 rounded-r-md my-6 ${colorMap[type]}`}>
      {children}
    </div>
  );
};

export interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({ src, alt, caption }) => {
  return (
    <figure className="my-8">
      <img 
        src={src} 
        alt={alt} 
        className="w-full rounded-md shadow-md"
        onError={(e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?auto=format&fit=crop&w=1965&q=80";
        }}
      />
      {caption && (
        <figcaption className="text-sm text-center text-muted-foreground mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
