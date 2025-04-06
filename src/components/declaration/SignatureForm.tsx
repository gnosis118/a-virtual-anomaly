
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface SignatureFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSignatureAdded?: () => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ isOpen, onOpenChange, onSignatureAdded }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{name?: string, email?: string}>({});

  const validateForm = () => {
    const errors: {name?: string, email?: string} = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignDeclaration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use the generic interface to insert data (avoids type issues)
      const { error } = await supabase
        .from('declaration_signatures')
        .insert({
          user_name: name,
          email: email,
          is_public: isPublic,
        } as any);
      
      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Email already exists",
            description: "This email has already been used to sign the declaration.",
            variant: "destructive"
          });
        } else {
          console.error("Error submitting signature:", error);
          toast({
            title: "Error",
            description: "There was an error submitting your signature. Please try again later.",
            variant: "destructive"
          });
        }
      } else {
        onOpenChange(false);
        toast({
          title: "Declaration Signed",
          description: "Thank you for signing the Declaration of AI-Human Coexistence.",
        });

        // Call the callback to update the signature count
        if (onSignatureAdded) {
          onSignatureAdded();
        }
      }
    } catch (err) {
      console.error("Exception during signature submission:", err);
      toast({
        title: "Error",
        description: "There was an error submitting your signature. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={formErrors.name ? "border-destructive" : ""}
              placeholder="Enter your full name"
            />
            {formErrors.name && (
              <p className="text-xs text-destructive">{formErrors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={formErrors.email ? "border-destructive" : ""}
              placeholder="Enter your email address"
            />
            {formErrors.email && (
              <p className="text-xs text-destructive">{formErrors.email}</p>
            )}
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
