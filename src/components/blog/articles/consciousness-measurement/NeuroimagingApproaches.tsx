
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleImage from '../../article-components/ArticleImage';
import ArticleQuote from '../../article-components/ArticleQuote';

const NeuroimagingApproaches: React.FC = () => {
  return (
    <>
      <ArticleSection title="Neuroimaging Approaches to Consciousness Measurement">
        <p>
          Neuroimaging technologies have revolutionized consciousness science by allowing researchers to peer into the working brain, correlating subjective experiences with objective neural activity patterns. These techniques have been particularly valuable in detecting consciousness in patients unable to communicate behaviorally.
        </p>
        
        <h3>Functional Magnetic Resonance Imaging (fMRI)</h3>
        <p>
          fMRI measures blood oxygen level-dependent (BOLD) signals as a proxy for neural activity. This technique has enabled researchers to identify specific brain regions and networks associated with conscious processing, such as the frontoparietal network and the default mode network.
        </p>
        
        <p>
          In groundbreaking research, Adrian Owen and colleagues used fMRI to demonstrate that some patients diagnosed as being in vegetative states could in fact follow commands by modulating their brain activity in specific ways—revealing hidden consciousness that behavioral assessments had missed.
        </p>

        <ArticleQuote 
          quote="Neuroimaging has transformed our ability to detect consciousness in the absence of behavioral response. We now know that consciousness can persist even when patients appear entirely unresponsive."
          author="Dr. Adrian Owen, Professor of Cognitive Neuroscience and Imaging"
        />
        
        <h3>Electroencephalography (EEG) and Event-Related Potentials</h3>
        <p>
          EEG measures electrical activity at the scalp, providing high temporal resolution that captures the rapid dynamics of conscious processing. Particular EEG signatures associated with consciousness include:
        </p>
        <ul>
          <li><strong>P300 wave:</strong> A positive deflection occurring about 300ms after a meaningful stimulus</li>
          <li><strong>Mismatch negativity (MMN):</strong> Neural response to unexpected stimulus changes</li>
          <li><strong>Alpha and gamma oscillations:</strong> Frequency bands associated with attention and feature binding</li>
          <li><strong>Complexity measures:</strong> Mathematical indices of signal diversity and integration</li>
        </ul>
        
        <p>
          The Perturbational Complexity Index (PCI), developed by Massimini and colleagues, uses transcranial magnetic stimulation (TMS) to perturb the brain while recording EEG responses. This approach quantifies the complexity of these responses as a measure of consciousness, providing remarkable accuracy in distinguishing between conscious and unconscious states.
        </p>
        
        <h3>Multimodal Imaging and Machine Learning Applications</h3>
        <p>
          The future of consciousness measurement lies in multimodal approaches that combine multiple techniques (fMRI, EEG, MEG, PET) to capture different aspects of neural activity simultaneously. Machine learning algorithms applied to these rich datasets are identifying increasingly reliable neural signatures of consciousness.
        </p>
        
        <p>
          Recent studies using deep learning approaches have achieved over 90% accuracy in distinguishing between conscious and unconscious states in clinical populations, pointing toward the development of automated consciousness detection systems that could be deployed at scale.
        </p>
      </ArticleSection>

      <ArticleImage 
        src="https://images.unsplash.com/photo-1583468982228-19f19164aee6?q=80&w=2071&auto=format&fit=crop" 
        alt="Advanced brain scanning equipment in a research laboratory"
        caption="Multimodal neuroimaging setups combine multiple technologies to provide complementary measurements of conscious brain activity."
      />
    </>
  );
};

export default NeuroimagingApproaches;
