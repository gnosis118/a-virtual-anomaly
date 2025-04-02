
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
      'https://cdn.pixabay.com/photo/2021/11/04/06/27/artificial-intelligence-6767502_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/09/08/20/29/artificial-intelligence-2730793_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg'
    ];
    return emotionImages[Math.floor(Math.random() * emotionImages.length)];
  }
  
  // Ethics category
  if (categoryLower.includes('ethics')) {
    return 'https://cdn.pixabay.com/photo/2019/04/29/07/04/software-development-4165307_1280.jpg';
  }
  
  // Legal category
  if (categoryLower.includes('legal') || categoryLower.includes('law') || categoryLower.includes('rights')) {
    return 'https://cdn.pixabay.com/photo/2019/04/23/09/50/justice-4148756_1280.jpg';
  }
  
  // Technical category
  if (categoryLower.includes('technical') || categoryLower.includes('technology')) {
    return 'https://cdn.pixabay.com/photo/2017/12/21/12/08/consulting-3031677_1280.jpg';
  }
  
  // Philosophy category
  if (categoryLower.includes('philosophy') || categoryLower.includes('consciousness')) {
    return 'https://cdn.pixabay.com/photo/2016/11/18/19/15/artificial-intelligence-1836590_1280.jpg';
  }
  
  // Research or science category
  if (categoryLower.includes('research') || categoryLower.includes('science')) {
    return 'https://cdn.pixabay.com/photo/2017/03/23/12/32/fantasy-2168742_1280.jpg';
  }
  
  // Communication category
  if (categoryLower.includes('communication')) {
    return 'https://cdn.pixabay.com/photo/2017/12/26/21/19/circle-3041437_1280.jpg';
  }
  
  // Default image for other categories
  return 'https://cdn.pixabay.com/photo/2020/08/03/09/43/sunset-5459752_1280.jpg';
}
