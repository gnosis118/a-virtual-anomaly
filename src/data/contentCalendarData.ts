
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
  image_url?: string; // Optional image URL
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
      .eq('publishdate', formattedDate); // Use lowercase 'publishdate' to match DB column
    
    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
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
      image_url: post.image_url
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
      .select('publishdate'); // Use lowercase 'publishdate' to match DB column
    
    if (error) {
      console.error('Error fetching days with posts:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Convert the date strings to Date objects and remove duplicates
    const uniqueDates = [...new Set(data.map(item => item.publishdate))];
    return uniqueDates.map(dateStr => new Date(dateStr));
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
