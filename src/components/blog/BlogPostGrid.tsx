
import React from 'react';
import { Clock, Calendar, Share, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Button from '@/components/Button';
import { BlogPost } from '@/types/blog';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface BlogPostGridProps {
  posts: BlogPost[];
  searchQuery: string;
  selectedCategory: string;
  clearFilters: () => void;
}

const BlogPostGrid = ({ posts, searchQuery, selectedCategory, clearFilters }: BlogPostGridProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 relative heading-highlight">
        {searchQuery || selectedCategory ? `Search Results: ${posts.length} found` : "Latest Articles"}
      </h2>
      
      {posts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">No articles found matching your search criteria.</p>
          <Button 
            onClick={clearFilters} 
            variant="outline"
            className="mt-4"
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card 
              key={post.id}
              className="overflow-hidden group hover:shadow-md transition-all duration-300 border border-border"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-2 py-1 bg-accent/90 text-white text-xs font-medium rounded">
                  {post.category}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl group-hover:text-accent transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="flex items-center text-xs text-muted-foreground mt-2">
                  <span className="flex items-center mr-3">
                    <Calendar className="mr-1 h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {post.readTime}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button 
                  href={`/blog/${post.id}`} 
                  variant="ghost" 
                  icon={<ArrowRight size={16} />} 
                  iconPosition="right"
                  className="p-0 h-auto text-accent"
                >
                  Read More
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-auto text-muted-foreground"
                  aria-label="Share this post"
                >
                  <Share size={16} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {posts.length > 0 && (
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default BlogPostGrid;
