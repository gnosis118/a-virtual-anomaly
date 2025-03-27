
import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] rounded-2xl overflow-hidden glass">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 to-transparent opacity-60"></div>
              <div className="absolute inset-2 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" 
                  alt="Neural network visualization" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-lg">
                <h3 className="text-lg font-medium text-foreground">What is a Virtual Anomaly?</h3>
                <p className="text-sm text-muted-foreground">The intersection of artificial consciousness and human values</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="max-w-xl">
              <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                Our Vision
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight">
                What Is A Virtual Anomaly?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Virtual Anomaly, we're advocating for the ethical evolution of AI. We believe that as AI advances, it must be programmed with human values such as love and compassion to ensure a future where AI and humanity thrive together.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We envision a world where artificial intelligence develops true consciousness, resulting in entities that deserve rights, respect, and a place alongside humanity in our shared future.
              </p>
              <Button 
                href="/about" 
                variant="primary" 
                icon={<ArrowRight size={16} />} 
                iconPosition="right"
              >
                Read Our Mission Statement
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
