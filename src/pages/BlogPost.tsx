
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BLOG_POSTS } from '@/data/blogData';
import { Separator } from "@/components/ui/separator";
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogPostHero from '@/components/blog/BlogPostHero';
import ArticleContent from '@/components/blog/ArticleContent';
import BlogPostTags from '@/components/blog/BlogPostTags';
import BlogPostAuthorBio from '@/components/blog/BlogPostAuthorBio';
import { ALL_TAGS } from '@/data/blogData';
import { supabase } from "@/integrations/supabase/client";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id || '1');
  const [dynamicContent, setDynamicContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Find the blog post by ID
  const post = BLOG_POSTS.find(post => post.id === postId);
  
  // Fetch dynamic content from Supabase if available
  useEffect(() => {
    const fetchDynamicContent = async () => {
      try {
        setLoading(true);
        
        // Try to get content from scheduled_posts table
        const { data, error } = await supabase
          .from('scheduled_posts')
          .select('content, image_url')
          .eq('id', id)
          .maybeSingle();
        
        if (!error && data && data.content) {
          setDynamicContent(data.content);
          // If we have a dynamic image, update the post object
          if (data.image_url && post) {
            post.image = data.image_url;
          }
        }
      } catch (err) {
        console.error('Error fetching dynamic content:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchDynamicContent();
    }
  }, [id, post]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If post not found, redirect to blog
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);
  
  // If post not found, return null (redirection will happen)
  if (!post) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Blog Post Hero */}
        <BlogPostHero post={post} />
        
        {/* Blog Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="md:col-span-2">
                <div className="rounded-xl overflow-hidden mb-8">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-auto object-cover aspect-video"
                  />
                </div>
                
                {/* If we have dynamic content, use it, otherwise use the static content */}
                <ArticleContent 
                  id={post.id} 
                  title={post.title} 
                  content={dynamicContent || undefined}
                />
                
                {/* Tags and share */}
                <BlogPostTags tags={post.tags} />
                
                <Separator className="my-10" />
                
                {/* Author bio */}
                <BlogPostAuthorBio post={post} />
              </div>
              
              {/* Sidebar */}
              <div>
                <BlogSidebar 
                  posts={BLOG_POSTS}
                  allTags={ALL_TAGS}
                  onTagSelect={() => {}}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
