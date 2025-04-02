
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import { BLOG_POSTS, CATEGORIES } from '@/data/blogData';
import { useLocation } from 'react-router-dom';
import FeaturedArticlesSection from '@/components/blog/FeaturedArticlesSection';
import PastArticlesSection from '@/components/blog/PastArticlesSection';
import CategoryFilter from '@/components/blog/CategoryFilter';

const Blog = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tagFromUrl = searchParams.get('tag');
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
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
  const pastPosts = filteredPosts.filter(post => !featuredPostIds.has(post.id));

  // Calculate pagination for past articles
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPastPosts = pastPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(pastPosts.length / postsPerPage);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing categories
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
        {/* Blog Hero Section with Search */}
        <BlogHero 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          {/* Category Filter */}
          <CategoryFilter 
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            clearFilters={clearFilters}
          />
          
          {/* Featured Articles Section (shows 5 most recent posts) */}
          {!searchQuery && selectedCategory === "all" && (
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
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
