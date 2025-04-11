import React from 'react';
import { ArrowRight } from 'lucide-react';
import FeaturedPost from '@/components/blog/FeaturedPost';
import { slugify } from '@/utils/slugify';

interface FeaturedArticlesSectionProps {
  posts: any[];
}

const FeaturedArticlesSection: React.FC<FeaturedArticlesSectionProps> = ({ posts }) => {
  // Make sure we have posts before proceeding
  if (!posts || posts.length === 0) {
    return null;
  }

  // Find the governance article if it exists
  const governanceArticle = posts.find(post => post.id === 'ai-consciousness-governance');
  
  // Use governance article as main featured if it exists, otherwise use first post
  const mainFeatured = governanceArticle || posts[0];
  
  // Filter out the main featured post from other featured posts
  const otherFeatured = posts.filter(post => post.id !== mainFeatured.id);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
      
      {/* Main Featured Post */}
      {mainFeatured && (
        <div className="rounded-xl overflow-hidden shadow-lg mb-6 group bg-card">
          <a 
            href={`/blog/${typeof mainFeatured.id === 'string' ? mainFeatured.id : slugify(mainFeatured.title)}`} 
            className="block relative"
          >
            <div className="relative h-96 overflow-hidden">
              <img 
                src={mainFeatured.image} 
                alt={mainFeatured.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?auto=format&fit=crop&w=1965&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
            
            <div className="absolute bottom-0 left-0 p-6 w-full text-white">
              <div className="flex items-center">
                <span className="px-3 py-1 text-xs font-medium bg-accent/80 rounded-full">
                  {mainFeatured.category}
                </span>
                <span className="ml-3 text-sm opacity-80">{mainFeatured.date}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-2 group-hover:text-accent transition-colors">
                {mainFeatured.title}
              </h3>
              
              <p className="text-sm md:text-base opacity-90 mb-4 line-clamp-2">
                {mainFeatured.excerpt}
              </p>
              
              <div className="inline-flex items-center text-sm font-medium text-accent group-hover:text-accent/80">
                Read more
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Other Featured Posts in Grid */}
      {otherFeatured.length > 0 && (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {otherFeatured.map(post => (
            <FeaturedPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedArticlesSection;
