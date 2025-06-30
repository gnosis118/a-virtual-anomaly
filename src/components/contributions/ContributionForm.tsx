
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Define types for the contributions
type ContributionStatus = 'pending' | 'approved' | 'rejected';

const contributionSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
});

export type ContributionFormValues = z.infer<typeof contributionSchema>;

interface ContributionFormProps {
  userId: string;
  onSubmitSuccess: () => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ userId, onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: ContributionFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await (supabase as any)
        .from('contributions')
        .insert([
          {
            user_id: userId,
            title: data.title,
            content: data.content,
            status: 'pending' as ContributionStatus,
          },
        ]);
      
      if (error) throw error;
      
      toast({
        title: 'Contribution submitted',
        description: 'Your contribution has been submitted for review.',
      });
      
      form.reset();
      onSubmitSuccess();
    } catch (error: any) {
      console.error('Error submitting contribution:', error);
      toast({
        title: 'Submission failed',
        description: error.message || 'An error occurred while submitting your contribution.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Thoughts</CardTitle>
        <CardDescription>
          Submit your ideas and perspectives for review
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title for your contribution" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your thoughts on AI consciousness and ethics..." 
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContributionForm;
