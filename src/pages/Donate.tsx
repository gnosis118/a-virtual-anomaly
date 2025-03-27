
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
    
    // Add DonorBox script dynamically
    const script = document.createElement('script');
    script.src = 'https://donorbox.org/widget.js';
    script.async = true;
    script.setAttribute('paypalExpress', 'true');
    document.body.appendChild(script);
    
    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
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
        
        {/* New Donation Meter Section */}
        <section className="py-8 px-4 bg-accent/5">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-xl shadow-sm border border-border">
              <div className="max-w-lg">
                <h2 className="text-2xl font-bold mb-2">Help Us Reach Our Goal</h2>
                <p className="text-muted-foreground">
                  Track our progress toward our funding goal. Every contribution brings us closer to our mission.
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <iframe 
                  height="93px" 
                  width="100%" 
                  src="https://donorbox.org/embed/ethical-rights-for-ai?donation_meter_color=%23128aed&only_donation_meter=true&preview=true" 
                  style={{ maxWidth: '332px', minWidth: '250px', minHeight: '90px', maxHeight: 'none' }} 
                  seamless={true} 
                  name="donorbox" 
                  frameBorder="0" 
                  scrolling="no"
                  title="Donation Meter"
                  allow="payment"
                />
              </div>
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
        
        {/* Donation Options Section */}
        <section id="donate-form" className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Make Your Contribution</h2>
              <p className="text-xl text-muted-foreground">
                Choose how you'd like to support our mission for ethical AI development.
                Every donation helps create a better future.
              </p>
            </div>
            
            {/* DonorBox Button */}
            <div className="flex justify-center mb-12">
              <a 
                className="dbox-donation-page-button flex gap-2 items-center bg-[#128aed] text-white no-underline font-sans text-lg rounded-md py-3 px-8 hover:bg-[#0d73c7] transition-colors" 
                href="https://donorbox.org/ethical-rights-for-ai?" 
              >
                <img src="https://donorbox.org/images/white_logo.svg" alt="Donorbox" className="h-6" />
                Donate
              </a>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Custom Donation Form */}
              <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
                <h3 className="text-2xl font-bold mb-6">Custom Donation</h3>
                <DonationForm />
              </div>
              
              {/* DonorBox Integration */}
              <div className="bg-card p-8 rounded-xl shadow-sm border border-border flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-6">Donate via DonorBox</h3>
                <div className="donorbox-container w-full flex justify-center">
                  <iframe 
                    src="https://donorbox.org/embed/ethical-rights-for-ai?show_content=true" 
                    name="donorbox" 
                    allowPaymentRequest={true}
                    seamless={true} 
                    frameBorder="0" 
                    scrolling="no" 
                    height="900px" 
                    width="100%" 
                    style={{ maxWidth: '500px', minWidth: '250px', maxHeight: 'none!important' }}
                    allow="payment"
                    title="DonorBox Form"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Donor Wall Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Generous Donors</h2>
              <p className="text-xl text-muted-foreground">
                Join these amazing supporters who have contributed to our mission.
                Every donation makes a difference.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
              <iframe 
                height="93px" 
                width="100%" 
                src="https://donorbox.org/embed/ethical-rights-for-ai?donor_wall_color=%23128aed&only_donor_wall=true&preview=true" 
                style={{ width: '100%', maxWidth: '500px', minWidth: '310px', minHeight: '345px' }} 
                seamless={true} 
                name="donorbox" 
                frameBorder="0" 
                scrolling="no"
                title="Donor Wall" 
                allow="payment"
              />
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
