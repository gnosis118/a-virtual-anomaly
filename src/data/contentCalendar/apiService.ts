
import { supabase } from "@/integrations/supabase/client";
import { ScheduledPost } from './types';
import { getFallbackPostForDate } from './fallbackData';
import { getApril2ndPost, getApril4thPost } from './specialCases';

// Function to get posts for a specific date
export async function getPostsForDate(date?: Date): Promise<ScheduledPost[]> {
  if (!date) return [];
  
  const formattedDate = date.toISOString().split('T')[0];
  console.log('Formatted date for query:', formattedDate);
  
  // Special case for April 4th
  const isAprilFourth = date.getMonth() === 3 && date.getDate() === 4;
  if (isAprilFourth) {
    const post = await getApril4thPost();
    return [post];
  }
  
  // Special case for April 2nd
  const isAprilSecond = date.getMonth() === 3 && date.getDate() === 2;
  if (isAprilSecond) {
    const post = await getApril2ndPost();
    return [post];
  }
  
  try {
    // Get the posts from Supabase
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('publishdate', formattedDate); // Use lowercase 'publishdate' to match DB column
    
    if (error) {
      console.error('Error fetching posts:', error);
      
      // Return hardcoded fallback data for the selected date
      const fallbackPost = getFallbackPostForDate(date);
      if (fallbackPost) {
        console.log('Using fallback data for date:', formattedDate);
        return [fallbackPost];
      }
      
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('No posts found for date:', formattedDate);
      
      // If no data, check if we have fallback data for this date
      const fallbackPost = getFallbackPostForDate(date);
      if (fallbackPost) {
        console.log('Using fallback data instead');
        return [fallbackPost];
      }
      
      return [];
    }
    
    console.log('Posts found:', data.length);
    
    // Convert the date strings to Date objects and map to our ScheduledPost interface
    return data.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags,
      publishDate: new Date(post.publishdate), // Convert DB publishdate to frontend publishDate
      status: post.status as 'draft' | 'scheduled' | 'published',
      image_url: post.image_url || undefined // Safely handle image_url which may be null
    }));
  } catch (error) {
    console.error('Error in getPostsForDate:', error);
    
    // Return hardcoded fallback data on error
    const fallbackPost = getFallbackPostForDate(date);
    if (fallbackPost) {
      return [fallbackPost];
    }
    
    return [];
  }
}

// Function to get all dates that have posts scheduled
export async function getDaysWithPosts(): Promise<Date[]> {
  try {
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('publishdate'); // Use lowercase 'publishdate' to match DB column
    
    if (error) {
      console.error('Error fetching days with posts:', error);
      return []; // Will fall back to default days in the contentCalendarData.ts
    }
    
    if (!data || data.length === 0) {
      console.log('No scheduled posts found in database');
      return []; // Will fall back to default days in the contentCalendarData.ts
    }
    
    // Convert the date strings to Date objects and remove duplicates
    const uniqueDates = [...new Set(data.map(item => item.publishdate))];
    return uniqueDates.map(dateStr => new Date(dateStr));
  } catch (error) {
    console.error('Error in getDaysWithPosts:', error);
    return []; // Will fall back to default days in the contentCalendarData.ts
  }
}

// Function to trigger automatic publishing of scheduled posts
export async function triggerAutomaticPublishing(): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('generate-scheduled-post');
    
    if (error) {
      console.error('Error invoking generate-scheduled-post:', error);
      return { success: false, message: error.message };
    }
    
    if (!data || !data.success) {
      return { 
        success: false, 
        message: data?.error || 'Unknown error occurred during automatic publishing'
      };
    }
    
    return { 
      success: true, 
      message: `Successfully processed ${data.results?.length || 0} posts`
    };
  } catch (error) {
    console.error('Error in triggerAutomaticPublishing:', error);
    return { success: false, message: error.message || 'An error occurred' };
  }
}
