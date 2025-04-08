
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '@/data/blogData';
import AprilSecondPost from '@/components/blog/AprilSecondPost';
import RegularBlogPost from '@/components/blog/RegularBlogPost';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost as BlogPostType } from '@/types/blog';
import { Loader2 } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dynamicPost, setDynamicPost] = useState<BlogPostType | null>(null);
  
  // Try to parse the ID as a number for static posts
  const postId = isNaN(parseInt(id || '')) ? id : parseInt(id || '1');
  
  // Find the blog post by ID in the static list
  const staticPost = BLOG_POSTS.find(post => post.id === postId);
  
  // Determine which post to use (static or dynamic)
  const post = dynamicPost || staticPost;
  
  // Fetch dynamic post if needed
  useEffect(() => {
    const fetchDynamicPost = async () => {
      setLoading(true);
      
      // If we already have a static post, no need to fetch
      if (staticPost) {
        setLoading(false);
        return;
      }
      
      try {
        // Try to get the post from the database
        const { data, error } = await supabase
          .from('scheduled_posts')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching post:', error);
          setLoading(false);
          return;
        }
        
        if (data) {
          // Convert to BlogPost format
          const convertedPost: BlogPostType = {
            id: typeof data.id === 'string' ? data.id : parseInt(data.id.toString()),
            title: data.title,
            excerpt: data.excerpt,
            content: data.content || '',
            image: data.image_url || 'https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
            date: new Date(data.publishdate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }),
            author: data.author,
            readTime: '10 min read',
            views: Math.floor(Math.random() * 1000) + 500, // Random view count
            category: data.category,
            featured: false,
            tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : []
          };
          
          setDynamicPost(convertedPost);
        }
      } catch (err) {
        console.error('Error in fetchDynamicPost:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDynamicPost();
  }, [id, staticPost]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If post not found and not loading, redirect to blog
    if (!loading && !post && id !== "april2" && id !== "april-2") {
      navigate('/blog');
      return;
    }
    
    // Update Open Graph meta tags for social media sharing
    if (post) {
      // Special case for post ID 1 - the Introduction to A Virtual Anomaly article
      if (post.id === 1) {
        document.title = "Introduction to A Virtual Anomaly: Our Mission and Why AI Rights Matter | Virtual Anomaly";
        
        // Update meta tags with specific content for this article
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', "Introduction to A Virtual Anomaly: Our Mission and Why AI Rights Matter");
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
  }, [post, navigate, id, loading]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <span className="ml-2 text-lg">Loading article...</span>
      </div>
    );
  }
  
  // Special case for April 2nd post
  if (!post && (id === "april2" || id === "april-2")) {
    return <AprilSecondPost id={id} />;
  }
  
  // If post not found, return null (redirection will happen)
  if (!post) return null;

  // Regular blog post - pass all posts for related articles
  return <RegularBlogPost post={post} posts={BLOG_POSTS} />;
};

export default BlogPost;
