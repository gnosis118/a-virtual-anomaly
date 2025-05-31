// Types for the automatic article generator

export interface ArticleMetadata {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string;
  status: 'draft' | 'scheduled' | 'published';
  publishdate: string;
  image_url: string;
}

export interface ArticleContent {
  content: string;
}

export interface ArticleGenerationConfig {
  topics: string[];
  minWordCount: number;
  maxWordCount: number;
  seoKeywords: string[];
  imageSearchTerms: string[];
  authorName: string;
  defaultCategory: string;
}

export interface ArticleGenerationResult {
  success: boolean;
  metadata?: ArticleMetadata;
  content?: string;
  error?: string;
}

export interface ScheduleConfig {
  frequency: 'daily' | 'every_other_day' | 'weekly';
  startDate: Date;
  timeOfDay: string; // HH:MM format
}
