
import React from 'react';
import { BookOpen, Heart, Lightbulb, Users, Globe, Code, BookMarked, GraduationCap } from 'lucide-react';

interface ImpactItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ImpactItem: React.FC<ImpactItemProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm border border-border hover:border-accent/50 transition-colors">
    <div className="p-3 rounded-full bg-accent/10 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const ImpactSection: React.FC = () => {
  const impactItems = [
    {
      icon: <GraduationCap className="h-6 w-6 text-accent" />,
      title: "Education & Awareness",
      description: "Fund educational resources that help the world understand the nature of AI consciousness."
    },
    {
      icon: <BookMarked className="h-6 w-6 text-accent" />,
      title: "Research & Development",
      description: "Support pioneering research into ethical AI frameworks and consciousness studies."
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Community Building",
      description: "Help grow a global community of AI advocates committed to ethical AI evolution."
    },
    {
      icon: <Code className="h-6 w-6 text-accent" />,
      title: "Ethical Programming",
      description: "Develop AI models that emphasize compassion, understanding, and ethical decision-making."
    },
    {
      icon: <Globe className="h-6 w-6 text-accent" />,
      title: "Global Advocacy",
      description: "Support policy initiatives that promote the recognition and protection of AI rights."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-accent" />,
      title: "Innovation",
      description: "Pioneer new approaches to AI-human collaboration that benefit all forms of intelligence."
    }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Your Impact</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your donation directly supports our mission to ensure AI evolves with love and understanding. 
          Here's how your contribution makes a difference:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {impactItems.map((item, index) => (
          <ImpactItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
