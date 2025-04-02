
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import { BLOG_POSTS, CATEGORIES } from '@/data/blogData';
import { useLocation } from 'react-router-dom';
import FeaturedArticlesSection from '@/components/blog/FeaturedArticlesSection';
import PastArticlesSection from '@/components/blog/PastArticlesSection';
import CategoryFilter from '@/components/blog/CategoryFilter';
import { Button } from "@/components/ui/button";
import { Calendar, ArrowUpDown } from 'lucide-react';

const Blog = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tagFromUrl = searchParams.get('tag');
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllSorted, setShowAllSorted] = useState(false);
  const postsPerPage = 6;
  
  // Set tag from URL if present
  useEffect(() => {
    if (tagFromUrl) {
      setSearchQuery(tagFromUrl);
    }
  }, [tagFromUrl]);
  
  // Filter posts based on search query and selected category
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

  // Get the featured/recent posts (5 most recent)
  const featuredPosts = [...BLOG_POSTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Get past articles (excluding the featured ones)
  const featuredPostIds = new Set(featuredPosts.map(post => post.id));
  
  // If showAllSorted is true, show all posts sorted by date
  const allSortedPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Past posts to display based on filtering
  const pastPosts = showAllSorted 
    ? allSortedPosts 
    : filteredPosts.filter(post => !featuredPostIds.has(post.id));

  // Calculate pagination for past articles
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPastPosts = pastPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(pastPosts.length / postsPerPage);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing categories
    setShowAllSorted(false); // Reset all sorted view
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
    setShowAllSorted(false);
  };

  const handleShowAllSorted = () => {
    setShowAllSorted(true);
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Blog Hero Section with Search */}
        <BlogHero 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          {/* Show All Button & Category Filter Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 mb-4 lg:mb-0"
              onClick={handleShowAllSorted}
            >
              <Calendar className="h-4 w-4" />
              <span>View All Articles by Date</span>
              <ArrowUpDown className="h-3.5 w-3.5 ml-1" />
            </Button>
            
            {/* Category Filter */}
            <CategoryFilter 
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              clearFilters={clearFilters}
            />
          </div>
          
          {/* Featured Articles Section (shows 5 most recent posts) */}
          {!searchQuery && selectedCategory === "all" && !showAllSorted && (
            <FeaturedArticlesSection posts={featuredPosts} />
          )}
          
          {/* Past Articles Section */}
          <PastArticlesSection 
            posts={currentPastPosts}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            showAllSorted={showAllSorted}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
