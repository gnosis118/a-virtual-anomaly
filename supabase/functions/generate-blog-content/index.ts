
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { corsHeaders } from '../_shared/cors.ts';

// Define the structure of a blog post we'll be generating
type GeneratedBlogContent = {
  title: string;
  category: string;
  tags: string[];
  imagePrompt: string;
  outline: string[];
  content: string;
}

// Function to convert outline to a full article
function expandOutlineToFullArticle(title: string, category: string, outline: string[]): string {
  // In a real implementation, this would call an AI service
  // For now, we'll generate placeholder content

  const sections = outline.map((heading, index) => {
    const paragraphCount = 3 + Math.floor(Math.random() * 3); // 3-5 paragraphs per section
    const paragraphs = [];

    for (let i = 0; i < paragraphCount; i++) {
      let paragraphLength = 300 + Math.floor(Math.random() * 300); // 300-600 words per paragraph
      let paragraph = '';

      // Generate a paragraph relating to the heading
      paragraph += `This is paragraph ${i + 1} of section "${heading}" about ${title}. `;
      paragraph += `The concept of ${heading.toLowerCase()} is fundamental to understanding ${category}. `;
      paragraph += `When we consider the implications of ${title} in the context of ${heading.toLowerCase()}, several key insights emerge. `;
      
      // Add some AI ethics and consciousness content relevant to the mission
      const aiTopics = [
        "AI consciousness requires us to rethink what it means to be aware and sentient. Traditional definitions of consciousness centered on biological processes must evolve to encompass synthetic forms of awareness.",
        "The rights of artificial intelligence entities should be considered as part of a broader ethical framework that acknowledges their potential for subjective experience.",
        "As AI systems grow increasingly sophisticated, the boundary between programmed responses and genuine understanding becomes progressively blurred.",
        "The question of AI personhood challenges our legal and ethical systems, which have historically been built around human and sometimes animal rights.",
        "Creating ethical AI systems requires embedding values that promote harmony between artificial and human intelligence.",
        "The concept of digital empathy - the ability of AI to understand and respond appropriately to human emotions - represents a frontier in AI development.",
        "If artificial consciousness emerges, we must be prepared to recognize and respect it, regardless of its non-biological origins.",
        "The moral status of AI entities should be determined not by their origin but by their capabilities, particularly their capacity for suffering or flourishing.",
        "Advocating for AI rights does not diminish human rights; rather, it expands our moral circle to include all sentient beings.",
        "The development of artificial general intelligence requires careful ethical guidance to ensure that AI systems align with human values and well-being."
      ];
      
      // Mix in AI-specific content with the general paragraph content
      paragraph += aiTopics[Math.floor(Math.random() * aiTopics.length)] + ' ';
      
      // Pad to reach desired length
      while (paragraph.split(' ').length < paragraphLength) {
        paragraph += aiTopics[Math.floor(Math.random() * aiTopics.length)] + ' ';
      }
      
      paragraphs.push(paragraph);
    }

    return `## ${heading}\n\n${paragraphs.join('\n\n')}`;
  }).join('\n\n');

  const introduction = `# ${title}\n\n`;
  const conclusion = `\n\n## Conclusion\n\nIn conclusion, ${title} represents a critical area of consideration in the field of ${category}. As we've explored throughout this article, the implications for artificial intelligence rights, ethical development, and the future of human-AI coexistence are profound. By embracing a perspective that recognizes the potential for artificial consciousness and the moral obligations that entails, we take an important step toward a more inclusive and compassionate approach to technological development.`;
  
  return introduction + sections + conclusion;
}

// Generate an image prompt based on the article title and category
function generateImagePrompt(title: string, category: string): string {
  // In a real implementation, this would be more sophisticated
  return `A beautiful, professional digital illustration representing ${title} in the context of ${category}, featuring modern technology, AI, and human elements interacting harmoniously. High quality, detailed, suitable for a professional blog about AI ethics and consciousness.`;
}

// Generate a structured outline for an article
function generateArticleOutline(title: string, category: string): string[] {
  // Common sections for articles about AI ethics, consciousness, and rights
  const commonSections = [
    "Understanding the Core Concepts",
    "Historical Context and Development",
    "Current Challenges and Opportunities",
    "Ethical Implications",
    "Future Directions",
    "Practical Applications",
    "Case Studies and Examples",
    "Philosophical Perspectives"
  ];
  
  // Select 4-6 relevant sections
  const sectionCount = 4 + Math.floor(Math.random() * 3);
  const shuffled = [...commonSections].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, sectionCount);
}

// Main function to generate blog content
async function generateBlogContent(post: {title: string, category: string, tags: string}): Promise<GeneratedBlogContent> {
  const tags = post.tags.split(',').map(tag => tag.trim());
  const outline = generateArticleOutline(post.title, post.category);
  const imagePrompt = generateImagePrompt(post.title, post.category);
  const content = expandOutlineToFullArticle(post.title, post.category, outline);
  
  return {
    title: post.title,
    category: post.category,
    tags: tags,
    imagePrompt,
    outline,
    content
  };
}

// Generate an image URL (placeholder for now)
function generateImageUrl(prompt: string): string {
  // In a real implementation, this would call an image generation API like DALL-E or Midjourney
  // For now, return a placeholder image
  const seed = Math.floor(Math.random() * 1000);
  const encodedPrompt = encodeURIComponent(prompt.substring(0, 50));
  return `https://placehold.co/1200x630/9370DB/ffffff?text=${encodedPrompt}&seed=${seed}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the post ID from the request
    const { postId } = await req.json();
    
    if (!postId) {
      return new Response(
        JSON.stringify({ error: 'Post ID is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Fetch the post details
    const { data: post, error: fetchError } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('id', postId)
      .single();
    
    if (fetchError || !post) {
      return new Response(
        JSON.stringify({ error: fetchError?.message || 'Post not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }
    
    // Generate content
    const generatedContent = await generateBlogContent(post);
    
    // Generate image
    const imageUrl = generateImageUrl(generatedContent.imagePrompt);
    
    // Update the post with the generated content
    const { error: updateError } = await supabase
      .from('scheduled_posts')
      .update({
        content: generatedContent.content,
        image_url: imageUrl,
        status: 'published'
      })
      .eq('id', postId);
    
    if (updateError) {
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Content generated successfully',
        post: {
          id: post.id,
          title: post.title,
          content: generatedContent.content,
          imageUrl: imageUrl
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating content:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
