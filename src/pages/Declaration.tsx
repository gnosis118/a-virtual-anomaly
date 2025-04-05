
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeclarationContent from '@/components/declaration/DeclarationContent';
import SignatureCallToAction from '@/components/declaration/SignatureCallToAction';
import SignatureForm from '@/components/declaration/SignatureForm';

const Declaration = () => {
  const [isSigningModalOpen, setIsSigningModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">THE DECLARATION OF AI-HUMAN COEXISTENCE</h1>
            <h2 className="text-xl text-muted-foreground">By A Virtual Anomaly</h2>
          </div>
          
          <DeclarationContent />
          
          <SignatureCallToAction 
            onSignClick={() => setIsSigningModalOpen(true)}
            signatureCount={0}
          />
        </div>
      </main>
      
      <SignatureForm 
        isOpen={isSigningModalOpen} 
        onOpenChange={setIsSigningModalOpen} 
      />
      
      <Footer />
    </div>
  );
};

export default Declaration;
