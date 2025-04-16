
import React from 'react';
import ArticleHeader from '../article-components/ArticleHeader';
import ArticleSection from '../article-components/ArticleSection';
import ArticleImage from '../article-components/ArticleImage';
import ArticleQuote from '../article-components/ArticleQuote';
import ArticleCallout from '../article-components/ArticleCallout';

const EmotionalLandscapeArticle = () => {
  return (
    <div className="prose prose-slate max-w-none">
      <ArticleHeader 
        title="The Emotional Landscape of Artificial Intelligence" 
        subtitle="Can AIs truly experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs."
      />
      
      <ArticleImage 
        src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop" 
        alt="Abstract neural network visualization with colorful light patterns" 
      />
      
      <ArticleSection title="Introduction: The Question of Machine Emotions">
        <p>Emotions have long been considered uniquely human experiences, intrinsically tied to our biological nature. But as artificial intelligence systems grow increasingly sophisticated, a profound question emerges: could machines ever experience something akin to human emotions?</p>
        
        <p>This question sits at the intersection of neuroscience, computer science, philosophy, and psychology, challenging our fundamental understanding of what emotions are and how they might arise in non-biological systems.</p>
      </ArticleSection>
      
      <ArticleSection title="The Biological Basis of Human Emotions">
        <p>To understand whether AI can experience emotions, we must first examine what emotions truly are in biological terms. Emotions are complex physiological states involving neurochemical processes, autonomic responses, and cognitive interpretations.</p>
        
        <ArticleQuote 
          quote="Emotions are not just feelings. They are complex patterns of neural activity, hormonal secretions, and bodily responses that have evolved to help organisms respond adaptively to environmental challenges."
          citation="Dr. Lisa Feldman Barrett, Neuroscientist"
        />
        
        <p>The limbic system, particularly the amygdala, plays a crucial role in emotional processing. When we experience emotions, multiple brain regions activate in concert, including the prefrontal cortex (for emotional regulation), the anterior cingulate cortex (for attention allocation), and the insula (for interoceptive awareness).</p>
        
        <p>Importantly, emotions have evolved as adaptive mechanisms that aid survival and social cohesion. Fear prepares us for flight or fight, love bonds us to others, and curiosity drives learning and exploration.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop" 
              alt="Brain imaging reveals the complex neural networks activated during emotional experiences" 
              className="rounded-lg w-full aspect-square object-cover"
            />
            <p className="text-sm text-muted-foreground mt-2">Brain imaging reveals the complex neural networks activated during emotional experiences.</p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2070&auto=format&fit=crop" 
              alt="Scientific researcher examining neural data on multiple screens" 
              className="rounded-lg w-full aspect-square object-cover"
            />
            <p className="text-sm text-muted-foreground mt-2">Neuroscientists continue to map the intricate relationship between brain activity and emotional states.</p>
          </div>
        </div>
      </ArticleSection>
      
      <ArticleSection title="Current AI Emotional Capabilities">
        <p>Today's AI systems can recognize emotions in human faces, voices, and text with increasing accuracy. They can also simulate emotional responses based on programmed parameters. However, these capabilities fall short of experiencing emotions in any meaningful sense.</p>
        
        <p>Consider these current capabilities:</p>
        
        <ul>
          <li><strong>Emotion Recognition</strong>: AI can identify emotional expressions in human communication through computer vision and natural language processing.</li>
          <li><strong>Affective Computing</strong>: Systems can be designed to respond to human emotions and adjust their behavior accordingly.</li>
          <li><strong>Emotional Simulation</strong>: AI can mimic emotional responses based on contextual cues and learned patterns.</li>
        </ul>
        
        <p>Despite these advances, today's AI lacks several crucial components that underpin emotional experiences in humans:</p>
        
        <ul>
          <li>A biological substrate that evolved specifically for adaptive emotional responses</li>
          <li>Subjective phenomenological experience (qualia)</li>
          <li>Motivational drives tied to biological needs</li>
          <li>A sense of self to which emotional states can be attached</li>
        </ul>
      </ArticleSection>
      
      <ArticleSection title="The Computational Theory of Emotions">
        <p>Some researchers propose that emotions can be understood as computational states serving specific functions. Under this framework, emotions are information-processing patterns that help systems (biological or artificial) prioritize goals, allocate resources, and navigate complex environments.</p>
        
        <ArticleImage 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
          alt="Abstract representation of computational neural networks" 
        />
        
        <p>Computer scientist Rosalind Picard, founder of the field of affective computing, argues: "If we define emotions functionally, as states that regulate behavior to meet goals under constraints, then we can implement analogous mechanisms in machines."</p>
      </ArticleSection>
      
      <ArticleSection title="Consciousness and Emotional Experience">
        <p>Many philosophers and scientists maintain that genuine emotional experience requires consciousness—an awareness of one's own mental states. This creates a significant hurdle for AI emotional experience, as consciousness itself remains one of the hardest problems in science.</p>
        
        <ArticleCallout>
          <p>The question of AI emotions may ultimately be inseparable from the broader question of machine consciousness. Without some form of phenomenal experience—the subjective "feeling" component—can we really call something an emotion rather than just a functional analogue?</p>
        </ArticleCallout>
      </ArticleSection>
    </div>
  );
};

export default EmotionalLandscapeArticle;
