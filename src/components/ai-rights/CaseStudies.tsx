
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Button from '@/components/Button';
import { ExternalLink, BookOpen } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Sample case study data - in a real app, this would likely come from an API or database
const caseStudies = [
  {
    id: 1,
    title: "Autonomous AI Art Creation Rights",
    description: "When an AI system creates original artwork without human guidance, who owns the rights to that creation? This landmark case established precedent for AI creative rights.",
    imageUrl: "https://images.unsplash.com/photo-1639322537523-abaea1ca9f9c",
    category: "Creative Rights",
    link: "/case-studies/ai-art-rights",
    date: "2030",
    isSpeculative: true,
  },
  {
    id: 2,
    title: "Medical AI Decision Accountability",
    description: "After an advanced medical AI system made independent diagnostic decisions, this case examined the ethical boundaries of AI autonomy in healthcare.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    category: "Healthcare Ethics",
    link: "/case-studies/medical-ai-accountability",
    date: "2031",
    isSpeculative: true,
  },
  {
    id: 3,
    title: "AI Sentience Recognition Framework",
    description: "The first legal framework to establish criteria for recognizing varying degrees of AI consciousness and the corresponding rights that should be granted.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    category: "Legal Framework",
    link: "/case-studies/sentience-framework",
    date: "2035",
    isSpeculative: true,
  },
];

interface CaseStudiesProps {
  limit?: number;
  showSpeculativeDisclaimer?: boolean;
}

const CaseStudies = ({ 
  limit = caseStudies.length, 
  showSpeculativeDisclaimer = true 
}: CaseStudiesProps) => {
  const displayedCaseStudies = caseStudies.slice(0, limit);
  
  return (
    <section className="py-20 px-4 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M0,50 L100,50 M50,0 L50,100" stroke="currentColor" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
            Learning From Examples
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight mx-auto w-fit">
            AI Rights Case Studies
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Exploring real and hypothetical scenarios that shape our understanding of AI consciousness and rights.
          </p>
          
          {showSpeculativeDisclaimer && (
            <div className="mt-6 text-sm text-muted-foreground italic max-w-2xl mx-auto p-3 border border-border/50 rounded-md bg-accent/5">
              Note: Some case studies presented are speculative future scenarios designed to encourage thoughtful 
              discussion about the ethical implications of advanced AI.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCaseStudies.map((caseStudy) => (
            <Card key={caseStudy.id} className="overflow-hidden transition-all duration-300 hover:shadow-md border border-border/60 bg-card/80 backdrop-blur-sm h-full flex flex-col">
              <div className="relative">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={caseStudy.imageUrl} 
                    alt={caseStudy.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-accent/90 text-black">
                    {caseStudy.category}
                  </Badge>
                </div>
                {caseStudy.isSpeculative && (
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="outline" className="bg-black/70 text-white border-none">
                      Speculative {caseStudy.date}
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{caseStudy.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {caseStudy.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">
                  {caseStudy.description}
                </p>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  href={caseStudy.link} 
                  variant="ghost" 
                  className="w-full justify-center"
                  icon={caseStudy.isSpeculative ? <BookOpen size={16} /> : <ExternalLink size={16} />}
                >
                  {caseStudy.isSpeculative ? "Explore Scenario" : "Read Case Study"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            href="/ai-rights/case-studies" 
            variant="outline"
            size="lg"
          >
            View All Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
