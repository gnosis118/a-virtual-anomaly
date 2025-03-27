
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImpactSection from '@/components/donation/ImpactSection';
import GratitudeSection from '@/components/donation/GratitudeSection';
import DonationHero from '@/components/donation/DonationHero';
import DonationMeter from '@/components/donation/DonationMeter';
import NonprofitStatus from '@/components/donation/NonprofitStatus';
import MissionVision from '@/components/donation/MissionVision';
import DonationFormSection from '@/components/donation/DonationForm.section';
import DonorWall from '@/components/donation/DonorWall';

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
        <DonationHero />
        
        {/* Donation Meter Section */}
        <DonationMeter />
        
        {/* 501(c)(3) Status Section */}
        <NonprofitStatus />
        
        {/* Mission & Vision */}
        <MissionVision />
        
        {/* Impact Section */}
        <div className="max-w-6xl mx-auto px-4">
          <ImpactSection />
        </div>
        
        {/* Donation Options Section */}
        <DonationFormSection />
        
        {/* Donor Wall Section */}
        <DonorWall />
        
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
