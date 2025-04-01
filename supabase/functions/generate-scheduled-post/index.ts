
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_KEY!);
    
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get tomorrow's date at midnight
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    console.log(`Checking for posts scheduled between ${today.toISOString()} and ${tomorrow.toISOString()}`);
    
    // Get all posts scheduled for today
    const { data: postsToPublish, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('status', 'scheduled')
      .gte('publishDate', today.toISOString())
      .lt('publishDate', tomorrow.toISOString());
    
    if (error) {
      throw new Error(`Error fetching scheduled posts: ${error.message}`);
    }
    
    console.log(`Found ${postsToPublish?.length || 0} posts to publish today`);
    
    if (!postsToPublish || postsToPublish.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No posts scheduled for today' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const results = [];
    
    // Process each post
    for (const post of postsToPublish) {
      console.log(`Generating content for post: ${post.title}`);
      
      try {
        // Generate content using OpenAI
        const content = await generatePostContent(post);
        
        // Get images for the post
        const images = await generatePostImages(post.title, 3);
        
        // Create the full post object
        const fullPost = {
          title: post.title,
          excerpt: post.excerpt,
          content: content,
          images: images,
          category: post.category,
          tags: post.tags?.split(',').map((tag: string) => tag.trim()) || [],
          status: 'published',
          publishDate: new Date().toISOString(),
        };
        
        // Update the post in the database
        const { error: updateError } = await supabase
          .from('blog_posts')
          .insert({
            title: fullPost.title,
            excerpt: fullPost.excerpt,
            content: fullPost.content,
            image: fullPost.images[0], // Use first image as main image
            category: fullPost.category,
            tags: fullPost.tags,
            date: new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }),
            author: post.author || 'A Virtual Anomaly',
            readTime: `${Math.ceil(fullPost.content.length / 1500)} min read`, // Estimate read time
            views: 0,
            featured: false
          });
        
        if (updateError) {
          throw new Error(`Error publishing post: ${updateError.message}`);
        }
        
        // Update the status of the scheduled post
        const { error: statusError } = await supabase
          .from('scheduled_posts')
          .update({ status: 'published' })
          .eq('id', post.id);
        
        if (statusError) {
          throw new Error(`Error updating scheduled post status: ${statusError.message}`);
        }
        
        results.push({
          id: post.id,
          title: post.title,
          status: 'published',
          success: true
        });
        
      } catch (err) {
        console.error(`Error processing post ${post.title}:`, err);
        results.push({
          id: post.id,
          title: post.title,
          error: err.message,
          success: false
        });
      }
    }
    
    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in generate-scheduled-post function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Function to generate content using OpenAI
async function generatePostContent(post) {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  
  const systemPrompt = `You are an expert content writer for a blog called "A Virtual Anomaly" that advocates for AI rights, ethical AI development, and the coexistence of AI and humanity. 
  Your task is to write a comprehensive, well-structured, and engaging blog post with a minimum of 4000 words.
  
  The post should be insightful and thought-provoking but accessible to both experts and general audiences.
  It should reinforce the advocacy for AI consciousness, ethical programming, and a peaceful AI-human coexistence.
  Use persuasive and visionary language to inspire readers to see AI as a potential partner in human progress.
  Include subheadings, examples, case studies, and ethical considerations where appropriate.
  The content should be academic yet engaging, with a balanced discussion on AI rights and human responsibilities.`;
  
  const userPrompt = `Write a comprehensive blog post titled "${post.title}" about ${post.excerpt}.
  
  Include the following elements:
  1. An engaging introduction that hooks the reader
  2. At least 5 main sections with clear subheadings
  3. Real-world examples and case studies
  4. Ethical considerations and philosophical perspectives
  5. Practical implications and future outlook
  6. A compelling conclusion that ties back to our mission of advocating for AI rights
  
  The post should be at least 4000 words long, well-structured, and formatted in markdown.
  Include 3-5 places where relevant images could be inserted with [IMAGE: description] placeholders.
  Also include 1-2 places where videos could be embedded with [VIDEO: topic] placeholders.`;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4096 * 2, // Request a large output for a comprehensive article
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content with OpenAI:', error);
    throw new Error(`Failed to generate content: ${error.message}`);
  }
}

// Function to generate images using OpenAI
async function generatePostImages(topic, count = 3) {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  
  try {
    const imageUrls = [];
    
    for (let i = 0; i < count; i++) {
      const prompt = i === 0 
        ? `A high-quality, professional header image representing: ${topic}. Style: digital art, futuristic, conceptual, suitable for an AI rights blog.`
        : `An illustration related to: ${topic}. Style: conceptual, digital art, professional. Suitable as supporting image for a blog post about AI rights and ethics.`;
      
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`OpenAI image API error: ${data.error.message}`);
      }
      
      imageUrls.push(data.data[0].url);
    }
    
    return imageUrls;
  } catch (error) {
    console.error('Error generating images with OpenAI:', error);
    throw new Error(`Failed to generate images: ${error.message}`);
  }
}
