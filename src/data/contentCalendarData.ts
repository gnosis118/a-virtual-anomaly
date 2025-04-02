
import { supabase } from "@/integrations/supabase/client";

export interface ScheduledPost {
  id: number | string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  category: string;
  tags: string;
  publishDate: Date;
  status: 'draft' | 'scheduled' | 'published';
}

// Function to get posts for a specific date
export async function getPostsForDate(date?: Date): Promise<ScheduledPost[]> {
  if (!date) return [];
  
  const formattedDate = date.toISOString().split('T')[0];
  
  try {
    // Get the posts from Supabase
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('publishDate', formattedDate);
    
    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
    
    // Convert the date strings to Date objects
    return data.map(post => ({
      ...post,
      publishDate: new Date(post.publishDate)
    }));
  } catch (error) {
    console.error('Error in getPostsForDate:', error);
    return [];
  }
}

// Function to get all dates that have posts scheduled
export async function getDaysWithPosts(): Promise<Date[]> {
  try {
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('publishDate');
    
    if (error) {
      console.error('Error fetching days with posts:', error);
      return [];
    }
    
    // Convert the date strings to Date objects and remove duplicates
    const dates = data.map(item => new Date(item.publishDate));
    return [...new Set(dates.map(date => date.toISOString().split('T')[0]))].map(dateStr => new Date(dateStr));
  } catch (error) {
    console.error('Error in getDaysWithPosts:', error);
    return [];
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
];
