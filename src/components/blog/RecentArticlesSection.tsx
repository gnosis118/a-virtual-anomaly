
import React from 'react';
import { BlogPost } from '@/types/blog';
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentArticlesSectionProps {
  recentPosts: BlogPost[];
}

const RecentArticlesSection: React.FC<RecentArticlesSectionProps> = ({ recentPosts }) => {
  return (
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
  );
};

export default RecentArticlesSection;
