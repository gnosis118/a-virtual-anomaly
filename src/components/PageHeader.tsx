
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">{title}</h1>
      {description && (
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
