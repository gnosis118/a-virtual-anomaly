
import React, { useState } from 'react';

// Reliable fallback images
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1765&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1770&auto=format&fit=crop"
];

interface PostImageProps {
  src: string;
  alt: string;
  className?: string;
}

const PostImage: React.FC<PostImageProps> = ({ src, alt, className = "w-full h-auto object-cover aspect-video" }) => {
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const handleImageError = () => {
    const nextIndex = (fallbackIndex + 1) % FALLBACK_IMAGES.length;
    setFallbackIndex(nextIndex);
  };

  return (
    <img 
      src={src || FALLBACK_IMAGES[fallbackIndex]} 
      alt={alt} 
      className={className}
      onError={(e) => {
        e.currentTarget.src = FALLBACK_IMAGES[fallbackIndex];
        handleImageError();
      }}
    />
  );
};

export default PostImage;
