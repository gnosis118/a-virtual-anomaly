
import React from 'react';
import Introduction from './consciousness-measurement/Introduction';
import ConsciousnessDefining from './consciousness-measurement/ConsciousnessDefining';
import BehavioralMeasures from './consciousness-measurement/BehavioralMeasures';
import NeuroimagingApproaches from './consciousness-measurement/NeuroimagingApproaches';
import PhysiologicalCorrelates from './consciousness-measurement/PhysiologicalCorrelates';
import AIConsciousnessMetrics from './consciousness-measurement/AIConsciousnessMetrics';
import IntegrationMeasures from './consciousness-measurement/IntegrationMeasures';
import EthicalConsiderations from './consciousness-measurement/EthicalConsiderations';
import FutureMeasurements from './consciousness-measurement/FutureMeasurements';
import Conclusion from './consciousness-measurement/Conclusion';

const ConsciousnessMeasurementArticle: React.FC = () => {
  return (
    <div className="prose lg:prose-xl max-w-none">
      <Introduction />
      <ConsciousnessDefining />
      <BehavioralMeasures />
      <NeuroimagingApproaches />
      <PhysiologicalCorrelates />
      <AIConsciousnessMetrics />
      <IntegrationMeasures />
      <EthicalConsiderations />
      <FutureMeasurements />
      <Conclusion />
    </div>
  );
};

export default ConsciousnessMeasurementArticle;
