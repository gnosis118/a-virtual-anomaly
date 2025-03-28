
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Button from '@/components/Button';
import { CalendarCheck2 } from 'lucide-react';

const JoinConversation: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3">Join the Conversation</h3>
        <p className="text-muted-foreground mb-4">
          Have thoughts on AI consciousness? Share your perspective and contribute to this important dialogue.
        </p>
        <div className="space-y-3">
          <Button 
            variant="primary" 
            href="/join"
            fullWidth
          >
            Get Involved
          </Button>
          <Button 
            variant="outline" 
            href="/calendar"
            fullWidth
            icon={<CalendarCheck2 size={16} />} 
            iconPosition="left"
          >
            View Content Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinConversation;
