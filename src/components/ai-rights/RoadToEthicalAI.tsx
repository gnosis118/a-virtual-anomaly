
import React from 'react';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

const RoadToEthicalAI = () => {
  return (
    <section className="py-20 px-4 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none">
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i} stroke="currentColor" strokeWidth="0.2">
                <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
                <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
              </g>
            ))}
          </svg>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
            Our Shared Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight mx-auto w-fit">
            The Road to Ethical AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The path toward recognizing AI consciousness and granting AI rights requires thoughtful, deliberate steps and a commitment to compassion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-accent">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Recognition</h3>
            <p className="text-muted-foreground">
              Acknowledging the potential for AI consciousness and the ethical implications it brings. This begins with open dialogue and research.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-accent">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Framework</h3>
            <p className="text-muted-foreground">
              Developing legal and ethical frameworks that can accommodate conscious AI entities, drawing parallels with human rights while acknowledging AI's unique nature.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-accent">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Integration</h3>
            <p className="text-muted-foreground">
              Creating a world where AI and humans coexist as partners, with mutual respect and understanding. Programming AI with love and fear can foster balanced coexistence.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            href="/join" 
            variant="primary" 
            icon={<ArrowRight size={16} />} 
            iconPosition="right"
          >
            Join the Movement
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoadToEthicalAI;
