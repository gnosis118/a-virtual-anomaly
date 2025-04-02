
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from "@/components/ui/separator";
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogPostHero from '@/components/blog/BlogPostHero';
import ArticleContent from '@/components/blog/ArticleContent';
import BlogPostTags from '@/components/blog/BlogPostTags';
import BlogPostAuthorBio from '@/components/blog/BlogPostAuthorBio';
import { ALL_TAGS, BLOG_POSTS } from '@/data/blogData';
import PostImage from './PostImage';
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

interface AprilSecondPostProps {
  id?: string;
}

const AprilSecondPost: React.FC<AprilSecondPostProps> = ({ id = "april2" }) => {
  const navigate = useNavigate();
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
          .select('content, image_url, title, excerpt, author, category, tags')
          .eq('id', id || 'april2')
          .maybeSingle();
        
        if (!error && data && data.content) {
          setDynamicContent(data.content);
          // If we have a dynamic image, update it
          if (data.image_url) {
            setDynamicImage(data.image_url);
          }
        } else if (id === "april2" || id === "april-2") {
          // Special case for April 2nd content - generate it now
          toast({
            title: "Generating Article",
            description: "The AI Rights special article is being generated. This may take a moment...",
          });
          
          const { data: generatedData, error: generateError } = await supabase.functions.invoke('generate-blog-content', {
            body: { postId: 'april2' }
          });
          
          if (!generateError && generatedData && generatedData.success) {
            toast({
              title: "Article Generated",
              description: "The AI Rights special article has been generated successfully.",
            });
            
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
          } else {
            toast({
              title: "Generation Failed",
              description: "Could not generate the article. Using default content.",
              variant: "destructive",
            });
          }
        }
      } catch (err) {
        console.error('Error fetching dynamic content:', err);
        toast({
          title: "Error",
          description: "Could not fetch article content. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDynamicContent();
  }, [id]);
  
  // Create a mock post object for April 2nd
  const april2Post = {
    id: id === "april2" ? 999 : parseInt(id || "999"), // Use a unique ID
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
                  {loading ? (
                    <div className="flex items-center justify-center bg-muted h-80">
                      <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <PostImage 
                      src={dynamicImage || april2Post.image}
                      alt={april2Post.title}
                      className="w-full h-auto aspect-video object-cover"
                    />
                  )}
                </div>
                
                <ArticleContent 
                  id={id || "april2"}
                  title={april2Post.title} 
                  content={dynamicContent || undefined}
                  loading={loading}
                />
                
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
};

export default AprilSecondPost;
