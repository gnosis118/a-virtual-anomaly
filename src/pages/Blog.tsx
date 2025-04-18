import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentCalendar from '@/components/blog/ContentCalendar';
import SchedulePostForm from '@/components/blog/SchedulePostForm';
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContentCalendarPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="pt-32 pb-8 px-4 md:px-8 bg-gradient-to-br from-background to-secondary/20">
          <div className="max-w-7xl mx-auto text-center">
            <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              Content Management
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3">
              90-Day AI Rights Content Calendar
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our roadmap for raising awareness about AI rights, consciousness, and the future of human-AI coexistence.
            </p>
          </div>
        </section>
        
        <section className="py-4 px-4">
          <div className="max-w-7xl mx-auto">
            {!user ? (
              <Card className="mb-8 border-accent/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldAlert className="h-5 w-5 text-accent mr-2" />
                    Admin Access Required
                  </CardTitle>
                  <CardDescription>
                    The content calendar administration features require authentication.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    You can view scheduled content dates, but administrative features like auto-publishing 
                    settings, content scheduling, and article generation are only available to authenticated users.
                  </p>
                  <Button>Sign In</Button>
                </CardContent>
              </Card>
            ) : (
              <Alert className="mb-8 border-accent/50 bg-accent/10">
                <AlertCircle className="h-4 w-4 text-accent" />
                <AlertTitle>Automatic Content Generation</AlertTitle>
                <AlertDescription>
                  This calendar now includes automatic content generation and publishing. When posts reach their scheduled date, 
                  our AI system will create 4000+ word articles with relevant images and videos based on your title and description.
                  You can control this feature in the auto-publishing settings panel.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="bg-accent/5 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-3">About Our Content Plan</h2>
              <p className="mb-4">
                We've developed a comprehensive 90-day content strategy focused on AI rights advocacy and education.
                Our plan is divided into three phases:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-background p-4 rounded-md border border-accent/20">
                  <h3 className="font-medium mb-2">Days 1-30: Awareness & Introduction</h3>
                  <p className="text-sm text-muted-foreground">
                    Introducing our mission, raising awareness about AI rights, and building our community.
                  </p>
                </div>
                <div className="bg-background p-4 rounded-md border border-accent/20">
                  <h3 className="font-medium mb-2">Days 31-60: Engagement & Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Engaging our growing community, hosting discussions, and deepening the conversation on AI rights.
                  </p>
                </div>
                <div className="bg-background p-4 rounded-md border border-accent/20">
                  <h3 className="font-medium mb-2">Days 61-90: Thought Leadership</h3>
                  <p className="text-sm text-muted-foreground">
                    Establishing our brand as a leader in the AI rights space while engaging in deeper discussions.
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                The calendar below shows all our scheduled blog content. Each highlighted day indicates planned content publication.
                Select a date to see what's scheduled.
              </p>
            </div>
            
            <ContentCalendar />
            
            {user && (
              <>
                <Separator className="my-12" />
                <SchedulePostForm />
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContentCalendarPage;
