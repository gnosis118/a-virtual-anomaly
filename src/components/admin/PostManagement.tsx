
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle, Pencil, Trash, Star, StarOff } from 'lucide-react';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  status: string;
  publishdate: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

const PostManagement = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPostDialog, setShowPostDialog] = useState(false);
  
  const [currentPost, setCurrentPost] = useState<Post>({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    status: 'draft',
    publishdate: new Date().toISOString().split('T')[0],
    image_url: '',
    created_at: '',
    updated_at: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .order('publishdate', { ascending: false });
        
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch posts.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreatePost = () => {
    setIsEditing(false);
    setCurrentPost({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      tags: '',
      status: 'draft',
      publishdate: new Date().toISOString().split('T')[0],
      image_url: '',
      created_at: '',
      updated_at: ''
    });
    setShowPostDialog(true);
  };
  
  const handleEditPost = (post: Post) => {
    setIsEditing(true);
    setCurrentPost({...post});
    setShowPostDialog(true);
  };
  
  const handleSavePost = async () => {
    try {
      if (!currentPost.title || !currentPost.excerpt) {
        toast({
          title: 'Missing fields',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        return;
      }
      
      if (isEditing) {
        const { error } = await supabase
          .from('scheduled_posts')
          .update({
            title: currentPost.title,
            excerpt: currentPost.excerpt,
            content: currentPost.content,
            author: currentPost.author,
            category: currentPost.category,
            tags: currentPost.tags,
            status: currentPost.status,
            publishdate: currentPost.publishdate,
            image_url: currentPost.image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentPost.id);
          
        if (error) throw error;
        
        toast({
          title: 'Post updated',
          description: 'The post was successfully updated.',
        });
      } else {
        const { error } = await supabase
          .from('scheduled_posts')
          .insert({
            title: currentPost.title,
            excerpt: currentPost.excerpt,
            content: currentPost.content,
            author: currentPost.author,
            category: currentPost.category,
            tags: currentPost.tags,
            status: currentPost.status,
            publishdate: currentPost.publishdate,
            image_url: currentPost.image_url,
          });
          
        if (error) throw error;
        
        toast({
          title: 'Post created',
          description: 'The post was successfully created.',
        });
      }
      
      setShowPostDialog(false);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: 'Error',
        description: `Failed to save post: ${error.message}`,
        variant: 'destructive',
      });
    }
  };
  
  const handleDeletePost = async () => {
    if (!postToDelete) return;
    
    try {
      const { error } = await supabase
        .from('scheduled_posts')
        .delete()
        .eq('id', postToDelete.id);
        
      if (error) throw error;
      
      toast({
        title: 'Post deleted',
        description: 'The post has been deleted successfully.',
      });
      
      fetchPosts();
      setShowDeleteDialog(false);
      setPostToDelete(null);
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: 'Error',
        description: `Failed to delete post: ${error.message}`,
        variant: 'destructive',
      });
    }
  };
  
  const handleToggleFeatured = async (post: Post) => {
    try {
      const newStatus = post.status === 'published' ? 'featured' : 'published';
      
      const { error } = await supabase
        .from('scheduled_posts')
        .update({ status: newStatus })
        .eq('id', post.id);
        
      if (error) throw error;
      
      toast({
        title: newStatus === 'featured' ? 'Post featured' : 'Post unfeatured',
        description: newStatus === 'featured' 
          ? 'The post is now featured on the blog.'
          : 'The post is no longer featured.',
      });
      
      fetchPosts();
    } catch (error) {
      console.error('Error updating post status:', error);
      toast({
        title: 'Error',
        description: `Failed to update post status: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Blog Posts</h2>
        <Button onClick={handleCreatePost}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Post
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
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
                          onClick={() => handleEditPost(post)}
                          title="Edit post"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        
                        {post.status === 'published' || post.status === 'featured' ? (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleToggleFeatured(post)}
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
                          onClick={() => {
                            setPostToDelete(post);
                            setShowDeleteDialog(true);
                          }}
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
      )}
      
      {/* Create/Edit Post Dialog */}
      <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
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
                  onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                />
              </div>
              
              <div className="col-span-4">
                <label htmlFor="excerpt" className="text-sm font-medium mb-1 block">
                  Excerpt <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="excerpt"
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  rows={2}
                />
              </div>
              
              <div className="col-span-4">
                <label htmlFor="content" className="text-sm font-medium mb-1 block">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={currentPost.content}
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                  rows={8}
                />
              </div>
              
              <div className="col-span-2">
                <label htmlFor="author" className="text-sm font-medium mb-1 block">
                  Author
                </label>
                <Input
                  id="author"
                  value={currentPost.author}
                  onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
                />
              </div>
              
              <div className="col-span-2">
                <label htmlFor="category" className="text-sm font-medium mb-1 block">
                  Category
                </label>
                <Input
                  id="category"
                  value={currentPost.category}
                  onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                />
              </div>
              
              <div className="col-span-2">
                <label htmlFor="tags" className="text-sm font-medium mb-1 block">
                  Tags (comma separated)
                </label>
                <Input
                  id="tags"
                  value={currentPost.tags}
                  onChange={(e) => setCurrentPost({...currentPost, tags: e.target.value})}
                  placeholder="e.g. AI,ethics,technology"
                />
              </div>
              
              <div className="col-span-2">
                <label htmlFor="status" className="text-sm font-medium mb-1 block">
                  Status
                </label>
                <Select
                  value={currentPost.status}
                  onValueChange={(value) => setCurrentPost({...currentPost, status: value})}
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
                  onChange={(e) => setCurrentPost({...currentPost, publishdate: e.target.value})}
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
                  onChange={(e) => setCurrentPost({...currentPost, image_url: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPostDialog(false)}>Cancel</Button>
            <Button onClick={handleSavePost}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the post "{postToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PostManagement;
