
import React from 'react';
import { BlogPost } from '@/types/blog';
import { Calendar } from 'lucide-react';
import { slugify } from '@/utils/slugify';

interface RecentPostsProps {
  posts: BlogPost[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  const recentPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
    
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {recentPosts.map(post => (
          <div key={post.id} className="flex gap-3 group">
            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
              <a href={`/blog/${slugify(post.title)}`}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback in case the image doesn't load
                    e.currentTarget.src = "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80";
                  }}
                />
              </a>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors">
                <a href={`/blog/${slugify(post.title)}`}>{post.title}</a>
              </h4>
              <div className="flex items-center mt-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground ml-1">{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
