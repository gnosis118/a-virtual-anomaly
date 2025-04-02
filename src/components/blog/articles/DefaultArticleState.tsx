
import React from 'react';

interface DefaultArticleStateProps {
  title?: string;
}

const DefaultArticleState: React.FC<DefaultArticleStateProps> = ({ title }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="text-center py-10">
        {title ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="text-muted-foreground">
              This article is coming soon. Check back later for content about "{title}".
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground mb-6">This article content is not available yet.</p>
        )}
      </div>
    </div>
  );
};

export default DefaultArticleState;
