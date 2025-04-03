
// CORS headers for Supabase Edge Functions
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate a placeholder image URL based on the post title and category
export function generateImageUrl(title: string, category: string): string {
  // For a real implementation, you would use an image generation API like DALL-E
  // For this demo, we'll use relevant placeholder images based on the category

  // Convert title and category to lowercase for easier matching
  const titleLower = title.toLowerCase();
  const categoryLower = category.toLowerCase();
  
  // Check for emotional AI related content
  if (titleLower.includes('emotion') || titleLower.includes('feeling') || categoryLower.includes('psychology')) {
    // Return one of several AI emotion-related images
    const emotionImages = [
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507490857-1a87b75e19b3?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557176279-d77be41aa7b7?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583468982228-19f19164aee6?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?q=80&w=2073&auto=format&fit=crop'
    ];
    return emotionImages[Math.floor(Math.random() * emotionImages.length)];
  }
  
  // Ethics category
  if (categoryLower.includes('ethics')) {
    return 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop';
  }
  
  // Legal category
  if (categoryLower.includes('legal') || categoryLower.includes('law') || categoryLower.includes('rights')) {
    return 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=1974&auto=format&fit=crop';
  }
  
  // Technical category
  if (categoryLower.includes('technical') || categoryLower.includes('technology')) {
    return 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1974&auto=format&fit=crop';
  }
  
  // Philosophy category
  if (categoryLower.includes('philosophy') || categoryLower.includes('consciousness')) {
    return 'https://images.unsplash.com/photo-1456428746267-a1756408f782?q=80&w=2070&auto=format&fit=crop';
  }
  
  // Research or science category
  if (categoryLower.includes('research') || categoryLower.includes('science')) {
    return 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop';
  }
  
  // Communication category
  if (categoryLower.includes('communication')) {
    return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop';
  }
  
  // Default set of reliable images for any other categories - neural networks images
  const defaultImages = [
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507490857-1a87b75e19b3?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop'
  ];
  
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
}
