
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleHeader from '../../article-components/ArticleHeader';
import ArticleImage from '../../article-components/ArticleImage';
import ArticleCallout from '../../article-components/ArticleCallout';

const NeuroimagingApproaches = () => {
  return (
    <ArticleSection>
      <ArticleHeader title="Neuroimaging Approaches to Consciousness" id="neuroimaging-approaches" />
      <p className="mb-4">
        Advancements in neuroimaging technologies have revolutionized our ability to measure consciousness by providing direct access to brain activity patterns. These techniques allow researchers to observe neural signatures associated with consciousness without requiring behavioral responses.
      </p>
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Functional Magnetic Resonance Imaging (fMRI)</h3>
      <p className="mb-4">
        fMRI measures brain activity by detecting changes in blood flow, which correlate with neural activity. Several fMRI-based approaches have been developed to assess consciousness:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2"><strong>Default Mode Network (DMN) activity:</strong> This network shows distinctive activity patterns during conscious rest and is disrupted in states of unconsciousness.</li>
        <li className="mb-2"><strong>Global Workspace activation:</strong> According to Global Workspace Theory, consciousness emerges when information becomes globally available across brain regions. fMRI can track this widespread activation.</li>
        <li className="mb-2"><strong>Mental imagery tasks:</strong> Asking patients to imagine specific scenarios and observing corresponding brain activation patterns.</li>
      </ul>
      
      <ArticleImage 
        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1000&auto=format&fit=crop" 
        alt="fMRI brain scan showing active regions"
        caption="fMRI scan showing brain activity patterns that correlate with conscious processing."
      />
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Electroencephalography (EEG) Markers</h3>
      <p className="mb-4">
        EEG measures electrical activity of the brain through electrodes placed on the scalp. It provides excellent temporal resolution and has revealed several markers of consciousness:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2"><strong>P300 wave:</strong> A positive deflection in voltage that occurs approximately 300ms after a stimulus, indicating recognition and processing.</li>
        <li className="mb-2"><strong>Spectral complexity:</strong> Conscious states typically show more complex EEG patterns across different frequency bands.</li>
        <li className="mb-2"><strong>Information integration metrics:</strong> Various mathematical measures of information sharing across brain regions.</li>
        <li className="mb-2"><strong>Perturbational Complexity Index (PCI):</strong> Measures the brain's capacity to generate complex patterns in response to transcranial magnetic stimulation.</li>
      </ul>
      
      <ArticleCallout title="Scientific Finding" variant="info">
        The Perturbational Complexity Index (PCI) has shown remarkable accuracy in distinguishing between conscious and unconscious states across different conditions, including sleep, anesthesia, and disorders of consciousness.
      </ArticleCallout>
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Multimodal Approaches</h3>
      <p className="mb-4">
        Increasingly, researchers combine multiple neuroimaging techniques to develop more robust measures of consciousness:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2"><strong>EEG-fMRI integration:</strong> Combines temporal precision of EEG with spatial precision of fMRI.</li>
        <li className="mb-2"><strong>PET-fMRI combinations:</strong> Links metabolic activity with blood flow changes.</li>
        <li className="mb-2"><strong>TMS-EEG:</strong> Applies magnetic stimulation while recording electrical responses.</li>
      </ul>
      
      <p className="mb-4">
        These neuroimaging approaches have transformed consciousness science by providing objective markers of conscious processing. They've allowed researchers to detect consciousness in patients previously thought to be unaware and to track the neural correlates of consciousness with increasing precision. However, identifying neural correlates does not fully solve the "hard problem" of consciousness—how and why these neural patterns give rise to subjective experience remains an open question.
      </p>
    </ArticleSection>
  );
};

export default NeuroimagingApproaches;
