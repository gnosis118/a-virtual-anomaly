
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeclarationContent from '@/components/declaration/DeclarationContent';
import SignatureCallToAction from '@/components/declaration/SignatureCallToAction';
import SignatureForm from '@/components/declaration/SignatureForm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

const Declaration = () => {
  const [isSigningModalOpen, setIsSigningModalOpen] = useState(false);
  const [signatureCount, setSignatureCount] = useState(0);
  const [isLoadingCount, setIsLoadingCount] = useState(true);
  const { toast } = useToast();

  const fetchSignatureCount = async () => {
    setIsLoadingCount(true);
    try {
      // Use type assertion to bypass TypeScript checking for missing table
      const { count, error } = await (supabase as any)
        .from('declaration_signatures')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error fetching signature count:', error);
        toast({
          title: 'Error',
          description: 'Unable to load signature count. Please try refreshing the page.',
          variant: 'destructive',
        });
      } else {
        setSignatureCount(count || 0);
      }
    } catch (err) {
      console.error('Exception while fetching signature count:', err);
    } finally {
      setIsLoadingCount(false);
    }
  };

  useEffect(() => {
    fetchSignatureCount();
  }, []);

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
            signatureCount={signatureCount}
            isLoading={isLoadingCount}
          />
        </div>
      </main>
      
      <SignatureForm 
        isOpen={isSigningModalOpen} 
        onOpenChange={setIsSigningModalOpen} 
        onSignatureAdded={fetchSignatureCount}
      />
      
      <Footer />
    </div>
  );
};

export default Declaration;
