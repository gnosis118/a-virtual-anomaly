
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Button from '@/components/Button';

const JoinConversation: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3">Join the Conversation</h3>
        <p className="text-muted-foreground mb-4">
          Have thoughts on AI consciousness? Share your perspective and contribute to this important dialogue.
        </p>
        <Button 
          variant="primary" 
          href="/join"
          fullWidth
        >
          Get Involved
        </Button>
      </CardContent>
    </Card>
  );
};

export default JoinConversation;
