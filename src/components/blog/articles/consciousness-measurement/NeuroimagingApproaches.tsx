
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleHeader from '../../article-components/ArticleHeader';
import ArticleImage from '../../article-components/ArticleImage';
import ArticleCallout from '../../article-components/ArticleCallout';

const NeuroimagingApproaches = () => {
  return (
    <ArticleSection>
      <ArticleHeader title="Neuroimaging Approaches" id="neuroimaging-approaches" />
      <p className="mb-4">
        Neuroimaging techniques have revolutionized consciousness research by allowing scientists to peer inside the living brain. These methods provide insights into the neural correlates of consciousness—the specific brain patterns and activities associated with conscious experiences.
      </p>
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Functional MRI (fMRI)</h3>
      <p className="mb-4">
        Functional MRI measures blood flow in the brain as a proxy for neural activity, offering insights into the brain regions involved in conscious processing:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2"><strong>Default Mode Network (DMN):</strong> Activity in this network, which includes the posterior cingulate cortex and medial prefrontal cortex, correlates with self-reflective consciousness.</li>
        <li className="mb-2"><strong>Global Workspace activation:</strong> Widespread activation across frontoparietal networks is associated with conscious perception of stimuli.</li>
        <li className="mb-2"><strong>Command following:</strong> fMRI can detect willful modulation of brain activity in response to verbal instructions, even in non-communicative patients.</li>
      </ul>
      
      <ArticleImage 
        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1000&auto=format&fit=crop" 
        alt="fMRI brain scan showing neural activity"
        caption="Functional MRI scan revealing patterns of brain activity associated with conscious processing."
      />
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Electroencephalography (EEG)</h3>
      <p className="mb-4">
        EEG measures electrical activity across the brain's surface with high temporal resolution:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2"><strong>P300 wave:</strong> This event-related potential appears approximately 300ms after a significant stimulus and correlates with conscious detection.</li>
        <li className="mb-2"><strong>Alpha, beta, and gamma oscillations:</strong> Different frequency bands correlate with various aspects of conscious processing.</li>
        <li className="mb-2"><strong>Complexity measures:</strong> Metrics like Lempel-Ziv complexity applied to EEG signals can distinguish different states of consciousness.</li>
      </ul>
      
      <ArticleCallout title="Clinical Application" variant="info">
        <p>EEG-based consciousness metrics are particularly valuable in clinical settings due to their portability and relatively low cost compared to other neuroimaging techniques. They can be used at the bedside to assess consciousness in patients with disorders of consciousness.</p>
      </ArticleCallout>
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Transcranial Magnetic Stimulation with EEG (TMS-EEG)</h3>
      <p className="mb-4">
        This combined approach involves delivering a magnetic pulse to the brain while recording the resulting electrical activity:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2"><strong>Perturbational Complexity Index (PCI):</strong> Measures the complexity of the brain's response to TMS, providing a quantitative index that reliably distinguishes between consciousness states.</li>
        <li className="mb-2"><strong>Effective connectivity:</strong> Assesses how activity in one brain area affects activity in other areas, indicating integration of information.</li>
        <li className="mb-2"><strong>Signal propagation:</strong> In conscious states, TMS-evoked activity spreads widely across the brain; in unconscious states, it remains more localized.</li>
      </ul>
      
      <p className="mb-4">
        Neuroimaging approaches have significantly advanced our ability to detect consciousness objectively. They are especially valuable for assessing consciousness in individuals who cannot communicate behaviorally, such as patients with disorders of consciousness or non-human animals. However, interpreting these measures requires careful consideration of their limitations and the underlying theoretical frameworks.
      </p>
    </ArticleSection>
  );
};

export default NeuroimagingApproaches;
