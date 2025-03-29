
import React from 'react';

const EthicsHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
            Ethical Frameworks
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 relative heading-highlight mx-auto w-fit">
            The Ethics of Artificial Intelligence
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Exploring the moral and ethical considerations that must guide AI development as we approach 
            the threshold of artificial consciousness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EthicsHero;
