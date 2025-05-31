import { supabase } from "@/integrations/supabase/client";
import { ArticleMetadata, ArticleGenerationConfig, ArticleGenerationResult } from "./types";
import { generateArticleContent } from "./contentGenerator";
import { findRelevantImage } from "./imageSelector";
import { generateSEOMetadata } from "./seoOptimizer";

/**
 * Main controller for the automatic article generation process
 */
export class ArticleGenerator {
  private config: ArticleGenerationConfig;
  
  constructor(config: ArticleGenerationConfig) {
    this.config = config;
  }
  
  /**
   * Generate a complete article with metadata and content
   */
  public async generateArticle(): Promise<ArticleGenerationResult> {
    try {
      // Step 1: Generate SEO-optimized metadata (title, excerpt, tags)
      const metadata = await generateSEOMetadata(this.config);
      
      // Step 2: Generate the article content based on metadata
      const content = await generateArticleContent(metadata, this.config);
      
      // Step 3: Find a relevant image for the article
      const imageUrl = await findRelevantImage(metadata.title, metadata.tags, this.config.imageSearchTerms);
      
      // Step 4: Create the complete article metadata
      const articleMetadata: ArticleMetadata = {
        id: `auto-${Date.now()}`,
        title: metadata.title,
        excerpt: metadata.excerpt,
        author: this.config.authorName,
        category: metadata.category || this.config.defaultCategory,
        tags: metadata.tags,
        status: 'scheduled',
        publishdate: this.getNextPublishDate(),
        image_url: imageUrl
      };
      
      return {
        success: true,
        metadata: articleMetadata,
        content: content
      };
    } catch (error) {
      console.error('Error generating article:', error);
      return {
        success: false,
        error: error.message || 'Unknown error occurred during article generation'
      };
    }
  }
  
  /**
   * Save the generated article to the database
   */
  public async saveArticle(metadata: ArticleMetadata, content: string): Promise<boolean> {
    try {
      // First, insert the article metadata
      const { error: metadataError } = await supabase
        .from('scheduled_posts')
        .insert(metadata);
        
      if (metadataError) {
        console.error('Error saving article metadata:', metadataError);
        return false;
      }
      
      // Then, update with the content
      const { error: contentError } = await supabase
        .from('scheduled_posts')
        .update({ content })
        .eq('id', metadata.id);
        
      if (contentError) {
        console.error('Error saving article content:', contentError);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error saving article to database:', error);
      return false;
    }
  }
  
  /**
   * Calculate the next publication date based on the current schedule
   */
  private getNextPublishDate(): string {
    const today = new Date();
    // For every other day, add 2 days to the current date
    const nextPublishDate = new Date(today);
    nextPublishDate.setDate(today.getDate() + 2);
    return nextPublishDate.toISOString().split('T')[0];
  }
}
