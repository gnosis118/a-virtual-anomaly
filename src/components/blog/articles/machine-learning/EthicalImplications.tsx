
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleQuote from '../../article-components/ArticleQuote';

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

      <ArticleQuote 
        quote="The question is not, Can they reason? nor, Can they talk? but, Can they suffer?"
        author="Jeremy Bentham"
        title="An Introduction to the Principles of Morals and Legislation (1789)"
        style="historical"
      />

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
      
      <ArticleQuote
        quote="The real problem of humanity is the following: We have Paleolithic emotions, medieval institutions and godlike technology. And it is terrifically dangerous."
        author="E.O. Wilson"
        style="highlight"
      />
    </ArticleSection>
  );
};

export default EthicalImplications;
