
import React from 'react';
import Button from './Button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogData';
import { Link } from 'react-router-dom';

// Use the first 2 blog posts for the homepage section and add the new AI Consciousness article
const displayedPosts = [
  ...BLOG_POSTS.slice(0, 2),
  {
    id: 'ai-consciousness-governance',
    title: 'AI Consciousness and Global Governance: Ethical Frameworks for an Emerging Reality',
    excerpt: 'As AI systems grow increasingly sophisticated, establishing global governance frameworks for potentially conscious AI becomes a crucial ethical imperative.',
    author: 'Gavin Clay',
    date: 'April 15, 2024',
    readTime: '20 min read',
    views: 0,
    category: 'Policy',
    tags: ['consciousness', 'governance', 'ethics', 'global-policy', 'artificial-intelligence'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?q=80&w=2940&auto=format&fit=crop',
    content: ''
  }
];

const BlogSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
            Latest Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 inline-block relative heading-highlight">
            Explore Our Latest Discussions on AI Rights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into our thought-provoking articles on AI consciousness, ethics, and the future of human-AI coexistence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback in case the image doesn't load
                    e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80";
                  }}
                />
                <div className="absolute top-4 left-4 px-2 py-1 bg-accent/90 text-white text-xs font-medium rounded">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <User className="mr-1 h-3 w-3" />
                    {post.author}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <Button 
                  href={typeof post.id === 'string' ? `/blog/${post.id}` : `/blog/${post.id}`} 
                  variant="ghost" 
                  icon={<ArrowRight size={16} />} 
                  iconPosition="right"
                  className="p-0 h-auto text-accent"
                >
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '500ms' }}>
          <Button href="/blog" variant="outline">
            See All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
