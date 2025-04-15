
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPost } from '@/types/blog';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface RecentPostsProps {
  posts: BlogPost[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Recent Posts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64 px-6">
          <div className="space-y-4 pr-4 pb-6">
            {posts.slice(0, 5).map(post => (
              <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-3 py-2 group cursor-pointer">
                <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback in case the image doesn't load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80";
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentPosts;
