
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";  // Added the missing import
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  CircleDollarSign, 
  Heart, 
  HandHeart, 
  Gift, 
  BadgeDollarSign, 
  Check 
} from "lucide-react";
import DonationTier from "./DonationTier";

const formSchema = z.object({
  frequency: z.enum(["one-time", "monthly"]),
  amount: z.number().min(1, "Amount must be at least $1"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  agreeToUpdates: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const predefinedAmounts = {
  'one-time': [10, 50, 100, 500],
  'monthly': [5, 15, 25, 50]
};

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
  const amount = form.watch("amount");
  
  const handleTierSelect = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount(false);
    form.setValue("amount", value);
  };
  
  const handleCustomAmountToggle = () => {
    setCustomAmount(true);
    setSelectedAmount(null);
  };

  const onSubmit = (values: FormValues) => {
    console.log("Donation values:", values);
    // Here you would integrate with a payment processor
    toast({
      title: "Thank you for your donation!",
      description: `Your ${values.frequency === 'monthly' ? 'monthly' : 'one-time'} donation of $${values.amount} will help support AI rights.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donation Frequency</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time" className="cursor-pointer">One-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="cursor-pointer">Monthly</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Donation Amount</FormLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {predefinedAmounts[frequency].map((tierAmount) => (
              <DonationTier
                key={tierAmount}
                title={tierAmount === 10 ? "Supporter" : 
                       tierAmount === 50 ? "Advocate" : 
                       tierAmount === 100 ? "Champion" : 
                       tierAmount === 500 ? "Visionary" :
                       tierAmount === 5 ? "Friend" :
                       tierAmount === 15 ? "Ally" :
                       tierAmount === 25 ? "Partner" : "Leader"}
                amount={tierAmount}
                description={tierAmount === 10 || tierAmount === 5 ? "Support educational materials" :
                             tierAmount === 50 || tierAmount === 15 ? "Fund advocacy campaigns" :
                             tierAmount === 100 || tierAmount === 25 ? "Develop ethical AI programming" :
                             "Support major initiatives"}
                icon={tierAmount <= 10 ? <Heart /> : 
                      tierAmount <= 50 ? <HandHeart /> :
                      tierAmount <= 100 ? <Gift /> : <BadgeDollarSign />}
                onSelect={handleTierSelect}
                isSelected={!customAmount && selectedAmount === tierAmount}
                frequency={frequency}
              />
            ))}
          </div>
          
          <div className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCustomAmountToggle}
              className={cn("w-full", customAmount && "border-accent text-accent")}
            >
              Custom Amount
            </Button>
            
            {customAmount && (
              <div className="mt-4 space-y-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-4">
                          <Slider
                            defaultValue={[field.value]}
                            min={1}
                            max={1000}
                            step={1}
                            onValueChange={(value) => {
                              field.onChange(value[0]);
                            }}
                          />
                          <div className="flex items-center">
                            <CircleDollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="number"
                              value={field.value}
                              onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                              className="w-full"
                              min={1}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Your Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="agreeToUpdates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                  <FormControl>
                    <div className="flex items-center h-5 mt-px">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        id="agreeToUpdates"
                      />
                    </div>
                  </FormControl>
                  <div className="leading-none">
                    <FormLabel 
                      htmlFor="agreeToUpdates"
                      className="text-sm font-medium cursor-pointer"
                    >
                      Keep me updated about A Virtual Anomaly's work
                    </FormLabel>
                    <FormDescription className="text-xs">
                      We'll send occasional updates about our initiatives and impact (max once per month).
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        
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
