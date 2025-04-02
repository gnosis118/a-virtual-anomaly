
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
