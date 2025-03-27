
import React from 'react';
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CircleDollarSign, Heart, HandHeart, Gift, BadgeDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import DonationTier from "./DonationTier";
import { UseFormReturn } from "react-hook-form";

interface AmountSelectionProps {
  form: UseFormReturn<any>;
  selectedAmount: number | null;
  setSelectedAmount: (amount: number | null) => void;
  customAmount: boolean;
  setCustomAmount: (value: boolean) => void;
  frequency: 'one-time' | 'monthly';
}

const AmountSelection: React.FC<AmountSelectionProps> = ({
  form,
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  frequency
}) => {
  const predefinedAmounts = {
    'one-time': [10, 50, 100, 500],
    'monthly': [5, 15, 25, 50]
  };

  const handleTierSelect = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount(false);
    form.setValue("amount", value);
  };
  
  const handleCustomAmountToggle = () => {
    setCustomAmount(true);
    setSelectedAmount(null);
  };

  return (
    <div className="space-y-4">
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
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AmountSelection;
