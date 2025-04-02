
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCw } from 'lucide-react';

interface CalendarViewProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  daysWithPosts: Date[];
  isLoading?: boolean;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  date, 
  setDate, 
  daysWithPosts,
  isLoading = false 
}) => {
  // Create a function to determine if a day has posts
  const isDayWithPosts = (day: Date) => {
    return daysWithPosts.some(d => 
      d.getDate() === day.getDate() && 
      d.getMonth() === day.getMonth() && 
      d.getFullYear() === day.getFullYear()
    );
  };
  
  // Add debugging for days with posts
  console.log('Days with posts in calendar:', daysWithPosts.map(d => d.toISOString().split('T')[0]));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Calendar</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 z-10 flex items-center justify-center">
            <RotateCw className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full"
          modifiers={{
            booked: isDayWithPosts,
          }}
          modifiersClassNames={{
            booked: "bg-accent text-accent-foreground font-bold",
          }}
        />
        <div className="mt-4 text-xs text-muted-foreground">
          <p>Dates with <span className="font-bold text-accent">highlighted</span> backgrounds have scheduled content.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
