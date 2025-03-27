
import React from 'react';

const DonationMeter: React.FC = () => {
  return (
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
  );
};

export default DonationMeter;
