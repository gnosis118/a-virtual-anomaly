
import React from 'react';

interface ArticleQuoteProps {
  quote: string;
  citation?: string;
  author?: string;
  title?: string;
  source?: string;
}

const ArticleQuote: React.FC<ArticleQuoteProps> = ({ quote, citation, author, title, source }) => {
  return (
    <blockquote className="border-l-4 border-accent pl-4 py-2 my-8 italic text-muted-foreground">
      <p className="text-lg leading-relaxed">{quote}</p>
      {citation && <cite className="block text-sm mt-2 not-italic">— {citation}</cite>}
      {author && title && <cite className="block text-sm mt-2 not-italic">— {author}, {title}</cite>}
      {author && source && <cite className="block text-sm mt-2 not-italic">— {author}, {source}</cite>}
      {author && !title && !source && <cite className="block text-sm mt-2 not-italic">— {author}</cite>}
    </blockquote>
  );
};

export default ArticleQuote;
