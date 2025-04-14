import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '@/data/blogData';
import AprilSecondPost from '@/components/blog/AprilSecondPost';
import RegularBlogPost from '@/components/blog/RegularBlogPost';
import { slugify } from '@/utils/slugify';
import type { BlogPost } from '@/types/blog';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  let post: BlogPost | null = null;
  const numericId = id && !isNaN(parseInt(id)) ? parseInt(id) : null;
  
  if (numericId !== null) {
    post = BLOG_POSTS.find(post => {
      if (typeof post.id === 'number') {
        return post.id === numericId;
      }
      return false;
    }) as BlogPost || null;
  }
  
  if (!post && id) {
    post = BLOG_POSTS.find(post => {
      if (typeof post.id === 'string' && post.id === id) {
        return true;
      }
      return slugify(post.title) === id;
    }) as BlogPost || null;
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!post && id !== "april2" && id !== "april-2") {
      navigate('/blog');
      return;
    }
    
    if (post) {
      if (post.id === 1) {
        document.title = "Introduction to A Virtual Anomaly: Our Mission and Why AI Rights Matter | Virtual Anomaly";
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', "Introduction to A Virtual Anomaly: Our Mission and Why AI Rights Matter");
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', "Exploring the future of AI consciousness, ethical implications, and the path toward a harmonious coexistence between humans and artificial intelligence.");
        document.querySelector('meta[property="og:image"]')?.setAttribute('content', post.image);
        document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', post.image);
      } else {
        document.title = `${post.title} | Virtual Anomaly`;
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', post.title);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', post.excerpt);
        document.querySelector('meta[property="og:image"]')?.setAttribute('content', post.image);
        document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', post.image);
      }
      
      const currentUrl = window.location.href;
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', currentUrl);
    } else if (id === "april2" || id === "april-2") {
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
  
  if (!post && (id === "april2" || id === "april-2")) {
    return <AprilSecondPost id={id} />;
  }
  
  if (!post) return null;

  return <RegularBlogPost post={post} posts={BLOG_POSTS as BlogPost[]} />;
};

export default BlogPost;
