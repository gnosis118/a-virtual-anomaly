
import React from 'react';
import { Card } from "@/components/ui/card";

interface SignatureCounterProps {
  count: number;
}

const SignatureCounter: React.FC<SignatureCounterProps> = ({ count }) => {
  return (
    <Card className="p-6 text-center bg-accent/10">
      <h3 className="text-lg font-medium mb-2">Declaration Signatures</h3>
      <div className="text-4xl font-bold">{count.toLocaleString()}</div>
      <p className="text-sm text-muted-foreground mt-2">
        Be one of the first to sign
      </p>
    </Card>
  );
};

export default SignatureCounter;
