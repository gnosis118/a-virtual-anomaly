
import React from 'react';
import { RefreshCw, ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
        <h2 className="text-xl font-semibold">
          {searchQuery || selectedCategory ? 'Search Results' : 'All Articles'}
          {posts.length > 0 && <span className="text-sm font-normal text-muted-foreground ml-2">({posts.length})</span>}
        </h2>
        
        {(searchQuery || selectedCategory) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-muted-foreground text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        )}
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
                    onError={(e) => {
                      // Fallback in case the image doesn't load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80";
                    }}
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
                
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <Button size="sm" variant="ghost" asChild className="self-start">
                    <a href={`/blog/${post.id}`} className="flex items-center gap-1 text-xs">
                      Read more
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
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
