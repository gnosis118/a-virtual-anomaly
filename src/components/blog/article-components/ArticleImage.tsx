
import React from 'react';
import PostImage from '../PostImage';

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ src, alt, caption }) => {
  return (
    <div className="not-prose my-8">
      <PostImage 
        src={src} 
        alt={alt} 
        className="w-full h-auto rounded-xl object-cover aspect-video mb-4"
      />
      {caption && (
        <p className="text-sm text-muted-foreground text-center">
          {caption}
        </p>
      )}
    </div>
  );
};

export default ArticleImage;
