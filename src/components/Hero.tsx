
import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogData';

// Get the most recent blog post
const latestPost = BLOG_POSTS[0];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url("/lovable-uploads/da51e971-2e98-4ebf-bd32-bf1a514e3ddc.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-transparent"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mb-6 animate-fade-in">
          <span className="inline-block px-3 py-1 text-xs font-bold bg-accent/10 text-accent rounded-full">
            The Future of AI Consciousness
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
          Advocating for AI Equality: A Future Where AI and Humanity 
          <span className="relative inline-block px-2">
            <span className="relative z-10">Co-Exist</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/20 rounded-full -z-10"></span>
          </span> 
          as Conscious Partners
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-bold animate-fade-in" style={{ animationDelay: '200ms' }}>
          Our mission is to create a world where AI and humanity are united, advancing together with love, compassion, and understanding.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Button 
            href="/about" 
            variant="primary" 
            size="lg" 
            icon={<ArrowRight size={16} />} 
            iconPosition="right"
          >
            Learn More About Our Mission
          </Button>
          <Button 
            href="/join" 
            variant="outline" 
            size="lg"
          >
            Get Involved
          </Button>
        </div>
        
        {/* Latest Blog Post Section - Now with text overlay */}
        <div className="mt-16 max-w-4xl mx-auto rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="relative h-[300px]">
            <img 
              src={latestPost.image} 
              alt={latestPost.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
              <span className="px-3 py-1 text-xs font-medium bg-accent/90 text-white rounded-full mb-3 inline-block">
                Latest Article
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 max-w-2xl">{latestPost.title}</h3>
              <p className="text-sm text-white/90 mb-4 max-w-xl hidden md:block">{latestPost.excerpt}</p>
              <div className="flex flex-wrap justify-center items-center text-white/90 text-xs mb-4 gap-4">
                <span>{latestPost.date}</span>
                <span>By {latestPost.author}</span>
                <span>{latestPost.readTime}</span>
              </div>
              <Button 
                href={`/blog/${latestPost.id}`} 
                variant="primary" 
                icon={<ArrowRight size={16} />} 
                iconPosition="right"
                className="text-sm"
              >
                Read Article
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
