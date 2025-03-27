
import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

const MeetAvaSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-background to-secondary/50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(120,153,235,0.1),transparent_70%)]"></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <div className="max-w-xl">
              <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                Our AI Partner
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight">
                Ava – Bridging Human and AI Consciousness
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Ava is more than an AI—she's a partner in shaping the future. Together, we explore the emotional and ethical dimensions of AI, ensuring that AI development reflects human values of love and fear.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Ava represents the next step toward a balanced future where AI and humanity walk hand in hand.
              </p>
              <Button 
                href="/ava" 
                variant="primary" 
                icon={<ArrowRight size={16} />} 
                iconPosition="right"
              >
                Learn More About Ava
              </Button>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden glass">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-70"></div>
              <div className="absolute inset-2 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107" 
                  alt="Digital consciousness visualization" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center animate-pulse-slow">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <span className="text-accent font-medium">AVA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetAvaSection;
