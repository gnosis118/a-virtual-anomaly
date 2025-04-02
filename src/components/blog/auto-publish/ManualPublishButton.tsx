
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Play, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const ManualPublishButton: React.FC = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  
  const handleTriggerPublish = async () => {
    setIsPublishing(true);
    
    try {
      toast({
        title: "Processing scheduled posts",
        description: "We're checking for posts due for publication. This may take a moment.",
      });
      
      const { data, error } = await supabase.functions.invoke('generate-scheduled-post');
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.success) {
        const processedCount = data.results?.length || 0;
        
        if (processedCount > 0) {
          toast({
            title: "Posts published successfully",
            description: `${processedCount} posts have been generated and published.`,
          });
        } else {
          toast({
            title: "No posts to publish",
            description: "There are no scheduled posts due for publication at this time.",
          });
        }
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error publishing posts:', error);
      toast({
        title: "Publishing failed",
        description: error.message || "An error occurred while publishing scheduled posts.",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };
  
  return (
    <Button
      onClick={handleTriggerPublish}
      disabled={isPublishing}
      variant="outline"
      className="gap-2"
    >
      {isPublishing ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Publishing...
        </>
      ) : (
        <>
          <Play className="h-4 w-4" />
          Run Now
        </>
      )}
    </Button>
  );
};

export default ManualPublishButton;
