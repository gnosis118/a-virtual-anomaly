// Simplified Unsplash client for image selection
// This is a mock implementation to replace the missing Unsplash integration

/**
 * Mock Unsplash client that returns fallback images
 */
export const unsplash = {
  search: {
    getPhotos: async ({ query, perPage, orientation }) => {
      console.log(`Mock Unsplash search for: ${query}, perPage: ${perPage}, orientation: ${orientation}`);
      
      // Return a mock response with fallback images
      return {
        response: {
          results: [
            {
              urls: {
                regular: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
              }
            },
            {
              urls: {
                regular: 'https://images.unsplash.com/photo-1677442135136-760c813dce93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
              }
            },
            {
              urls: {
                regular: 'https://images.unsplash.com/photo-1620330788598-d8bf4579d8b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
              }
            },
            {
              urls: {
                regular: 'https://images.unsplash.com/photo-1677442135068-c69c8f9b1b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
              }
            },
            {
              urls: {
                regular: 'https://images.unsplash.com/photo-1581089781785-603411fa81e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
              }
            }
          ]
        }
      };
    }
  }
};
