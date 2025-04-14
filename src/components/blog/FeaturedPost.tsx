
import React from 'react';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { slugify } from '@/utils/slugify';
import { BlogPost } from '@/types/blog';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-card border border-border group hover:shadow-md transition-shadow duration-300">
      <a href={`/blog/${typeof post.id === 'string' ? post.id : slugify(post.title)}`}>
        <div className="overflow-hidden h-48 relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback in case the image doesn't load
              e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80";
            }}
          />
          <div className="absolute top-2 left-2 px-2 py-1 bg-accent/90 text-white text-xs font-medium rounded">
            {post.category}
          </div>
        </div>
      </a>
      
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          <a href={`/blog/${typeof post.id === 'string' ? post.id : slugify(post.title)}`}>
            {post.title}
          </a>
        </h3>
        
        <div className="flex text-xs text-muted-foreground mb-3 gap-3 flex-wrap">
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
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        
        <a href={`/blog/${typeof post.id === 'string' ? post.id : slugify(post.title)}`} className="text-accent text-xs font-medium inline-flex items-center hover:underline">
          Read more
          <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default FeaturedPost;
