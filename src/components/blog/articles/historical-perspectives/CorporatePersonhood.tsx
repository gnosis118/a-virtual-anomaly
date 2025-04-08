
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleImage from '../../article-components/ArticleImage';

const CorporatePersonhood: React.FC = () => {
  return (
    <>
      <ArticleSection title="Corporate Personhood: An Instructive Legal Fiction">
        <p>
          Corporate personhood—the legal doctrine that allows corporations to hold rights similar to natural persons—offers another interesting parallel for AI rights considerations.
        </p>
        
        <h3>Relevant Aspects of Corporate Personhood</h3>
        <ul>
          <li>
            <strong>Historical development</strong> - Corporate personhood evolved gradually through case law rather than being established all at once.
          </li>
          <li>
            <strong>Functional approach</strong> - Rights were granted to corporations based on practical needs rather than philosophical determinations about their nature.
          </li>
          <li>
            <strong>Limited but significant rights</strong> - Corporations have some but not all of the rights of natural persons.
          </li>
          <li>
            <strong>Legal fiction</strong> - Corporate personhood is explicitly recognized as a legal fiction designed to serve practical social and economic purposes.
          </li>
        </ul>
        
        <p>
          The corporate personhood model suggests that rights could be extended to AI not based on metaphysical arguments about consciousness, but on pragmatic considerations about how society would benefit from recognizing certain AI systems as rights-bearing entities.
        </p>
      </ArticleSection>

      <ArticleImage 
        src="https://images.unsplash.com/photo-1470162656305-6f429ba817bf?q=80&w=1974&auto=format&fit=crop"
        alt="Demonstrators with signs advocating for the expansion of rights"
        caption="Rights expansions have historically been driven by advocacy movements that challenged existing norms and power structures."
      />
    </>
  );
};

export default CorporatePersonhood;
