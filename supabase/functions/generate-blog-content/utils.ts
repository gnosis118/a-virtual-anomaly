
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
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1677442135131-4be2ff5772ee?q=80&w=1632&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1765&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop'
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
    return 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1932&auto=format&fit=crop';
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
  
  // Default image for other categories
  return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1765&auto=format&fit=crop';
}
