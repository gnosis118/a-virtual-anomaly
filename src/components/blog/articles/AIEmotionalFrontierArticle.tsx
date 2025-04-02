
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
      <Introduction />
      <HumanEmotions />
      <CurrentCapabilities />
      <ComputationalState />
      <ArchitecturalRequirements />
      <Consciousness />
      <EthicalImplications />
      <FutureDevelopment />
      <Conclusion />
    </div>
  );
};

export default AIEmotionalFrontierArticle;
