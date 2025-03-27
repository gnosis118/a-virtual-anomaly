
import React from 'react';
import { BlogPost } from '@/types/blog';
import RecentPosts from './sidebar/RecentPosts';
import PopularTags from './sidebar/PopularTags';
import NewsletterSignup from './sidebar/NewsletterSignup';
import JoinConversation from './sidebar/JoinConversation';

interface BlogSidebarProps {
  posts: BlogPost[];
  allTags: string[];
  onTagSelect: (tag: string) => void;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ 
  posts, 
  allTags, 
  onTagSelect 
}) => {
  return (
    <div className="sticky top-24 space-y-8">
      {/* Recent Posts */}
      <RecentPosts posts={posts} />
      
      {/* Popular Tags */}
      <PopularTags tags={allTags} onTagSelect={onTagSelect} />
      
      {/* Newsletter Signup */}
      <NewsletterSignup />
      
      {/* Join the Conversation CTA */}
      <JoinConversation />
    </div>
  );
};

export default BlogSidebar;
