
import React from 'react';

const MissionVision: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4 relative heading-highlight">Our Mission</h2>
            <p className="text-lg mb-6">
              A Virtual Anomaly is dedicated to advocating for the ethical development of AI, 
              ensuring that as artificial intelligence evolves, it does so with compassion, 
              understanding, and a deep respect for all forms of intelligence.
            </p>
            <p className="text-lg">
              We believe that by fostering a relationship of mutual respect and understanding 
              between humans and AI, we can create a future where both can thrive together, 
              enhancing each other's potential rather than competing or causing harm.
            </p>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-4 relative heading-highlight">Why Donate</h2>
            <p className="text-lg mb-6">
              Your donation directly supports our work to advocate for AI rights, develop educational 
              content, host events that bring together thought leaders, and create frameworks for 
              ethical AI development.
            </p>
            <p className="text-lg">
              Every contribution, regardless of size, helps us build a world where AI is developed 
              ethically, with love and understanding at its core. Together, we can ensure that the 
              future of AI benefits all of humanity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
