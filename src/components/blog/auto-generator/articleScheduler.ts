import { supabase } from "@/integrations/supabase/client";
import { ArticleGenerator } from "./articleGenerator";
import { ArticleGenerationConfig, ScheduleConfig } from "./types";

/**
 * Scheduler for automatic article generation and publishing
 */
export class ArticleScheduler {
  private config: ArticleGenerationConfig;
  private scheduleConfig: ScheduleConfig;
  
  constructor(config: ArticleGenerationConfig, scheduleConfig: ScheduleConfig) {
    this.config = config;
    this.scheduleConfig = scheduleConfig;
  }
  
  /**
   * Initialize the scheduler and set up the next scheduled run
   */
  public async initialize(): Promise<boolean> {
    try {
      // Check if we already have scheduled articles for the next few days
      const hasScheduledArticles = await this.checkExistingScheduledArticles();
      
      if (!hasScheduledArticles) {
        // Generate and schedule the first article
        await this.generateAndScheduleArticle();
      }
      
      // Set up the next scheduled run
      await this.scheduleNextRun();
      
      return true;
    } catch (error) {
      console.error('Error initializing article scheduler:', error);
      return false;
    }
  }
  
  /**
   * Check if there are already scheduled articles for the next few days
   */
  private async checkExistingScheduledArticles(): Promise<boolean> {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('id')
      .eq('status', 'scheduled')
      .gte('publishdate', today.toISOString().split('T')[0])
      .lte('publishdate', nextWeek.toISOString().split('T')[0]);
      
    if (error) {
      console.error('Error checking existing scheduled articles:', error);
      return false;
    }
    
    return data && data.length > 0;
  }
  
  /**
   * Generate and schedule a new article
   */
  public async generateAndScheduleArticle(): Promise<boolean> {
    try {
      const generator = new ArticleGenerator(this.config);
      const result = await generator.generateArticle();
      
      if (!result.success || !result.metadata || !result.content) {
        console.error('Failed to generate article:', result.error);
        return false;
      }
      
      // Save the article to the database
      const saved = await generator.saveArticle(result.metadata, result.content);
      
      if (!saved) {
        console.error('Failed to save generated article to database');
        return false;
      }
      
      console.log('Successfully generated and scheduled article:', result.metadata.title);
      return true;
    } catch (error) {
      console.error('Error generating and scheduling article:', error);
      return false;
    }
  }
  
  /**
   * Schedule the next article generation run
   */
  private async scheduleNextRun(): Promise<void> {
    try {
      // Calculate the next run date based on frequency
      const nextRunDate = this.calculateNextRunDate();
      
      // Store the next run date in the database or another persistent storage
      const { error } = await supabase
        .from('scheduler_config')
        .upsert({
          id: 'article_generator',
          next_run: nextRunDate.toISOString(),
          frequency: this.scheduleConfig.frequency,
          last_updated: new Date().toISOString()
        });
        
      if (error) {
        console.error('Error scheduling next run:', error);
      }
    } catch (error) {
      console.error('Error in scheduleNextRun:', error);
    }
  }
  
  /**
   * Calculate the next run date based on the frequency
   */
  private calculateNextRunDate(): Date {
    const now = new Date();
    const nextRun = new Date(now);
    
    switch (this.scheduleConfig.frequency) {
      case 'daily':
        nextRun.setDate(now.getDate() + 1);
        break;
      case 'every_other_day':
        nextRun.setDate(now.getDate() + 2);
        break;
      case 'weekly':
        nextRun.setDate(now.getDate() + 7);
        break;
      default:
        nextRun.setDate(now.getDate() + 2); // Default to every other day
    }
    
    // Set the time of day
    if (this.scheduleConfig.timeOfDay) {
      const [hours, minutes] = this.scheduleConfig.timeOfDay.split(':').map(Number);
      nextRun.setHours(hours || 9, minutes || 0, 0, 0);
    } else {
      nextRun.setHours(9, 0, 0, 0); // Default to 9:00 AM
    }
    
    return nextRun;
  }
  
  /**
   * Check if it's time to run the scheduler
   */
  public static async checkAndRunScheduler(): Promise<boolean> {
    try {
      // Get the scheduler configuration from the database
      const { data, error } = await supabase
        .from('scheduler_config')
        .select('*')
        .eq('id', 'article_generator')
        .single();
        
      if (error) {
        console.error('Error checking scheduler config:', error);
        return false;
      }
      
      if (!data) {
        console.log('No scheduler configuration found');
        return false;
      }
      
      const nextRun = new Date(data.next_run);
      const now = new Date();
      
      // If it's time to run the scheduler
      if (nextRun <= now) {
        console.log('Running scheduled article generation');
        
        // Create a new scheduler with the stored configuration
        const articleConfig: ArticleGenerationConfig = {
          topics: ['AI Rights', 'AI Ethics', 'AI Consciousness', 'Digital Personhood', 'Machine Sentience'],
          minWordCount: 2000,
          maxWordCount: 3000,
          seoKeywords: ['AI rights', 'artificial intelligence ethics', 'machine consciousness', 'digital personhood'],
          imageSearchTerms: ['artificial intelligence', 'robot ethics', 'futuristic technology', 'AI consciousness'],
          authorName: 'Gavin Clay',
          defaultCategory: 'AI Ethics'
        };
        
        const scheduleConfig: ScheduleConfig = {
          frequency: data.frequency || 'every_other_day',
          startDate: new Date(),
          timeOfDay: '09:00'
        };
        
        const scheduler = new ArticleScheduler(articleConfig, scheduleConfig);
        
        // Generate and schedule a new article
        const success = await scheduler.generateAndScheduleArticle();
        
        if (success) {
          // Schedule the next run
          await scheduler.scheduleNextRun();
        }
        
        return success;
      }
      
      return false;
    } catch (error) {
      console.error('Error in checkAndRunScheduler:', error);
      return false;
    }
  }
}
