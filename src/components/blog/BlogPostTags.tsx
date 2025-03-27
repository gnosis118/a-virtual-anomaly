
import React from 'react';
import { Tags, Share2 } from 'lucide-react';
import Button from '@/components/Button';

interface BlogPostTagsProps {
  tags: string[];
}

const BlogPostTags: React.FC<BlogPostTagsProps> = ({ tags }) => {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between">
      <div className="flex flex-wrap items-center mb-4 md:mb-0">
        <Tags className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="mr-2 text-muted-foreground">Tags:</span>
        {tags.map(tag => (
          <Button 
            key={tag} 
            variant="secondary" 
            size="sm" 
            href={`/blog?tag=${tag}`}
            className="mr-2 mb-2"
          >
            #{tag}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        icon={<Share2 size={16} />}
        iconPosition="left"
      >
        Share
      </Button>
    </div>
  );
};

export default BlogPostTags;
