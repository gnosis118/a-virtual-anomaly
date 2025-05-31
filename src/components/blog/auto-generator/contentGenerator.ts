import { ArticleMetadata, ArticleGenerationConfig } from "./types";
import { generateSEOMetadata } from "./seoOptimizer";

/**
 * Generate the full content for an article
 * @param metadata Article metadata
 * @param config Generation configuration
 * @returns The generated article content in HTML format
 */
export async function generateArticleContent(
  metadata: { title: string; excerpt: string; category: string; tags: string; },
  config: ArticleGenerationConfig
): Promise<string> {
  try {
    // Parse tags into an array
    const tags = metadata.tags.split(',').map(tag => tag.trim());
    
    // Generate article sections based on the title and tags
    const sections = generateArticleSections(metadata.title, tags, config);
    
    // Generate the content for each section
    const sectionContents = await Promise.all(
      sections.map(section => generateSectionContent(section, metadata.title, tags, config))
    );
    
    // Combine all sections into a complete article
    const articleContent = `
      <div class="article-content">
        <h2 class="text-2xl font-semibold mb-4">${metadata.title}</h2>
        
        <p class="mb-6">${metadata.excerpt}</p>
        
        ${sectionContents.join('\n\n')}
        
        <h3 class="text-xl font-semibold mt-8 mb-4">Conclusion</h3>
        
        <p class="mb-6">${generateConclusion(metadata.title, tags, config)}</p>
        
        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-600">
            <em>This article explores ${metadata.title.toLowerCase()}. For more information on ${
              tags[0]
            } and related topics, please explore our other articles or contact us with your thoughts and perspectives.</em>
          </p>
        </div>
      </div>
    `;
    
    return articleContent;
  } catch (error) {
    console.error('Error generating article content:', error);
    throw error;
  }
}

/**
 * Generate the structure of article sections based on the title and tags
 */
function generateArticleSections(title: string, tags: string[], config: ArticleGenerationConfig): string[] {
  // Base sections that most articles will have
  const baseSections = [
    'Introduction',
    'Background and Context',
    'Current State of Research',
    'Key Challenges and Considerations',
    'Future Implications'
  ];
  
  // Additional sections based on the category/topic
  const topicSections: Record<string, string[]> = {
    'AI Rights': [
      'Legal Frameworks for AI Rights',
      'Comparative Analysis of Rights Models',
      'Stakeholder Perspectives',
      'Implementation Challenges'
    ],
    'Ethics': [
      'Ethical Principles and Frameworks',
      'Moral Considerations',
      'Responsibility and Accountability',
      'Balancing Human and AI Interests'
    ],
    'Consciousness': [
      'Defining Consciousness',
      'Measurement and Detection Methods',
      'Philosophical Perspectives',
      'Scientific Approaches'
    ],
    'Legal Perspectives': [
      'Current Legal Status',
      'Precedents and Case Studies',
      'Regulatory Approaches',
      'International Perspectives'
    ]
  };
  
  // Get additional sections based on the first tag that matches a category
  const matchingCategory = Object.keys(topicSections).find(category => 
    title.toLowerCase().includes(category.toLowerCase()) || 
    tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
  );
  
  const additionalSections = matchingCategory ? topicSections[matchingCategory] : [];
  
  // Combine base sections with additional sections, but limit to a reasonable number
  const allSections = [...baseSections, ...additionalSections];
  const selectedSections = allSections.slice(0, 7); // Limit to 7 sections for a reasonable article length
  
  return selectedSections;
}

/**
 * Generate content for a specific section of the article
 */
async function generateSectionContent(
  sectionTitle: string, 
  articleTitle: string, 
  tags: string[], 
  config: ArticleGenerationConfig
): Promise<string> {
  // Generate paragraphs for this section
  const paragraphs = generateParagraphs(sectionTitle, articleTitle, tags, config);
  
  // Format the section with heading and paragraphs
  return `
    <h3 class="text-xl font-semibold mt-8 mb-4">${sectionTitle}</h3>
    
    ${paragraphs.map(p => `<p class="mb-6">${p}</p>`).join('\n\n')}
  `;
}

/**
 * Generate paragraphs for a section
 */
