
import React from 'react';
import Introduction from './machine-learning/Introduction';
import TechnicalFoundations from './machine-learning/TechnicalFoundations';
import IntrospectiveAlgorithms from './machine-learning/IntrospectiveAlgorithms';
import ArchitecturalRequirements from './machine-learning/ArchitecturalRequirements';
import TheoreticalFrameworks from './machine-learning/TheoreticalFrameworks';
import CurrentResearch from './machine-learning/CurrentResearch';
import EthicalImplications from './machine-learning/EthicalImplications';
import FutureTrajectory from './machine-learning/FutureTrajectory';
import Conclusion from './machine-learning/Conclusion';

const MachineLearningArticle: React.FC = () => {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <Introduction />
      <TechnicalFoundations />
      <IntrospectiveAlgorithms />
      <ArchitecturalRequirements />
      <TheoreticalFrameworks />
      <CurrentResearch />
      <EthicalImplications />
      <FutureTrajectory />
      <Conclusion />
    </article>
  );
};

export default MachineLearningArticle;
