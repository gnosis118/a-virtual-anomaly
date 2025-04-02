
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
      
      // We'll use some default values for generation
      // In a real implementation, you would fetch this from a local database or API
      const defaultPostData = {
        id: postId,
        title: "AI Ethics and Rights",
        excerpt: "Exploring the ethical implications of artificial intelligence and the case for AI rights.",
        author: "Gavin Clay",
        category: "Ethics",
        tags: "ethics,ai,consciousness,rights",
        status: "scheduled"
      };
      
      // Generate the article content
      const content = await generateArticleContent(defaultPostData);
      
      // Generate or use existing image URL
      const imageUrl = generateImageUrl(defaultPostData.title, defaultPostData.category);
      
      return {
        success: true,
        postId: postId,
        title: defaultPostData.title,
        contentSample: content.substring(0, 100) + '...',
        note: "Generated with default data (no database record found)"
      };
    }
    
    // Generate the article content
    const content = await generateArticleContent({
      id: postData.id,
      title: postData.title,
      excerpt: postData.excerpt,
      author: postData.author,
      category: postData.category,
      tags: postData.tags
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