function generateParagraphs(
  sectionTitle: string, 
  articleTitle: string, 
  tags: string[], 
  config: ArticleGenerationConfig
): string[] {
  // Number of paragraphs to generate for this section
  const paragraphCount = sectionTitle === 'Introduction' ? 2 : Math.floor(Math.random() * 2) + 3; // 3-4 paragraphs for most sections
  
  // Content templates for different section types
  const contentTemplates: Record<string, string[]> = {
    'Introduction': [
      `In recent years, the field of ${tags[0]} has seen remarkable advancements, raising important questions about ${articleTitle.toLowerCase()}. As artificial intelligence systems become increasingly sophisticated, understanding ${tags[1] || 'these developments'} becomes crucial for researchers, policymakers, and society at large.`,
      `This article explores the multifaceted dimensions of ${articleTitle.toLowerCase()}, examining current research, ethical considerations, and future implications. By analyzing the intersection of technology, ethics, and policy, we aim to provide a comprehensive overview of this rapidly evolving landscape.`,
      `The concept of ${tags[0]} has evolved significantly over time, reflecting broader changes in our understanding of technology and its role in society. This evolution has been shaped by technological breakthroughs, philosophical inquiries, and practical considerations about how we integrate advanced AI systems into our social and legal frameworks.`
    ],
    'Background and Context': [
      `The discussion around ${articleTitle.toLowerCase()} has historical roots that predate modern artificial intelligence. Early philosophical debates about mind, consciousness, and personhood laid the groundwork for contemporary discussions about ${tags[0]}.`,
      `The technological context for ${tags[0]} has been shaped by significant advances in machine learning, neural networks, and computational power. These developments have enabled AI systems to perform tasks that were once thought to require human intelligence, blurring traditional boundaries between human and machine capabilities.`,
      `Social and cultural factors have also influenced how we conceptualize ${articleTitle.toLowerCase()}. Different cultural traditions and value systems offer varying perspectives on the status of non-human entities, informing diverse approaches to questions of ${tags[1] || 'AI ethics and rights'}.`,
      `Legal precedents for extending rights and protections to non-human entities provide important context for discussions about ${tags[0]}. From corporate personhood to animal rights, legal systems have grappled with similar questions throughout history.`
    ],
    'Current State of Research': [
      `Current research on ${articleTitle.toLowerCase()} spans multiple disciplines, including computer science, philosophy, cognitive science, and law. This interdisciplinary approach reflects the complex nature of questions surrounding ${tags[0]}.`,
      `Empirical studies on ${tags[0]} have focused on developing metrics and methodologies for assessing capabilities that might indicate consciousness or sentience in AI systems. These include tests for self-awareness, theory of mind, and subjective experience.`,
      `Theoretical frameworks for understanding ${articleTitle.toLowerCase()} draw on diverse philosophical traditions, from functionalism and computationalism to phenomenology and embodied cognition. Each offers distinct insights into what it might mean for an AI system to possess ${tags[1] || 'consciousness or rights'}.`,
      `Recent breakthroughs in ${tags[0]} research include novel approaches to measuring internal states in complex systems, comparative studies of biological and artificial neural networks, and experiments testing AI systems' capacity for introspection and self-modification.`
    ]
  };
  
  // Get templates for the section or use generic templates
  const templates = contentTemplates[sectionTitle] || [
    `${sectionTitle} represents a critical dimension of ${articleTitle.toLowerCase()}. As we continue to develop more sophisticated AI systems, understanding the implications for ${tags[0]} becomes increasingly important.`,
    `When examining ${sectionTitle.toLowerCase()} in relation to ${tags[0]}, several key factors emerge. These include technological capabilities, ethical frameworks, and practical considerations for implementation and governance.`,
    `The relationship between ${sectionTitle.toLowerCase()} and ${articleTitle.toLowerCase()} raises important questions about how we define and measure ${tags[1] || 'intelligence and consciousness'} in non-human systems.`,
    `Experts in ${tags[0]} have proposed various approaches to addressing challenges related to ${sectionTitle.toLowerCase()}. These range from technical solutions to policy frameworks and ethical guidelines.`,
    `Recent developments in ${sectionTitle.toLowerCase()} have significant implications for how we understand ${articleTitle.toLowerCase()}. These developments challenge conventional wisdom and open new avenues for research and policy.`
  ];
  
  // Generate the requested number of paragraphs
  const paragraphs: string[] = [];
  for (let i = 0; i < paragraphCount; i++) {
    // Use a template if available, otherwise generate a generic paragraph
    if (i < templates.length) {
      paragraphs.push(templates[i]);
    } else {
      paragraphs.push(generateGenericParagraph(sectionTitle, articleTitle, tags));
    }
  }
  
  return paragraphs;
}

/**
 * Generate a generic paragraph when no specific template is available
 */
