
import React, { useState } from 'react';
import { ScheduledPost, getPostsForDate, daysWithPosts } from '@/data/contentCalendarData';
import CalendarView from './calendar/CalendarView';
import PostList from './calendar/PostList';
import AutoPublishSettings from './AutoPublishSettings';

const ContentCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  
  // Find posts scheduled for the selected date
  const postsForSelectedDate = getPostsForDate(date);
  
  return (
    <div className="space-y-6">
      {/* Auto-Publishing Settings Component */}
      <AutoPublishSettings />
      
      {/* Calendar and Post List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CalendarView 
          date={date}
          setDate={setDate}
          daysWithPosts={daysWithPosts}
        />
        
        <PostList 
          date={date}
          postsForSelectedDate={postsForSelectedDate}
          setSelectedPost={setSelectedPost}
          selectedPost={selectedPost}
        />
      </div>
    </div>
  );
};

export default ContentCalendar;
