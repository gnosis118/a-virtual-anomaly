
import React, { ReactNode } from 'react';

interface ArticleSectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="mb-12">
      {title && <h2 className="text-2xl font-semibold mt-10 mb-4">{title}</h2>}
      {children}
    </section>
  );
};

export default ArticleSection;
