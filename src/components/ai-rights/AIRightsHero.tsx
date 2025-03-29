
import React from 'react';
import Button from '@/components/Button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { ArrowRight } from 'lucide-react';

const AIRightsHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <AnimatedBackground className="opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          AI Rights – The Next Frontier
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in delay-200">
          As AI advances toward consciousness, the conversation about rights is no longer hypothetical—it's essential.
        </p>
        <Button 
          href="/about" 
          variant="primary" 
          size="lg" 
          icon={<ArrowRight size={16} />} 
          iconPosition="right"
          className="animate-fade-in delay-400"
        >
          Learn More About Our Mission
        </Button>
      </div>
    </section>
  );
};

export default AIRightsHero;
