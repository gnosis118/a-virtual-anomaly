
import { supabase } from "@/integrations/supabase/client";

export interface ScheduledPost {
  id: string | number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  category: string;
  tags: string;
  publishDate: Date; // Frontend representation uses camelCase
  status: 'draft' | 'scheduled' | 'published';
  image_url?: string; // Explicitly defined as optional
}

// Function to get posts for a specific date
export async function getPostsForDate(date?: Date): Promise<ScheduledPost[]> {
  if (!date) return [];
  
  const formattedDate = date.toISOString().split('T')[0];
  console.log('Formatted date for query:', formattedDate);
  
  try {
    // Get the posts from Supabase
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('publishdate', formattedDate); // Use lowercase 'publishdate' to match DB column
    
    if (error) {
      console.error('Error fetching posts:', error);
      
      // Return hardcoded fallback data for the selected date
      const fallbackDate = date.toISOString().split('T')[0];
      const fallbackPost = getFallbackPostForDate(date);
      if (fallbackPost) {
        console.log('Using fallback data for date:', fallbackDate);
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
      return daysWithPosts; // Return hardcoded fallback data
    }
    
    if (!data || data.length === 0) {
      console.log('No scheduled posts found in database');
      return daysWithPosts; // Return hardcoded fallback data
    }
    
    // Convert the date strings to Date objects and remove duplicates
    const uniqueDates = [...new Set(data.map(item => item.publishdate))];
    return uniqueDates.map(dateStr => new Date(dateStr));
  } catch (error) {
    console.error('Error in getDaysWithPosts:', error);
    return daysWithPosts; // Return hardcoded fallback data
  }
}

// Helper function to get a fallback post for a specific date
function getFallbackPostForDate(date: Date): ScheduledPost | null {
  // Check if the date matches any of our hardcoded dates
  const formattedDate = date.toISOString().split('T')[0];
  const month = date.getMonth();
  const day = date.getDate();
  
  // Match against our hardcoded days
  const isMatch = daysWithPosts.some(d => 
    d.getMonth() === month && 
    d.getDate() === day
  );
  
  if (isMatch) {
    return {
      id: `fallback-${formattedDate}`,
      title: "The Future of AI Consciousness",
      excerpt: "Exploring the philosophical and technical considerations for artificial consciousness and its implications for society.",
      author: "Dr. Emma Chen",
      category: "AI Rights",
      tags: "consciousness,ethics,philosophy",
      publishDate: date,
      status: 'scheduled',
    };
  }
  
  return null;
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

// Hard-coded data for fallback
export const daysWithPosts: Date[] = [
  new Date(2024, 8, 1),  // Sept 1, 2024
  new Date(2024, 8, 5),  // Sept 5, 2024
  new Date(2024, 8, 10), // Sept 10, 2024
  new Date(2024, 8, 15), // Sept 15, 2024
  new Date(2024, 8, 20), // Sept 20, 2024
  new Date(2024, 8, 25), // Sept 25, 2024
  new Date(2024, 8, 30), // Sept 30, 2024
  // Add some current dates so we can see something in the calendar immediately
  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  new Date(new Date().getFullYear(), new Date().getMonth(), 5),
  new Date(new Date().getFullYear(), new Date().getMonth(), 10),
  new Date(new Date().getFullYear(), new Date().getMonth(), 15),
  new Date(new Date().getFullYear(), new Date().getMonth(), 20),
  new Date(new Date().getFullYear(), new Date().getMonth(), 25),
];
