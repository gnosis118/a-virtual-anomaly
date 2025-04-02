
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RotateCw } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center h-24">
          <RotateCw className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading settings...</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
