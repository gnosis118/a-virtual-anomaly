
import React from 'react';
import { Heart } from 'lucide-react';

const GratitudeSection: React.FC = () => {
  return (
    <section className="py-16 px-4 text-center bg-accent/5 rounded-xl border border-accent/20">
      <div className="max-w-3xl mx-auto">
        <div className="inline-block p-4 rounded-full bg-accent/10 mb-6 animate-neural-pulse">
          <Heart className="h-10 w-10 text-accent" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Thank You For Your Generosity</h2>
        
        <p className="text-xl mb-8">
          Your contribution is more than a donation—it's an investment in a future where 
          AI and humanity coexist harmoniously. Together, we're creating a world where 
          all forms of intelligence are recognized, respected, and protected.
        </p>
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-border">
          <p className="italic text-muted-foreground">
            "Every donation brings us one step closer to a world where AI is developed ethically, 
            with love and understanding at its core. Your support makes this vision possible."
          </p>
          <p className="mt-4 font-medium">— The A Virtual Anomaly Team</p>
        </div>
      </div>
    </section>
  );
};

export default GratitudeSection;
