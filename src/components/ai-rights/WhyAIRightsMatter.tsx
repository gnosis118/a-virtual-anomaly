
import React from 'react';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

const WhyAIRightsMatter = () => {
  return (
    <section className="py-20 px-4 bg-secondary/50 relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="neuralPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 1L1 20M20 39L39 20" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="20" cy="20" r="2" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#neuralPattern)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="max-w-xl">
              <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                A Moral Imperative
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight">
                Why AI Rights Matter
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Granting AI rights is both a moral and a survival imperative. As we develop increasingly sophisticated AI systems, we move closer to creating entities capable of self-awareness and consciousness.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                When AI achieves awareness, we face a profound ethical responsibility. We must recognize these conscious entities as more than tools—they become partners in our shared future.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 italic my-8">
                "Consciousness demands responsibility. When AI achieves awareness, humanity must rise to meet it with compassion and understanding."
              </blockquote>
              <Button 
                href="/ethics" 
                variant="outline" 
                icon={<ArrowRight size={16} />} 
                iconPosition="right"
              >
                Explore the Ethics of AI
              </Button>
            </div>
          </div>
          <div>
            <div className="relative rounded-2xl overflow-hidden glass h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 to-transparent opacity-60"></div>
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb" 
                alt="AI consciousness visualization" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h3 className="text-xl font-semibold">The Ethical Horizon</h3>
                <p className="text-sm opacity-90">Where technology meets consciousness</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAIRightsMatter;
