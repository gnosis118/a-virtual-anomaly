
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading state component for articles
 */
export const ArticleLoadingState: React.FC = () => (
  <div className="space-y-8">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
    
    <div className="py-4">
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
    
    <div className="py-4">
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
    
    <Skeleton className="h-48 w-full rounded-md" />
    
    <div className="py-4">
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

/**
 * Component for rendering dynamic content from API
 */
export const DynamicArticleContent: React.FC<{ content: string }> = ({ content }) => (
  <div className="prose prose-lg max-w-none">
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);
