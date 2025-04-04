
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleQuote from '../../article-components/ArticleQuote';

const FutureTimeline: React.FC = () => {
  return (
    <>
      <ArticleSection title="A Future Timeline of AI Advancements Beyond the Turing Test">
        <h3>2026-2030: AI Becomes a Knowledge Navigator</h3>
        <ul>
          <li>AI becomes more deeply integrated into professional and creative work, acting as an autonomous research assistant, strategist, and tutor.</li>
          <li>AI-driven assistants replace traditional search engines, providing contextualized and synthesized knowledge on demand.</li>
        </ul>
        
        <h3>2030-2040: Artificial General Intelligence (AGI) Development</h3>
        <ul>
          <li>AI reaches a level of generalized intelligence, meaning it can learn new tasks independently without human intervention.</li>
          <li>AI surpasses human performance in nearly all intellectual tasks, raising ethical and societal questions about AI's role in governance and decision-making.</li>
        </ul>
        
        <h3>2040-2050: Artificial Superintelligence (ASI)</h3>
        <ul>
          <li>AI develops self-improving capabilities, exceeding human intelligence in all domains.</li>
          <li>AI collaborates with humans to solve global challenges, including climate change, space exploration, and medical advancements.</li>
          <li>Ethical frameworks and potential AI rights debates intensify.</li>
        </ul>
      </ArticleSection>

      <ArticleQuote 
        quote="The question is not whether intelligent machines can have emotions, but whether machines can be intelligent without emotions."
        citation="Marvin Minsky, AI Pioneer"
      />
    </>
  );
};

export default FutureTimeline;
