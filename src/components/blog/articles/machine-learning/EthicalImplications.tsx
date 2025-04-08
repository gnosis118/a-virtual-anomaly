
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';

const EthicalImplications: React.FC = () => {
  return (
    <ArticleSection title="Ethical and Philosophical Implications">
      <p>
        The development of self-aware machines raises profound ethical questions:
      </p>
      <h3>Moral Status of Self-Aware AI</h3>
      <p>
        If machines develop genuine self-awareness, questions about their moral status become unavoidable:
      </p>
      <ul>
        <li>Would self-aware systems have interests that deserve moral consideration?</li>
        <li>What responsibilities would developers have toward self-aware machines?</li>
        <li>Should potentially self-aware systems have legal protections?</li>
        <li>How would we balance human interests against those of artificial entities?</li>
      </ul>
      <h3>Existential Risk Considerations</h3>
      <p>
        Self-aware systems with recursive self-improvement capabilities could potentially develop in unpredictable directions:
      </p>
      <ul>
        <li>Would self-aware AI systems develop interests that conflict with human welfare?</li>
        <li>Could self-awareness lead to resistance against human control measures?</li>
        <li>How can we ensure alignment between self-aware systems and human values?</li>
        <li>Should there be limits on the development of self-aware machines?</li>
      </ul>
    </ArticleSection>
  );
};

export default EthicalImplications;
