
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { BlogPost } from './types.ts';
import { generateImageUrl } from './utils.ts';
import { generateArticleContent } from './contentGenerator.ts';

export async function generateArticle(supabaseClient, postId) {
  try {
    // Try to fetch from scheduled_posts first (using blog data ID if numeric)
    const { data: postData, error: postError } = await supabaseClient
      .from('scheduled_posts')
      .select('*')
      .eq('id', postId)
      .maybeSingle();
      
    if (postError) {
      console.error('Error fetching post details:', postError);
      throw new Error(`Failed to fetch post with ID ${postId}: ${postError.message}`);
    }
    
    // If no data found but we have a numeric ID, we need to use the BLOG_POSTS data
    // In a production environment, you would ensure all posts exist in the database
    // For this implementation, we'll create content based on the ID alone
    if (!postData) {
      console.log(`No database record found for post ID ${postId}, using static data`);
      
      let defaultPostData;
      
      // For April 4th post, we'll create the Measuring Consciousness article
      if (postId === "april4") {
        defaultPostData = {
          id: "april4",
          title: "Measuring Consciousness: Quantitative Approaches",
          excerpt: "Scientists are developing frameworks to detect and measure consciousness in both biological and artificial systems.",
          author: "Gavin Clay",
          category: "Research",
          tags: "consciousness,measurement,science,metrics,neuroscience",
          status: "scheduled",
          publishdate: '2024-04-04'
        };
      } else if (postId === "self-aware") {
        defaultPostData = {
          id: "self-aware",
          title: "What if Machines Could Become Self-Aware?",
          excerpt: "Exploring the evolution of machine learning and the possibility of artificial consciousness",
          author: "Dr. Sarah Chen",
          category: "AI Philosophy",
          tags: "consciousness,machine-learning,ethics,philosophy",
          status: "published",
          publishdate: '2024-04-23'
        };
      } else {
        // Default case for other missing posts
        defaultPostData = {
          id: postId,
          title: "The Emotional Landscape of Artificial Intelligence",
          excerpt: "Can AIs experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs.",
          author: "Gavin Clay",
          category: "AI Psychology",
          tags: "emotions,psychology,sentience",
          status: "scheduled"
        };
      }
      
      // Generate the article content
      const content = await generateArticleContent(defaultPostData);
      
      // Generate or use existing image URL
      const imageUrl = generateImageUrl(defaultPostData.title, defaultPostData.category);
      
      // Create a new entry in scheduled_posts for this article
      const { error: insertError } = await supabaseClient
        .from('scheduled_posts')
        .insert({
          id: postId,
          title: defaultPostData.title,
          excerpt: defaultPostData.excerpt,
          author: defaultPostData.author,
          category: defaultPostData.category,
          tags: defaultPostData.tags,
          content: content,
          image_url: imageUrl,
          publishdate: defaultPostData.publishdate || '2024-04-02', // Use provided date or default to April 2nd
          status: 'published'
        });
        
      if (insertError) {
        console.error('Error inserting new post:', insertError);
        throw new Error(`Failed to insert new post: ${insertError.message}`);
      }
      
      return {
        success: true,
        postId: postId,
        title: defaultPostData.title,
        contentSample: content.substring(0, 100) + '...',
        note: `Generated and inserted new article for ${defaultPostData.title}`
      };
    }
    
    // If we already have data, generate the article content
    const content = await generateArticleContent({
      id: postData.id,
      title: postData.title || "What if Machines Could Become Self-Aware?",
      excerpt: postData.excerpt || "Exploring the evolution of machine learning and the possibility of artificial consciousness",
      author: postData.author || "Dr. Sarah Chen",
      category: postData.category || "AI Philosophy",
      tags: postData.tags || "consciousness,machine-learning,ethics,philosophy"
    });
    
    // Generate or use existing image URL
    const imageUrl = postData.image_url || generateImageUrl(postData.title, postData.category);
    
    // Update the post with the generated content and image
    const { error: updateError } = await supabaseClient
      .from('scheduled_posts')
      .update({
        content: content,
        image_url: imageUrl,
        status: 'published'
      })
      .eq('id', postId);
    
    if (updateError) {
      console.error('Error updating post:', updateError);
      throw new Error(`Failed to update post with ID ${postId}: ${updateError.message}`);
    }
    
    return {
      success: true,
      postId: postId,
      title: postData.title,
      contentSample: content.substring(0, 100) + '...'
    };
  } catch (error) {
    console.error('Error in generateArticle:', error);
    throw error;
  }
}
