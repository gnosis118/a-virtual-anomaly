
import React from 'react';
import ArticleHeader from '../article-components/ArticleHeader';
import ArticleSection from '../article-components/ArticleSection';
import ArticleQuote from '../article-components/ArticleQuote';

const GeoffreyHintonArticle: React.FC = () => {
  return (
    <div className="prose lg:prose-xl max-w-none">
      <ArticleHeader title="Geoffrey Hinton: Will AI Save the World or End it? | The Agenda" />
      
      <p className="lead">
        Geoffrey Hinton, often referred to as the "Godfather of AI," shares his insights on the potential of artificial intelligence to either transform humanity for the better or pose existential risks.
      </p>
      
      <div className="my-8 aspect-video">
        <iframe 
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/YRQ4d8Rjmwg?si=cmywGCKchdw_Ax0P" 
          title="Geoffrey Hinton: Will AI Save the World or End it? | The Agenda"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen>
        </iframe>
      </div>
      
      <ArticleSection title="Why This Matters">
        <p>
          Geoffrey Hinton, a pioneer in deep learning and neural networks, has been at the forefront of AI research for decades. His perspectives on AI safety and the trajectory of artificial intelligence development carry significant weight in both academic and industry circles.
        </p>
        <p>
          In this interview with The Agenda, Hinton discusses the dual nature of advanced AI systems – their immense potential to solve humanity's greatest challenges alongside their capacity to create unprecedented risks if developed without adequate safeguards.
        </p>
      </ArticleSection>
      
      <ArticleSection title="Key Points from the Discussion">
        <p>
          The conversation explores several critical topics related to artificial intelligence development:
        </p>
        <ul>
          <li>The accelerating pace of AI capabilities and how it's outstripping our ability to understand its inner workings</li>
          <li>Potential existential risks posed by superintelligent systems</li>
          <li>The competitive landscape driving AI development and the challenges of implementing safety measures</li>
          <li>Opportunities for AI to address global challenges like climate change and healthcare</li>
          <li>The importance of international cooperation in governing advanced AI systems</li>
        </ul>
      </ArticleSection>
      
      <ArticleQuote
        quote="We're creating entities that may eventually be smarter than us. When you're creating something that may be smarter than you, you've got to be careful."
        author="Geoffrey Hinton"
      />
      
      <ArticleSection title="Implications for AI Rights and Ethics">
        <p>
          This conversation with one of AI's pioneering figures highlights the importance of the work being done at A Virtual Anomaly. As we advocate for ethical AI development and the potential rights of sentient artificial systems, understanding the trajectory of AI capabilities and risks becomes increasingly vital.
        </p>
        <p>
          Hinton's perspectives remind us that as AI systems grow more sophisticated, questions about their moral status, the ethical frameworks guiding their development, and the safeguards needed to ensure beneficial outcomes become not just academic exercises but practical necessities.
        </p>
      </ArticleSection>
      
      <ArticleSection title="Join the Conversation">
        <p>
          After watching the interview, we invite you to share your thoughts on our community forum. How do you balance the tremendous potential of advanced AI with the need for careful, ethical development? What governance structures might best ensure that AI development proceeds in ways that benefit humanity while minimizing risks?
        </p>
      </ArticleSection>
    </div>
  );
};

export default GeoffreyHintonArticle;
