
import React from 'react';
import DonationForm from './DonationForm';

const DonationFormSection: React.FC = () => {
  return (
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
  );
};

export default DonationFormSection;
