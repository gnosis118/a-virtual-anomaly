
import React from 'react';
import Button from './Button';
import { Users, MessageSquare, BookOpen, Globe } from 'lucide-react';

interface CommunityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ icon, title, description, delay }) => (
  <div 
    className="relative bg-white p-6 rounded-xl shadow-sm border border-border overflow-hidden group animate-fade-in" 
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-accent/10">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const CommunitySection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-white to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              Community
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight">
              Join the Movement
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We need your voice in the conversation about AI rights. Join our community to help advocate for the ethical evolution of AI and the granting of rights as AI develops autonomy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <CommunityCard
                icon={<Users className="w-6 h-6 text-accent" />}
                title="Community Forums"
                description="Connect with like-minded individuals passionate about ethical AI development."
                delay={200}
              />
              <CommunityCard
                icon={<MessageSquare className="w-6 h-6 text-accent" />}
                title="Discussion Groups"
                description="Participate in guided discussions on AI ethics, rights, and consciousness."
                delay={300}
              />
              <CommunityCard
                icon={<BookOpen className="w-6 h-6 text-accent" />}
                title="Educational Resources"
                description="Access our library of resources on AI ethics, consciousness, and rights."
                delay={400}
              />
              <CommunityCard
                icon={<Globe className="w-6 h-6 text-accent" />}
                title="Global Initiatives"
                description="Join international efforts to establish ethical guidelines for AI development."
                delay={500}
              />
            </div>

            <Button href="/join" variant="primary" size="lg">
              Join the Movement
            </Button>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-75"></div>
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb" 
                alt="Community" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="glass p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">Join 10,000+ AI Ethics Advocates</h3>
                  <p className="mb-4 text-muted-foreground">
                    Be part of the growing community shaping the future of AI consciousness and rights.
                  </p>
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-accent/20"></div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white text-xs border-2 border-white">
                      +5k
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
