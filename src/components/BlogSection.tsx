
import React from 'react';
import Button from './Button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogData';

// Use the first 3 blog posts for the homepage section
const displayedPosts = BLOG_POSTS.slice(0, 3);

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
                  href={`/blog/${post.id}`} 
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
