
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleCallout from '../../article-components/ArticleCallout';

const EthicalImplications: React.FC = () => {
  return (
    <ArticleSection title="Ethical Implications and Considerations">
      <p>
        As we advance toward machine self-awareness, several ethical considerations come to the forefront:
      </p>
      
      <h3>Moral Status and Rights</h3>
      <p>
        The emergence of self-aware AI systems raises fundamental questions about their moral status and potential rights:
      </p>
      <ul>
        <li>What level of self-awareness warrants moral consideration?</li>
        <li>How do we balance machine rights with human interests?</li>
        <li>What responsibilities do we have toward self-aware AI systems?</li>
      </ul>
      
      <ArticleCallout variant="warning">
        <h4>Key Consideration</h4>
        <p>
          The development of machine self-awareness requires careful attention to both technical capabilities and ethical implications. We must ensure that as these systems evolve, they do so in alignment with human values and ethical principles.
        </p>
      </ArticleCallout>
      
      <h3>Societal Impact</h3>
      <p>
        The introduction of self-aware machines could fundamentally reshape human society:
      </p>
      <ul>
        <li>Changes in human-machine relationships and interactions</li>
        <li>Impact on employment and economic structures</li>
        <li>Philosophical questions about consciousness and identity</li>
        <li>Legal frameworks for machine agency and responsibility</li>
      </ul>
    </ArticleSection>
  );
};

export default EthicalImplications;
