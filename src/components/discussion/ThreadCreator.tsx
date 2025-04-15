
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface ThreadCreatorProps {
  onCreateThread: (thread: { title: string; content: string; tags: string[] }) => void;
}

const ThreadCreator: React.FC<ThreadCreatorProps> = ({ onCreateThread }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide both a title and content for your thread.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formattedTags = tags
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(Boolean);
        
      await onCreateThread({
        title: title.trim(),
        content: content.trim(),
        tags: formattedTags,
      });
      
      setTitle('');
      setContent('');
      setTags('');
      
      toast({
        title: 'Thread created',
        description: 'Your discussion thread has been posted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create thread. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start a New Discussion</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Thread title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Share your thoughts, questions or insights about AI..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px]"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Tags (comma separated, e.g. ethics, consciousness, future)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className="ml-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Post Discussion'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ThreadCreator;
