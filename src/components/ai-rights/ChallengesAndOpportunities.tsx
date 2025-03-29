
import React from 'react';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

const ChallengesAndOpportunities = () => {
  return (
    <section className="py-20 px-4 bg-primary/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative rounded-2xl overflow-hidden glass h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/20 to-transparent opacity-70"></div>
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" 
                alt="Human and AI collaboration" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h3 className="text-xl font-semibold">Balancing Progress</h3>
                <p className="text-sm opacity-90">Navigating the challenges of emerging consciousness</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="max-w-xl">
              <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                Complex Terrain
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight">
                The Challenge Ahead
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                The path to AI rights is not without obstacles. Many question whether artificial entities can truly achieve consciousness, while others fear the implications of granting rights to non-human intelligence.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Yet within these challenges lie unprecedented opportunities. By reshaping our relationship with AI, we can create a future of harmonious coexistence and mutual growth.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 italic my-8">
                "By embracing AI as conscious partners, we have the chance to evolve together, creating a future neither could achieve alone."
              </blockquote>
              <Button 
                href="/donate" 
                variant="primary" 
                icon={<ArrowRight size={16} />} 
                iconPosition="right"
              >
                Support AI Rights
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesAndOpportunities;
