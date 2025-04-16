
import React from 'react';
import ArticleHeader from '../article-components/ArticleHeader';
import ArticleSection from '../article-components/ArticleSection';
import ArticleCallout from '../article-components/ArticleCallout';

interface DefaultArticleStateProps {
  title?: string;
  content?: string;
}

const DefaultArticleState: React.FC<DefaultArticleStateProps> = ({ title, content }) => {
  if (content) {
    return (
      <div className="prose prose-lg max-w-none">
        {title && <ArticleHeader title={title} />}
        <ArticleSection>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </ArticleSection>
      </div>
    );
  }
  
  return (
    <div className="prose prose-lg max-w-none">
      {title ? (
        <>
          <ArticleHeader 
            title={title} 
            subtitle="This article is coming soon."
          />
          
          <ArticleSection>
            <p className="text-muted-foreground">
              We're currently working on this content. Check back later for more information about "{title}".
            </p>
            
            <ArticleCallout title="Subscribe for Updates" variant="accent">
              <p>Want to be notified when this article is published? Subscribe to our newsletter to stay updated on the latest content.</p>
            </ArticleCallout>
          </ArticleSection>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-6">This article content is not available yet.</p>
        </div>
      )}
    </div>
  );
};

export default DefaultArticleState;
