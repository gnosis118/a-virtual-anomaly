
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Button from '@/components/Button';
import { Input } from "@/components/ui/input";
import { BlogPost } from '@/types/blog';

interface BlogSidebarProps {
  posts: BlogPost[];
  allTags: string[];
  onTagSelect: (tag: string) => void;
}

const BlogSidebar = ({ 
  posts, 
  allTags, 
  onTagSelect 
}: BlogSidebarProps) => {
  return (
    <div className="sticky top-24 space-y-8">
      {/* Recent Posts - Now positioned at the top where categories used to be */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64 px-6">
            <div className="space-y-4 pr-4 pb-6">
              {posts.slice(0, 5).map(post => (
                <div key={post.id} className="flex gap-3 py-2 group cursor-pointer">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {post.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Button 
                key={tag}
                variant="secondary"
                size="sm"
                onClick={() => onTagSelect(tag)}
                className="mb-2 text-xs"
              >
                #{tag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Newsletter Signup */}
      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-xl">Join Our Newsletter</CardTitle>
          <CardDescription>
            Get the latest insights on AI consciousness and ethics delivered to your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Your email address" type="email" required />
            <Button variant="primary" type="submit" fullWidth>
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Join the Conversation CTA */}
      <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3">Join the Conversation</h3>
          <p className="text-muted-foreground mb-4">
            Have thoughts on AI consciousness? Share your perspective and contribute to this important dialogue.
          </p>
          <Button 
            variant="primary" 
            href="/join"
            fullWidth
          >
            Get Involved
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
