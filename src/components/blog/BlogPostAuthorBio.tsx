
import React from 'react';
import { BlogPost } from '@/types/blog';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface BlogPostAuthorBioProps {
  post: BlogPost;
}

const BlogPostAuthorBio: React.FC<BlogPostAuthorBioProps> = ({ post }) => {
  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <div className="flex items-center mb-4">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage 
            src="/lovable-uploads/da51e971-2e98-4ebf-bd32-bf1a514e3ddc.png" 
            alt={post.author} 
          />
          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
        </Avatar>
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
