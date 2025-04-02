
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Lightbulb, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface GenerateArticleButtonProps {
  postId: string;
  onSuccess?: () => void;
}

const GenerateArticleButton: React.FC<GenerateArticleButtonProps> = ({ 
  postId,
  onSuccess
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateArticle = async () => {
    if (!postId) return;
    
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating article",
        description: "We're creating a full article with an image. This may take a moment.",
      });
      
      const { data, error } = await supabase.functions.invoke('generate-blog-content', {
        body: { postId }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.success) {
        toast({
          title: "Article generated",
          description: "The article has been successfully generated and published.",
        });
        
        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error generating article:', error);
      toast({
        title: "Generation failed",
        description: error.message || "An error occurred while generating the article.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Button
      onClick={generateArticle}
      disabled={isGenerating}
      className="gap-2"
      variant="outline"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Lightbulb className="h-4 w-4" />
          Generate Article
        </>
      )}
    </Button>
  );
};

export default GenerateArticleButton;