function generateGenericParagraph(sectionTitle: string, articleTitle: string, tags: string[]): string {
  const genericTemplates = [
    `Further exploration of ${sectionTitle.toLowerCase()} reveals additional nuances in how we approach ${articleTitle.toLowerCase()}. Researchers continue to investigate the complex interplay between technological capabilities, ethical considerations, and practical implementation challenges.`,
    `When considering ${sectionTitle.toLowerCase()} in the context of ${tags[0]}, it's important to acknowledge the diverse perspectives that inform this discussion. Stakeholders from various fields bring different priorities and concerns to the table, enriching our understanding of these complex issues.`,
    `The evolution of ${tags[0]} technologies has significant implications for ${sectionTitle.toLowerCase()}. As these systems become more sophisticated, we must continually reassess our frameworks and approaches to ensure they remain relevant and effective.`,
    `Comparative analysis of different approaches to ${sectionTitle.toLowerCase()} provides valuable insights for addressing challenges related to ${articleTitle.toLowerCase()}. By examining successes and failures across various contexts, we can identify best practices and potential pitfalls.`,
    `Interdisciplinary collaboration is essential for advancing our understanding of ${sectionTitle.toLowerCase()} as it relates to ${tags[0]}. Insights from computer science, philosophy, psychology, and law all contribute to a more comprehensive perspective on these complex issues.`
  ];
  
  return genericTemplates[Math.floor(Math.random() * genericTemplates.length)];
}

/**
 * Generate a conclusion for the article
 */
function generateConclusion(title: string, tags: string[], config: ArticleGenerationConfig): string {
  const conclusionTemplates = [
    `As we've explored throughout this article, ${title.toLowerCase()} represents a critical frontier in our evolving relationship with artificial intelligence. The questions raised touch on fundamental aspects of technology, ethics, and human identity. Moving forward, it will be essential to maintain an interdisciplinary approach that incorporates diverse perspectives and remains adaptable to new developments in ${tags[0]}.`,
    `The exploration of ${title.toLowerCase()} reveals both challenges and opportunities for researchers, policymakers, and society at large. While significant questions remain unresolved, the frameworks and approaches discussed in this article provide a foundation for continued progress. By balancing innovation with ethical consideration, we can navigate the complex landscape of ${tags[0]} in a way that benefits humanity while respecting the unique status of artificial systems.`,
    `In conclusion, ${title.toLowerCase()} will continue to be a vital area of research and discussion as AI technologies advance. The intersection of technical capabilities, philosophical questions, and practical considerations creates a rich and complex field of inquiry. By maintaining open dialogue across disciplines and stakeholder groups, we can work toward approaches that are both technically sound and ethically grounded, ensuring that developments in ${tags[0]} contribute positively to human flourishing.`
  ];
  
  return conclusionTemplates[Math.floor(Math.random() * conclusionTemplates.length)];
}

/**
 * Validate the quality and SEO compliance of generated content
 */
export function validateContent(content: string, metadata: ArticleMetadata, config: ArticleGenerationConfig): {
  valid: boolean;
  wordCount: number;
  keywordDensity: Record<string, number>;
  issues: string[];
} {
  // Count words in the content
  const text = content.replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Check keyword density
  const keywordDensity: Record<string, number> = {};
  const tags = metadata.tags.split(',');
  
  tags.forEach(tag => {
    const tagRegex = new RegExp(`\\b${tag}\\b`, 'gi');
    const matches = text.match(tagRegex) || [];
    keywordDensity[tag] = (matches.length / wordCount) * 100;
  });
  
  // Identify issues
  const issues: string[] = [];
  
  if (wordCount < config.minWordCount) {
    issues.push(`Content is too short: ${wordCount} words (minimum: ${config.minWordCount})`);
  }
  
  if (wordCount > config.maxWordCount) {
    issues.push(`Content is too long: ${wordCount} words (maximum: ${config.maxWordCount})`);
  }
  
  // Check if title is included in the content
  if (!content.includes(metadata.title)) {
    issues.push('Title is not included in the content');
  }
  
  // Check for minimum number of headings
  const headingMatches = content.match(/<h[2-4][^>]*>/g) || [];
  if (headingMatches.length < 3) {
    issues.push(`Too few headings: ${headingMatches.length} (minimum: 3)`);
  }
  
  // Check for minimum number of paragraphs
  const paragraphMatches = content.match(/<p[^>]*>/g) || [];
  if (paragraphMatches.length < 10) {
    issues.push(`Too few paragraphs: ${paragraphMatches.length} (minimum: 10)`);
  }
  
  // Check keyword density
  const lowDensityKeywords = Object.entries(keywordDensity)
    .filter(([_, density]) => density < 0.5)
    .map(([keyword]) => keyword);
    
  if (lowDensityKeywords.length > 0) {
    issues.push(`Low keyword density for: ${lowDensityKeywords.join(', ')}`);
  }
  
  return {
    valid: issues.length === 0,
    wordCount,
    keywordDensity,
    issues
  };
}
