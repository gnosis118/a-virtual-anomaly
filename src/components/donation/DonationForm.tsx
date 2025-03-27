
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from '@/hooks/use-toast';
import { Form } from "@/components/ui/form";
import { Heart } from "lucide-react";
import FrequencySelection from "./FrequencySelection";
import AmountSelection from "./AmountSelection";
import DonorInfoForm from "./DonorInfoForm";

const formSchema = z.object({
  frequency: z.enum(["one-time", "monthly"]),
  amount: z.number().min(1, "Amount must be at least $1"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  agreeToUpdates: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const DonationForm: React.FC = () => {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<boolean>(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      frequency: "one-time",
      amount: 50,
      name: user?.user_metadata?.username || "",
      email: user?.email || "",
      agreeToUpdates: true,
    },
  });
  
  const frequency = form.watch("frequency");

  const onSubmit = async (values: FormValues) => {
    console.log("Donation values:", values);
    
    // Here you would integrate with a payment processor
    // For now, we'll just show a toast notification
    
    toast({
      title: "Thank you for your donation!",
      description: `Your ${values.frequency === 'monthly' ? 'monthly' : 'one-time'} donation of $${values.amount} will help support AI rights.`,
    });
    
    // If user is logged in, we could save the donation to Supabase
    // This is just a placeholder for future implementation
    if (user) {
      try {
        // Placeholder for future donation tracking
        console.log("Logged in user made donation:", {
          user_id: user.id,
          amount: values.amount,
          frequency: values.frequency,
          date: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error recording donation:", error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FrequencySelection form={form} />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Donation Amount</h3>
          <AmountSelection 
            form={form}
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
            frequency={frequency}
          />
        </div>

        <DonorInfoForm form={form} />
        
        <Button type="submit" className="w-full" size="lg">
          <Heart className="mr-2 h-5 w-5" /> Complete Donation
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Your donation helps create a more ethical AI future. Thank you for your support!</p>
        </div>
      </form>
    </Form>
  );
};

export default DonationForm;
