
import { supabase } from "@/integrations/supabase/client";
import { ArticleGenerator } from "./articleGenerator";
import { ArticleScheduler } from "./articleScheduler";
import { validateContent } from "./contentGenerator";
import { ArticleGenerationConfig } from "./types";

/**
 * Main entry point for the automatic article generator system
 */
export async function initializeArticleGenerationSystem() {
  try {
    console.log('Initializing automatic article generation system...');
    
    const articleConfig: ArticleGenerationConfig = {
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
    
    const scheduleConfig = {
      frequency: 'every_other_day' as const,
      startDate: new Date(),
      timeOfDay: '09:00'
    };
    
    const scheduler = new ArticleScheduler(articleConfig, scheduleConfig);
    const initialized = await scheduler.initialize();
    
    if (initialized) {
      console.log('Article generation system initialized successfully');
      
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
export async function generateAndValidateArticle(config: ArticleGenerationConfig) {
  try {
    console.log('Generating new article...');
    
    const generator = new ArticleGenerator(config);
    const result = await generator.generateArticle();
    
    if (!result.success || !result.metadata || !result.content) {
      console.error('Failed to generate article:', result.error);
      return false;
    }
    
    const validation = validateContent(result.content, result.metadata, config);
    
    console.log('Article validation results:', {
      valid: validation.valid,
      wordCount: validation.wordCount,
      issues: validation.issues
    });
    
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
 * Check for and process any scheduled articles that are due to be published
 */
export async function checkScheduledArticles() {
  try {
    console.log('Checking for scheduled articles...');
    
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
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
    
    for (const article of data) {
      console.log(`Publishing article: ${article.title}`);
      
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
