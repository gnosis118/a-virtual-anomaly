
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';
import DefaultArticleState from './articles/DefaultArticleState';

const BlogPostContent: React.FC<{ postId: number }> = ({ postId }) => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        // Fetch the blog post content from Supabase
        // Convert postId to string since Supabase expects string for UUID
        const { data, error } = await supabase
          .from('scheduled_posts')
          .select('content')
          .eq('id', postId.toString())
          .single();
        
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
          setContent(null);
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
