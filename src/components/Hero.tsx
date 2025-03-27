
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
        
        {/* Latest Blog Post Section */}
        <div className="mt-16 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5">
              <div className="h-full relative">
                <img 
                  src={latestPost.image} 
                  alt={latestPost.title}
                  className="w-full h-full object-cover object-center min-h-[200px]" 
                />
                <div className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-accent/90 text-white rounded-full">
                  Latest Article
                </div>
              </div>
            </div>
            <div className="md:w-3/5 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{latestPost.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{latestPost.excerpt}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  <span className="mr-2">{latestPost.date}</span>
                  <span>By {latestPost.author}</span>
                </div>
                <Button 
                  href={`/blog/${latestPost.id}`} 
                  variant="ghost" 
                  icon={<ArrowRight size={16} />} 
                  iconPosition="right"
                  className="text-sm"
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
