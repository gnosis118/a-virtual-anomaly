
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BlogPagination;
