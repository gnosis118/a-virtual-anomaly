
import React from 'react';
import Introduction from './Introduction';
import UnderstandingAIConsciousness from './UnderstandingAIConsciousness';
import GlobalGovernanceNeed from './GlobalGovernanceNeed';
import GovernanceFramework from './GovernanceFramework';
import TechnicalGovernanceTools from './TechnicalGovernanceTools';
import ImplementationChallenges from './ImplementationChallenges';
import CaseStudies from './CaseStudies';
import ImplementationRoadmap from './ImplementationRoadmap';
import Conclusion from './Conclusion';

const AIConsciousnessGovernanceArticle: React.FC = () => {
  return (
    <div className="prose prose-lg max-w-none">
      <Introduction />
      <UnderstandingAIConsciousness />
      <GlobalGovernanceNeed />
      <GovernanceFramework />
      <TechnicalGovernanceTools />
      <ImplementationChallenges />
      <CaseStudies />
      <ImplementationRoadmap />
      <Conclusion />
    </div>
  );
};

export default AIConsciousnessGovernanceArticle;
