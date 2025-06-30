
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";
import { ScheduledPost } from '@/lib/database-types';

export const usePostManagement = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [postToDelete, setPostToDelete] = useState<ScheduledPost | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPostDialog, setShowPostDialog] = useState(false);
  
  const [currentPost, setCurrentPost] = useState<ScheduledPost>({
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

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
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
  
  const handleEditPost = (post: ScheduledPost) => {
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
        const { error } = await (supabase as any)
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
        const { error } = await (supabase as any)
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
      const { error } = await (supabase as any)
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
  
  const handleToggleFeatured = async (post: ScheduledPost) => {
    try {
      const newStatus = post.status === 'published' ? 'featured' : 'published';
      
      const { error } = await (supabase as any)
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

  const handleDeletePostClick = (post: ScheduledPost) => {
    setPostToDelete(post);
    setShowDeleteDialog(true);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    isEditing,
    currentPost,
    showPostDialog,
    showDeleteDialog,
    postToDelete,
    setCurrentPost,
    handleCreatePost,
    handleEditPost,
    handleSavePost,
    handleDeletePost,
    handleToggleFeatured,
    handleDeletePostClick,
    setShowPostDialog,
    setShowDeleteDialog
  };
};
