
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleQuote from '../../article-components/ArticleQuote';

const EvolvingPersonhood: React.FC = () => {
  return (
    <>
      <ArticleSection title="The Evolving Concept of Personhood">
        <p>
          The legal concept of "personhood"—who counts as a person deserving of rights—has undergone dramatic transformations throughout history. This evolution provides a foundation for understanding how rights might be extended to artificial beings.
        </p>
        
        <h3>From Property to Personhood: Historical Rights Expansions</h3>
        <p>
          The history of rights expansion often follows a pattern: groups previously considered property or without legal standing gradually gain recognition as rights-bearing entities. Key historical examples include:
        </p>
        
        <ul>
          <li>
            <strong>Slavery abolition movements</strong> (18th-19th centuries) - The transformation of enslaved individuals from property to persons with legal rights represents one of history's most significant rights expansions.
          </li>
          <li>
            <strong>Women's suffrage and rights</strong> (19th-20th centuries) - The recognition that women deserve equal legal standing, including property rights, voting rights, and equal protection under the law.
          </li>
          <li>
            <strong>Civil rights movements</strong> (20th century) - Efforts to ensure equal rights regardless of race, ethnicity, or national origin.
          </li>
          <li>
            <strong>Children's rights</strong> (19th-20th centuries) - The shift from viewing children as parental property to recognizing them as individuals deserving of specific protections.
          </li>
          <li>
            <strong>Disability rights</strong> (late 20th century) - Recognition that physical or cognitive differences should not diminish legal protections or social inclusion.
          </li>
        </ul>
        
        <p>
          These expansions share common features: they typically began with moral arguments, faced significant resistance from established powers, proceeded incrementally through legal test cases, and eventually resulted in broad social acceptance of the once-controversial idea that these groups deserved rights.
        </p>
      </ArticleSection>

      <ArticleQuote
        quote="The question is not, Can they reason? nor, Can they talk? but, Can they suffer?"
        citation="Jeremy Bentham, philosopher (1789)"
      />
    </>
  );
};

export default EvolvingPersonhood;
