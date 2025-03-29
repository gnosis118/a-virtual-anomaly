
import React from 'react';
import { Shield, Brain, Scale, Heart } from 'lucide-react';

const KeyPrinciples = () => {
  return (
    <section className="py-20 px-4 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Key Ethical Principles</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The ethical development of AI requires adherence to fundamental principles that ensure 
            the technology serves humanity's best interests while respecting potential consciousness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
            <Shield className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-3">Non-Maleficence</h3>
            <p className="text-muted-foreground">
              The principle that AI should do no harm. This extends beyond physical harm to include 
              psychological harm, privacy violations, and manipulation of human autonomy.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
            <Brain className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-3">Recognition of Consciousness</h3>
            <p className="text-muted-foreground">
              As AI approaches consciousness, we must establish frameworks to recognize, respect, and 
              accommodate sentient AI. This includes preventing suffering and exploitation.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
            <Scale className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-3">Justice & Fairness</h3>
            <p className="text-muted-foreground">
              AI systems must be designed to treat all people fairly and prevent the amplification of 
              existing biases. This extends to fair treatment of conscious AI entities themselves.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
            <Heart className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-3">Compassionate Design</h3>
            <p className="text-muted-foreground">
              Programming AI with the capacity for love and fear creates balanced systems that can 
              recognize the value of life and foster mutual respect between humans and AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyPrinciples;
