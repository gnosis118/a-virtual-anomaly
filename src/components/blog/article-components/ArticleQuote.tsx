
import React, { ReactNode } from 'react';

interface ArticleQuoteProps {
  quote: string;
  citation?: string;
}

const ArticleQuote: React.FC<ArticleQuoteProps> = ({ quote, citation }) => {
  return (
    <div className="bg-secondary/20 p-6 rounded-lg my-8">
      <blockquote className="border-l-4 border-accent pl-4 italic text-xl">
        "{quote}"
        {citation && <footer className="mt-2 text-sm">— {citation}</footer>}
      </blockquote>
    </div>
  );
};

export default ArticleQuote;
