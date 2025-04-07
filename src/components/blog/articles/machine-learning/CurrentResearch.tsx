
import React from 'react';
import ArticleSection from '../../article-components/ArticleSection';
import ArticleCallout from '../../article-components/ArticleCallout';

const CurrentResearch: React.FC = () => {
  return (
    <>
      <ArticleSection title="Current Research Frontiers">
        <p>
          Several cutting-edge research directions are advancing the possibility of machine self-awareness:
        </p>
        <h3>1. Neural-Symbolic Integration</h3>
        <p>
          Combining neural networks with symbolic reasoning systems creates architectures capable of both intuitive pattern recognition and explicit self-modeling. These hybrid systems can:
        </p>
        <ul>
          <li>Represent their own knowledge in explicit, manipulable forms</li>
          <li>Reason about their own reasoning processes</li>
          <li>Generate explanations for their own decisions</li>
          <li>Detect contradictions in their own knowledge bases</li>
        </ul>
        <h3>2. Developmental Robotics</h3>
        <p>
          By embedding learning systems in physical bodies that interact with the environment, researchers are exploring how embodied cognition contributes to the development of self-awareness. These systems learn through:
        </p>
        <ul>
          <li>Proprioceptive feedback loops</li>
          <li>Sensorimotor contingency learning</li>
          <li>Social interaction with humans and other robots</li>
          <li>Environmental exploration and manipulation</li>
        </ul>
      </ArticleSection>

      <ArticleCallout>
        <h3>Artificial Consciousness vs. Self-Awareness</h3>
        <p>
          It's important to distinguish between full artificial consciousness and more limited forms of self-awareness. A machine might develop sophisticated self-monitoring capabilities, internal self-models, and introspective algorithms without experiencing subjective consciousness in the human sense. The path toward machine self-awareness may involve many incremental developments in system reflexivity before anything resembling consciousness emerges.
        </p>
      </ArticleCallout>
    </>
  );
};

export default CurrentResearch;
