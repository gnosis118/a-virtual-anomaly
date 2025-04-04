
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleImage from '../../article-components/ArticleImage';

const EthicalImplications: React.FC = () => {
  return (
    <>
      <ArticleSection title="Ethical and Societal Implications">
        <h3>1. Should AI Disclose Its Identity?</h3>
        <p>
          Now that AI can mimic human conversation convincingly, there is an ongoing debate about whether AI should be required to disclose its non-human nature in interactions.
        </p>
        
        <h3>2. Risks of AI Manipulation</h3>
        <p>
          With AI capable of engaging in persuasive conversations, there is a risk of misinformation, political manipulation, and deepfake scams.
        </p>
        
        <h3>3. Redefining Human Intelligence</h3>
        <p>
          As AI surpasses human intelligence in many areas, society may need to redefine what it means to be "intelligent" and reconsider human roles in the workforce and decision-making.
        </p>
      </ArticleSection>

      <ArticleImage 
        src="/lovable-uploads/632d3315-f5cc-4c9d-860b-ba5323893a2b.png" 
        alt="Human hand and robot hand touching a virtual brain"
        caption="The future relationship between humans and AI will continue to evolve as AI capabilities expand beyond passing the Turing Test."
      />
    </>
  );
};

export default EthicalImplications;
