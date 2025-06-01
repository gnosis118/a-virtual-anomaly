
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
      const metadata = await generateSEOMetadata(this.config);
      const content = await generateArticleContent(metadata, this.config);
      const imageUrl = await findRelevantImage(metadata.title, metadata.tags, this.config.imageSearchTerms);
      
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
        error: error instanceof Error ? error.message : 'Unknown error occurred during article generation'
      };
    }
  }
  
  /**
   * Save the generated article to the database
   */
  public async saveArticle(metadata: ArticleMetadata, content: string): Promise<boolean> {
    try {
      const { error: metadataError } = await supabase
        .from('scheduled_posts')
        .insert(metadata);
        
      if (metadataError) {
        console.error('Error saving article metadata:', metadataError);
        return false;
      }
      
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
    const nextPublishDate = new Date(today);
    nextPublishDate.setDate(today.getDate() + 2);
    return nextPublishDate.toISOString().split('T')[0];
  }
}
