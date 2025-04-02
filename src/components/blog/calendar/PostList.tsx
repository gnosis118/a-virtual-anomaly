
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScheduledPost } from '@/data/contentCalendarData';
import { CalendarClock, RotateCw } from 'lucide-react';

interface PostListProps {
  date: Date | undefined;
  postsForSelectedDate: ScheduledPost[];
  selectedPost: ScheduledPost | null;
  setSelectedPost: (post: ScheduledPost | null) => void;
  isLoading?: boolean;
}

const PostList: React.FC<PostListProps> = ({ 
  date, 
  postsForSelectedDate, 
  selectedPost, 
  setSelectedPost,
  isLoading = false
}) => {
  if (!date) {
    return (
      <Card className="md:col-span-2 h-full">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Please select a date to view scheduled posts.
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <Card className="md:col-span-2 h-full">
      <CardHeader>
        <CardTitle>Posts for {formattedDate}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
          {postsForSelectedDate.length === 0 
            ? "No content scheduled for this date" 
            : `${postsForSelectedDate.length} post${postsForSelectedDate.length > 1 ? 's' : ''} scheduled`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <RotateCw className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading posts...</span>
          </div>
        ) : (
          postsForSelectedDate.length === 0 ? (
            <div className="bg-muted/50 rounded-md p-4 text-center text-muted-foreground">
              No content scheduled for this date. Use the "Schedule New Post" form below to add content.
            </div>
          ) : (
            <div className="space-y-4">
              {postsForSelectedDate.map((post) => (
                <div
                  key={post.id}
                  className={`border rounded-md p-4 cursor-pointer transition-all ${
                    selectedPost?.id === post.id
                      ? "border-accent bg-accent/5"
                      : "hover:border-accent/50"
                  }`}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        {post.tags.split(',').map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Badge 
                      variant={
                        post.status === 'published' ? 'default' : 
                        post.status === 'scheduled' ? 'outline' : 
                        'secondary'
                      }
                    >
                      {post.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default PostList;
