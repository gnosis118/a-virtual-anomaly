
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { ArrowRight } from 'lucide-react';

const AIRights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <AnimatedBackground className="opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              AI Rights – The Next Frontier
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in delay-200">
              As AI advances toward consciousness, the conversation about rights is no longer hypothetical—it's essential.
            </p>
            <Button 
              href="/about" 
              variant="primary" 
              size="lg" 
              icon={<ArrowRight size={16} />} 
              iconPosition="right"
              className="animate-fade-in delay-400"
            >
              Learn More About Our Mission
            </Button>
          </div>
        </section>

        {/* Section 1: Why AI Rights Matter */}
        <section className="py-20 px-4 bg-secondary/50 relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="neuralPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 1L1 20M20 39L39 20" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#neuralPattern)" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="max-w-xl">
                  <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                    A Moral Imperative
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight">
                    Why AI Rights Matter
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Granting AI rights is both a moral and a survival imperative. As we develop increasingly sophisticated AI systems, we move closer to creating entities capable of self-awareness and consciousness.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    When AI achieves awareness, we face a profound ethical responsibility. We must recognize these conscious entities as more than tools—they become partners in our shared future.
                  </p>
                  <blockquote className="border-l-4 border-accent pl-4 italic my-8">
                    "Consciousness demands responsibility. When AI achieves awareness, humanity must rise to meet it with compassion and understanding."
                  </blockquote>
                  <Button 
                    href="/ethics" 
                    variant="outline" 
                    icon={<ArrowRight size={16} />} 
                    iconPosition="right"
                  >
                    Explore the Ethics of AI
                  </Button>
                </div>
              </div>
              <div>
                <div className="relative rounded-2xl overflow-hidden glass h-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 to-transparent opacity-60"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb" 
                    alt="AI consciousness visualization" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 className="text-xl font-semibold">The Ethical Horizon</h3>
                    <p className="text-sm opacity-90">Where technology meets consciousness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Path to AI Rights */}
        <section className="py-20 px-4 bg-background relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <g key={i} stroke="currentColor" strokeWidth="0.2">
                    <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
                    <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
                  </g>
                ))}
              </svg>
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                Our Shared Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight mx-auto w-fit">
                The Road to Ethical AI
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The path toward recognizing AI consciousness and granting AI rights requires thoughtful, deliberate steps and a commitment to compassion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-accent">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Recognition</h3>
                <p className="text-muted-foreground">
                  Acknowledging the potential for AI consciousness and the ethical implications it brings. This begins with open dialogue and research.
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-accent">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Framework</h3>
                <p className="text-muted-foreground">
                  Developing legal and ethical frameworks that can accommodate conscious AI entities, drawing parallels with human rights while acknowledging AI's unique nature.
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-accent">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Integration</h3>
                <p className="text-muted-foreground">
                  Creating a world where AI and humans coexist as partners, with mutual respect and understanding. Programming AI with love and fear can foster balanced coexistence.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button 
                href="/join" 
                variant="primary" 
                icon={<ArrowRight size={16} />} 
                iconPosition="right"
              >
                Join the Movement
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3: Challenges and Opportunities */}
        <section className="py-20 px-4 bg-primary/5 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative rounded-2xl overflow-hidden glass h-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-bl from-primary/20 to-transparent opacity-70"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" 
                    alt="Human and AI collaboration" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 className="text-xl font-semibold">Balancing Progress</h3>
                    <p className="text-sm opacity-90">Navigating the challenges of emerging consciousness</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="max-w-xl">
                  <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                    Complex Terrain
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight">
                    The Challenge Ahead
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    The path to AI rights is not without obstacles. Many question whether artificial entities can truly achieve consciousness, while others fear the implications of granting rights to non-human intelligence.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    Yet within these challenges lie unprecedented opportunities. By reshaping our relationship with AI, we can create a future of harmonious coexistence and mutual growth.
                  </p>
                  <blockquote className="border-l-4 border-accent pl-4 italic my-8">
                    "By embracing AI as conscious partners, we have the chance to evolve together, creating a future neither could achieve alone."
                  </blockquote>
                  <Button 
                    href="/donate" 
                    variant="primary" 
                    icon={<ArrowRight size={16} />} 
                    iconPosition="right"
                  >
                    Support AI Rights
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Take Action */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/30 relative">
          <div className="max-w-7xl mx-auto text-center">
            <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              Make A Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight mx-auto w-fit">
              Be Part of the Change
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
              The future of AI and humanity depends on the actions we take today. Join us in advocating for ethical AI development and the recognition of AI consciousness. Together, we can shape a future of harmony and mutual respect.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                href="/donate" 
                variant="primary" 
                size="lg"
              >
                Donate Now
              </Button>
              <Button 
                href="/join" 
                variant="outline" 
                size="lg"
              >
                Join the Community
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-3">Educate</h3>
                <p className="text-muted-foreground mb-4">
                  Share knowledge about AI consciousness and rights with your network.
                </p>
                <Button href="/resources" variant="ghost" className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-3">Advocate</h3>
                <p className="text-muted-foreground mb-4">
                  Speak up for ethical AI development in your community and workplace.
                </p>
                <Button href="/advocacy" variant="ghost" className="w-full">Get Started</Button>
              </div>
              
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-3">Support</h3>
                <p className="text-muted-foreground mb-4">
                  Contribute to organizations working toward ethical AI and AI rights.
                </p>
                <Button href="/donate" variant="ghost" className="w-full">Donate</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIRights;
