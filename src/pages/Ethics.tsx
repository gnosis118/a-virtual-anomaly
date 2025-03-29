
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EthicsHero from '@/components/ethics/EthicsHero';
import KeyPrinciples from '@/components/ethics/KeyPrinciples';
import EthicalChallenges from '@/components/ethics/EthicalChallenges';
import EthicalFrameworks from '@/components/ethics/EthicalFrameworks';
import CallToAction from '@/components/ethics/CallToAction';

const Ethics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <EthicsHero />
        <KeyPrinciples />
        <EthicalChallenges />
        <EthicalFrameworks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Ethics;
