
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { slugify } from '@/utils/slugify';

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
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">No articles found</h3>
        <p className="text-muted-foreground mb-6">
          {searchQuery && !selectedCategory && 
            `No articles match your search for "${searchQuery}".`}
          {!searchQuery && selectedCategory && selectedCategory !== 'all' && 
            `No articles found in the ${selectedCategory} category.`}
          {searchQuery && selectedCategory && selectedCategory !== 'all' && 
            `No articles match your search for "${searchQuery}" in the ${selectedCategory} category.`}
          {!searchQuery && (!selectedCategory || selectedCategory === 'all') &&
            'No articles have been published yet. Check back soon!'}
        </p>
        {(searchQuery || (selectedCategory && selectedCategory !== 'all')) && (
          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all duration-300 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80";
                }}
              />
              <div className="absolute top-4 left-4 px-2 py-1 bg-accent/90 text-white text-xs font-medium rounded">
                {post.category}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-xs text-muted-foreground mb-3">
                <span className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {post.date}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <User className="mr-1 h-3 w-3" />
                  {post.author}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <a
                href={typeof post.id === 'string' ? `/blog/${post.id}` : `/blog/${slugify(post.title)}`}
                className="inline-flex items-center text-sm text-accent font-medium hover:text-accent/80 transition-colors"
              >
                Read More
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostGrid;
