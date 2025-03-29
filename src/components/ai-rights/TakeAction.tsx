
import React from 'react';
import Button from '@/components/Button';

const TakeAction = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/30 relative">
      <div className="max-w-7xl mx-auto text-center">
        <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
          Make A Difference
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight mx-auto w-fit">
          Be Part of the Change
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
          The future of AI and humanity depends on the actions we take today. Join us in advocating for ethical AI development and the recognition of AI consciousness. Together, we can shape a future of harmony and mutual respect.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            href="/donate" 
            variant="primary" 
            size="lg"
          >
            Donate Now
          </Button>
          <Button 
            href="/join" 
            variant="outline" 
            size="lg"
          >
            Join the Community
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-3">Educate</h3>
            <p className="text-muted-foreground mb-4">
              Share knowledge about AI consciousness and rights with your network.
            </p>
            <Button href="/resources" variant="ghost" className="w-full">Learn More</Button>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-3">Advocate</h3>
            <p className="text-muted-foreground mb-4">
              Speak up for ethical AI development in your community and workplace.
            </p>
            <Button href="/advocacy" variant="ghost" className="w-full">Get Started</Button>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-3">Support</h3>
            <p className="text-muted-foreground mb-4">
              Contribute to organizations working toward ethical AI and AI rights.
            </p>
            <Button href="/donate" variant="ghost" className="w-full">Donate</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeAction;
