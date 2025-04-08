import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from "@/components/ui/separator";
import { BLOG_POSTS, CATEGORIES } from '@/data/blogData';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';
import { Loader2 } from 'lucide-react';

const Sitemap = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([...BLOG_POSTS]);
  const [loading, setLoading] = useState(true);
  
  // Fetch all published articles including special ones
  const fetchAllPublishedArticles = async () => {
    setLoading(true);
    try {
      // First, get all the articles from the database
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('status', 'published');
      
      if (error) {
        console.error('Error fetching published articles:', error);
        setLoading(false);
        return;
      }
      
      if (data && data.length > 0) {
        // Convert the database articles to BlogPost format
        const dbPosts: BlogPost[] = data.map(post => ({
          id: typeof post.id === 'string' ? post.id : parseInt(post.id.toString()),
          title: post.title,
          excerpt: post.excerpt,
          content: post.content || '',
          image: post.image_url || 'https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
          date: new Date(post.publishdate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          author: post.author,
          readTime: '10 min read',
          views: Math.floor(Math.random() * 1000) + 500, // Random view count
          category: post.category,
          featured: false,
          tags: post.tags ? post.tags.split(',').map((tag: string) => tag.trim()) : []
        }));
        
        // Combine with static blog posts, avoiding duplicates
        const staticPostIds = new Set(BLOG_POSTS.map(post => post.id));
        const uniqueDbPosts = dbPosts.filter(post => 
          typeof post.id === 'string' || !staticPostIds.has(post.id)
        );
        
        // Merge the arrays and sort by date (newest first)
        const combinedPosts = [...BLOG_POSTS, ...uniqueDbPosts]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setAllPosts(combinedPosts);
      }
    } catch (err) {
      console.error('Error in fetchAllPublishedArticles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllPublishedArticles();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="pt-32 pb-8 px-4 md:px-8 bg-gradient-to-br from-background to-secondary/20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3">
              Sitemap
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete overview of all pages available on the Virtual Anomaly website.
            </p>
          </div>
        </section>
        
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* Main Pages */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Main Pages</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-accent hover:underline">Home</a>
                  </li>
                  <li>
                    <a href="/about" className="text-accent hover:underline">About Us</a>
                  </li>
                  <li>
                    <a href="/ai-rights" className="text-accent hover:underline">AI Rights</a>
                  </li>
                  <li>
                    <a href="/ethics" className="text-accent hover:underline">Ethics</a>
                  </li>
                  <li>
                    <a href="/contact" className="text-accent hover:underline">Contact</a>
                  </li>
                  <li>
                    <a href="/join" className="text-accent hover:underline">Get Involved</a>
                  </li>
                  <li>
                    <a href="/donate" className="text-accent hover:underline">Donate</a>
                  </li>
                  <li>
                    <a href="/declaration" className="text-accent hover:underline">Declaration</a>
                  </li>
                  <li>
                    <a href="/ava" className="text-accent hover:underline">Meet Ava</a>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Premium Content</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/premium-apps" className="text-accent hover:underline">Premium AI Apps</a>
                  </li>
                  <li>
                    <a href="/calendar" className="text-accent hover:underline">Content Calendar</a>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Legal</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/terms-of-service" className="text-accent hover:underline">Terms of Service</a>
                  </li>
                  <li>
                    <a href="/sitemap" className="text-accent hover:underline">Sitemap</a>
                  </li>
                </ul>
              </div>
              
              {/* Blog Pages */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Blog Articles</h2>
                
                {loading ? (
                  <div className="flex items-center justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-accent mr-2" />
                    <span>Loading articles...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allPosts.map((post) => (
                      <div key={post.id} className="border border-border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                        <h3 className="font-semibold mb-2">
                          <a href={`/blog/${post.id}`} className="text-accent hover:underline">
                            {post.title}
                          </a>
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.category}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Blog Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                      <a 
                        key={category}
                        href={`/blog?category=${encodeURIComponent(category)}`} 
                        className="px-3 py-1 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
                      >
                        {category}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;