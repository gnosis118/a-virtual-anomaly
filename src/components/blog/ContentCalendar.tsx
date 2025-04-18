import React, { useState, useEffect } from 'react';
import { ScheduledPost, getPostsForDate, getDaysWithPosts, daysWithPosts as fallbackDays } from '@/data/contentCalendarData';
import CalendarView from './calendar/CalendarView';
import PostList from './calendar/PostList';
import AutoPublishSettings from './AutoPublishSettings';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';
import { generateAllScheduledContent } from './handlers';

const ContentCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [postsForSelectedDate, setPostsForSelectedDate] = useState<ScheduledPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [activeDays, setActiveDays] = useState<Date[]>(fallbackDays);
  const [loadingDays, setLoadingDays] = useState(false);
  const [processedToday, setProcessedToday] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchDaysWithPosts = async () => {
      setLoadingDays(true);
      try {
        console.log('Fetching days with posts...');
        const days = await getDaysWithPosts();
        console.log('Days with posts:', days);
        if (days && days.length > 0) {
          setActiveDays(days);
        } else {
          console.log('Using fallback days');
          setActiveDays(fallbackDays);
        }
      } catch (error) {
        console.error('Error fetching days with posts:', error);
        setActiveDays(fallbackDays);
      } finally {
        setLoadingDays(false);
      }
    };
    
    fetchDaysWithPosts();
  }, []);
  
  useEffect(() => {
    const fetchPosts = async () => {
      if (!date) return;
      
      setLoadingPosts(true);
      try {
        console.log('Fetching posts for date:', date);
        const posts = await getPostsForDate(date);
        console.log('Posts for date:', posts);
        setPostsForSelectedDate(posts);
        if (selectedPost && !posts.find(p => p.id === selectedPost.id)) {
          setSelectedPost(null);
        }
      } catch (error) {
        console.error('Error fetching posts for date:', error);
        setPostsForSelectedDate([]);
      } finally {
        setLoadingPosts(false);
      }
    };
    
    fetchPosts();
  }, [date, selectedPost]);
  
  useEffect(() => {
    if (processedToday || !user) return;
    
    const checkScheduledPosts = async () => {
      try {
        const today = new Date('2025-04-15');
        
        const { data: scheduledPosts, error } = await supabase
          .from('scheduled_posts')
          .select('*')
          .eq('status', 'scheduled')
          .lte('publishdate', today.toISOString().split('T')[0]);
          
        if (error) {
          console.error('Error fetching scheduled posts:', error);
          return;
        }
        
        if (scheduledPosts && scheduledPosts.length > 0) {
          console.log(`Found ${scheduledPosts.length} posts to process`);
          
          for (const post of scheduledPosts) {
            console.log(`Processing post: ${post.id}`);
            const { data, error: generateError } = await supabase.functions.invoke('generate-blog-content', {
              body: { postId: post.id }
            });
            
            if (generateError) {
              console.error(`Error generating content for post ${post.id}:`, generateError);
              continue;
            }
            
            console.log(`Successfully generated content for post ${post.id}`);
          }
          
          const days = await getDaysWithPosts();
          if (days && days.length > 0) {
            setActiveDays(days);
          }
          
          if (date) {
            const posts = await getPostsForDate(date);
            setPostsForSelectedDate(posts);
          }
          
          toast({
            title: "Articles Generated",
            description: `${scheduledPosts.length} scheduled articles have been generated and published.`,
          });
        }
        
        setProcessedToday(true);
      } catch (error) {
        console.error('Error in checkScheduledPosts:', error);
      }
    };
    
    checkScheduledPosts();
  }, [user, processedToday, date, setActiveDays, setPostsForSelectedDate]);
  
  return (
    <div className="space-y-6">
      {user && <AutoPublishSettings />}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CalendarView 
          date={date}
          setDate={setDate}
          daysWithPosts={activeDays}
          isLoading={loadingDays}
        />
        
        <PostList 
          date={date}
          postsForSelectedDate={postsForSelectedDate}
          setSelectedPost={setSelectedPost}
          selectedPost={selectedPost}
          isLoading={loadingPosts}
          isAdmin={!!user}
        />
      </div>
    </div>
  );
};

export default ContentCalendar;
