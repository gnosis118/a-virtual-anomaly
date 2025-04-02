
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCategoryMenubar from '@/components/BlogCategoryMenubar';
import BlogHero from '@/components/blog/BlogHero';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogMainContent from '@/components/blog/BlogMainContent';
import { BLOG_POSTS, CATEGORIES, ALL_TAGS } from '@/data/blogData';
import { useLocation } from 'react-router-dom';

const Blog = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tagFromUrl = searchParams.get('tag');
  
  // Get featured post
  const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
  
  // Regular posts (excluding featured)
  const regularPosts = BLOG_POSTS.filter(post => post.id !== featuredPost.id);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  // Set tag from URL if present
  useEffect(() => {
    if (tagFromUrl) {
      setSearchQuery(tagFromUrl);
    }
  }, [tagFromUrl]);
  
  // Filter posts based on search query and selected category
  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = searchQuery.trim() === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "" || 
      post.category === selectedCategory ||
      post.tags.includes(selectedCategory);
      
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing categories
  };

  const handleTagSelect = (tag: string) => {
    setSearchQuery(tag);
    setCurrentPage(1); // Reset to first page when changing tags
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  // Recent posts for top section (5 most recent)
  const recentPosts = regularPosts.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Blog Hero Section with Search */}
        <BlogHero 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        {/* Category Navigation Bar */}
        <BlogCategoryMenubar 
          categories={CATEGORIES}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        <section className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area (2/3 width on desktop) */}
              <BlogMainContent 
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                recentPosts={recentPosts}
                featuredPost={featuredPost}
                currentPosts={currentPosts}
                filteredPosts={filteredPosts}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                clearFilters={clearFilters}
              />
              
              {/* Sidebar (1/3 width on desktop) */}
              <div>
                <BlogSidebar 
                  posts={BLOG_POSTS}
                  allTags={ALL_TAGS}
                  onTagSelect={handleTagSelect}
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

export default Blog;
