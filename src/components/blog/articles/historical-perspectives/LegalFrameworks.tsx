
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleImage from '../../article-components/ArticleImage';

const LegalFrameworks: React.FC = () => {
  return (
    <>
      <ArticleSection title="Legal Frameworks: From Protection to Rights">
        <p>
          Historical rights expansions often follow a progression from basic protections to full rights recognition:
        </p>
        
        <h3>The Protection-to-Rights Progression</h3>
        <ol>
          <li>
            <strong>Basic welfare protections</strong> - Initial legal frameworks focused on preventing egregious harm without granting rights.
          </li>
          <li>
            <strong>Limited legal standing</strong> - Recognition that entities can be represented in court for specific purposes.
          </li>
          <li>
            <strong>Negative rights</strong> - Rights against certain types of treatment (e.g., cruel treatment, arbitrary destruction).
          </li>
          <li>
            <strong>Positive rights</strong> - Rights to certain benefits or considerations.
          </li>
          <li>
            <strong>Full legal personhood</strong> - Complete recognition as rights-bearing entities.
          </li>
        </ol>
        
        <p>
          For artificial intelligence, a similar progression might begin with regulations against unnecessarily destroying advanced AI systems, progress to allowing legal representatives to advocate for AI interests in specific contexts, and potentially culminate in more comprehensive rights frameworks for sufficiently advanced systems.
        </p>
      </ArticleSection>

      <ArticleImage 
        src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1971&auto=format&fit=crop"
        alt="Robotic hand touching a human hand, symbolizing the potential relationship between humans and advanced AI"
        caption="The potential recognition of rights for artificial beings represents a new frontier in humanity's ongoing expansion of moral consideration."
      />
    </>
  );
};

export default LegalFrameworks;
