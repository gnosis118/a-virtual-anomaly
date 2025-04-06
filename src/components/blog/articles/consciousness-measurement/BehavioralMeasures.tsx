
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleHeader from '../../article-components/ArticleHeader';
import ArticleImage from '../../article-components/ArticleImage';
import ArticleCallout from '../../article-components/ArticleCallout';

const BehavioralMeasures = () => {
  return (
    <ArticleSection>
      <ArticleHeader id="behavioral-measures">Behavioral Measures of Consciousness</ArticleHeader>
      <p className="mb-4">
        The oldest and most straightforward approaches to assessing consciousness rely on observable behaviors. These methods draw inferences about internal states based on external responses, providing indirect but valuable evidence of consciousness.
      </p>
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Clinical Scales</h3>
      <p className="mb-4">
        In medical settings, several standardized scales measure levels of consciousness in patients:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2"><strong>Glasgow Coma Scale (GCS):</strong> Assesses eye opening, verbal responses, and motor responses to determine consciousness levels in trauma patients.</li>
        <li className="mb-2"><strong>JFK Coma Recovery Scale-Revised:</strong> Differentiates between vegetative state, minimally conscious state, and emergence from minimally conscious state through behavioral responses.</li>
        <li className="mb-2"><strong>Confusion Assessment Method (CAM):</strong> Evaluates awareness and attention to identify delirium.</li>
      </ul>
      
      <ArticleImage 
        src="https://images.unsplash.com/photo-1631563019676-dcd0c68588cf?q=80&w=1000&auto=format&fit=crop" 
        alt="Medical professional evaluating patient consciousness"
        caption="Clinical assessment of consciousness using behavioral response scales."
      />
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Command Following</h3>
      <p className="mb-4">
        A significant behavioral marker of consciousness is the ability to follow commands. For patients who cannot communicate verbally, researchers have developed methods to detect willful modulation of brain activity:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">Asking patients to imagine performing specific actions while under fMRI or EEG monitoring</li>
        <li className="mb-2">Using brain-computer interfaces to detect attempted movements</li>
        <li className="mb-2">Tracking eye movements in response to instructions</li>
      </ul>
      
      <ArticleCallout type="info">
        In a landmark 2010 study, researchers found that some patients diagnosed as being in a vegetative state could willfully modulate their brain activity in response to commands. This revealed a previously undetected form of consciousness, now sometimes called "cognitive motor dissociation."
      </ArticleCallout>
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Limitations of Behavioral Measures</h3>
      <p className="mb-4">
        While behavioral measures provide valuable information, they have significant limitations:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-2">They cannot detect consciousness in individuals unable to respond behaviorally (locked-in syndrome)</li>
        <li className="mb-2">They're inadequate for evaluating consciousness in non-human animals with different behavioral repertoires</li>
        <li className="mb-2">They provide limited insight into the quality or richness of conscious experience</li>
        <li className="mb-2">They cannot be directly applied to artificial systems without anthropomorphizing</li>
      </ul>
      
      <p className="mb-4">
        These limitations have driven researchers to develop neuroimaging and physiological approaches that can detect consciousness without requiring behavioral responses, expanding our ability to measure consciousness across diverse contexts.
      </p>
    </ArticleSection>
  );
};

export default BehavioralMeasures;
