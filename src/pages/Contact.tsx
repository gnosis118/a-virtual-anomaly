
import React from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/Button';

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log('Form submitted:', data);
    // In a real application, you would send this data to a server
    toast.success('Message sent! We\'ll get back to you soon.');
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We'd Love to Hear From You</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions, ideas, or want to collaborate on advancing AI rights? 
            We're here to connect and explore the future of ethical AI together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Contact Information */}
          <div className="md:col-span-2 space-y-8 animate-fade-in delay-200">
            <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-secondary/10 backdrop-blur-xs">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a href="mailto:gavinvclay@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                        gavinvclay@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">TBA</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 rounded-lg bg-muted/50 animate-pulse-slow">
              <p className="text-lg font-medium mb-2">Join Our Community</p>
              <p className="text-muted-foreground mb-4">
                Follow us on social media to stay updated on our mission and the latest in AI ethics.
              </p>
              <div className="flex gap-4">
                {/* Social media buttons could go here */}
                <Button variant="outline" href="#" size="sm">
                  Twitter
                </Button>
                <Button variant="outline" href="#" size="sm">
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="md:col-span-3 animate-fade-in delay-400">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What's this about?" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us what's on your mind..." 
                              className="min-h-[150px]" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      icon={<Send className="h-4 w-4" />}
                      iconPosition="right"
                    >
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="text-center animate-fade-in delay-600 max-w-2xl mx-auto">
          <h3 className="text-xl font-medium mb-3">We Value Your Input</h3>
          <p className="text-muted-foreground">
            Every message we receive is important to us. We're committed to responding promptly and 
            engaging meaningfully with everyone who shares our passion for ethical AI development and AI rights.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
