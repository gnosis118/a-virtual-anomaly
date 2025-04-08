
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import { BLOG_POSTS, CATEGORIES } from '@/data/blogData';
import { useLocation } from 'react-router-dom';
import FeaturedArticlesSection from '@/components/blog/FeaturedArticlesSection';
import PastArticlesSection from '@/components/blog/PastArticlesSection';
import CategoryFilter from '@/components/blog/CategoryFilter';
import ContentCalendar from '@/components/blog/ContentCalendar';
import { Separator } from "@/components/ui/separator";
import { 
  addConsciousnessMeasurementArticle, 
  addMachineLearningArticle,
  addHistoricalPerspectivesArticle,
  generateConsciousnessMeasurementContent,
  generateMachineLearningContent,
  generateHistoricalPerspectivesContent
} from '@/components/blog/scheduled-posts-handler';
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';

const Blog = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tagFromUrl = searchParams.get('tag');
  const categoryFromUrl = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([...BLOG_POSTS]);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 12; // Increased from 6 to show more posts per page
  
  // Fetch all published articles including special ones
  const fetchAllPublishedArticles = async () => {
    setIsLoading(true);
    try {
      // First, get all the articles from the database
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('status', 'published');
      
      if (error) {
        console.error('Error fetching published articles:', error);
        return;
      }
      
      if (data && data.length > 0) {
        // Convert the database articles to BlogPost format
        const dbPosts: BlogPost[] = data.map(post => ({
          id: typeof post.id === 'string' ? 999 : parseInt(post.id.toString()), // Use a unique ID for string IDs
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
        
        // Special handling for april2 post
        const april2Post = dbPosts.find(post => post.id === 999);
        if (april2Post) {
          april2Post.id = 'april2';
        }
        
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
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (tagFromUrl) {
      setSearchQuery(tagFromUrl);
    }
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    
    // Initialize and generate articles in the database
    const initializeArticles = async () => {
      // First add the articles to the database
      await addConsciousnessMeasurementArticle();
      await addMachineLearningArticle();
      await addHistoricalPerspectivesArticle();
      
      // Then generate content for the consciousness measurement article
      const generated = await generateConsciousnessMeasurementContent();
      if (generated) {
        toast({
          title: "Article Generated",
          description: "Measuring Consciousness article has been generated and published.",
        });
      }
      
      // Generate content for the machine learning article
      const mlGenerated = await generateMachineLearningContent();
      if (mlGenerated) {
        toast({
          title: "Machine Learning Article Generated",
          description: "The Evolution of Machine Learning article has been generated and scheduled.",
        });
      }
      
      // Generate content for the historical perspectives article
      const historyGenerated = await generateHistoricalPerspectivesContent();
      if (historyGenerated) {
        toast({
          title: "Historical Perspectives Article Generated",
          description: "Historical Perspectives on Non-Human Rights article has been generated and scheduled.",
        });
      }
      
      // Fetch all published articles
      await fetchAllPublishedArticles();
    };
    
    initializeArticles();
  }, [tagFromUrl, categoryFromUrl]);
  
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchQuery.trim() === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "all" || 
      post.category === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });

  // Get the 5 most recent posts for the featured section
  const featuredPosts = [...allPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Get all posts that aren't in the featured section
  const featuredPostIds = new Set(featuredPosts.map(post => post.id));
  const pastPosts = filteredPosts.filter(post => !featuredPostIds.has(post.id));

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPastPosts = pastPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(pastPosts.length / postsPerPage);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <BlogHero 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <CategoryFilter 
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            clearFilters={clearFilters}
          />
          
          {!searchQuery && selectedCategory === "all" && (
            <FeaturedArticlesSection posts={featuredPosts} />
          )}
          
          <PastArticlesSection 
            posts={currentPastPosts}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
          
          <Separator className="my-12" />
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Content Calendar</h2>
            <p className="text-muted-foreground mb-8">
              Browse our scheduled content for the next 90 days. Each highlighted date on the calendar indicates scheduled article publications. Click on a date to view details about upcoming content.
            </p>
            <ContentCalendar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
