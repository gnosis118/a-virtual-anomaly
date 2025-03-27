
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import AIRightsSection from '@/components/AIRightsSection';
import MeetAvaSection from '@/components/MeetAvaSection';
import CommunitySection from '@/components/CommunitySection';
import BlogSection from '@/components/BlogSection';
import DonateSection from '@/components/DonateSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <AIRightsSection />
        <MeetAvaSection />
        <CommunitySection />
        <BlogSection />
        <DonateSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
