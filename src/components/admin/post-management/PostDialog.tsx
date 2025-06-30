
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduledPost } from '@/lib/database-types';

interface PostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  currentPost: ScheduledPost;
  onPostChange: (post: ScheduledPost) => void;
  onSave: () => void;
}

const PostDialog: React.FC<PostDialogProps> = ({
  isOpen,
  onClose,
  isEditing,
  currentPost,
  onPostChange,
  onSave
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Post' : 'Create New Post'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4">
              <label htmlFor="title" className="text-sm font-medium mb-1 block">
                Title <span className="text-destructive">*</span>
              </label>
              <Input
                id="title"
                value={currentPost.title}
                onChange={(e) => onPostChange({...currentPost, title: e.target.value})}
              />
            </div>
            
            <div className="col-span-4">
              <label htmlFor="excerpt" className="text-sm font-medium mb-1 block">
                Excerpt <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="excerpt"
                value={currentPost.excerpt}
                onChange={(e) => onPostChange({...currentPost, excerpt: e.target.value})}
                rows={2}
              />
            </div>
            
            <div className="col-span-4">
              <label htmlFor="content" className="text-sm font-medium mb-1 block">
                Content
              </label>
              <Textarea
                id="content"
                value={currentPost.content || ''}
                onChange={(e) => onPostChange({...currentPost, content: e.target.value})}
                rows={8}
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="author" className="text-sm font-medium mb-1 block">
                Author
              </label>
              <Input
                id="author"
                value={currentPost.author || ''}
                onChange={(e) => onPostChange({...currentPost, author: e.target.value})}
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="category" className="text-sm font-medium mb-1 block">
                Category
              </label>
              <Input
                id="category"
                value={currentPost.category || ''}
                onChange={(e) => onPostChange({...currentPost, category: e.target.value})}
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="tags" className="text-sm font-medium mb-1 block">
                Tags (comma separated)
              </label>
              <Input
                id="tags"
                value={currentPost.tags || ''}
                onChange={(e) => onPostChange({...currentPost, tags: e.target.value})}
                placeholder="e.g. AI,ethics,technology"
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="status" className="text-sm font-medium mb-1 block">
                Status
              </label>
              <Select
                value={currentPost.status}
                onValueChange={(value) => onPostChange({...currentPost, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-2">
              <label htmlFor="publishdate" className="text-sm font-medium mb-1 block">
                Publish Date
              </label>
              <Input
                id="publishdate"
                type="date"
                value={currentPost.publishdate}
                onChange={(e) => onPostChange({...currentPost, publishdate: e.target.value})}
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="image" className="text-sm font-medium mb-1 block">
                Featured Image URL
              </label>
              <Input
                id="image"
                type="url"
                value={currentPost.image_url || ''}
                onChange={(e) => onPostChange({...currentPost, image_url: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
