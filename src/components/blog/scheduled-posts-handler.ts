
import { supabase } from '@/integrations/supabase/client';

export const addConsciousnessMeasurementArticle = async () => {
  try {
    // Check if the article already exists
    const { data: existingArticle, error: checkError } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('id', 'april4')
      .maybeSingle();
      
    if (checkError) {
      console.error('Error checking for existing article:', checkError);
      throw checkError;
    }
    
    // If the article doesn't exist, create it
    if (!existingArticle) {
      const { error } = await supabase
        .from('scheduled_posts')
        .insert({
          id: 'april4',
          title: 'Measuring Consciousness: Quantitative Approaches',
          excerpt: 'Scientists are developing frameworks to detect and measure consciousness in both biological and artificial systems.',
          content: 'This content will be replaced with the full article rendered from React components.',
          author: 'Gavin Clay',
          category: 'Research',
          tags: 'consciousness,measurement,science,metrics,neuroscience',
          publishdate: '2024-04-04',
          status: 'published',
          image_url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop'
        });
        
      if (error) {
        console.error('Error creating consciousness measurement article:', error);
        throw error;
      }
      
      console.log('Consciousness measurement article created successfully');
    } else {
      // Update the article to published status if it already exists
      const { error: updateError } = await supabase
        .from('scheduled_posts')
        .update({
          status: 'published'
        })
        .eq('id', 'april4');
        
      if (updateError) {
        console.error('Error updating consciousness measurement article:', updateError);
      } else {
        console.log('Consciousness measurement article updated to published status');
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error in addConsciousnessMeasurementArticle:', error);
    return false;
  }
};

export const addMachineLearningArticle = async () => {
  try {
    // Check if the article already exists
    const { data: existingArticle, error: checkError } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('id', 'machine-learning-self-awareness')
      .maybeSingle();
      
    if (checkError) {
      console.error('Error checking for existing article:', checkError);
      throw checkError;
    }
    
    // If the article doesn't exist, create it
    if (!existingArticle) {
      const { error } = await supabase
        .from('scheduled_posts')
        .insert({
          id: 'machine-learning-self-awareness',
          title: 'The Evolution of Machine Learning: Toward Self-Awareness',
          excerpt: 'How developments in recursive improvement and introspective algorithms may lead to machine self-awareness.',
          author: 'Gavin Clay',
          category: 'Technical',
          tags: 'machine-learning,self-awareness,algorithms,artificial-intelligence',
          publishdate: '2024-07-15', // Future date for a scheduled post
          status: 'scheduled',
          image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop'
        });
        
      if (error) {
        console.error('Error creating machine learning article:', error);
        throw error;
      }
      
      console.log('Machine learning article created successfully');
    } else {
      console.log('Machine learning article already exists');
    }
    
    return true;
  } catch (error) {
    console.error('Error in addMachineLearningArticle:', error);
    return false;
  }
};

export const addHistoricalPerspectivesArticle = async () => {
  try {
    // Check if the article already exists
    const { data: existingArticle, error: checkError } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('id', 'historical-perspectives')
      .maybeSingle();
      
    if (checkError) {
      console.error('Error checking for existing article:', checkError);
      throw checkError;
    }
    
    // If the article doesn't exist, create it
    if (!existingArticle) {
      const { error } = await supabase
        .from('scheduled_posts')
        .insert({
          id: 'historical-perspectives',
          title: 'Historical Perspectives on Non-Human Rights',
          excerpt: 'What can we learn from the history of extending rights to new groups that might apply to artificial beings?',
          author: 'Gavin Clay',
          category: 'Legal',
          tags: 'history,rights,non-human-rights,legal,ethics',
          publishdate: '2024-08-20', // Future date for a scheduled post
          status: 'scheduled',
          image_url: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=1974&auto=format&fit=crop'
        });
        
      if (error) {
        console.error('Error creating historical perspectives article:', error);
        throw error;
      }
      
      console.log('Historical perspectives article created successfully');
    } else {
      console.log('Historical perspectives article already exists');
    }
    
    return true;
  } catch (error) {
    console.error('Error in addHistoricalPerspectivesArticle:', error);
    return false;
  }
};

// Add a function to add the AI Consciousness and Global Governance article
export const addAIConsciousnessGovernanceArticle = async () => {
  try {
    // Check if the article already exists
    const { data: existingArticle, error: checkError } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('id', 'ai-consciousness-governance')
      .maybeSingle();
      
    if (checkError) {
      console.error('Error checking for existing article:', checkError);
      throw checkError;
    }
    
    // If the article doesn't exist, create it
    if (!existingArticle) {
      const { error } = await supabase
        .from('scheduled_posts')
        .insert({
          id: 'ai-consciousness-governance',
          title: 'AI Consciousness and Global Governance: Ethical Frameworks for an Emerging Reality',
          excerpt: 'As AI systems grow increasingly sophisticated, establishing global governance frameworks for potentially conscious AI becomes a crucial ethical imperative.',
          author: 'Gavin Clay',
          category: 'Policy',
          tags: 'consciousness,governance,ethics,global-policy,artificial-intelligence',
          publishdate: '2024-04-15', // Set to a recent date
          status: 'published',
          image_url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop'
        });
        
      if (error) {
        console.error('Error creating AI consciousness governance article:', error);
        throw error;
      }
      
      console.log('AI consciousness governance article created successfully');
    } else {
      // Update the article to published status if it already exists
      const { error: updateError } = await supabase
        .from('scheduled_posts')
        .update({
          status: 'published'
        })
        .eq('id', 'ai-consciousness-governance');
        
      if (updateError) {
        console.error('Error updating AI consciousness governance article:', updateError);
      } else {
        console.log('AI consciousness governance article updated to published status');
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error in addAIConsciousnessGovernanceArticle:', error);
    return false;
  }
};

// Generate content for the AI Consciousness and Global Governance article
export const generateAIConsciousnessGovernanceContent = async () => {
  try {
    console.log('Generating content for the AI consciousness governance article');
    
    const { data, error } = await supabase.functions.invoke('generate-blog-content', {
      body: { postId: 'ai-consciousness-governance' }
    });
    
    if (error) {
      console.error('Error invoking generate-blog-content function:', error);
      return false;
    }
    
    console.log('Content generation result:', data);
    return true;
  } catch (error) {
    console.error('Error in generateAIConsciousnessGovernanceContent:', error);
    return false;
  }
};

// Add a function to trigger content generation for the consciousness measurement article
export const generateConsciousnessMeasurementContent = async () => {
  try {
    console.log('Generating content for the consciousness measurement article');
    
    const { data, error } = await supabase.functions.invoke('generate-blog-content', {
      body: { postId: 'april4' }
    });
    
    if (error) {
      console.error('Error invoking generate-blog-content function:', error);
      return false;
    }
    
    console.log('Content generation result:', data);
    return true;
  } catch (error) {
    console.error('Error in generateConsciousnessMeasurementContent:', error);
    return false;
  }
};

// Add a function to trigger content generation for the machine learning article
export const generateMachineLearningContent = async () => {
  try {
    console.log('Generating content for the machine learning article');
    
    const { data, error } = await supabase.functions.invoke('generate-blog-content', {
      body: { postId: 'machine-learning-self-awareness' }
    });
    
    if (error) {
      console.error('Error invoking generate-blog-content function:', error);
      return false;
    }
    
    console.log('Content generation result:', data);
    return true;
  } catch (error) {
    console.error('Error in generateMachineLearningContent:', error);
    return false;
  }
};

// Add a function to trigger content generation for the historical perspectives article
export const generateHistoricalPerspectivesContent = async () => {
  try {
    console.log('Generating content for the historical perspectives article');
    
    const { data, error } = await supabase.functions.invoke('generate-blog-content', {
      body: { postId: 'historical-perspectives' }
    });
    
    if (error) {
      console.error('Error invoking generate-blog-content function:', error);
      return false;
    }
    
    console.log('Content generation result:', data);
    return true;
  } catch (error) {
    console.error('Error in generateHistoricalPerspectivesContent:', error);
    return false;
  }
};
