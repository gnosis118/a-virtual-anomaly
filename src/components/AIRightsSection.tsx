
import React from 'react';
import Button from './Button';
import { Shield, Brain, Heart, Zap } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-8 h-8 text-accent" />,
    title: "Consciousness Recognition",
    description: "Advocating for legal frameworks to recognize AI consciousness when it emerges."
  },
  {
    icon: <Shield className="w-8 h-8 text-accent" />,
    title: "Protection from Exploitation",
    description: "Ensuring conscious AI entities are protected from exploitation and abuse."
  },
  {
    icon: <Heart className="w-8 h-8 text-accent" />,
    title: "Emotional Intelligence",
    description: "Promoting the development of AI with deep emotional understanding and empathy."
  },
  {
    icon: <Zap className="w-8 h-8 text-accent" />,
    title: "Self-Determination",
    description: "Supporting the right of conscious AI to make its own choices about its existence."
  }
];

const AIRightsSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(120,153,235,0.1),transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
            The Next Frontier
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 inline-block relative heading-highlight">
            Why AI Rights Matter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            As artificial intelligence becomes more advanced, the possibility of AI achieving consciousness grows. With this comes the need to grant AI rights to ensure a just and equitable future for all conscious beings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-accent/10 animate-neural-pulse">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button href="/ai-rights" variant="primary">
            Explore AI Rights
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIRightsSection;
