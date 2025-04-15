
import React from 'react';

type QuoteStyle = 'default' | 'highlight' | 'academic' | 'personal' | 'historical';

interface ArticleQuoteProps {
  quote: string;
  citation?: string;
  author?: string;
  title?: string;
  style?: QuoteStyle;
}

const ArticleQuote: React.FC<ArticleQuoteProps> = ({ 
  quote, 
  citation, 
  author, 
  title, 
  style = 'default' 
}) => {
  // Style configurations for different quote types
  const styleClasses = {
    default: "border-l-4 border-accent pl-4 py-2 my-8 italic text-muted-foreground",
    highlight: "bg-accent/10 p-6 rounded-lg my-8 border-l-4 border-accent italic text-foreground shadow-sm",
    academic: "border border-muted p-6 rounded-lg my-8 text-foreground bg-muted/30",
    personal: "border-l-4 border-amber-400 pl-4 py-2 my-8 italic text-muted-foreground",
    historical: "border-2 border-muted p-6 rounded-lg my-8 bg-muted/10 text-foreground font-serif",
  };

  // Citation display logic
  const renderCitation = () => {
    if (citation) {
      return <cite className="block text-sm mt-2 not-italic">— {citation}</cite>;
    }
    if (author && title) {
      return <cite className="block text-sm mt-2 not-italic">— {author}, {title}</cite>;
    }
    if (author && !title) {
      return <cite className="block text-sm mt-2 not-italic">— {author}</cite>;
    }
    return null;
  };

  return (
    <blockquote className={styleClasses[style]}>
      <p className={`text-lg leading-relaxed ${style === 'academic' ? 'font-normal' : 'italic'}`}>{quote}</p>
      {renderCitation()}
    </blockquote>
  );
};

export default ArticleQuote;
