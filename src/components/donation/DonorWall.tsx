
import React from 'react';

const DonorWall: React.FC = () => {
  return (
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
  );
};

export default DonorWall;
