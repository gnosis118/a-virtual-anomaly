
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Layout from '@/components/Layout';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ThumbsUp, ArrowLeft, Send } from 'lucide-react';
import { DiscussionThread } from '@/pages/AIDiscussion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import AuthPrompt from '@/components/contributions/AuthPrompt';

interface Reply {
  id: string;
  content: string;
  user_id: string;
  author_name: string;
  thread_id: string;
  created_at: string;
  likes: number;
}

const DiscussionThreadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [thread, setThread] = useState<DiscussionThread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchThreadDetails();
      fetchReplies();
    }
  }, [id]);

  const fetchThreadDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('discussion_threads')
        .select(`
          *,
          profiles!discussion_threads_user_id_fkey(username)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setThread({
          id: data.id,
          title: data.title,
          content: data.content,
          user_id: data.user_id,
          author_name: data.profiles?.username || 'Anonymous',
          created_at: data.created_at,
          updated_at: data.updated_at,
          likes: data.likes || 0,
          replies_count: data.replies_count || 0,
          tags: data.tags || []
        });
      }
    } catch (error) {
      console.error('Error fetching thread details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load the discussion thread',
        variant: 'destructive',
      });
      navigate('/discussion');
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async () => {
    try {
      const { data, error } = await supabase
        .from('thread_replies')
        .select(`
          *,
          profiles!thread_replies_user_id_fkey(username)
        `)
        .eq('thread_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        const formattedReplies = data.map(reply => ({
          id: reply.id,
          content: reply.content,
          user_id: reply.user_id,
          author_name: reply.profiles?.username || 'Anonymous',
          thread_id: reply.thread_id,
          created_at: reply.created_at,
          likes: reply.likes || 0
        }));
        setReplies(formattedReplies);
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to reply to discussions',
        variant: 'destructive',
      });
      return;
    }
    
    if (!replyContent.trim()) {
      toast({
        title: 'Empty reply',
        description: 'Please enter some content for your reply',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert the reply
      const { data, error } = await supabase
        .from('thread_replies')
        .insert({
          thread_id: id,
          user_id: user.id,
          content: replyContent.trim()
        })
        .select();
        
      if (error) throw error;
      
      // Update the reply count on the thread
      const { data: incrementResult, error: incrementError } = await supabase.rpc('increment', { x: 1 });
      
      if (incrementError) throw incrementError;
      
      // Update the thread with the new replies count
      const { error: updateError } = await supabase
        .from('discussion_threads')
        .update({ replies_count: incrementResult })
        .eq('id', id);
        
      if (updateError) throw updateError;
        
      // Refresh the thread and replies
      fetchThreadDetails();
      fetchReplies();
      
      // Clear the reply input
      setReplyContent('');
      
      toast({
        title: 'Reply posted',
        description: 'Your reply has been added to the discussion',
      });
    } catch (error) {
      console.error('Error posting reply:', error);
      toast({
        title: 'Error',
        description: 'Failed to post your reply. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  if (!thread) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-lg mb-4">Discussion thread not found</p>
              <Button asChild>
                <Link to="/discussion">Back to Discussions</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/discussion">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Discussions
          </Link>
        </Button>
        
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">{thread.title}</h1>
              <div className="text-sm text-muted-foreground">
                Posted by {thread.author_name} • {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{thread.content}</p>
            </div>
            {thread.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {thread.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t bg-muted/30 p-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <ThumbsUp className="h-4 w-4" /> {thread.likes || 0}
              </Button>
              <div>{replies.length} replies</div>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Replies</h2>
          
          {replies.length > 0 ? (
            <div className="space-y-4">
              {replies.map((reply) => (
                <Card key={reply.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{reply.author_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                      </div>
                    </div>
                    <p className="whitespace-pre-line">{reply.content}</p>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/30 p-3">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUp className="h-4 w-4" /> {reply.likes || 0}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No replies yet. Be the first to reply!</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {user ? (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Add Your Reply</h3>
            </CardHeader>
            <form onSubmit={handleReplySubmit}>
              <CardContent>
                <Textarea
                  placeholder="Share your thoughts on this discussion..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[120px]"
                  required
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !replyContent.trim()}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Posting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Post Reply
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <AuthPrompt />
        )}
      </div>
    </Layout>
  );
};

export default DiscussionThreadPage;
