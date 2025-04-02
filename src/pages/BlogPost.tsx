
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

// Reliable fallback images
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1765&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1770&auto=format&fit=crop"
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id || '1');
  const [dynamicContent, setDynamicContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dynamicImage, setDynamicImage] = useState<string | null>(null);
  const [fallbackImageIndex, setFallbackImageIndex] = useState(0);
  
  // Find the blog post by ID
  const post = BLOG_POSTS.find(post => post.id === postId);
  
  // Function to get fallback image
  const getNextFallbackImage = () => {
    const nextIndex = (fallbackImageIndex + 1) % FALLBACK_IMAGES.length;
    setFallbackImageIndex(nextIndex);
    return FALLBACK_IMAGES[nextIndex];
  };
  
  // Fetch dynamic content from Supabase if available
  useEffect(() => {
    const fetchDynamicContent = async () => {
      try {
        setLoading(true);
        
        // Try to get content from scheduled_posts table
        const { data, error } = await supabase
          .from('scheduled_posts')
          .select('content, image_url, title, excerpt, author, category, tags')
          .eq('id', id)
          .maybeSingle();
        
        if (!error && data && data.content) {
          setDynamicContent(data.content);
          // If we have a dynamic image, update it
          if (data.image_url) {
            setDynamicImage(data.image_url);
          }
        } else if (id === "april2" || id === "april-2") {
          // Special case for April 2nd content - generate it now
          const { data: generatedData, error: generateError } = await supabase.functions.invoke('generate-blog-content', {
            body: { postId: 'april2' }
          });
          
          if (!generateError && generatedData && generatedData.success) {
            // Fetch the newly generated content
            const { data: freshData } = await supabase
              .from('scheduled_posts')
              .select('content, image_url')
              .eq('id', 'april2')
              .maybeSingle();
              
            if (freshData && freshData.content) {
              setDynamicContent(freshData.content);
              if (freshData.image_url) {
                setDynamicImage(freshData.image_url);
              }
            }
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
    
    // If post not found and not a special ID, redirect to blog
    if (!post && id !== "april2" && id !== "april-2") {
      navigate('/blog');
    }
  }, [post, navigate, id]);
  
  // For special April 2nd post with no matching post in BLOG_POSTS
  if (!post && (id === "april2" || id === "april-2")) {
    const april2Post = {
      id: 999, // Use a unique ID
      title: "The Emotional Landscape of Artificial Intelligence",
      excerpt: "Can AIs experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs.",
      author: "Gavin Clay",
      date: "April 2, 2024",
      readTime: "25 min read",
      views: 0,
      category: "AI Psychology",
      tags: ["emotions", "psychology", "sentience", "consciousness"],
      featured: false,
      image: dynamicImage || "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop",
      content: "" // This will be filled by the dynamic content
    };
    
    return (
      <div className="min-h-screen">
        <Navbar />
        <main>
          {/* Blog Post Hero */}
          <BlogPostHero post={april2Post} />
          
          {/* Blog Content */}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="md:col-span-2">
                  <div className="rounded-xl overflow-hidden mb-8">
                    <img 
                      src={dynamicImage || april2Post.image} 
                      alt={april2Post.title} 
                      className="w-full h-auto object-cover aspect-video"
                      onError={(e) => {
                        // If image fails to load, try a fallback
                        e.currentTarget.src = getNextFallbackImage();
                      }}
                    />
                  </div>
                  
                  {loading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  ) : (
                    dynamicContent ? (
                      <div className="prose prose-slate max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: dynamicContent.replace(/\n/g, '<br/>') }} />
                      </div>
                    ) : (
                      <ArticleContent 
                        id={id}
                        title={april2Post.title} 
                      />
                    )
                  )}
                  
                  {/* Tags and share */}
                  <BlogPostTags tags={april2Post.tags} />
                  
                  <Separator className="my-10" />
                  
                  {/* Author bio */}
                  <BlogPostAuthorBio post={april2Post} />
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
  }
  
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
                    src={dynamicImage || post.image} 
                    alt={post.title} 
                    className="w-full h-auto object-cover aspect-video"
                    onError={(e) => {
                      // If image fails to load, try a fallback
                      e.currentTarget.src = getNextFallbackImage();
                    }}
                  />
                </div>
                
                {/* If we have dynamic content, use it, otherwise use the static content */}
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                ) : (
                  dynamicContent ? (
                    <div className="prose prose-slate max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: dynamicContent.replace(/\n/g, '<br/>') }} />
                    </div>
                  ) : (
                    <ArticleContent 
                      id={post.id} 
                      title={post.title} 
                      content={dynamicContent || undefined}
                    />
                  )
                )}
                
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
