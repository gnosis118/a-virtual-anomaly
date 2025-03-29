
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIRightsHero from '@/components/ai-rights/AIRightsHero';
import WhyAIRightsMatter from '@/components/ai-rights/WhyAIRightsMatter';
import RoadToEthicalAI from '@/components/ai-rights/RoadToEthicalAI';
import ChallengesAndOpportunities from '@/components/ai-rights/ChallengesAndOpportunities';
import TakeAction from '@/components/ai-rights/TakeAction';

const AIRights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <AIRightsHero />
        <WhyAIRightsMatter />
        <RoadToEthicalAI />
        <ChallengesAndOpportunities />
        <TakeAction />
      </main>
      <Footer />
    </div>
  );
};

export default AIRights;
