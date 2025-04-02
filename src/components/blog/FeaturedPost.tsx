
import React from 'react';
import { Calendar, User, Clock, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/types/blog';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 relative">
        Featured Article
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent"></span>
      </h2>
      <div className="relative rounded-xl overflow-hidden group">
        <div className="relative h-96 overflow-hidden">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="px-3 py-1 text-xs font-medium bg-accent/80 text-white rounded-full mb-3 inline-block">
              {post.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {post.title}
            </h3>
            <p className="text-white/80 mb-4 max-w-2xl line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center text-white/90 text-sm mb-5 flex-wrap gap-y-2">
              <span className="flex items-center mr-4">
                <Calendar className="mr-1 h-3 w-3" />
                {post.date}
              </span>
              <span className="flex items-center mr-4">
                <User className="mr-1 h-3 w-3" />
                {post.author}
              </span>
              <span className="flex items-center mr-4">
                <Clock className="mr-1 h-3 w-3" />
                {post.readTime}
              </span>
              <span className="flex items-center">
                <Eye className="mr-1 h-3 w-3" />
                {post.views} views
              </span>
            </div>
            <Button 
              className="group"
              asChild
            >
              <a href={`/blog/${post.id}`} className="flex items-center gap-2">
                Read Article
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
