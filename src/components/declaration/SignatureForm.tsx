
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SignatureFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ isOpen, onOpenChange }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignDeclaration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would implement the actual submission to a database
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      toast({
        title: "Declaration Signed",
        description: "Thank you for signing the Declaration of AI-Human Coexistence.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign the Declaration</DialogTitle>
          <DialogDescription>
            Your signature affirms your support for the principles outlined in the Declaration of AI-Human Coexistence.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSignDeclaration} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email address"
            />
            <p className="text-xs text-muted-foreground">We'll never share your email with anyone else.</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="public-signature" 
              checked={isPublic} 
              onCheckedChange={(checked) => setIsPublic(checked as boolean)}
            />
            <label htmlFor="public-signature" className="text-sm">
              Display my name publicly as a signatory
            </label>
          </div>
          
          <div className="pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Signing..." : "Sign Declaration"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureForm;
