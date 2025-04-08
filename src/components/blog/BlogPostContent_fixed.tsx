import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';
import DefaultArticleState from './articles/DefaultArticleState';
import { emergentConsciousnessArticle } from './article-content/EmergentConsciousnessContent';

const BlogPostContent: React.FC<{ postId: number }> = ({ postId }) => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        // Fetch the blog post content from Supabase
        const { data, error } = await supabase
          .from('scheduled_posts')
          .select('content')
          .eq('id', postId.toString())
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching content:', error);
          toast({
            title: "Error",
            description: "Failed to load article content.",
            variant: "destructive",
          });
          setContent(null);
        } else if (data && data.content) {
          setContent(data.content);
        } else {
          // If no content found in database, use hardcoded content for post ID 1
          if (postId === 1) {
            setContent(emergentConsciousnessArticle);
          } else {
            setContent(null);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, [postId]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading article...</span>
      </div>
    );
  }
  
  // Check if this is blog post 1 (the Introduction to A Virtual Anomaly article)
  if (postId === 1) {
    // Always render the emergent consciousness article content for blog post 1
    // regardless of what's in the database to ensure it's always available
    return (
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: emergentConsciousnessArticle }} />
      </div>
    );
  }
  
  if (!content) {
    return <DefaultArticleState />;
  }
  
  return (
    <div className="prose prose-lg max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BlogPostContent;