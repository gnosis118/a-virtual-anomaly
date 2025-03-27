
import React from 'react';
import { User, Calendar, Clock, Eye } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogPostMetaProps {
  post: BlogPost;
}

const BlogPostMeta: React.FC<BlogPostMetaProps> = ({ post }) => {
  return (
    <div className="flex flex-wrap items-center text-muted-foreground text-md mb-8">
      <span className="flex items-center mr-6 mb-2">
        <User className="mr-2 h-4 w-4" />
        {post.author}
      </span>
      <span className="flex items-center mr-6 mb-2">
        <Calendar className="mr-2 h-4 w-4" />
        {post.date}
      </span>
      <span className="flex items-center mr-6 mb-2">
        <Clock className="mr-2 h-4 w-4" />
        {post.readTime}
      </span>
      <span className="flex items-center mb-2">
        <Eye className="mr-2 h-4 w-4" />
        {post.views} views
      </span>
    </div>
  );
};

export default BlogPostMeta;
