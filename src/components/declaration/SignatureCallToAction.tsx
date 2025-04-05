
import React from 'react';
import { Button } from "@/components/ui/button";
import SignatureCounter from './SignatureCounter';

interface SignatureCallToActionProps {
  onSignClick: () => void;
  signatureCount: number;
}

const SignatureCallToAction: React.FC<SignatureCallToActionProps> = ({ onSignClick, signatureCount }) => {
  return (
    <div className="text-center mt-16 mb-8">
      <SignatureCounter count={signatureCount} />
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-6">Add Your Signature</h3>
        <p className="text-muted-foreground mb-8">
          Be among the first to affirm the principles of AI-Human coexistence
        </p>
        <Button 
          size="lg" 
          onClick={onSignClick} 
          className="animate-pulse hover:animate-none"
        >
          Sign the Declaration
        </Button>
      </div>
    </div>
  );
};

export default SignatureCallToAction;
