
import React, { useState } from 'react';

// Reliable fallback images for brain/fMRI/emotional processing
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507490857-1a87b75e19b3?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557176279-d77be41aa7b7?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583468982228-19f19164aee6?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?q=80&w=2073&auto=format&fit=crop"
];

interface PostImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const PostImage: React.FC<PostImageProps> = ({ 
  src, 
  alt, 
  className = "w-full h-auto object-cover aspect-video",
  priority = false
}) => {
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [isError, setIsError] = useState(false);

  // Function to ensure URLs are absolute (needed for social media sharing)
  const getAbsoluteUrl = (url: string) => {
    if (!url) return FALLBACK_IMAGES[0];
    if (url.startsWith('http')) return url;
    
    // Ensure base URL is defined
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://virtualanomaly.org';
    return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  };

  const handleImageError = () => {
    if (fallbackIndex < FALLBACK_IMAGES.length - 1) {
      setFallbackIndex(fallbackIndex + 1);
    }
    setIsError(true);
  };

  // If the original source is one of our fallback images already, use it directly
  const isSourceAlreadyFallback = FALLBACK_IMAGES.includes(src);
  
  const imageSource = isError || !src 
    ? FALLBACK_IMAGES[fallbackIndex] 
    : (isSourceAlreadyFallback ? src : src);

  return (
    <img 
      src={getAbsoluteUrl(imageSource)} 
      alt={alt} 
      className={className}
      onError={handleImageError}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
};

export default PostImage;
