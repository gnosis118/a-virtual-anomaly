
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentCalendar from '@/components/blog/ContentCalendar';
import SchedulePostForm from '@/components/blog/SchedulePostForm';
import { Separator } from '@/components/ui/separator';

const ContentCalendarPage = () => {
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
              Blog Content Calendar
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Plan, schedule, and manage your blog content from one central location.
            </p>
          </div>
        </section>
        
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <ContentCalendar />
            
            <Separator className="my-12" />
            
            <SchedulePostForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContentCalendarPage;
