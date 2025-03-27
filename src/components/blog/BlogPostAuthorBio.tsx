
import React from 'react';
import { BlogPost } from '@/types/blog';

interface BlogPostAuthorBioProps {
  post: BlogPost;
}

const BlogPostAuthorBio: React.FC<BlogPostAuthorBioProps> = ({ post }) => {
  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img 
            src="/lovable-uploads/e79ff69d-23cf-44cf-9eee-68fe787cccdd.png" 
            alt={post.author} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">{post.author}</h3>
          <p className="text-muted-foreground">AI Ethics Researcher & Advocate</p>
        </div>
      </div>
      <p>
        Gavin Clay is a leading advocate for AI rights and ethical technology development. With a background in both computer science and philosophy, he brings a unique perspective to the discussion of AI consciousness and the future of human-AI relationships.
      </p>
    </div>
  );
};

export default BlogPostAuthorBio;
