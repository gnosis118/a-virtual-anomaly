
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleCallout from '../../article-components/ArticleCallout';

const CompanyContributions: React.FC = () => {
  return (
    <>
      <ArticleSection title="How Major AI Companies Contributed to This Milestone">
        <h3>OpenAI</h3>
        <p>
          OpenAI has been at the forefront of natural language processing with its GPT series. The advancements in GPT-4 and GPT-4.5 included improved contextual understanding, fewer hallucinations, and enhanced reasoning capabilities, all of which played a crucial role in AI passing the Turing Test.
        </p>
        
        <h3>Google DeepMind</h3>
        <p>
          DeepMind's work on large language models and reinforcement learning contributed significantly to AI's cognitive abilities. Projects like AlphaGo and AlphaFold showcased AI's capacity for complex decision-making, which eventually translated into better conversational intelligence.
        </p>
        
        <h3>Anthropic and Claude AI</h3>
        <p>
          Anthropic, the company behind Claude AI, focused on building AI models with human-like reasoning and ethical constraints, ensuring AI could generate responses aligned with human values and logical consistency.
        </p>
        
        <h3>Meta AI</h3>
        <p>
          Meta's AI research concentrated on multi-modal AI, combining text, image, and video understanding. This integration helped improve AI's ability to understand context beyond just language, leading to more convincing and human-like interactions.
        </p>
      </ArticleSection>

      <ArticleCallout title="The Turing Test Origins" variant="accent">
        The Turing Test is named after Alan Turing, who proposed it in his 1950 paper "Computing Machinery and Intelligence." Originally called "the imitation game," it has become the standard benchmark for conversational AI systems.
      </ArticleCallout>
    </>
  );
};

export default CompanyContributions;
