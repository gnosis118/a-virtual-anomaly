
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';
import { ScheduledPost } from '@/data/contentCalendarData';

interface PostListProps {
  date: Date | undefined;
  postsForSelectedDate: ScheduledPost[];
  setSelectedPost: (post: ScheduledPost | null) => void;
  selectedPost: ScheduledPost | null;
}

const PostList: React.FC<PostListProps> = ({ 
  date, 
  postsForSelectedDate, 
  setSelectedPost,
  selectedPost 
}) => {
  return (
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
  );
};

export default PostList;
