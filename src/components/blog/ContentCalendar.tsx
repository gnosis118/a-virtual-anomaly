
import React, { useState, useEffect } from 'react';
import { ScheduledPost, getPostsForDate, getDaysWithPosts, daysWithPosts as fallbackDays } from '@/data/contentCalendarData';
import CalendarView from './calendar/CalendarView';
import PostList from './calendar/PostList';
import AutoPublishSettings from './AutoPublishSettings';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContentCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [postsForSelectedDate, setPostsForSelectedDate] = useState<ScheduledPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [activeDays, setActiveDays] = useState<Date[]>(fallbackDays);
  const [loadingDays, setLoadingDays] = useState(false);
  const [processedToday, setProcessedToday] = useState(false);
  
  // Fetch days with posts on component mount
  useEffect(() => {
    const fetchDaysWithPosts = async () => {
      setLoadingDays(true);
      try {
        const days = await getDaysWithPosts();
        if (days && days.length > 0) {
          setActiveDays(days);
        }
      } catch (error) {
        console.error('Error fetching days with posts:', error);
      } finally {
        setLoadingDays(false);
      }
    };
    
    fetchDaysWithPosts();
  }, []);
  
  // Fetch posts when the selected date changes
  useEffect(() => {
    const fetchPosts = async () => {
      if (!date) return;
      
      setLoadingPosts(true);
      try {
        const posts = await getPostsForDate(date);
        setPostsForSelectedDate(posts);
        // Reset selected post if it's not in the new list
        if (selectedPost && !posts.find(p => p.id === selectedPost.id)) {
          setSelectedPost(null);
        }
      } catch (error) {
        console.error('Error fetching posts for date:', error);
      } finally {
        setLoadingPosts(false);
      }
    };
    
    fetchPosts();
  }, [date, selectedPost]);
  
  // Check for scheduled posts that need to be published automatically
  useEffect(() => {
    // Only run this check once per component mount
    if (processedToday) return;
    
    const checkScheduledPosts = async () => {
      try {
        // Checks if auto-publish is enabled
        const { data: settingsData, error: settingsError } = await supabase
          .from('settings')
          .select('*')
          .eq('key', 'auto_publish')
          .single();
        
        if (settingsError) {
          console.error('Error fetching auto-publish setting:', settingsError);
          return;
        }
        
        const autoPublishEnabled = settingsData?.value === true || settingsData?.value === 'true';
        
        if (!autoPublishEnabled) {
          console.log('Auto-publish is disabled, skipping scheduled post check');
          return;
        }
        
        console.log('Checking for scheduled posts to publish...');
        const { data, error } = await supabase.functions.invoke('generate-scheduled-post');
        
        if (error) {
          console.error('Error invoking generate-scheduled-post function:', error);
          return;
        }
        
        if (data && data.success) {
          const processedCount = data.results?.length || 0;
          
          if (processedCount > 0) {
            toast({
              title: "Posts automatically published",
              description: `${processedCount} scheduled posts have been generated and published.`,
            });
            
            // Refresh the calendar days to reflect the new published posts
            const days = await getDaysWithPosts();
            if (days && days.length > 0) {
              setActiveDays(days);
            }
            
            // If current date has posts, refresh them
            if (date) {
              const posts = await getPostsForDate(date);
              setPostsForSelectedDate(posts);
            }
          } else {
            console.log('No posts needed to be published today');
          }
        }
        
        // Mark as processed so we don't run this again in this session
        setProcessedToday(true);
      } catch (error) {
        console.error('Error in automatic post publishing:', error);
      }
    };
    
    // Run the check when the component mounts
    checkScheduledPosts();
  }, [date, processedToday]);
  
  return (
    <div className="space-y-6">
      {/* Auto-Publishing Settings Component */}
      <AutoPublishSettings />
      
      {/* Calendar and Post List */}
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
        />
      </div>
    </div>
  );
};

export default ContentCalendar;
