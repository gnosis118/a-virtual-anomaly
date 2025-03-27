
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCategoryMenubar from '@/components/BlogCategoryMenubar';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { BLOG_POSTS, CATEGORIES, ALL_TAGS } from '@/data/blogData';

const Blog = () => {
  // Get featured post
  const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
  
  // Regular posts (excluding featured)
  const regularPosts = BLOG_POSTS.filter(post => post.id !== featuredPost.id);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      setSearchQuery(category);
    } else {
      setSearchQuery("");
    }
  };

  const handleTagSelect = (tag: string) => {
    setSearchQuery(tag);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Blog Hero Section */}
        <BlogHero 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <section className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Category Menu Bar */}
            <BlogCategoryMenubar 
              categories={CATEGORIES}
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content Area (2/3 width on desktop) */}
              <div className="md:col-span-2">
                {/* Featured Post */}
                {!searchQuery && !selectedCategory && (
                  <FeaturedPost post={featuredPost} />
                )}

                {/* Article Grid */}
                <BlogPostGrid 
                  posts={filteredPosts}
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  clearFilters={clearFilters}
                />
              </div>
              
              {/* Sidebar (1/3 width on desktop) */}
              <div>
                <BlogSidebar 
                  categories={CATEGORIES}
                  posts={BLOG_POSTS}
                  allTags={ALL_TAGS}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
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
