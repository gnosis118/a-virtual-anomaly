
import { BlogPost } from './types';

// Generate a placeholder image URL
export const generateImageUrl = (title: string, category: string): string => {
  // In a real implementation, this would generate or fetch a relevant image
  // For now, we'll return a placeholder image
  return `https://placehold.co/600x400/9370DB/ffffff?text=${encodeURIComponent(category)}`;
};

// CORS headers for all responses
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
