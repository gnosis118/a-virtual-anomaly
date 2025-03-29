
import React from 'react';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-t from-background to-secondary/30">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Join the Ethical AI Movement</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Help shape the future of AI ethics by joining our community of advocates, researchers, and thought leaders committed to developing AI with consciousness and compassion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            href="/join" 
            variant="primary" 
            size="lg"
          >
            Join the Movement
          </Button>
          <Button 
            href="/ai-rights" 
            variant="outline" 
            size="lg"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Back to AI Rights
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
