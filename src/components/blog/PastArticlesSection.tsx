
import React from 'react';
import { BlogPost } from '@/types/blog';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

interface PastArticlesSectionProps {
  posts: BlogPost[];
  searchQuery: string;
  selectedCategory: string;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  showAllSorted?: boolean;
}

const PastArticlesSection: React.FC<PastArticlesSectionProps> = ({ 
  posts, 
  searchQuery, 
  selectedCategory,
  currentPage, 
  totalPages, 
  setCurrentPage,
  showAllSorted = false
}) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">
          {showAllSorted 
            ? 'All Articles by Date' 
            : searchQuery || selectedCategory !== "all" 
              ? 'Search Results' 
              : 'Past Articles'
          }
        </h2>
        
        {(searchQuery || selectedCategory !== "all" || showAllSorted) && (
          <div className="text-sm text-muted-foreground">
            Found {posts.length} article{posts.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or category filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {posts.map((post) => (
              <div key={post.id} className="flex bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-1/3 min-w-24">
                  <a href={`/blog/${post.id}`} className="block h-full">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80";
                      }}
                    />
                  </a>
                </div>
                <div className="w-2/3 p-4">
                  <h3 className="font-semibold mb-1 line-clamp-2">
                    <a href={`/blog/${post.id}`} className="hover:text-accent transition-colors">
                      {post.title}
                    </a>
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                    <Button size="sm" variant="ghost" asChild className="h-7 px-2 py-0">
                      <a href={`/blog/${post.id}`} className="flex items-center gap-1">
                        <span className="sr-only">Read more about {post.title}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="my-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
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
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </section>
  );
};

export default PastArticlesSection;
