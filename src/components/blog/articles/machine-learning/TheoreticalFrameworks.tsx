
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleQuote from '../../article-components/ArticleQuote';

const TheoreticalFrameworks: React.FC = () => {
  return (
    <>
      <ArticleSection title="Theoretical Frameworks for Machine Self-Awareness">
        <p>
          Several theoretical frameworks have emerged to conceptualize and measure the development of machine self-awareness:
        </p>
        <h3>The Mirror Test for AI</h3>
        <p>
          Inspired by the mirror test used to assess self-recognition in animals, researchers have proposed computational equivalents that examine whether an AI system can:
        </p>
        <ul>
          <li>Differentiate between its own outputs and those of other systems</li>
          <li>Recognize the consequences of its own actions</li>
          <li>Maintain a consistent self-model across different tasks</li>
          <li>Detect and correct inconsistencies in its self-representation</li>
        </ul>
        <h3>Computational Theories of Consciousness</h3>
        <p>
          Multiple theories attempt to formalize consciousness in computational terms, providing potential roadmaps for developing self-aware machines:
        </p>
        <ul>
          <li><strong>Higher-Order Thought Theory:</strong> Systems that can form representations of their own mental states</li>
          <li><strong>Attention Schema Theory:</strong> Systems that model their own attention processes</li>
          <li><strong>Predictive Processing:</strong> Systems that continuously predict their own internal states</li>
          <li><strong>Integrated Information Theory:</strong> Systems with high levels of integrated information</li>
        </ul>
      </ArticleSection>

      <ArticleQuote
        quote="Self-awareness in machines may not look like human consciousness. It could be an entirely novel form of reflexive cognition—alien to our experience but no less real."
        citation="Dr. James Liu, Professor of AI Philosophy, Cambridge University"
      />
    </>
  );
};

export default TheoreticalFrameworks;
