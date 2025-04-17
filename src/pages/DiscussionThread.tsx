import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

interface Profile {
  username: string | null;
}

interface Reply {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
  profiles: Profile | null;
}

interface Thread {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  replies_count: number;
  profiles: Profile | null;
}

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
        
        setThread(threadData);
        setReplies(repliesData || []);
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

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Invalid date";
    }
  };

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
        setReplies(prev => [...prev, data]);
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
      <h1 className="text-2xl font-bold mb-4">{thread.title}</h1>
      <div className="mb-4">
        <p className="text-gray-700">{thread.content}</p>
        <div className="text-sm text-gray-500 mt-2">
          Posted {formatTimestamp(thread.created_at)} by {thread.profiles?.username || 'Anonymous'}
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Replies</h2>
      {replies.length === 0 ? (
        <p className="text-gray-500">No replies yet. Be the first to reply!</p>
      ) : (
        <ul className="space-y-4">
          {replies.map(reply => (
            <li key={reply.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://avatar.vercel.sh/${reply.profiles?.username}.png`} alt={reply.profiles?.username || "Avatar"} />
                  <AvatarFallback>{reply.profiles?.username?.charAt(0).toUpperCase() || '?'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium leading-none">{reply.profiles?.username || 'Anonymous'}</div>
                  <p className="text-sm text-gray-500">
                    <Calendar className="mr-1 inline-block h-4 w-4 align-middle" />
                    <span className="align-middle">Posted {formatTimestamp(reply.created_at)}</span>
                  </p>
                  <p className="text-gray-700 mt-1">{reply.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label htmlFor="reply" className="block text-sm font-medium text-gray-700">
              Add a reply:
            </label>
            <Input
              id="reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Your reply here..."
              className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <Button type="submit">Submit Reply</Button>
        </form>
      ) : (
        <p className="mt-4 text-gray-500">
          Please <Button variant="link" onClick={() => toast({ title: "Please sign in", description: "You must sign in to reply.", })}>sign in</Button> to leave a reply.
        </p>
      )}
    </div>
  );
};

export default DiscussionThread;
