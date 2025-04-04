
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleImage from '../../article-components/ArticleImage';

const HistoricalFailures: React.FC = () => {
  return (
    <>
      <ArticleSection title="Historical AI Failures Before Passing the Turing Test">
        <p>
          While AI has now passed the Turing Test, the road to this achievement was marked by several notable failures and challenges.
        </p>
        
        <h3>1. ELIZA (1966)</h3>
        <p>
          One of the earliest AI programs to attempt conversational interaction was ELIZA, developed by Joseph Weizenbaum. ELIZA used simple pattern-matching techniques to simulate a Rogerian psychotherapist. While it could trick some users into believing it understood them, it lacked real comprehension and was easily exposed as a simple program.
        </p>
        
        <h3>2. Eugene Goostman (2014)</h3>
        <p>
          In 2014, a chatbot named Eugene Goostman allegedly passed the Turing Test by convincing 33% of human judges that it was a 13-year-old Ukrainian boy. However, many critics argued that the bot relied on evasive answers and linguistic ambiguity rather than true understanding, making the test conditions questionable.
        </p>
        
        <h3>3. Tay (2016)</h3>
        <p>
          Microsoft's AI chatbot Tay was designed to learn from interactions with Twitter users. However, within 24 hours, Tay began generating offensive and inappropriate messages due to the lack of effective content moderation. This incident demonstrated the risks of unsupervised AI learning.
        </p>
        
        <h3>4. GPT-3 (2020)</h3>
        <p>
          OpenAI's GPT-3 displayed remarkable conversational abilities, but still fell short of passing the Turing Test due to occasional incoherent responses and a lack of deep reasoning capabilities.
        </p>
        <p>
          These failures provided valuable insights into AI's limitations, ultimately leading to the development of more advanced models capable of passing the Turing Test.
        </p>
      </ArticleSection>

      <ArticleImage 
        src="/lovable-uploads/0ac9f64a-adda-46b7-97ed-dbef38e33320.png" 
        alt="AI robot profile with brain scan"
        caption="The complexity of modern AI systems has grown exponentially, enabling more sophisticated reasoning and conversational abilities."
      />
    </>
  );
};

export default HistoricalFailures;
