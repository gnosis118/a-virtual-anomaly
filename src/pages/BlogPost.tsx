
import React, { useEffect } from 'react';
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

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id || '1');
  
  // Find the blog post by ID
  const post = BLOG_POSTS.find(post => post.id === postId);
  
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
                
                {/* Blog post content - Use ArticleContent instead of BlogPostContent */}
                <ArticleContent id={post.id} title={post.title} />
                
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
