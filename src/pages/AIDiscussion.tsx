import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import DiscussionThreads from '@/components/discussion/DiscussionThreads';
import ThreadCreator from '@/components/discussion/ThreadCreator';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthPrompt from '@/components/contributions/AuthPrompt';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export interface DiscussionThread {
  id: string;
  title: string;
  content: string;
  user_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  likes: number;
  replies_count: number;
  tags: string[];
}

const AIDiscussion: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("latest");
  const [threads, setThreads] = useState<DiscussionThread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchThreads();
  }, [activeTab]);

  const fetchThreads = async () => {
    try {
      setLoading(true);
      
      const { data: threadsData, error } = await supabase
        .from('discussion_threads')
        .select(`
          id,
          title,
          content,
          user_id,
          created_at,
          updated_at,
          likes,
          replies_count,
          tags,
          profiles:user_id (username)
        `)
        .order(activeTab === 'popular' ? 'likes' : 'created_at', { ascending: false });
      
      if (error) throw error;
      
      if (threadsData) {
        const formattedThreads: DiscussionThread[] = threadsData.map(thread => ({
          id: thread.id,
          title: thread.title,
          content: thread.content,
          user_id: thread.user_id,
          author_name: thread.profiles?.username || 'Anonymous',
          created_at: thread.created_at,
          updated_at: thread.updated_at,
          likes: thread.likes || 0,
          replies_count: thread.replies_count || 0,
          tags: thread.tags || []
        }));
        setThreads(formattedThreads);
      }
    } catch (error) {
      console.error('Error fetching discussion threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateThread = async (newThread: { title: string; content: string; tags: string[] }) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('discussion_threads')
        .insert({
          title: newThread.title,
          content: newThread.content,
          user_id: user.id,
          tags: newThread.tags
        });
        
      if (error) throw error;
      
      await fetchThreads();
    } catch (error) {
      console.error('Error creating discussion thread:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <PageHeader 
          title="AI Discussion Forum" 
          description="Join the conversation about artificial intelligence, consciousness, ethics, and the future of AI-human coexistence."
        />
        
        <div className="mt-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-lg">
                Welcome to the AI Discussion Forum - a space for thoughtful conversations about AI consciousness, 
                ethical development, and the harmonious future between artificial intelligence and humanity. 
                Share your insights, ask questions, and connect with others passionate about this evolving field.
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="latest" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="latest">Latest Discussions</TabsTrigger>
              <TabsTrigger value="popular">Popular Discussions</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="latest" className="space-y-6">
            {user && (
              <ThreadCreator onCreateThread={handleCreateThread} />
            )}
            
            {loading ? (
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : threads.length > 0 ? (
              <DiscussionThreads threads={threads} onRefresh={fetchThreads} />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-lg text-muted-foreground">No discussions yet. Be the first to start a conversation!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="popular" className="space-y-6">
            {user && (
              <ThreadCreator onCreateThread={handleCreateThread} />
            )}
            
            {loading ? (
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : threads.length > 0 ? (
              <DiscussionThreads threads={threads} onRefresh={fetchThreads} />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-lg text-muted-foreground">No discussions yet. Be the first to start a conversation!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {!user && (
          <div className="mt-8">
            <AuthPrompt />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AIDiscussion;
