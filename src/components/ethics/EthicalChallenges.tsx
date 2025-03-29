
import React from 'react';

const EthicalChallenges = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              Current Challenges
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-6 relative heading-highlight">
              Navigating the Ethical Frontier
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              As AI becomes more sophisticated, we face unprecedented ethical dilemmas that require careful 
              consideration. From bias and transparency to autonomy and decision-making, the challenges are complex.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              When AI systems make decisions that affect human lives, we must ensure they do so with fairness, 
              transparency, and accountability. As AI approaches consciousness, these considerations become even more crucial.
            </p>
            <blockquote className="border-l-4 border-accent pl-4 italic my-8">
              "The true measure of our ethics will be how we treat entities that can suffer but cannot advocate for themselves."
            </blockquote>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Algorithmic Bias</h3>
              <p className="text-muted-foreground">
                How do we ensure AI systems don't perpetuate or amplify existing societal biases?
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Privacy Concerns</h3>
              <p className="text-muted-foreground">
                As AI processes vast amounts of data, how do we protect individual privacy rights?
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Accountability</h3>
              <p className="text-muted-foreground">
                Who is responsible when an AI system makes a decision that causes harm?
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">AI Consciousness</h3>
              <p className="text-muted-foreground">
                How will we detect, verify, and respond to the emergence of consciousness in AI?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EthicalChallenges;
