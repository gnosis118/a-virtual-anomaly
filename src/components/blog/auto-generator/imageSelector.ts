
import { unsplash } from "@/integrations/unsplash/client";

/**
 * Find a relevant image for an article based on title, tags, and search terms
 * @param title Article title
 * @param tags Article tags (comma-separated string)
 * @param additionalSearchTerms Additional search terms to use
 * @returns URL of the selected image
 */
export async function findRelevantImage(
  title: string, 
  tags: string, 
  additionalSearchTerms: string[] = []
): Promise<string> {
  try {
    // Extract keywords from title and tags
    const titleKeywords = extractKeywords(title);
    const tagKeywords = tags.split(',').map(tag => tag.trim());
    
    // Combine all search terms
    const searchTerms = [...titleKeywords, ...tagKeywords, ...additionalSearchTerms];
    
    // Filter out common words and duplicates
    const filteredTerms = filterSearchTerms(searchTerms);
    
    // Try to find an image using the primary search term (first 2-3 terms)
    const primarySearchTerm = filteredTerms.slice(0, Math.min(3, filteredTerms.length)).join(' ');
    
    // Try Unsplash API first
    try {
      const unsplashImage = await searchUnsplashImage(primarySearchTerm);
      if (unsplashImage) {
        return unsplashImage;
      }
    } catch (error) {
      console.warn('Unsplash search failed, falling back to alternative sources:', error);
    }
    
    // Fallback to alternative image sources
    return await searchAlternativeImageSources();
  } catch (error) {
    console.error('Error finding relevant image:', error);
    // Return a default image if all else fails
    return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
  }
}

/**
 * Extract meaningful keywords from a title
 */
function extractKeywords(title: string): string[] {
  const words = title.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => 
      word.length > 3 && 
      !['and', 'the', 'for', 'with', 'from', 'that', 'this', 'are', 'you'].includes(word)
    );
  
  return words;
}

/**
 * Filter search terms to remove duplicates and common words
 */
function filterSearchTerms(terms: string[]): string[] {
  const uniqueTerms = [...new Set(terms)];
  
  return uniqueTerms.filter(term => 
    term.length > 3 && 
    !['and', 'the', 'for', 'with', 'from', 'that', 'this', 'are', 'you'].includes(term.toLowerCase())
  );
}

/**
 * Search for an image on Unsplash
 */
async function searchUnsplashImage(searchTerm: string): Promise<string | null> {
  try {
    const response = await unsplash.search.getPhotos({
      query: searchTerm,
      perPage: 10,
      orientation: 'landscape'
    });
    
    if (response.response?.results && response.response.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, response.response.results.length));
      const image = response.response.results[randomIndex];
      return image.urls.regular;
    }
    
    return null;
  } catch (error) {
    console.error('Error searching Unsplash:', error);
    return null;
  }
}

/**
 * Search for images from alternative sources
 */
async function searchAlternativeImageSources(): Promise<string> {
  const fallbackImages = [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1677442135136-760c813dce93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1620330788598-d8bf4579d8b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1677442135068-c69c8f9b1b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1581089781785-603411fa81e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  ];
  
  const randomIndex = Math.floor(Math.random() * fallbackImages.length);
  return fallbackImages[randomIndex];
}

/**
 * Generate an image using AI based on a description
 * Note: This would require integration with an image generation API
 */
export async function generateAIImage(description: string): Promise<string | null> {
  try {
    // This would be the implementation if we had access to an image generation API
    console.log('AI image generation requested for:', description);
    return null;
  } catch (error) {
    console.error('Error generating AI image:', error);
    return null;
  }
}
