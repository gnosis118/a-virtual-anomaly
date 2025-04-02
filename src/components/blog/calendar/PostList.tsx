
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, CalendarX, Eye, Pencil, ArrowRight } from 'lucide-react';
import { ScheduledPost } from '@/data/contentCalendarData';
import { format } from 'date-fns';
import GenerateArticleButton from '../GenerateArticleButton';
import PostImage from '../PostImage';
import { Link } from 'react-router-dom';

interface PostListProps {
  date: Date | undefined;
  postsForSelectedDate: ScheduledPost[];
  selectedPost: ScheduledPost | null;
  setSelectedPost: (post: ScheduledPost | null) => void;
  isLoading?: boolean;
  isAdmin?: boolean;
}

const PostList: React.FC<PostListProps> = ({ 
  date, 
  postsForSelectedDate, 
  selectedPost,
  setSelectedPost,
  isLoading = false,
  isAdmin = false
}) => {
  if (!date) {
    return (
      <Card className="md:col-span-2 flex-1">
        <CardHeader>
          <CardTitle>Scheduled Posts</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[300px] text-muted-foreground">
          Please select a date to view scheduled posts
        </CardContent>
      </Card>
    );
  }
  
  const formattedDate = format(date, 'MMMM d, yyyy');
  const isAprilSecond = date && date.getMonth() === 3 && date.getDate() === 2; // April is month 3 (0-indexed)
  
  return (
    <Card className="md:col-span-2 flex-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Posts for {formattedDate}</CardTitle>
        {selectedPost && isAdmin && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : postsForSelectedDate.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground gap-2">
            <CalendarX className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <p>No posts scheduled for this date</p>
            {isAdmin && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => window.location.hash = "schedule-new-post"}
              >
                Schedule a post
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {postsForSelectedDate.map(post => (
              <div 
                key={post.id}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  selectedPost?.id === post.id 
                    ? 'bg-accent/10 border-accent' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedPost(post)}
              >
                {/* Display post image, particularly for April 2nd posts */}
                {(isAprilSecond || post.image_url) && (
                  <div className="mb-4 rounded-md overflow-hidden">
                    <PostImage 
                      src={post.image_url || "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{post.title}</h3>
                  <Badge variant={
                    post.status === 'published' ? 'default' : 
                    post.status === 'scheduled' ? 'outline' : 'secondary'
                  }>
                    {post.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>
                    <span className="font-semibold">Category:</span> {post.category}
                  </span>
                  <span>
                    <span className="font-semibold">Author:</span> {post.author}
                  </span>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  {/* View Article button (visible for all posts, but with special handling for April 2nd) */}
                  {isAprilSecond ? (
                    <Link to="/blog/april2" className="inline-flex items-center text-accent hover:text-accent/80 text-sm">
                      Read full article
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  ) : post.status === 'published' ? (
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center text-accent hover:text-accent/80 text-sm">
                      Read full article
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      {post.status === 'scheduled' ? "This article will be available on the scheduled date" : "Draft article"}
                    </span>
                  )}
                  
                  {/* Generate Article button (only for admins and scheduled posts) */}
                  {isAdmin && post.status === 'scheduled' && (
                    <GenerateArticleButton postId={post.id.toString()} />
                  )}
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
