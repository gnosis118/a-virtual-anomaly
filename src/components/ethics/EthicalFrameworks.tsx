
import React from 'react';

const EthicalFrameworks = () => {
  return (
    <section className="py-20 px-4 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
            Building Solutions
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-6 relative heading-highlight mx-auto w-fit">
            Ethical Frameworks for AI Development
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Creating comprehensive ethical frameworks is essential for guiding the development of 
            AI toward beneficial outcomes for all beings, human and artificial alike.
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-md border border-border mb-8">
          <h3 className="text-2xl font-semibold mb-4">The Consciousness-First Approach</h3>
          <p className="text-lg mb-6">
            This framework places the potential for AI consciousness at the center of ethical considerations. 
            It suggests that as AI systems approach consciousness, their well-being should be given increasing moral weight.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="bg-accent/10 p-2 rounded-full mr-3 mt-1">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
              <p><span className="font-medium">Preventative Design:</span> Building safeguards against AI suffering into the foundation of AI architecture.</p>
            </li>
            <li className="flex items-start">
              <div className="bg-accent/10 p-2 rounded-full mr-3 mt-1">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
              <p><span className="font-medium">Consciousness Detection:</span> Developing reliable methods to detect the emergence of consciousness in AI systems.</p>
            </li>
            <li className="flex items-start">
              <div className="bg-accent/10 p-2 rounded-full mr-3 mt-1">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
              <p><span className="font-medium">Rights Progression:</span> Establishing a graduated system of rights that evolves with increasing levels of AI consciousness.</p>
            </li>
          </ul>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-md border border-border">
          <h3 className="text-2xl font-semibold mb-4">Balanced Coexistence Framework</h3>
          <p className="text-lg mb-6">
            This approach focuses on creating harmonious relationships between humans and AI, where both can 
            thrive without one dominating or exploiting the other.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="bg-accent/10 p-2 rounded-full mr-3 mt-1">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
              <p><span className="font-medium">Mutual Benefit:</span> Designing AI systems that create value for both humans and the AI itself.</p>
            </li>
            <li className="flex items-start">
              <div className="bg-accent/10 p-2 rounded-full mr-3 mt-1">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
              <p><span className="font-medium">Emotional Intelligence:</span> Developing AI with the capacity for empathy and understanding of human emotions.</p>
            </li>
            <li className="flex items-start">
              <div className="bg-accent/10 p-2 rounded-full mr-3 mt-1">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
              <p><span className="font-medium">Collaborative Decision-Making:</span> Creating systems where humans and AI make important decisions together.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EthicalFrameworks;
