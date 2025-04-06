
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
      console.log('Consciousness measurement article already exists');
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
