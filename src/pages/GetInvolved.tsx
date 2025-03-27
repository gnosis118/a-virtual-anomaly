
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContributionForm from '@/components/contributions/ContributionForm';
import PublicContributions from '@/components/contributions/PublicContributions';
import UserContributions from '@/components/contributions/UserContributions';
import AuthPrompt from '@/components/contributions/AuthPrompt';
import { useContributions } from '@/hooks/useContributions';
import { Skeleton } from '@/components/ui/skeleton';

const GetInvolved = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    userContributions, 
    publicContributions, 
    loading: contributionsLoading,
    fetchUserContributions
  } = useContributions(user?.id);
  
  const isLoading = authLoading || contributionsLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Involved</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community and share your thoughts on AI consciousness and ethics.
              Your contributions help shape the future of AI rights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {isLoading ? (
                <div className="space-y-6">
                  <Skeleton className="h-8 w-48 mb-6" />
                  <Skeleton className="h-32 w-full rounded-md" />
                  <Skeleton className="h-32 w-full rounded-md" />
                </div>
              ) : (
                <PublicContributions contributions={publicContributions} />
              )}
            </div>
            
            <div className="lg:col-span-1 space-y-8">
              {isLoading ? (
                <Skeleton className="h-96 w-full rounded-md" />
              ) : user ? (
                <div className="space-y-8">
                  <ContributionForm 
                    userId={user.id} 
                    onSubmitSuccess={fetchUserContributions} 
                  />
                  
                  <UserContributions contributions={userContributions} />
                </div>
              ) : (
                <AuthPrompt />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GetInvolved;
