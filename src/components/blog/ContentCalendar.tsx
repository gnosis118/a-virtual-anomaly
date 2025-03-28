
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck2, FileText } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { BLOG_POSTS } from '@/data/blogData';

interface ScheduledPost extends BlogPost {
  publishDate: Date;
  status: 'draft' | 'scheduled' | 'published';
}

// For demo purposes, we'll convert some existing blog posts to scheduled posts
const scheduledPosts: ScheduledPost[] = BLOG_POSTS.slice(0, 4).map((post, index) => {
  // Create dates for the next few days
  const today = new Date();
  const publishDate = new Date(today);
  publishDate.setDate(today.getDate() + index + 1); // Schedule for upcoming days
  
  return {
    ...post,
    publishDate,
    status: index === 0 ? 'scheduled' : 'draft'
  };
});

const ContentCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  
  // Find posts scheduled for the selected date
  const getPostsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return scheduledPosts.filter(post => {
      const postDate = new Date(post.publishDate);
      return postDate.getDate() === date.getDate() && 
             postDate.getMonth() === date.getMonth() && 
             postDate.getFullYear() === date.getFullYear();
    });
  };
  
  // Days with scheduled posts
  const daysWithPosts = scheduledPosts.map(post => new Date(post.publishDate));
  
  const postsForSelectedDate = getPostsForDate(date);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck2 className="h-5 w-5 text-accent" />
            Content Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              scheduled: daysWithPosts,
            }}
            modifiersStyles={{
              scheduled: { 
                fontWeight: 'bold',
                backgroundColor: 'rgba(var(--accent) / 0.1)',
                color: 'var(--accent)',
              }
            }}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent/30"></div>
              <span>Days with scheduled content</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            {date ? (
              <>Scheduled Posts for {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</>
            ) : (
              <>Select a date to view scheduled posts</>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {postsForSelectedDate.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No posts scheduled for this date
            </div>
          ) : (
            <div className="space-y-4">
              {postsForSelectedDate.map((post) => (
                <div
                  key={post.id}
                  className="p-4 border border-border rounded-lg hover:bg-accent/5 cursor-pointer transition-colors"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{post.title}</h3>
                    <Badge variant={post.status === 'published' ? "default" : post.status === 'scheduled' ? "outline" : "secondary"}>
                      {post.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <span>Author: {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>Category: {post.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {selectedPost && (
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium mb-2">Post Details</h3>
              <div className="text-sm">
                <p><strong>Title:</strong> {selectedPost.title}</p>
                <p><strong>Author:</strong> {selectedPost.author}</p>
                <p><strong>Category:</strong> {selectedPost.category}</p>
                <p><strong>Status:</strong> {selectedPost.status}</p>
                <p><strong>Scheduled for:</strong> {selectedPost.publishDate.toLocaleString()}</p>
                <div className="mt-2">
                  <p><strong>Excerpt:</strong></p>
                  <p className="text-muted-foreground">{selectedPost.excerpt}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCalendar;
