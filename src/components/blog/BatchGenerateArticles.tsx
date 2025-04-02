
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Zap } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { BLOG_POSTS } from '@/data/blogData';

const BatchGenerateArticles: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<{total: number, completed: number, failed: number}>({
    total: 0,
    completed: 0,
    failed: 0
  });
  
  const generateAllArticles = async () => {
    setIsGenerating(true);
    
    try {
      // Get the list of blog posts that need content
      const emptyPosts = BLOG_POSTS.filter(post => !post.content || post.content.trim() === '');
      
      if (emptyPosts.length === 0) {
        toast({
          title: "No empty posts found",
          description: "All blog posts already have content.",
        });
        setIsGenerating(false);
        return;
      }
      
      setProgress({
        total: emptyPosts.length,
        completed: 0,
        failed: 0
      });
      
      toast({
        title: "Generating articles",
        description: `Starting generation for ${emptyPosts.length} articles. This may take a while.`,
      });
      
      // Process each post in sequence to avoid overloading the API
      for (const post of emptyPosts) {
        try {
          await supabase.functions.invoke('generate-blog-content', {
            body: { postId: post.id.toString() }
          });
          
          setProgress(prev => ({
            ...prev,
            completed: prev.completed + 1
          }));
          
          toast({
            title: "Article generated",
            description: `"${post.title}" has been generated.`,
          });
          
        } catch (error) {
          console.error(`Error generating article for post ${post.id}:`, error);
          
          setProgress(prev => ({
            ...prev,
            failed: prev.failed + 1
          }));
          
          toast({
            title: "Generation failed",
            description: `Failed to generate article for "${post.title}".`,
            variant: "destructive"
          });
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      toast({
        title: "Batch generation complete",
        description: `Generated ${progress.completed} articles with ${progress.failed} failures.`,
      });
      
    } catch (error) {
      console.error('Error in batch article generation:', error);
      toast({
        title: "Generation failed",
        description: error.message || "An error occurred during batch generation.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Button
      onClick={generateAllArticles}
      disabled={isGenerating}
      variant="default"
      className="gap-2 bg-accent text-black hover:bg-accent/90"
      size="lg"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating {progress.completed + progress.failed}/{progress.total}...
        </>
      ) : (
        <>
          <Zap className="h-4 w-4" />
          Generate All Empty Articles
        </>
      )}
    </Button>
  );
};

export default BatchGenerateArticles;
