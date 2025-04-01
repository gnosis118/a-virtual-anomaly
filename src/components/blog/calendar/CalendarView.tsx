
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck2 } from 'lucide-react';

interface CalendarViewProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  daysWithPosts: Date[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  date, 
  setDate, 
  daysWithPosts 
}) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck2 className="h-5 w-5 text-accent" />
          Content Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            scheduled: daysWithPosts,
          }}
          modifiersStyles={{
            scheduled: { 
              fontWeight: 'bold',
              backgroundColor: 'rgba(var(--accent) / 0.1)',
              color: 'var(--accent)',
            }
          }}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent/30"></div>
            <span>Days with scheduled content</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
