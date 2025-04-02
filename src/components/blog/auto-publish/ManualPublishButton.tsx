
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RotateCw } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ManualPublishButton: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  
  const runManualPublish = async () => {
    setIsRunning(true);
    toast({
      title: "Publishing scheduled content",
      description: "We're generating and publishing your scheduled content. This may take a few minutes.",
    });
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-scheduled-post');
      
      if (error) {
        throw error;
      }
      
      if (data.results && data.results.length > 0) {
        const publishedCount = data.results.filter(r => r.success).length;
        const failedCount = data.results.filter(r => !r.success).length;
        
        toast({
          title: "Content publishing complete",
          description: `Successfully published ${publishedCount} posts${failedCount > 0 ? `, with ${failedCount} failures` : ''}`,
          variant: failedCount > 0 ? "destructive" : "default",
        });
      } else {
        toast({
          title: "No content to publish",
          description: "There are no scheduled posts ready for today",
        });
      }
    } catch (error) {
      console.error('Error running content generation:', error);
      toast({
        title: "Publishing failed",
        description: `An error occurred: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Button 
      onClick={runManualPublish} 
      disabled={isRunning}
      className="gap-2"
    >
      {isRunning ? (
        <>
          <RotateCw className="h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Publish Now"
      )}
    </Button>
  );
};

export default ManualPublishButton;
