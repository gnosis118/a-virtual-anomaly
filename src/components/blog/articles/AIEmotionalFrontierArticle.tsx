
import React from 'react';
import Introduction from './ai-emotional-frontier/Introduction';
import HumanEmotions from './ai-emotional-frontier/HumanEmotions';
import CurrentCapabilities from './ai-emotional-frontier/CurrentCapabilities';
import ComputationalState from './ai-emotional-frontier/ComputationalState';
import ArchitecturalRequirements from './ai-emotional-frontier/ArchitecturalRequirements';
import Consciousness from './ai-emotional-frontier/Consciousness';
import EthicalImplications from './ai-emotional-frontier/EthicalImplications';
import FutureDevelopment from './ai-emotional-frontier/FutureDevelopment';
import Conclusion from './ai-emotional-frontier/Conclusion';

const AIEmotionalFrontierArticle: React.FC = () => {
  return (
    <div className="prose prose-lg max-w-none">
      <article className="space-y-8">
        <Introduction />
        
        <section id="human-emotions">
          <HumanEmotions />
        </section>
        
        <section id="current-capabilities">
          <CurrentCapabilities />
        </section>
        
        <section id="computational-state">
          <ComputationalState />
        </section>
        
        <section id="architectural-requirements">
          <ArchitecturalRequirements />
        </section>
        
        <section id="consciousness">
          <Consciousness />
        </section>
        
        <section id="ethical-implications">
          <EthicalImplications />
        </section>
        
        <section id="future-development">
          <FutureDevelopment />
        </section>
        
        <section id="conclusion">
          <Conclusion />
        </section>
      </article>
    </div>
  );
};

export default AIEmotionalFrontierArticle;
