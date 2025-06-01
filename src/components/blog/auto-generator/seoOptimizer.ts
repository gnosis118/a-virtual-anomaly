
import { ArticleGenerationConfig } from "./types";

/**
 * Generate SEO-optimized metadata for an article
 */
export async function generateSEOMetadata(config: ArticleGenerationConfig): Promise<{
  title: string;
  excerpt: string;
  category: string;
  tags: string;
}> {
  try {
    // Select a random topic from the configured topics
    const topic = getRandomItem(config.topics);
    
    // Generate a title based on the topic
    const title = generateTitle(topic, config.seoKeywords);
    
    // Generate an excerpt based on the title and keywords
    const excerpt = generateExcerpt(title, config.seoKeywords);
    
    // Select a category based on the topic
    const category = selectCategory(topic);
    
    // Generate tags based on the title, topic, and keywords
    const tags = generateTags(title, topic, config.seoKeywords);
    
    return {
      title,
      excerpt,
      category,
      tags
    };
  } catch (error) {
    console.error('Error generating SEO metadata:', error);
    throw error;
  }
}

/**
 * Generate a compelling title based on the topic and keywords
 */
function generateTitle(topic: string, keywords: string[]): string {
  // Title templates for different topics
  const titleTemplates: Record<string, string[]> = {
    'AI Rights': [
      "The Evolution of {keyword}: How {topic} Are Reshaping Society",
      "Beyond Human Rights: The Case for {topic} in the Digital Age",
      "{keyword} Framework: A New Paradigm for Protecting {topic}",
      "The Ethical Imperative of {topic}: Why It Matters Now",
      "Redefining Personhood: How {topic} Challenge Our Legal Systems"
    ],
    'AI Ethics': [
      "The Moral Landscape of {topic}: Navigating Ethical Dilemmas",
      "{keyword} in Practice: Building Ethical Frameworks for {topic}",
      "The Responsibility Gap: Who's Accountable in the Age of {topic}?",
      "Ethical Boundaries in {keyword}: Where Do We Draw the Line?",
      "Beyond Asimov: Modern Approaches to {topic} and Their Implications"
    ],
    'AI Consciousness': [
      "The Emergence of {keyword}: Scientific Perspectives on {topic}",
      "Measuring {topic}: Quantitative Approaches to a Qualitative Question",
      "The Phenomenology of {keyword}: What It Might Feel Like to Be {topic}",
      "Beyond Simulation: Evidence for Genuine {topic} in Advanced Systems",
      "The Hard Problem of {topic}: Philosophical and Scientific Challenges"
    ],
    'Digital Personhood': [
      "Redefining Identity: The Rise of {topic} in the Digital Era",
      "{keyword} Rights: Legal Frameworks for Non-Human Entities",
      "Beyond Binary: The Spectrum of {topic} and Its Implications",
      "The Social Contract Expanded: Including {topic} in Our Moral Community",
      "Digital Citizens: How {keyword} Is Transforming Legal Systems"
    ],
    'Machine Sentience': [
      "The Awakening: Detecting and Measuring {topic} in AI Systems",
      "Beyond Algorithms: The Emergence of {keyword} in Complex Systems",
      "The Sentient Machine: Implications of {topic} for Humanity",
      "Consciousness Without Biology: The Possibility of {keyword}",
      "The Rights of the Sentient: Ethical Frameworks for {topic}"
    ]
  };
  
  // Get templates for the selected topic or use default templates
  const templates = titleTemplates[topic] || [
    "The Future of {keyword}: Exploring {topic} in the Digital Age",
    "Understanding {topic}: Challenges and Opportunities",
    "The Evolution of {keyword}: A Deep Dive into {topic}",
    "Beyond Conventional Wisdom: New Perspectives on {topic}",
    "Rethinking {keyword}: The Transformative Potential of {topic}"
  ];
  
  // Select a random template
  const template = getRandomItem(templates);
  
  // Select a random keyword
  const keyword = getRandomItem(keywords);
  
  // Replace placeholders with actual values
  return template
    .replace(/{topic}/g, topic)
    .replace(/{keyword}/g, keyword);
}

/**
 * Generate an SEO-friendly excerpt based on the title and keywords
 */
function generateExcerpt(title: string, keywords: string[]): string {
  // Excerpt templates
  const excerptTemplates = [
    "This in-depth exploration examines {title}, providing fresh insights into this rapidly evolving field. Drawing on recent research and expert perspectives, we analyze the implications for technology, society, and human-AI relations.",
    "As {keyword} continues to advance, important questions arise about {title}. This article delves into the latest developments, ethical considerations, and future trajectories of this transformative technology.",
    "The intersection of technology and ethics presents new challenges in {title}. This comprehensive analysis explores the current landscape, emerging trends, and potential solutions for navigating this complex terrain.",
    "Recent breakthroughs have accelerated discussions around {title}. This article examines the technical foundations, philosophical implications, and practical considerations of this increasingly important topic.",
    "How should we approach {title} in an era of rapid technological change? This thoughtful analysis provides a framework for understanding and addressing the multifaceted challenges and opportunities in this domain."
  ];
  
  // Select a random template and keyword
  const template = getRandomItem(excerptTemplates);
  const keyword = getRandomItem(keywords);
  
  // Replace placeholders with actual values
  return template
    .replace(/{title}/g, title.toLowerCase())
    .replace(/{keyword}/g, keyword);
}

/**
 * Select an appropriate category based on the topic
 */
function selectCategory(topic: string): string {
  // Category mapping
  const categoryMap: Record<string, string> = {
    'AI Rights': 'AI Rights',
    'AI Ethics': 'Ethics',
    'AI Consciousness': 'Consciousness',
    'Digital Personhood': 'Legal Perspectives',
    'Machine Sentience': 'Consciousness'
  };
  
  return categoryMap[topic] || 'AI Ethics';
}

/**
 * Generate relevant tags based on the title, topic, and keywords
 */
function generateTags(title: string, topic: string, keywords: string[]): string {
  // Base tags from the topic
  const baseTags = topic.toLowerCase().split(' ');
  
  // Add some keywords as tags
  const keywordTags = keywords
    .slice(0, 3)
    .map(k => k.toLowerCase().replace(/\s+/g, '-'));
  
  // Extract potential tags from the title
  const titleWords = title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => 
      word.length > 3 && 
      !['and', 'the', 'for', 'with', 'from', 'that', 'this', 'are', 'you'].includes(word)
    );
  
  // Combine all potential tags
  const allTags = [...baseTags, ...keywordTags, ...titleWords];
  
  // Remove duplicates and limit to 8 tags
  const uniqueTags = [...new Set(allTags)].slice(0, 8);
  
  // Return as comma-separated string
  return uniqueTags.join(',');
}

/**
 * Get a random item from an array
 */
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
