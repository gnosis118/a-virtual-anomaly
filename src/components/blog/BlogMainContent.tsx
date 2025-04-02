
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
  return (
    <div className="lg:col-span-2">
      {/* Special April 2nd Highlight Banner */}
      <AprilSecondBanner />
      
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
