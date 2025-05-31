import { useEffect } from 'react';
import { initializeArticleGenerationSystem, checkScheduledArticles } from '@/components/blog/auto-generator';
import { toast } from "@/components/ui/use-toast";

/**
 * Hook to initialize and manage the automatic article generation system
 */
export function useArticleGenerator() {
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        // Initialize the article generation system
        const success = await initializeArticleGenerationSystem();
        
        if (success) {
          toast({
            title: "Article Generator Initialized",
            description: "The automatic article generation system has been successfully initialized.",
          });
          
          // Check for any articles that need to be published
          await checkScheduledArticles();
        } else {
          console.error('Failed to initialize article generation system');
        }
      } catch (error) {
        console.error('Error in useArticleGenerator:', error);
      }
    };
    
    // Initialize the system
    initializeSystem();
    
    // Set up a daily check for scheduled articles
    const checkInterval = setInterval(async () => {
      await checkScheduledArticles();
    }, 24 * 60 * 60 * 1000); // Check once per day
    
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(checkInterval);
    };
  }, []);
}
