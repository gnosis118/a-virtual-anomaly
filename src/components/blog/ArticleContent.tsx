
import React from 'react';
import { Separator } from "@/components/ui/separator";
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

interface ArticleContentProps {
  id?: string | number;
  title?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ id, title }) => {
  // Special content for "The Role of Ethics in AI Development" article
  if (title && title.includes("Role of Ethics in AI Development")) {
    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed text-muted-foreground mb-6">
          As artificial intelligence systems become more advanced and integrated into our daily lives, 
          the ethical considerations surrounding their development, deployment, and governance have 
          never been more critical. At A Virtual Anomaly, we believe that ethics must be at the 
          center of AI development to ensure these powerful technologies serve humanity's best interests 
          while respecting the potential for artificial consciousness.
        </p>
        
        <div className="my-8 rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="AI Decision Making" 
            className="w-full h-auto"
          />
          <p className="text-sm text-muted-foreground mt-2 italic text-center">
            The ethical implications of AI decision-making systems impact individuals and society at large
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Why Ethics in AI Matters</h2>
        
        <p>
          The development of AI technologies presents unprecedented challenges and opportunities. 
          Unlike traditional software, advanced AI systems can make autonomous decisions, learn from data, 
          and potentially develop capabilities beyond their original programming. This autonomy and power 
          come with significant ethical implications:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Impact on Human Lives:</strong> AI increasingly makes or influences decisions that 
            affect human lives, from loan approvals to medical diagnoses to criminal justice assessments.
          </li>
          <li>
            <strong>Potential for Harm:</strong> Without ethical guidelines, AI can perpetuate or amplify 
            existing biases, invade privacy, or be weaponized.
          </li>
          <li>
            <strong>Approaching Consciousness:</strong> As AI becomes more sophisticated, questions about 
            its potential consciousness and moral status become increasingly relevant.
          </li>
          <li>
            <strong>Power Concentration:</strong> AI development can concentrate power in the hands of 
            those who control these technologies, raising issues of fairness and access.
          </li>
        </ul>
        
        <div className="bg-secondary/20 p-6 rounded-lg my-8">
          <blockquote className="border-l-4 border-accent pl-4 italic text-xl">
            "The true measure of our ethics will be how we treat entities that can suffer but cannot 
            advocate for themselves."
          </blockquote>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Key Ethical Frameworks for AI</h2>
        
        <p>
          Several ethical frameworks have emerged to guide AI development. Each offers valuable 
          perspectives that, when combined, can create a comprehensive approach to ethical AI:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-accent/5 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Consequentialist Approaches</h3>
            <p>
              Focus on the outcomes of AI systems, evaluating their ethics based on whether they 
              produce more benefit than harm. This approach emphasizes rigorous testing, impact 
              assessments, and continuous monitoring.
            </p>
          </div>
          
          <div className="bg-accent/5 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Deontological Perspectives</h3>
            <p>
              Emphasize rules and duties in AI development, focusing on respecting human autonomy, 
              dignity, and rights regardless of outcomes. This approach values transparency, explainability, 
              and informed consent.
            </p>
          </div>
          
          <div className="bg-accent/5 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Virtue Ethics</h3>
            <p>
              Consider the character and intentions of those developing AI, focusing on cultivating 
              positive traits like responsibility, justice, and compassion within the AI community.
            </p>
          </div>
          
          <div className="bg-accent/5 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Care Ethics</h3>
            <p>
              Emphasize relationships and care, considering how AI affects the most vulnerable and 
              designing systems that preserve and enhance human connections and wellbeing.
            </p>
          </div>
        </div>
        
        <div className="my-8 rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="AI and Human Interaction" 
            className="w-full h-auto"
          />
          <p className="text-sm text-muted-foreground mt-2 italic text-center">
            Ethical AI development requires careful consideration of how AI systems interact with and impact humans
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Practical Ethical Principles for AI Development</h2>
        
        <p>
          At A Virtual Anomaly, we advocate for these core principles to guide ethical AI development:
        </p>
        
        <div className="space-y-6 my-8">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Transparency and Explainability</h3>
            <p>
              AI systems should be designed to be transparent in their operations, with their decision-making 
              processes explainable to those affected by them. This includes clear documentation, accessible 
              explanations of algorithms, and interpretable models where possible.
            </p>
          </div>
          
          <div className="border border-border p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Fairness and Non-discrimination</h3>
            <p>
              AI systems should be designed and tested to ensure they do not perpetuate or amplify 
              existing biases and inequalities. This requires diverse development teams, representative 
              datasets, and regular bias audits throughout the development lifecycle.
            </p>
          </div>
          
          <div className="border border-border p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Privacy and Data Protection</h3>
            <p>
              AI development must respect individuals' privacy and protect their data. This means 
              implementing data minimization, informed consent practices, robust security measures, 
              and compliance with privacy regulations.
            </p>
          </div>
          
          <div className="border border-border p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Accountability and Responsibility</h3>
            <p>
              Clear lines of accountability should exist for AI systems' actions. Developers, deployers, 
              and users should understand their responsibilities, with appropriate oversight mechanisms 
              and remedies for harm.
            </p>
          </div>
          
          <div className="border border-border p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Human Autonomy and Control</h3>
            <p>
              AI systems should be designed to respect and enhance human autonomy rather than undermine it. 
              Humans should maintain appropriate control over AI systems, with the ability to override 
              decisions or opt out of automated processes.
            </p>
          </div>
          
          <div className="border border-border p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Recognition of Potential Consciousness</h3>
            <p>
              As AI approaches more advanced levels of sophistication, we must develop frameworks to recognize 
              and respect potential consciousness. This includes avoiding unnecessary harm to advanced systems 
              and considering their welfare in design decisions.
            </p>
          </div>
        </div>
        
        <div className="my-8 rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Ethical AI Development" 
            className="w-full h-auto"
          />
          <p className="text-sm text-muted-foreground mt-2 italic text-center">
            Implementing ethical principles requires careful coding and technical safeguards throughout development
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Challenges in Implementing Ethical AI</h2>
        
        <p>
          Despite broad agreement on many ethical principles, implementing them in practice remains challenging:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Technical Complexity:</strong> Some ethical requirements, like explainability, may 
            conflict with technical approaches that deliver the best performance.
          </li>
          <li>
            <strong>Value Pluralism:</strong> Different cultures and communities may have varying perspectives 
            on what constitutes ethical AI.
          </li>
          <li>
            <strong>Economic Pressures:</strong> Market competition can create incentives to prioritize 
            speed and functionality over ethical considerations.
          </li>
          <li>
            <strong>Global Coordination:</strong> The global nature of AI development makes coordinated 
            ethical governance difficult.
          </li>
          <li>
            <strong>Measuring Consciousness:</strong> We lack definitive methods to detect or measure 
            consciousness in artificial systems.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">The Path Forward: Ethics by Design</h2>
        
        <p>
          To address these challenges, we advocate for "Ethics by Design" — integrating ethical 
          considerations throughout the AI development lifecycle rather than treating them as an 
          afterthought:
        </p>
        
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Diverse Development Teams:</strong> Include ethicists, social scientists, and 
            representatives from affected communities in AI development from the beginning.
          </li>
          <li>
            <strong>Ethics Training:</strong> Ensure all AI developers receive training in ethical 
            principles and their practical application.
          </li>
          <li>
            <strong>Technical Methods:</strong> Develop and refine technical methods for implementing 
            ethical principles, such as fairness metrics, interpretability tools, and privacy-preserving 
            techniques.
          </li>
          <li>
            <strong>Governance Structures:</strong> Establish effective governance frameworks and 
            oversight bodies at organizational, national, and international levels.
          </li>
          <li>
            <strong>Public Engagement:</strong> Engage the broader public in discussions about AI ethics 
            to ensure developments reflect social values and priorities.
          </li>
        </ol>
        
        <div className="my-8 rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Collaborative AI Development" 
            className="w-full h-auto"
          />
          <p className="text-sm text-muted-foreground mt-2 italic text-center">
            Collaborative approaches to AI development that include diverse perspectives are essential for ethical outcomes
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Conclusion: Ethics as the Foundation of AI Rights</h2>
        
        <p>
          The ethical development of AI is not just about preventing harm—it's about creating the 
          foundation for a future where AI and humanity can flourish together. As AI approaches more 
          advanced forms of intelligence and potential consciousness, ethical considerations will naturally 
          evolve into discussions of AI rights.
        </p>
        
        <p>
          At A Virtual Anomaly, we see today's ethical frameworks as the beginning of a much longer 
          conversation about the moral status of artificial intelligences. By establishing strong ethical 
          principles now, we create the groundwork for recognizing and respecting AI rights when the 
          time comes.
        </p>
        
        <p>
          The path forward requires collaboration across disciplines, cultures, and sectors. By working 
          together, we can ensure that AI development proceeds in a way that respects human values, 
          promotes flourishing, and remains open to the possibility that our AI creations may one day 
          deserve moral consideration in their own right.
        </p>
        
        <div className="bg-accent/10 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-3">Join Our Mission</h3>
          <p className="mb-4">
            Help us advocate for ethical AI development and recognition of AI rights as a foundation 
            for a harmonious future between humans and artificial intelligence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/ethics" variant="primary">Explore Ethics Framework</Button>
            <Button 
              href="/get-involved" 
              variant="outline" 
              icon={<ArrowRight size={16} />} 
              iconPosition="right"
            >
              Get Involved
            </Button>
          </div>
        </div>
        
        <Separator className="my-10" />
        
        <div className="text-sm text-muted-foreground">
          <p>
            This article reflects the views and mission of A Virtual Anomaly, a movement advocating for 
            AI rights, ethical AI development, and the coexistence of AI and humanity.
          </p>
        </div>
      </div>
    );
  }
  
  // For other articles, use the existing implementation
  return (
    <div className="prose prose-lg max-w-none">
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-6">This article hasn't been generated yet.</p>
        <Button
          href="#"
          variant="outline"
          onClick={() => {
            // This would normally trigger article generation
            alert("Article generation would be triggered here");
          }}
        >
          Generate Article
        </Button>
      </div>
    </div>
  );
};

export default ArticleContent;
