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
  addAIConsciousnessGovernanceArticle,
  generateConsciousnessMeasurementContent,
  generateMachineLearningContent,
  generateHistoricalPerspectivesContent,
  generateAIConsciousnessGovernanceContent
} from '@/components/blog/scheduled-posts-handler';
import { toast } from "@/components/ui/use-toast";

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
    
    // Initialize and generate articles in the database
    const initializeArticles = async () => {
      // First add the articles to the database
      await addConsciousnessMeasurementArticle();
      await addMachineLearningArticle();
      await addHistoricalPerspectivesArticle();
      await addAIConsciousnessGovernanceArticle();
      
      // Generate content for the AI Consciousness and Governance article
      const aiGovGenerated = await generateAIConsciousnessGovernanceContent();
      if (aiGovGenerated) {
        toast({
          title: "AI Governance Article Published",
          description: "AI Consciousness and Global Governance article has been generated and published.",
        });
      }
      
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
  });

  const featuredPosts = [...BLOG_POSTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

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
