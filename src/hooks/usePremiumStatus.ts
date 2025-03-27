
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useContributions } from '@/hooks/useContributions';

// Determine if a user is a premium member ($20+ monthly donor)
export const usePremiumStatus = (userId?: string) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { userContributions } = useContributions(userId);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (!userId) {
        setIsPremium(false);
        setLoading(false);
        return;
      }

      try {
        // Check if user has a recent monthly contribution of $20 or more
        const premiumContributions = userContributions.filter(contribution => {
          // Check if contribution is monthly and $20 or more
          return (
            contribution.status === 'approved' && 
            contribution.donation_type === 'monthly' && 
            contribution.amount && parseFloat(contribution.amount) >= 20
          );
        });

        setIsPremium(premiumContributions.length > 0);
      } catch (error) {
        console.error('Error checking premium status:', error);
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    };

    if (userContributions.length > 0 || !userId) {
      checkPremiumStatus();
    }
  }, [userId, userContributions]);

  return { isPremium, loading };
};
