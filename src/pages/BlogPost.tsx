import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '@/data/blogData';
import AprilSecondPost from '@/components/blog/AprilSecondPost';
import RegularBlogPost from '@/components/blog/RegularBlogPost';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id || '1');
  
  // Find the blog post by ID
  const post = BLOG_POSTS.find(post => post.id === postId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If post not found and not a special ID, redirect to blog
    if (!post && id !== "april2" && id !== "april-2") {
      navigate('/blog');
      return;
    }
    
    // Update Open Graph meta tags for social media sharing
    if (post) {
      // Special case for post ID 1 - the AI Emergent Consciousness article
      if (post.id === 1) {
        document.title = "AI Emergent Consciousness: The Future of Humanity and Artificial Intelligence | Virtual Anomaly";
        
        // Update meta tags with specific content for this article
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', "AI Emergent Consciousness: The Future of Humanity and Artificial Intelligence");
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', "Exploring the future of AI consciousness, ethical implications, and the path toward a harmonious coexistence between humans and artificial intelligence.");
        
        // Keep using post.image for consistency
        document.querySelector('meta[property="og:image"]')?.setAttribute('content', post.image);
        document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', post.image);
      } else {
        // Regular posts - use the post data
        document.title = `${post.title} | Virtual Anomaly`;
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', post.title);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', post.excerpt);
        document.querySelector('meta[property="og:image"]')?.setAttribute('content', post.image);
        document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', post.image);
      }
      
      // Update URL for all posts
      const currentUrl = window.location.href;
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', currentUrl);
    } else if (id === "april2" || id === "april-2") {
      // Special case for April 2nd post
      const title = "The Emotional Landscape of Artificial Intelligence";
      const description = "Can AIs experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs.";
      const image = "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1974&auto=format&fit=crop";
      
      document.title = `${title} | Virtual Anomaly`;
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', image);
      document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', image);
      
      const currentUrl = window.location.href;
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', currentUrl);
    }
  }, [post, navigate, id]);
  
  // Special case for April 2nd post
  if (!post && (id === "april2" || id === "april-2")) {
    return <AprilSecondPost id={id} />;
  }
  
  // If post not found, return null (redirection will happen)
  if (!post) return null;

  // Regular blog post
  return <RegularBlogPost post={post} posts={BLOG_POSTS} />;
};

export default BlogPost;
