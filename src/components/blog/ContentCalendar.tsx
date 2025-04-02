
import React, { useState, useEffect } from 'react';
import { ScheduledPost, getPostsForDate, getDaysWithPosts, daysWithPosts as fallbackDays } from '@/data/contentCalendarData';
import CalendarView from './calendar/CalendarView';
import PostList from './calendar/PostList';
import AutoPublishSettings from './AutoPublishSettings';

const ContentCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [postsForSelectedDate, setPostsForSelectedDate] = useState<ScheduledPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [activeDays, setActiveDays] = useState<Date[]>(fallbackDays);
  const [loadingDays, setLoadingDays] = useState(false);
  
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
  }, [date]);
  
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
