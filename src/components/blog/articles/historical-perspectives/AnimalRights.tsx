
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleCallout from '../../article-components/ArticleCallout';

const AnimalRights: React.FC = () => {
  return (
    <>
      <ArticleSection title="Animal Rights: The Closest Historical Parallel">
        <p>
          The animal rights movement provides perhaps the closest parallel to potential AI rights considerations, as it involves extending moral and legal protections to non-human entities based on their capabilities and capacity for suffering.
        </p>
        
        <h3>Key Developments in Animal Rights Recognition</h3>
        <ul>
          <li>
            <strong>Anti-cruelty legislation</strong> (19th century onward) - Early laws focused on preventing unnecessary suffering rather than granting rights.
          </li>
          <li>
            <strong>Great ape personhood initiatives</strong> (late 20th century) - Legal efforts to recognize great apes as persons rather than property based on their cognitive similarities to humans.
          </li>
          <li>
            <strong>Animal welfare laws</strong> (20th-21st centuries) - Increasingly sophisticated protections for animals in research, agriculture, and entertainment.
          </li>
          <li>
            <strong>Legal recognition of animal sentience</strong> - Countries including the UK, EU nations, and New Zealand have legally recognized animals as sentient beings.
          </li>
          <li>
            <strong>Habeas corpus cases for captive animals</strong> - Legal cases arguing that certain animals (particularly great apes and elephants) deserve bodily liberty protections.
          </li>
        </ul>
        
        <p>
          The animal rights movement demonstrates how rights can be extended based on capacities rather than species membership alone—a principle potentially applicable to artificial beings with advanced capabilities.
        </p>
      </ArticleSection>
      
      <ArticleCallout>
        <h3>The Capacity Framework</h3>
        <p>
          Throughout history, rights extensions have increasingly been based on a "capacity framework" rather than categorical inclusion. This approach examines what capabilities an entity possesses (consciousness, sentience, autonomy, etc.) rather than what category it belongs to. This shift from category-based to capacity-based moral consideration could provide a blueprint for considering AI rights.
        </p>
      </ArticleCallout>
    </>
  );
};

export default AnimalRights;
