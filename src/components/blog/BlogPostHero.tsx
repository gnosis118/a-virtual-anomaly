
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/Button';
import { BlogPost } from '@/types/blog';
import BlogPostMeta from './BlogPostMeta';

interface BlogPostHeroProps {
  post: BlogPost;
}

const BlogPostHero: React.FC<BlogPostHeroProps> = ({ post }) => {
  return (
    <section className="pt-32 pb-10 px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <Button 
          href="/blog" 
          variant="ghost" 
          className="mb-6"
          icon={<ArrowLeft size={16} />} 
          iconPosition="left"
        >
          Back to all articles
        </Button>
        
        <div className="flex items-center">
          <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
          {post.title}
        </h1>
        
        <BlogPostMeta post={post} />
      </div>
    </section>
  );
};

export default BlogPostHero;
