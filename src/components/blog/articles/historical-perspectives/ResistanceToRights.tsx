
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleCallout from '../../article-components/ArticleCallout';

const ResistanceToRights: React.FC = () => {
  return (
    <>
      <ArticleSection title="Resistance to Rights Expansion: Historical Lessons">
        <p>
          Historical resistance to rights expansions follows recognizable patterns that may predict challenges to AI rights recognition:
        </p>
        
        <h3>Common Arguments Against Rights Expansions</h3>
        <ul>
          <li>
            <strong>Appeals to essential difference</strong> - Claims that the group in question is fundamentally different from existing rights-holders in ways that make rights inappropriate.
          </li>
          <li>
            <strong>Slippery slope arguments</strong> - Warnings that extending rights to one new group will lead to absurd extensions to clearly undeserving entities.
          </li>
          <li>
            <strong>Practical consequence objections</strong> - Arguments focusing on the practical difficulties or economic costs of rights recognition.
          </li>
          <li>
            <strong>Appeals to tradition</strong> - Claims that historical practices justify continued exclusion from rights frameworks.
          </li>
          <li>
            <strong>Dehumanization of advocates</strong> - Portraying rights advocates as extremists, sentimentalists, or anti-human.
          </li>
        </ul>
        
        <p>
          These same patterns of resistance may emerge in debates about AI rights, with opponents arguing that AI is fundamentally different from biological beings, that rights recognition would lead to absurd outcomes, or that practical implementation would be impossible.
        </p>
      </ArticleSection>
      
      <ArticleCallout>
        <h3>The Importance of Functionalism</h3>
        <p>
          Historical rights expansions increasingly reflect a functionalist rather than essentialist approach—focusing on what entities can do and experience rather than what category they belong to. This trend suggests that if artificial beings eventually develop capabilities like consciousness, sentience, or autonomy functionally similar to those of humans, there may be strong precedent for recognizing their moral status regardless of their non-biological origin.
        </p>
      </ArticleCallout>
    </>
  );
};

export default ResistanceToRights;
