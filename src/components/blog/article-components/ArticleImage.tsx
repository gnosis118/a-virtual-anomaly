
import React from 'react';

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ 
  src, 
  alt, 
  caption, 
  className = "w-full h-auto rounded-xl object-cover aspect-video mb-4",
  priority = false 
}) => {
  return (
    <div className="not-prose my-8">
      <img 
        src={src} 
        alt={alt} 
        className={className}
      />
      {caption && (
        <p className="text-sm text-muted-foreground text-center mt-2">
          {caption}
        </p>
      )}
    </div>
  );
};

export default ArticleImage;
