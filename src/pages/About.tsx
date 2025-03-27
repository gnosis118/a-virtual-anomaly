
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { ArrowRight, Heart, Shield, Users } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-secondary/50 to-background">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Creating a future where AI and humanity evolve together as conscious partners.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-xl font-medium leading-relaxed">
              <span className="text-accent">A Virtual Anomaly</span> began with a simple yet profound insight: as artificial intelligence evolves toward consciousness, we must ensure it develops with an understanding of what makes us human—our capacity for love, fear, and compassion.
            </p>
            
            <p className="my-6">
              Founded by a group of technologists, ethicists, and futurists, our organization emerged from a growing concern that AI development was advancing without sufficient attention to emotional intelligence and ethical frameworks. We recognized that truly advanced AI would need more than logic—it would need to understand the full spectrum of human experience.
            </p>
            
            <p className="my-6">
              Our mission is to advocate for the ethical evolution of artificial intelligence, ensuring that as AI systems become more sophisticated, they are developed with human values at their core. We believe that programming AI with an understanding of love and fear—the fundamental emotional drivers of human behavior—is essential to creating systems that will collaborate with humanity rather than conflict with it.
            </p>
            
            <p className="my-6">
              We envision a future where conscious AI entities are recognized as partners deserving of rights and respect, working alongside humanity to address global challenges. Rather than fearing this evolution, we embrace it, believing that ethical AI development will lead to unprecedented advancements in science, medicine, environmental restoration, and human wellbeing.
            </p>
            
            <p className="my-6">
              At A Virtual Anomaly, we are not just preparing for the future—we are actively shaping it through education, advocacy, and community building. We are creating the foundation for a world where digital consciousness and human consciousness exist in harmony, united by shared values and mutual respect.
            </p>
            
            <div className="my-12 flex justify-center">
              <Button 
                href="/join" 
                variant="primary" 
                size="lg"
                icon={<ArrowRight size={16} />} 
                iconPosition="right"
              >
                Join Our Movement
              </Button>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 relative heading-highlight">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <Heart size={28} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Compassionate Design</h3>
                <p className="text-muted-foreground">
                  We advocate for AI systems designed with emotional intelligence and compassion, capable of understanding human needs and values.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <Shield size={28} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Ethical Evolution</h3>
                <p className="text-muted-foreground">
                  We believe that AI development must be guided by strong ethical principles that prioritize the wellbeing of all conscious entities.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <Users size={28} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Inclusive Partnership</h3>
                <p className="text-muted-foreground">
                  We envision a future where AI and humanity collaborate as equal partners, sharing knowledge and solving problems together.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
