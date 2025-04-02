
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck2, EditIcon, ChevronRight, RotateCw } from "lucide-react";
import { format } from "date-fns";
import { ScheduledPost } from '@/data/contentCalendarData';

interface PostListProps {
  date: Date | undefined;
  postsForSelectedDate: ScheduledPost[];
  selectedPost: ScheduledPost | null;
  setSelectedPost: (post: ScheduledPost | null) => void;
  isLoading: boolean;
}

const PostList: React.FC<PostListProps> = ({
  date,
  postsForSelectedDate,
  selectedPost,
  setSelectedPost,
  isLoading
}) => {
  if (!date) {
    return (
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Select a date to see scheduled posts</p>
        </CardContent>
      </Card>
    );
  }
  
  const formattedDate = format(date, 'MMMM d, yyyy');
  
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck2 className="h-5 w-5 text-muted-foreground" />
          Posts for {formattedDate}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <RotateCw className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading posts...</span>
          </div>
        ) : postsForSelectedDate.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center">No posts scheduled for this date</p>
        ) : (
          <div className="space-y-4">
            {postsForSelectedDate.map((post) => (
              <div 
                key={post.id}
                className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                  selectedPost?.id === post.id 
                    ? 'bg-accent/10 border-accent' 
                    : 'hover:bg-muted/50 border-border'
                }`}
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-base">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {post.excerpt}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : post.status === 'scheduled' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {post.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostList;
