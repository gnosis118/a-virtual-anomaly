
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import { DiscussionThread } from '@/pages/AIDiscussion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface DiscussionThreadsProps {
  threads: DiscussionThread[];
  onRefresh: () => void;
}

const DiscussionThreads: React.FC<DiscussionThreadsProps> = ({ threads, onRefresh }) => {
  const { user } = useAuth();

  const handleLike = async (threadId: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to like discussions',
        variant: 'destructive',
      });
      return;
    }

    try {
      // First check if user has already liked this thread
      const { data: existingLike } = await supabase
        .from('thread_likes')
        .select('*')
        .eq('thread_id', threadId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // User has already liked, so unlike
        await supabase
          .from('thread_likes')
          .delete()
          .eq('thread_id', threadId)
          .eq('user_id', user.id);

        // Decrement the likes count
        await supabase
          .from('discussion_threads')
          .update({ likes: supabase.rpc('decrement', { x: 1 }) })
          .eq('id', threadId);
      } else {
        // User hasn't liked, so add like
        await supabase
          .from('thread_likes')
          .insert({ thread_id: threadId, user_id: user.id });

        // Increment the likes count
        await supabase
          .from('discussion_threads')
          .update({ likes: supabase.rpc('increment', { x: 1 }) })
          .eq('id', threadId);
      }

      onRefresh();
    } catch (error) {
      console.error('Error handling like:', error);
      toast({
        title: 'Error',
        description: 'Failed to process your action',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      {threads.map((thread) => (
        <Card key={thread.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between">
              <Link to={`/discussion/${thread.id}`} className="hover:underline">
                <CardTitle className="text-xl">{thread.title}</CardTitle>
              </Link>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Posted by {thread.author_name} • {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
            </div>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3">{thread.content}</p>
            {thread.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {thread.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t bg-muted/30 p-3">
            <div className="flex items-center gap-4 text-sm">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2" 
                onClick={() => handleLike(thread.id)}
              >
                <ThumbsUp className="h-4 w-4" /> {thread.likes || 0}
              </Button>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> {thread.replies_count || 0} replies
              </div>
              <Link to={`/discussion/${thread.id}`} className="ml-auto">
                <Button variant="outline" size="sm">
                  View Discussion
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DiscussionThreads;
