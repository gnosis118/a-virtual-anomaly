
import React from 'react';
import { BlogPost } from '@/types/blog';
import AprilSecondBanner from './AprilSecondBanner';
import RecentArticlesSection from './RecentArticlesSection';
import FeaturedPost from './FeaturedPost';
import BlogPostGrid from './BlogPostGrid';
import BlogPagination from './BlogPagination';

interface BlogMainContentProps {
  searchQuery: string;
  selectedCategory: string;
  recentPosts: BlogPost[];
  featuredPost: BlogPost;
  currentPosts: BlogPost[];
  filteredPosts: BlogPost[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  clearFilters: () => void;
}

const BlogMainContent: React.FC<BlogMainContentProps> = ({
  searchQuery,
  selectedCategory,
  recentPosts,
  featuredPost,
  currentPosts,
  filteredPosts,
  totalPages,
  currentPage,
  setCurrentPage,
  clearFilters
}) => {
  // Check if today is April 15, 2025
  const today = new Date();
  const isApril15th2025 = today.getFullYear() === 2025 && 
                          today.getMonth() === 3 && // 0-based month (April is 3)
                          today.getDate() === 15;

  return (
    <div className="lg:col-span-2">
      {/* Special April 2nd Highlight Banner */}
      <AprilSecondBanner />
      
      {/* Special April 15th 2025 Banner for AI Governance article */}
      {isApril15th2025 && (
        <div className="mb-8 p-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg border border-accent/30">
          <h3 className="text-lg font-semibold mb-2">Today's Featured Publication</h3>
          <p>Our latest article on <a href="/blog/ai-consciousness-governance" className="text-accent underline">AI Consciousness and Global Governance</a> is now available!</p>
        </div>
      )}
      
      {/* Recent Posts Section (5 most recent) */}
      {!searchQuery && !selectedCategory && (
        <RecentArticlesSection recentPosts={recentPosts} />
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
        {filteredPosts.length > 0 && (
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default BlogMainContent;
