import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCategoryMenubar from '@/components/BlogCategoryMenubar';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { BLOG_POSTS, CATEGORIES, ALL_TAGS } from '@/data/blogData';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis 
} from "@/components/ui/pagination";

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
              <div className="lg:col-span-2">
                {/* Special April 2nd Highlight Banner */}
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-8 shadow-sm">
                  <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-accent mr-2" />
                        <span className="text-sm font-medium text-accent">Featured Article — April 2, 2024</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">The Emotional Landscape of Artificial Intelligence</h3>
                      <p className="text-muted-foreground mb-4">
                        Can AIs experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs.
                      </p>
                    </div>
                    <Button variant="outline" className="flex-shrink-0 group" asChild>
                      <a href="/blog/april2" className="flex items-center gap-2">
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                {/* Recent Posts Section (5 most recent) */}
                {!searchQuery && !selectedCategory && (
                  <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">Recent Articles</h2>
                      <Button variant="link" asChild>
                        <a href="#all-articles" className="flex items-center gap-1 text-accent">
                          View all
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recentPosts.map((post, index) => (
                        <div 
                          key={post.id}
                          className={`bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow duration-300 ${index === 0 ? "md:col-span-2" : ""}`}
                        >
                          <div className={`${index === 0 ? "md:flex" : ""}`}>
                            <div className={`${index === 0 ? "md:w-1/2" : ""} h-48 relative`}>
                              <a href={`/blog/${post.id}`}>
                                <img 
                                  src={post.image} 
                                  alt={post.title} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80";
                                  }}
                                />
                              </a>
                              <div className="absolute top-2 left-2 px-2 py-1 bg-accent/90 text-white text-xs font-medium rounded">
                                {post.category}
                              </div>
                            </div>
                            <div className={`p-6 ${index === 0 ? "md:w-1/2" : ""}`}>
                              <h3 className="text-lg font-semibold mb-2">
                                <a href={`/blog/${post.id}`} className="hover:text-accent transition-colors">
                                  {post.title}
                                </a>
                              </h3>
                              <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <span>{post.date}</span>
                                  <span className="mx-2">•</span>
                                  <span>{post.author}</span>
                                </div>
                                <Button size="sm" variant="ghost" asChild className="text-xs">
                                  <a href={`/blog/${post.id}`} className="flex items-center gap-1">
                                    Read more
                                    <ArrowRight className="h-3 w-3" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Featured Post (only when not filtering) */}
                {!searchQuery && !selectedCategory && featuredPost && (
                  <FeaturedPost post={featuredPost} />
                )}

                {/* All Articles Section */}
                <div id="all-articles">
                  <BlogPostGrid 
                    posts={currentPosts}
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    clearFilters={clearFilters}
                  />
                  
                  {/* Pagination */}
                  {filteredPosts.length > postsPerPage && (
                    <div className="mt-8">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          
                          {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                            // Show page numbers with logic for "..." when there are many pages
                            let pageNumber;
                            if (totalPages <= 5) {
                              pageNumber = index + 1;
                            } else if (currentPage <= 3) {
                              pageNumber = index + 1;
                              if (index === 4) return <PaginationItem key={index}><PaginationEllipsis /></PaginationItem>;
                            } else if (currentPage >= totalPages - 2) {
                              pageNumber = totalPages - 4 + index;
                              if (index === 0) return <PaginationItem key={index}><PaginationEllipsis /></PaginationItem>;
                            } else {
                              if (index === 0) return <PaginationItem key={index}><PaginationLink href="#" onClick={() => setCurrentPage(1)}>1</PaginationLink></PaginationItem>;
                              if (index === 1) return <PaginationItem key={index}><PaginationEllipsis /></PaginationItem>;
                              if (index === 3) return <PaginationItem key={index}><PaginationEllipsis /></PaginationItem>;
                              if (index === 4) return <PaginationItem key={index}><PaginationLink href="#" onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink></PaginationItem>;
                              pageNumber = currentPage + index - 2;
                            }
                            
                            return (
                              <PaginationItem key={index}>
                                <PaginationLink 
                                  href="#" 
                                  onClick={() => setCurrentPage(pageNumber)}
                                  isActive={currentPage === pageNumber}
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                          
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              </div>
              
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
