
import React from 'react';
import TuringTestIntro from './turing-test/TuringTestIntro';
import UnderstandingTuringTest from './turing-test/UnderstandingTuringTest';
import HistoricalFailures from './turing-test/HistoricalFailures';
import CompanyContributions from './turing-test/CompanyContributions';
import TechnicalDetails from './turing-test/TechnicalDetails';
import FutureTimeline from './turing-test/FutureTimeline';
import EthicalImplications from './turing-test/EthicalImplications';
import Conclusion from './turing-test/Conclusion';

const TuringTestArticle: React.FC = () => {
  return (
    <div className="prose lg:prose-xl max-w-none">
      <TuringTestIntro />
      <UnderstandingTuringTest />
      <HistoricalFailures />
      <CompanyContributions />
      <TechnicalDetails />
      <FutureTimeline />
      <EthicalImplications />
      <Conclusion />
    </div>
  );
};

export default TuringTestArticle;
