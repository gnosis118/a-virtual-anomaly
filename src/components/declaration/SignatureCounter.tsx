
import React from 'react';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SignatureCounterProps {
  count: number;
  isLoading?: boolean;
}

const SignatureCounter: React.FC<SignatureCounterProps> = ({ count, isLoading = false }) => {
  return (
    <Card className="p-6 text-center bg-accent/10">
      <h3 className="text-lg font-medium mb-2">Declaration Signatures</h3>
      {isLoading ? (
        <Skeleton className="h-10 w-24 mx-auto" />
      ) : (
        <div className="text-4xl font-bold">{count.toLocaleString()}</div>
      )}
      <p className="text-sm text-muted-foreground mt-2">
        {count === 0 
          ? "Be the first to sign" 
          : count === 1 
            ? "Be the second to sign" 
            : "Join these visionaries"
        }
      </p>
    </Card>
  );
};

export default SignatureCounter;
