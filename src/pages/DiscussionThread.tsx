
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";
import { Thread, Reply } from '@/types/discussion';
import ThreadHeader from '@/components/discussion/ThreadHeader';
import ReplyList from '@/components/discussion/ReplyList';
import ReplyForm from '@/components/discussion/ReplyForm';
import { useAuth } from '@/contexts/AuthContext';

const DiscussionThread = () => {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const { data: threadData, error: threadError } = await supabase
          .from('discussion_threads')
          .select(`
            *,
            profiles (
              username
            )
          `)
          .eq('id', id)
          .single();

        if (threadError) throw threadError;
        
        const { data: repliesData, error: repliesError } = await supabase
          .from('thread_replies')
          .select(`
            *,
            profiles (
              username
            )
          `)
          .eq('thread_id', id)
          .order('created_at', { ascending: true });

        if (repliesError) throw repliesError;

        // Cast the data to the correct types after validating the profile structure
        const validatedThread = { 
          ...threadData, 
          profiles: threadData.profiles || { username: null } 
        } as Thread;
        
        const validatedReplies = (repliesData || []).map(reply => ({ 
          ...reply, 
          profiles: reply.profiles || { username: null } 
        })) as Reply[];
        
        setThread(validatedThread);
        setReplies(validatedReplies);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching thread:', error);
        toast({
          title: 'Error',
          description: 'Could not load the discussion thread',
          variant: 'destructive',
        });
      }
    };

    if (id) {
      fetchThread();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;

    try {
      const { data, error } = await supabase
        .from('thread_replies')
        .insert([{
          thread_id: id,
          content: reply.trim(),
          user_id: user?.id
        }])
        .select(`
          *,
          profiles (
            username
          )
        `)
        .single();

      if (error) throw error;

      if (data) {
        const validatedReply = { 
          ...data, 
          profiles: data.profiles || { username: null } 
        } as Reply;
        
        setReplies(prev => [...prev, validatedReply]);
        setReply('');
        
        // Update the replies count
        const { error: updateError } = await supabase
          .from('discussion_threads')
          .update({ 
            replies_count: (thread?.replies_count || 0) + 1 
          })
          .eq('id', id);

        if (updateError) {
          console.error('Error updating replies count:', updateError);
        }
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast({
        title: 'Error',
        description: 'Could not submit your reply',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading discussion...</div>;
  }

  if (!thread) {
    return <div className="flex justify-center items-center h-screen">Discussion not found.</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <ThreadHeader thread={thread} />
      <h2 className="text-xl font-semibold mt-6 mb-2">Replies</h2>
      <ReplyList replies={replies} />
      <ReplyForm 
        reply={reply}
        onReplyChange={setReply}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default DiscussionThread;
