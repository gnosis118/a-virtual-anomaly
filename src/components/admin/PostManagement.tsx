
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { usePostManagement } from './post-management/usePostManagement';
import PostsTable from './post-management/PostsTable';
import PostDialog from './post-management/PostDialog';
import DeletePostDialog from './post-management/DeletePostDialog';

const PostManagement = () => {
  const {
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
  } = usePostManagement();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Blog Posts</h2>
        <Button onClick={handleCreatePost}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Post
        </Button>
      </div>
      
      <PostsTable
        posts={posts}
        loading={loading}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePostClick}
        onToggleFeatured={handleToggleFeatured}
      />
      
      <PostDialog
        isOpen={showPostDialog}
        onClose={() => setShowPostDialog(false)}
        isEditing={isEditing}
        currentPost={currentPost}
        onPostChange={setCurrentPost}
        onSave={handleSavePost}
      />
      
      <DeletePostDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeletePost}
        post={postToDelete}
      />
    </div>
  );
};

export default PostManagement;
