
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Star, StarOff } from 'lucide-react';
import { ScheduledPost } from '@/lib/database-types';

interface PostsTableProps {
  posts: ScheduledPost[];
  loading: boolean;
  onEditPost: (post: ScheduledPost) => void;
  onDeletePost: (post: ScheduledPost) => void;
  onToggleFeatured: (post: ScheduledPost) => void;
}

const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  loading,
  onEditPost,
  onDeletePost,
  onToggleFeatured
}) => {
  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Publish Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No posts found. Create one to get started.
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <span className={`
                    px-2 py-1 rounded text-xs
                    ${post.status === 'published' ? 'bg-green-100 text-green-800' : ''}
                    ${post.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
                    ${post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                    ${post.status === 'featured' ? 'bg-purple-100 text-purple-800' : ''}
                  `}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{new Date(post.publishdate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onEditPost(post)}
                      title="Edit post"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    
                    {post.status === 'published' || post.status === 'featured' ? (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onToggleFeatured(post)}
                        title={post.status === 'featured' ? 'Remove from featured' : 'Add to featured'}
                      >
                        {post.status === 'featured' ? (
                          <StarOff className="h-4 w-4" />
                        ) : (
                          <Star className="h-4 w-4" />
                        )}
                      </Button>
                    ) : null}
                    
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => onDeletePost(post)}
                      title="Delete post"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
