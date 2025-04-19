
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  UploadCloud,
  X,
  Image,
  File,
  Copy,
  Check,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

type FileObject = {
  name: string;
  id: string;
  metadata: {
    size: number;
    mimetype: string;
  };
  updated_at: string;
  created_at: string;
};

const MediaManager = () => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileObject | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const bucketName = 'media';

  useEffect(() => {
    checkAndCreateBucket();
    fetchFiles();
  }, []);

  const checkAndCreateBucket = async () => {
    try {
      // Check if bucket exists
      const { data: buckets, error: listError } = await supabase
        .storage
        .listBuckets();
        
      if (listError) throw listError;
      
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      
      if (!bucketExists) {
        // Create bucket if it doesn't exist
        const { error: createError } = await supabase
          .storage
          .createBucket(bucketName, {
            public: true,
          });
          
        if (createError) throw createError;
        
        console.log(`Created bucket: ${bucketName}`);
      }
    } catch (error) {
      console.error('Error checking/creating bucket:', error);
      toast({
        title: 'Error',
        description: 'Failed to initialize storage bucket.',
        variant: 'destructive',
      });
    }
  };

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .storage
        .from(bucketName)
        .list();

      if (error) throw error;
      
      if (data) {
        // Filter out folder objects
        const fileObjects = data.filter(item => !item.id.endsWith('/'));
        setFiles(fileObjects);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        title: 'Error',
        description: 'Failed to load media files.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    setUploading(true);
    
    try {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      const { error } = await supabase
        .storage
        .from(bucketName)
        .upload(fileName, file);
        
      if (error) throw error;
      
      toast({
        title: 'Upload successful',
        description: 'File has been uploaded successfully.',
      });
      
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload failed',
        description: `Failed to upload file: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      // Reset the input value to allow uploading the same file again
      e.target.value = '';
    }
  };
  
  const handleDeleteFile = async () => {
    if (!selectedFile) return;
    
    try {
      const { error } = await supabase
        .storage
        .from(bucketName)
        .remove([selectedFile.name]);
        
      if (error) throw error;
      
      toast({
        title: 'File deleted',
        description: 'The file has been deleted successfully.',
      });
      
      fetchFiles();
      setShowDeleteDialog(false);
      setSelectedFile(null);
      setShowFileDialog(false);
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: 'Deletion failed',
        description: `Failed to delete file: ${error.message}`,
        variant: 'destructive',
      });
    }
  };
  
  const handleViewFile = async (file: FileObject) => {
    setSelectedFile(file);
    
    try {
      const { data } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(file.name);
        
      setPreviewUrl(data.publicUrl);
      setShowFileDialog(true);
    } catch (error) {
      console.error('Error getting file URL:', error);
      toast({
        title: 'Error',
        description: 'Failed to retrieve file URL.',
        variant: 'destructive',
      });
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error('Failed to copy URL:', err);
        toast({
          title: 'Copy failed',
          description: 'Failed to copy URL to clipboard.',
          variant: 'destructive',
        });
      }
    );
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };
  
  const isImageFile = (mimetype: string) => {
    return mimetype.startsWith('image/');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Media Library</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={fetchFiles}
            className="relative"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button 
            as="label"
            htmlFor="file-upload"
            className="relative cursor-pointer"
            disabled={uploading}
          >
            <UploadCloud className="h-4 w-4 mr-1" />
            {uploading ? 'Uploading...' : 'Upload File'}
            <Input 
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 w-full cursor-pointer"
              disabled={uploading}
            />
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : files.length === 0 ? (
        <div className="border border-dashed rounded-lg p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <UploadCloud className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No files uploaded</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload images and other files to use in your blog posts.
          </p>
          <Button 
            as="label"
            htmlFor="file-upload-empty"
            variant="secondary"
            className="relative cursor-pointer"
            disabled={uploading}
          >
            <UploadCloud className="h-4 w-4 mr-1" />
            Upload your first file
            <Input 
              id="file-upload-empty"
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 w-full cursor-pointer"
              disabled={uploading}
            />
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="relative border rounded-md overflow-hidden hover:border-primary transition-colors"
              onClick={() => handleViewFile(file)}
            >
              <div className="aspect-square flex items-center justify-center bg-muted">
                {isImageFile(file.metadata.mimetype) ? (
                  <img
                    src={supabase.storage.from(bucketName).getPublicUrl(file.name).data.publicUrl}
                    alt={file.name}
                    className="max-h-full max-w-full object-cover"
                  />
                ) : (
                  <File className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-medium truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.metadata.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* File Details Dialog */}
      <Dialog open={showFileDialog} onOpenChange={setShowFileDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>
          
          {selectedFile && (
            <>
              <div className="flex justify-center my-4 bg-muted rounded-md p-4">
                {isImageFile(selectedFile.metadata.mimetype) && previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={selectedFile.name}
                    className="max-h-64 max-w-full object-contain"
                  />
                ) : (
                  <File className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Filename</p>
                  <p className="text-sm bg-muted p-2 rounded-md break-all">
                    {selectedFile.name}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">File URL</p>
                  <div className="flex">
                    <Input
                      readOnly
                      value={previewUrl || ''}
                      className="text-xs font-mono"
                    />
                    <Button 
                      variant="secondary"
                      size="sm"
                      className="ml-2 w-10"
                      onClick={() => previewUrl && copyToClipboard(previewUrl)}
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Size</p>
                    <p className="text-sm">{formatFileSize(selectedFile.metadata.size)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Type</p>
                    <p className="text-sm">{selectedFile.metadata.mimetype}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Uploaded</p>
                  <p className="text-sm">
                    {new Date(selectedFile.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </>
          )}
          
          <DialogFooter className="sm:justify-between">
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(true);
                setShowFileDialog(false);
              }}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button variant="outline" onClick={() => setShowFileDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the file "{selectedFile?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFile}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MediaManager;
