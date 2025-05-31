import { supabase } from "@/integrations/supabase/client";
import { ArticleGenerator } from "./articleGenerator";
import { ArticleScheduler } from "./articleScheduler";
import { validateContent } from "./contentGenerator";

/**
 * Main entry point for the automatic article generator system
 */
export async function initializeArticleGenerationSystem() {
  try {
    console.log('Initializing automatic article generation system...');
    
    // Define the article generation configuration
    const articleConfig = {
      topics: ['AI Rights', 'AI Ethics', 'AI Consciousness', 'Digital Personhood', 'Machine Sentience'],
      minWordCount: 2000,
      maxWordCount: 3000,
      seoKeywords: [
        'AI rights', 'artificial intelligence ethics', 'machine consciousness', 
        'digital personhood', 'AI sentience', 'ethical AI', 'machine rights',
        'artificial consciousness', 'AI legal status', 'robot rights'
      ],
      imageSearchTerms: [
        'artificial intelligence', 'robot ethics', 'futuristic technology', 
        'AI consciousness', 'digital mind', 'neural network', 'sentient machine'
      ],
      authorName: 'Gavin Clay',
      defaultCategory: 'AI Ethics'
    };
    
    // Define the scheduling configuration
    const scheduleConfig = {
      frequency: 'every_other_day',
      startDate: new Date(),
      timeOfDay: '09:00'
    };
    
    // Create the scheduler
    const scheduler = new ArticleScheduler(articleConfig, scheduleConfig);
    
    // Initialize the scheduler
    const initialized = await scheduler.initialize();
    
    if (initialized) {
      console.log('Article generation system initialized successfully');
      
      // Generate the first article immediately if requested
      const generateNow = true;
      if (generateNow) {
        console.log('Generating first article immediately...');
        await generateAndValidateArticle(articleConfig);
      }
      
      return true;
    } else {
      console.error('Failed to initialize article generation system');
      return false;
    }
  } catch (error) {
    console.error('Error initializing article generation system:', error);
    return false;
  }
}

/**
 * Generate and validate an article
 */
export async function generateAndValidateArticle(config) {
  try {
    console.log('Generating new article...');
    
    // Create the article generator
    const generator = new ArticleGenerator(config);
    
    // Generate the article
    const result = await generator.generateArticle();
    
    if (!result.success || !result.metadata || !result.content) {
      console.error('Failed to generate article:', result.error);
      return false;
    }
    
    // Validate the generated content
    const validation = validateContent(result.content, result.metadata, config);
    
    console.log('Article validation results:', {
      valid: validation.valid,
      wordCount: validation.wordCount,
      issues: validation.issues
    });
    
    // If the content is valid, save it to the database
    if (validation.valid) {
      console.log('Article passed validation, saving to database...');
      const saved = await generator.saveArticle(result.metadata, result.content);
      
      if (saved) {
        console.log('Article saved successfully:', result.metadata.title);
        return true;
      } else {
        console.error('Failed to save article to database');
        return false;
      }
    } else {
      console.error('Article failed validation:', validation.issues);
      return false;
    }
  } catch (error) {
    console.error('Error in generateAndValidateArticle:', error);
    return false;
  }
}

/**
 * Setup database tables required for the article generation system
 */
export async function setupArticleGenerationTables() {
  try {
    // Check if the scheduler_config table exists
    const { error: checkError } = await supabase
      .from('scheduler_config')
      .select('id')
      .limit(1);
      
    // If the table doesn't exist, create it
    if (checkError && checkError.code === 'PGRST116') {
      console.log('Creating scheduler_config table...');
      
      // This would typically be done through migrations, but for simplicity:
      const { error: createError } = await supabase.rpc('create_scheduler_config_table');
      
      if (createError) {
        console.error('Error creating scheduler_config table:', createError);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error setting up article generation tables:', error);
    return false;
  }
}

/**
 * Check for and process any scheduled articles that are due to be published
 */
export async function checkScheduledArticles() {
  try {
    console.log('Checking for scheduled articles...');
    
    // Get the current date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    // Get all scheduled articles for today or earlier
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('status', 'scheduled')
      .lte('publishdate', formattedDate);
      
    if (error) {
      console.error('Error checking scheduled articles:', error);
      return false;
    }
    
    if (!data || data.length === 0) {
      console.log('No scheduled articles found for today or earlier');
      return true;
    }
    
    console.log(`Found ${data.length} scheduled articles to publish`);
    
    // Publish each article
    for (const article of data) {
      console.log(`Publishing article: ${article.title}`);
      
      // Update the article status to published
      const { error: updateError } = await supabase
        .from('scheduled_posts')
        .update({ status: 'published' })
        .eq('id', article.id);
        
      if (updateError) {
        console.error(`Error publishing article ${article.id}:`, updateError);
      } else {
        console.log(`Successfully published article: ${article.title}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error in checkScheduledArticles:', error);
    return false;
  }
}
