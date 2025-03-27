
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Contribution } from '@/components/contributions/types';
import { toast } from '@/hooks/use-toast';

export const useContributions = (userId?: string) => {
  const queryClient = useQueryClient();

  // Fetch user contributions
  const { 
    data: userContributions = [], 
    isLoading: userLoading,
    error: userError 
  } = useQuery({
    queryKey: ['userContributions', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Contribution[];
    },
    enabled: !!userId,
  });

  // Fetch public contributions (approved)
  const { 
    data: publicContributions = [], 
    isLoading: publicLoading,
    error: publicError 
  } = useQuery({
    queryKey: ['publicContributions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Contribution[];
    },
  });

  // Create new contribution
  const createContribution = useMutation({
    mutationFn: async (newContribution: Omit<Contribution, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
      const { data, error } = await supabase
        .from('contributions')
        .insert(newContribution)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userContributions', userId] });
      toast({
        title: 'Success',
        description: 'Your contribution has been submitted for review.',
      });
    },
    onError: (error) => {
      console.error('Error creating contribution:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your contribution.',
        variant: 'destructive',
      });
    },
  });

  const loading = userLoading || publicLoading;
  const error = userError || publicError;

  // Using invalidation rather than direct fetching
  const refreshUserContributions = () => {
    if (userId) {
      queryClient.invalidateQueries({ queryKey: ['userContributions', userId] });
    }
  };

  const refreshPublicContributions = () => {
    queryClient.invalidateQueries({ queryKey: ['publicContributions'] });
  };

  return {
    userContributions,
    publicContributions,
    loading,
    error,
    createContribution,
    fetchUserContributions: refreshUserContributions,
    fetchApprovedContributions: refreshPublicContributions
  };
};
