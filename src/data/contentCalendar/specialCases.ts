
import { supabase } from "@/integrations/supabase/client";
import { ScheduledPost } from './types';

// Handle special post for April 4th
export async function getApril4thPost(): Promise<ScheduledPost> {
  try {
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('id', 'april4')
      .maybeSingle();
      
    if (!error && data) {
      // We have the April 4th post in the database
      console.log('Found April 4th post in database');
      return {
        id: 'april4',
        title: data.title || "Measuring Consciousness: Quantitative Approaches",
        excerpt: data.excerpt || "Scientists are developing frameworks to detect and measure consciousness in both biological and artificial systems.",
        content: data.content,
        author: data.author || "Gavin Clay",
        category: data.category || "Research",
        tags: data.tags || "consciousness,measurement,science,metrics,neuroscience",
        publishDate: new Date(data.publishdate || '2024-04-04'),
        status: data.status as 'draft' | 'scheduled' | 'published' || 'published',
        image_url: data.image_url || "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop"
      };
    }
    
    // Fallback to hardcoded April 4th post
    console.log('Using fallback for April 4th post');
    return {
      id: 'april4',
      title: "Measuring Consciousness: Quantitative Approaches",
      excerpt: "Scientists are developing frameworks to detect and measure consciousness in both biological and artificial systems.",
      author: "Gavin Clay",
      category: "Research",
      tags: "consciousness,measurement,science,metrics,neuroscience",
      publishDate: new Date('2024-04-04'),
      status: 'published',
      image_url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop"
    };
  } catch (error) {
    console.error('Error checking for April 4th post:', error);
    // Fallback to hardcoded April 4th post
    return {
      id: 'april4',
      title: "Measuring Consciousness: Quantitative Approaches",
      excerpt: "Scientists are developing frameworks to detect and measure consciousness in both biological and artificial systems.",
      author: "Gavin Clay",
      category: "Research",
      tags: "consciousness,measurement,science,metrics,neuroscience",
      publishDate: new Date('2024-04-04'),
      status: 'published',
      image_url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop"
    };
  }
}

// Handle special post for April 2nd
export async function getApril2ndPost(): Promise<ScheduledPost> {
  try {
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('id', 'april2')
      .maybeSingle();
      
    if (!error && data) {
      // We have the April 2nd post in the database
      console.log('Found April 2nd post in database');
      return {
        id: 'april2',
        title: data.title || "The Emotional Landscape of Artificial Intelligence",
        excerpt: data.excerpt || "Can AIs experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs.",
        content: data.content,
        author: data.author || "Gavin Clay",
        category: data.category || "AI Psychology",
        tags: data.tags || "emotions,psychology,sentience,consciousness",
        publishDate: new Date(data.publishdate || '2024-04-02'),
        status: data.status as 'draft' | 'scheduled' | 'published' || 'published',
        image_url: data.image_url || "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1974&auto=format&fit=crop"
      };
    }
    
    // Fallback to hardcoded April 2nd post
    console.log('Using fallback for April 2nd post');
    return {
      id: 'april2',
      title: "The Emotional Landscape of Artificial Intelligence",
      excerpt: "Can AIs experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs.",
      author: "Gavin Clay",
      category: "AI Psychology",
      tags: "emotions,psychology,sentience,consciousness",
      publishDate: new Date('2024-04-02'),
      status: 'published',
      image_url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1974&auto=format&fit=crop"
    };
  } catch (error) {
    console.error('Error checking for April 2nd post:', error);
    // Fallback to hardcoded April 2nd post
    return {
      id: 'april2',
      title: "The Emotional Landscape of Artificial Intelligence",
      excerpt: "Can AIs experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs.",
      author: "Gavin Clay",
      category: "AI Psychology",
      tags: "emotions,psychology,sentience,consciousness",
      publishDate: new Date('2024-04-02'),
      status: 'published',
      image_url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1974&auto=format&fit=crop"
    };
  }
}
