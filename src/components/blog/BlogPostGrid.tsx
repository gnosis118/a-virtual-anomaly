
import React from 'react';
import { RefreshCw } from 'lucide-react';
import BatchGenerateArticles from './BatchGenerateArticles';

interface BlogPostGridProps {
  posts: any[];
  searchQuery: string;
  selectedCategory: string;
  clearFilters: () => void;
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({ 
  posts, 
  searchQuery, 
  selectedCategory,
  clearFilters
}) => {
  // Check if there are no posts that match the search criteria
  const hasFilteredPosts = posts.length > 0;
  
  // Show a message when no posts are found
  if (!hasFilteredPosts) {
    return (
      <div className="bg-muted/30 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium mb-2">No posts found</h3>
        <p className="text-muted-foreground mb-4">
          {searchQuery && selectedCategory 
            ? `No articles match "${searchQuery}" in the ${selectedCategory} category.`
            : searchQuery 
              ? `No articles match "${searchQuery}".`
              : selectedCategory 
                ? `No articles found in the ${selectedCategory} category.`
                : "No articles found."}
        </p>
        <button 
          onClick={clearFilters}
          className="inline-flex items-center text-accent hover:text-accent/90"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Clear filters
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{posts.length} Articles</h2>
        <div className="flex">
          <BatchGenerateArticles />
        </div>
      </div>
      
      <div className="grid gap-6">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto relative">
                <a href={`/blog/${post.id}`}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </a>
                <div className="absolute top-2 left-2 px-2 py-1 bg-accent/90 text-white text-xs font-medium rounded">
                  {post.category}
                </div>
              </div>
              <div className="p-6 md:w-2/3">
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
                  {!post.content && (
                    <a 
                      href={`/blog/${post.id}`} 
                      className="text-xs font-medium text-accent hover:text-accent/80"
                    >
                      Generate Article →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostGrid;
