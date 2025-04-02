
// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_node_server

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { corsHeaders } from '../_shared/cors.ts';

type ScheduledPost = {
  id: number | string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  category: string;
  tags: string;
  publishdate: string; // lowercase to match the database column
  status: 'draft' | 'scheduled' | 'published';
};

type BlogPost = {
  id?: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  views: number;
  category: string;
  featured: boolean;
  tags: string[];
};

// Create a placeholder image URL
const generateImageUrl = (title: string, category: string): string => {
  // In a real implementation, this would generate or fetch a relevant image
  // For now, we'll return a placeholder image
  return `https://placehold.co/600x400/9370DB/ffffff?text=${encodeURIComponent(category)}`;
};

// Convert ScheduledPost to BlogPost
const convertToBlogPost = (scheduledPost: ScheduledPost): BlogPost => {
  return {
    title: scheduledPost.title,
    excerpt: scheduledPost.excerpt,
    content: scheduledPost.content || '',
    image: generateImageUrl(scheduledPost.title, scheduledPost.category),
    category: scheduledPost.category,
    tags: scheduledPost.tags.split(',').map(tag => tag.trim()),
    author: scheduledPost.author,
    date: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    readTime: '20 min read', // Placeholder, will be calculated based on content length
    views: 0,
    featured: false
  };
};

// Generate article content based on the scheduled post details
async function generateArticleContent(post: ScheduledPost): Promise<string> {
  // In a real implementation, this would call an AI service like OpenAI
  // For this demo, we'll generate some placeholder content
  
  const intro = `# ${post.title}\n\n${post.excerpt}\n\n`;
  
  const sections = [
    "## Introduction",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n",
    
    "## Understanding the Topic",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\n",
    
    `## Key Considerations on ${post.category}`,
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\n\n",
    
    "## Future Implications",
    "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.\n\n",
    
    "## Conclusion",
    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
  ];
  
  // Join all the content together with some line breaks
  const content = intro + sections.join("\n\n");
  
  // Make it 4000+ words by repeating the content
  return content.repeat(15);
}

// Main function to process scheduled posts
async function processScheduledPosts(supabaseClient: any) {
  // Check if auto-publish is enabled
  const { data: settingsData, error: settingsError } = await supabaseClient
    .from('settings')
    .select('*')
    .eq('key', 'auto_publish')
    .single();
  
  if (settingsError) {
    console.error('Error fetching auto-publish setting:', settingsError);
    return { success: false, error: 'Failed to fetch auto-publish setting' };
  }
  
  const autoPublishEnabled = settingsData.value === true || settingsData.value === 'true';
  
  if (!autoPublishEnabled) {
    return { success: true, message: 'Auto-publish is disabled', results: [] };
  }
  
  // Current date in ISO format, without time
  const today = new Date().toISOString().split('T')[0];
  console.log('Processing scheduled posts for date:', today);
  
  // Get all scheduled posts that are due today or older
  const { data: scheduledPosts, error: fetchError } = await supabaseClient
    .from('scheduled_posts')
    .select('*')
    .eq('status', 'scheduled')
    .lte('publishdate', today); // Use lowercase 'publishdate' to match DB column
  
  if (fetchError) {
    console.error('Error fetching scheduled posts:', fetchError);
    return { success: false, error: 'Failed to fetch scheduled posts' };
  }
  
  if (!scheduledPosts || scheduledPosts.length === 0) {
    return { success: true, message: 'No posts scheduled for today', results: [] };
  }
  
  console.log(`Found ${scheduledPosts.length} posts due for publication`);
  
  // Process each scheduled post
  const results = await Promise.all(
    scheduledPosts.map(async (post: ScheduledPost) => {
      try {
        console.log(`Processing post: ${post.id} - ${post.title}`);
        
        // Generate the full article content if it doesn't already exist
        const content = post.content || await generateArticleContent(post);
        
        // Generate an image URL if one doesn't exist
        const imageUrl = post.image_url || generateImageUrl(post.title, post.category);
        
        // Convert to blog post format
        const blogPost = convertToBlogPost({
          ...post,
          content
        });
        
        // In a real implementation, we would save this to the blog_posts table
        // For now, we'll just update the scheduled post
        
        // Mark the scheduled post as published
        const { error: updateError } = await supabaseClient
          .from('scheduled_posts')
          .update({ 
            status: 'published',
            content: content,
            image_url: imageUrl
          })
          .eq('id', post.id);
        
        if (updateError) {
          console.error(`Error updating post ${post.id}:`, updateError);
          throw updateError;
        }
        
        console.log(`Successfully published post: ${post.id}`);
        
        return { 
          success: true, 
          postId: post.id,
          title: post.title
        };
      } catch (error) {
        console.error(`Error processing post ${post.id}:`, error);
        return { 
          success: false, 
          postId: post.id,
          title: post.title,
          error: error.message
        };
      }
    })
  );
  
  return {
    success: true,
    message: `Processed ${results.length} posts`,
    results
  };
}

Deno.serve(async (req) => {
  // CORS handling
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Function invoked: generate-scheduled-post');
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabaseClient = createClient(supabaseUrl, supabaseKey);
    
    // Process the scheduled posts
    const result = await processScheduledPosts(supabaseClient);
    
    console.log('Function completed with result:', JSON.stringify(result));
    
    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 500
      }
    );
  }
});
