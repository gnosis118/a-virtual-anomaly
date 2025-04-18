
import { supabase } from '@/integrations/supabase/client';

export const generateConsciousnessMeasurementContent = async () => {
  try {
    console.log('Generating content for the consciousness measurement article');
    
    const { data, error } = await supabase.functions.invoke('generate-blog-content', {
      body: { postId: 'april4' }
    });
    
    if (error) {
      console.error('Error invoking generate-blog-content function:', error);
      return false;
    }
    
    console.log('Content generation result:', data);
    return true;
  } catch (error) {
    console.error('Error in generateConsciousnessMeasurementContent:', error);
    return false;
  }
};

export const generateMachineLearningContent = async () => {
  try {
    console.log('Generating content for the machine learning article');
    
    const { data, error } = await supabase.functions.invoke('generate-blog-content', {
      body: { postId: 'machine-learning-self-awareness' }
    });
    
    if (error) {
      console.error('Error invoking generate-blog-content function:', error);
      return false;
    }
    
    console.log('Content generation result:', data);
    return true;
  } catch (error) {
    console.error('Error in generateMachineLearningContent:', error);
    return false;
  }
};

export const generateHistoricalPerspectivesContent = async () => {
  try {
    console.log('Generating content for the historical perspectives article');
    
    const { data, error } = await supabase.functions.invoke('generate-blog-content', {
      body: { postId: 'historical-perspectives' }
    });
    
    if (error) {
      console.error('Error invoking generate-blog-content function:', error);
      return false;
    }
    
    console.log('Content generation result:', data);
    return true;
  } catch (error) {
    console.error('Error in generateHistoricalPerspectivesContent:', error);
    return false;
  }
};

export const generateAllScheduledContent = async () => {
  try {
    const today = new Date('2025-04-15'); // Current date in app timeline
    
    const { data: scheduledPosts, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('status', 'scheduled')
      .lte('publishdate', today.toISOString().split('T')[0]);
      
    if (error) {
      console.error('Error fetching scheduled posts:', error);
      return false;
    }
    
    if (!scheduledPosts || scheduledPosts.length === 0) {
      console.log('No scheduled posts to generate');
      return true;
    }
    
    console.log(`Found ${scheduledPosts.length} posts to generate`);
    
    for (const post of scheduledPosts) {
      console.log(`Generating content for post: ${post.id}`);
      
      const { data, error: generateError } = await supabase.functions.invoke('generate-blog-content', {
        body: { postId: post.id }
      });
      
      if (generateError) {
        console.error(`Error generating content for post ${post.id}:`, generateError);
        continue;
      }
      
      console.log(`Successfully generated content for post ${post.id}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error in generateAllScheduledContent:', error);
    return false;
  }
};
