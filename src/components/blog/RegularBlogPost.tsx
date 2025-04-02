
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from "@/components/ui/separator";
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogPostHero from '@/components/blog/BlogPostHero';
import ArticleContent from '@/components/blog/ArticleContent';
import BlogPostTags from '@/components/blog/BlogPostTags';
import BlogPostAuthorBio from '@/components/blog/BlogPostAuthorBio';
import { ALL_TAGS } from '@/data/blogData';
import { BlogPost } from '@/types/blog';
import PostImage from './PostImage';

interface RegularBlogPostProps {
  post: BlogPost;
  posts: BlogPost[];
}

const RegularBlogPost: React.FC<RegularBlogPostProps> = ({ post, posts }) => {
  const [dynamicContent, setDynamicContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dynamicImage, setDynamicImage] = useState<string | null>(null);
  
  // Fetch dynamic content from Supabase if available
  useEffect(() => {
    const fetchDynamicContent = async () => {
      try {
        setLoading(true);
        
        // Try to get content from scheduled_posts table
        const { data, error } = await supabase
          .from('scheduled_posts')
          .select('content, image_url')
          .eq('id', post.id.toString())
          .maybeSingle();
        
        if (!error && data) {
          if (data.content) {
            setDynamicContent(data.content);
          }
          if (data.image_url) {
            setDynamicImage(data.image_url);
          }
        }
      } catch (err) {
        console.error('Error fetching dynamic content:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDynamicContent();
  }, [post.id]);

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
                  <PostImage 
                    src={dynamicImage || post.image} 
                    alt={post.title} 
                  />
                </div>
                
                <ArticleContent 
                  id={post.id} 
                  title={post.title} 
                  content={dynamicContent || undefined}
                  loading={loading}
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
                  posts={posts}
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

export default RegularBlogPost;
