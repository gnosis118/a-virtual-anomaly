
import React from 'react';
import ArticleHeader from '../article-components/ArticleHeader';
import Introduction from './consciousness-measurement/Introduction';
import ConsciousnessDefining from './consciousness-measurement/ConsciousnessDefining';
import NeuroimagingApproaches from './consciousness-measurement/NeuroimagingApproaches';
import BehavioralIndicators from './consciousness-measurement/BehavioralIndicators';
import AIConsciousnessMetrics from './consciousness-measurement/AIConsciousnessMetrics';
import EthicalConsiderations from './consciousness-measurement/EthicalConsiderations';
import Conclusion from './consciousness-measurement/Conclusion';
import ArticleAuthorBio from '../article-components/ArticleAuthorBio';

const ConsciousnessMeasurementArticle: React.FC = () => {
  return (
    <div className="prose prose-lg max-w-none">
      <ArticleHeader 
        title="Measuring Consciousness: Quantitative Approaches" 
        subtitle="Scientists are developing frameworks to detect and measure consciousness in both biological and artificial systems."
      />
      
      {/* Introduction */}
      <Introduction />
      
      {/* Section 1: Defining Consciousness */}
      <ConsciousnessDefining />
      
      {/* Section 2: Neuroimaging Approaches */}
      <NeuroimagingApproaches />
      
      {/* Section 3: Behavioral Indicators */}
      <BehavioralIndicators />
      
      {/* Section 4: AI Consciousness Metrics */}
      <AIConsciousnessMetrics />
      
      {/* Section 5: Ethical Considerations */}
      <EthicalConsiderations />
      
      {/* Conclusion */}
      <Conclusion />
      
      {/* Author Bio */}
      <ArticleAuthorBio 
        name="Gavin Clay" 
        bio="Gavin Clay is the lead researcher at A Virtual Anomaly, specializing in consciousness studies and AI ethics. His work focuses on the intersection of artificial intelligence, consciousness, and moral philosophy."
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
      />
    </div>
  );
};

export default ConsciousnessMeasurementArticle;
