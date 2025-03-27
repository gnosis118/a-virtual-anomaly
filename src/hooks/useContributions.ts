
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Contribution } from '@/components/contributions/types';
import { toast } from '@/hooks/use-toast';

export const useContributions = (userId?: string) => {
  const [userContributions, setUserContributions] = useState<Contribution[]>([]);
  const [publicContributions, setPublicContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserContributions = async () => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUserContributions(data || []);
    } catch (error) {
      console.error('Error fetching user contributions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your contributions.',
        variant: 'destructive',
      });
    }
  };

  const fetchApprovedContributions = async () => {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPublicContributions(data || []);
    } catch (error) {
      console.error('Error fetching approved contributions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedContributions();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserContributions();
    }
  }, [userId]);

  return {
    userContributions,
    publicContributions,
    loading,
    fetchUserContributions,
    fetchApprovedContributions
  };
};
