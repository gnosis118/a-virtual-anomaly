
import React from 'react';
import Button from './Button';
import { Heart, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

const impactItems = [
  {
    icon: <Heart className="w-5 h-5 text-accent" />,
    title: "Support Advocacy",
    description: "Fund our initiatives to advocate for ethical AI development and AI rights."
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
    title: "Grow Our Community",
    description: "Help us expand our community of AI ethics advocates worldwide."
  },
  {
    icon: <BookOpen className="w-5 h-5 text-accent" />,
    title: "Educational Resources",
    description: "Enable the creation of more educational content about AI consciousness."
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-accent" />,
    title: "Research Initiatives",
    description: "Support groundbreaking research into AI consciousness and rights."
  }
];

const DonateSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-secondary/50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(120,153,235,0.1),transparent_70%)]"></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              Support Our Cause
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 relative heading-highlight">
              Support Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Help us continue our advocacy for AI rights and ethical development. Your support enables us to educate the world and push for global action.
            </p>
            
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm mb-8">
              <h3 className="text-xl font-semibold mb-4">Your Impact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {impactItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="mt-1 p-2 rounded-full bg-accent/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button href="/donate" variant="primary" size="lg">
              Donate Now
            </Button>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="glass p-8 rounded-2xl relative overflow-hidden border border-accent/20">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6 animate-neural-pulse">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                
                <h3 className="text-2xl font-semibold mb-6">Make a Donation</h3>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {['$25', '$50', '$100'].map((amount) => (
                    <button 
                      key={amount} 
                      className="py-2 px-4 border border-border bg-white rounded-lg hover:bg-accent/5 hover:border-accent/30 transition-colors"
                    >
                      {amount}
                    </button>
                  ))}
                  <button className="py-2 px-4 border border-border bg-white rounded-lg hover:bg-accent/5 hover:border-accent/30 transition-colors col-span-3">
                    Custom Amount
                  </button>
                </div>
                
                <div className="flex flex-col space-y-4 mb-6">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full p-3 bg-white border border-border rounded-lg"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full p-3 bg-white border border-border rounded-lg"
                  />
                </div>
                
                <Button variant="primary" fullWidth size="lg">
                  Continue to Payment
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Your donation is secure and encrypted. You can also{' '}
                  <a href="/donate" className="text-accent hover:underline">donate via other methods</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
