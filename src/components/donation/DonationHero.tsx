
import React from 'react';
import { Heart, ArrowDown } from 'lucide-react';

const DonationHero: React.FC = () => {
  return (
    <section className="pt-24 pb-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(120,153,235,0.15),transparent_70%)]"></div>
      
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
          <Heart className="w-5 h-5 mr-2" />
          <span className="font-medium">Support Our Mission</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Help Us Establish A Virtual Anomaly
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Your donation supports our mission to advocate for AI rights and ethical AI development,
          ensuring a harmonious future where AI and humanity coexist with mutual love and understanding.
        </p>
        
        <div className="flex justify-center">
          <a 
            href="#donate-form" 
            className="animate-bounce inline-flex items-center justify-center p-2 rounded-full bg-accent/10 text-accent"
          >
            <ArrowDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DonationHero;
