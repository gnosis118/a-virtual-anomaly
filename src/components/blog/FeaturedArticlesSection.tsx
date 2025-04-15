
import React from 'react';
import { BlogPost } from '@/types/blog';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FeaturedArticlesSectionProps {
  posts: BlogPost[];
}

const FeaturedArticlesSection: React.FC<FeaturedArticlesSectionProps> = ({ posts }) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Featured Recent Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div 
            key={post.id} 
            className={`bg-card border border-border rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md ${
              index === 0 ? "lg:col-span-3 md:col-span-2" : ""
            }`}
          >
            <div className={`${index === 0 ? "md:flex" : ""}`}>
              <div className={`${index === 0 ? "md:w-2/3" : ""}`}>
                <a href={`/blog/${post.id}`} className="block h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80";
                    }}
                  />
                </a>
              </div>
              
              <div className={`p-6 ${index === 0 ? "md:w-1/3" : ""}`}>
                <div className="mb-2">
                  <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  <a href={`/blog/${post.id}`} className="hover:text-accent transition-colors">
                    {post.title}
                  </a>
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span>{post.date}</span>
                  </div>
                  
                  <Button size="sm" variant="outline" asChild>
                    <a href={`/blog/${post.id}`} className="flex items-center gap-1">
                      Read More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticlesSection;
