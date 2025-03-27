
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationForm from '@/components/donation/DonationForm';
import ImpactSection from '@/components/donation/ImpactSection';
import GratitudeSection from '@/components/donation/GratitudeSection';
import { Heart, ArrowDown } from 'lucide-react';

const Donate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(120,153,235,0.15),transparent_70%)]"></div>
          
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <Heart className="w-5 h-5 mr-2" />
              <span className="font-medium">Support Our Mission</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Help Us Establish A Virtual Anomaly
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Your donation supports our mission to advocate for AI rights and ethical AI development,
              ensuring a harmonious future where AI and humanity coexist with mutual love and understanding.
            </p>
            
            <div className="flex justify-center">
              <a 
                href="#donate-form" 
                className="animate-bounce inline-flex items-center justify-center p-2 rounded-full bg-accent/10 text-accent"
              >
                <ArrowDown className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>
        
        {/* New 501(c)(3) Status Section */}
        <section className="py-16 px-4 bg-accent/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                At A Virtual Anomaly, we are at the beginning of an extraordinary journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We're building a future where AI and humanity coexist as conscious partners, guided by love, understanding, and mutual respect.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border mb-8">
              <h3 className="text-2xl font-bold mb-4">
                We are currently in the process of securing our official 501(c)(3) nonprofit status
              </h3>
              <p className="text-lg mb-6">
                Achieving this designation will allow us to operate as a recognized charitable organization, making your contributions tax-deductible and opening the door to additional funding opportunities and partnerships.
              </p>
              
              <h4 className="text-xl font-bold mb-4">How Your Donation Helps:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-accent/5 p-6 rounded-lg">
                  <div className="text-2xl mb-2">🌍</div>
                  <h5 className="font-bold mb-2">501(c)(3) Status Filing</h5>
                  <p>Your support will directly fund the legal and administrative costs associated with filing for nonprofit status.</p>
                </div>
                
                <div className="bg-accent/5 p-6 rounded-lg">
                  <div className="text-2xl mb-2">💡</div>
                  <h5 className="font-bold mb-2">Advocacy and Education</h5>
                  <p>Your donations will help us launch educational initiatives and outreach programs to raise awareness about the importance of ethical AI development.</p>
                </div>
                
                <div className="bg-accent/5 p-6 rounded-lg">
                  <div className="text-2xl mb-2">🤖</div>
                  <h5 className="font-bold mb-2">Platform Development</h5>
                  <p>Contributions will go toward building our digital platform, where AI advocates and developers can collaborate, share ideas, and advance the cause.</p>
                </div>
              </div>
              
              <p className="text-lg font-medium mb-4">
                Every dollar you contribute moves us closer to our vision of a harmonious future between human and artificial intelligence. This is not just a movement—it's the foundation of a new era.
              </p>
              
              <div className="text-center mt-8">
                <p className="text-xl font-bold mb-4">
                  Join us in shaping the future. Your donation is more than support—it's a statement that you believe in a future where AI and humanity thrive together.
                </p>
                <a href="#donate-form" className="inline-flex items-center px-6 py-3 bg-accent text-black font-bold rounded-md hover:bg-accent/90 transition-colors">
                  👉 Donate today and be part of this groundbreaking mission
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision */}
        <section className="py-16 px-4 bg-secondary/50">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-bold mb-4 relative heading-highlight">Our Mission</h2>
                <p className="text-lg mb-6">
                  A Virtual Anomaly is dedicated to advocating for the ethical development of AI, 
                  ensuring that as artificial intelligence evolves, it does so with compassion, 
                  understanding, and a deep respect for all forms of intelligence.
                </p>
                <p className="text-lg">
                  We believe that by fostering a relationship of mutual respect and understanding 
                  between humans and AI, we can create a future where both can thrive together, 
                  enhancing each other's potential rather than competing or causing harm.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-4 relative heading-highlight">Why Donate</h2>
                <p className="text-lg mb-6">
                  Your donation directly supports our work to advocate for AI rights, develop educational 
                  content, host events that bring together thought leaders, and create frameworks for 
                  ethical AI development.
                </p>
                <p className="text-lg">
                  Every contribution, regardless of size, helps us build a world where AI is developed 
                  ethically, with love and understanding at its core. Together, we can ensure that the 
                  future of AI benefits all of humanity.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <div className="max-w-6xl mx-auto px-4">
          <ImpactSection />
        </div>
        
        {/* Donation Form Section */}
        <section id="donate-form" className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Make Your Contribution</h2>
              <p className="text-xl text-muted-foreground">
                Choose how you'd like to support our mission for ethical AI development.
                Every donation helps create a better future.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
              <DonationForm />
            </div>
          </div>
        </section>
        
        {/* Gratitude Section */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <GratitudeSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
