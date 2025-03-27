
import React from 'react';

const NonprofitStatus: React.FC = () => {
  return (
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
  );
};

export default NonprofitStatus;
