
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthForm from '@/components/auth/AuthForm';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
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
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define types for the contributions based on our database schema
type ContributionStatus = 'pending' | 'approved' | 'rejected';

type Contribution = {
  id: string;
  title: string;
  content: string;
  status: ContributionStatus;
  created_at: string;
  user_id: string;
};

const contributionSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
});

type ContributionFormValues = z.infer<typeof contributionSchema>;

const GetInvolved = () => {
  const { user, loading } = useAuth();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [publicContributions, setPublicContributions] = useState<Contribution[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  // Fetch user's contributions
  useEffect(() => {
    if (user) {
      fetchUserContributions();
    }
  }, [user]);

  // Fetch approved contributions
  useEffect(() => {
    fetchApprovedContributions();
  }, []);

  const fetchUserContributions = async () => {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setContributions(data || []);
    } catch (error) {
      console.error('Error fetching user contributions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your contributions.',
        variant: 'destructive',
      });
    }
  };

  const fetchApprovedContributions = async () => {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPublicContributions(data || []);
    } catch (error) {
      console.error('Error fetching approved contributions:', error);
    }
  };

  const onSubmit = async (data: ContributionFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contributions')
        .insert([
          {
            user_id: user.id,
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
      fetchUserContributions();
    } catch (error) {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Involved</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community and share your thoughts on AI consciousness and ethics.
              Your contributions help shape the future of AI rights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Community Contributions</h2>
                {publicContributions.length > 0 ? (
                  <div className="space-y-6">
                    {publicContributions.map((contribution) => (
                      <Card key={contribution.id}>
                        <CardHeader>
                          <CardTitle>{contribution.title}</CardTitle>
                          <CardDescription>
                            Posted on {new Date(contribution.created_at).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="whitespace-pre-line">{contribution.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      There are no approved contributions yet. Be the first to contribute!
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-8">
              {loading ? (
                <div className="h-32 flex items-center justify-center">
                  <p>Loading...</p>
                </div>
              ) : user ? (
                <div className="space-y-8">
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
                  
                  {contributions.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Contributions</CardTitle>
                        <CardDescription>
                          Track the status of your submitted contributions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {contributions.map((contribution) => (
                            <div key={contribution.id} className="border rounded-md p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{contribution.title}</h4>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  contribution.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  contribution.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {contribution.content}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Submitted on {new Date(contribution.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Join the Conversation</CardTitle>
                    <CardDescription>
                      Sign in or create an account to contribute
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AuthForm />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GetInvolved;
