
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
import { BlogPost } from '@/types/blog';
import { 
  addConsciousnessMeasurementArticle, 
  addMachineLearningArticle,
  addHistoricalPerspectivesArticle,
  addAIConsciousnessGovernanceArticle,
  generateConsciousnessMeasurementContent,
  generateMachineLearningContent,
  generateHistoricalPerspectivesContent,
  generateAIConsciousnessGovernanceContent
} from '@/components/blog/scheduled-posts-handler';
import { toast } from "@/components/ui/use-toast";

// Define the governance article specifically with the BlogPost type
const governanceArticle: BlogPost = {
  id: 'ai-consciousness-governance',
  title: 'AI Consciousness and Global Governance: Ethical Frameworks for an Emerging Reality',
  excerpt: 'As AI systems grow increasingly sophisticated, establishing global governance frameworks for potentially conscious AI becomes a crucial ethical imperative.',
  content: '', // Content will be loaded from the component
  author: 'Gavin Clay',
  date: 'April 15, 2024',
  readTime: '25 min read',
  views: 0,
  category: 'Policy',
  tags: ['consciousness', 'governance', 'ethics', 'global-policy', 'artificial-intelligence'],
  featured: true,
  image: 'https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?q=80&w=2940&auto=format&fit=crop'
};

// Check if the governance article already exists in BLOG_POSTS
const articleExists = BLOG_POSTS.some(post => 
  post.id === 'ai-consciousness-governance' || 
  (typeof post.id === 'string' && post.id.includes('governance'))
);

// Add the governance article if it doesn't exist
if (!articleExists) {
  BLOG_POSTS.unshift(governanceArticle);
}

const Blog = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tagFromUrl = searchParams.get('tag');
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  useEffect(() => {
    if (tagFromUrl) {
      setSearchQuery(tagFromUrl);
    }
    
    const initializeArticles = async () => {
      await addConsciousnessMeasurementArticle();
      await addMachineLearningArticle();
      await addHistoricalPerspectivesArticle();
      await addAIConsciousnessGovernanceArticle();
      
      const aiGovGenerated = await generateAIConsciousnessGovernanceContent();
      if (aiGovGenerated) {
        toast({
          title: "AI Governance Article Published",
          description: "AI Consciousness and Global Governance article has been generated and published.",
        });
      }
      
      const generated = await generateConsciousnessMeasurementContent();
      if (generated) {
        toast({
          title: "Article Generated",
          description: "Measuring Consciousness article has been generated and published.",
        });
      }
      
      const mlGenerated = await generateMachineLearningContent();
      if (mlGenerated) {
        toast({
          title: "Machine Learning Article Generated",
          description: "The Evolution of Machine Learning article has been generated and scheduled.",
        });
      }
      
      const historyGenerated = await generateHistoricalPerspectivesContent();
      if (historyGenerated) {
        toast({
          title: "Historical Perspectives Article Generated",
          description: "Historical Perspectives on Non-Human Rights article has been generated and scheduled.",
        });
      }
    };
    
    initializeArticles();
  }, [tagFromUrl]);
  
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = searchQuery.trim() === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "all" || 
      post.category === selectedCategory;
      
    return matchesSearch && matchesCategory;
  }) as BlogPost[];

  // Explicitly cast BLOG_POSTS to BlogPost[] when creating featuredPosts
  const featuredPosts = [...BLOG_POSTS]
    .filter(post => post.featured || post.id === 'ai-consciousness-governance')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5) as BlogPost[];

  const featuredPostIds = new Set(featuredPosts.map(post => post.id));
  const pastPosts = filteredPosts.filter(post => !featuredPostIds.has(post.id));

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
          
          <FeaturedArticlesSection posts={featuredPosts} />
          
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
