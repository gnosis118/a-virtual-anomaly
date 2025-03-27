
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DonationTierProps {
  title: string;
  amount: number;
  description: string;
  icon?: React.ReactNode;
  onSelect: (amount: number) => void;
  isSelected?: boolean;
  frequency: 'monthly' | 'one-time';
}

const DonationTier: React.FC<DonationTierProps> = ({
  title,
  amount,
  description,
  icon,
  onSelect,
  isSelected = false,
  frequency
}) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-200 cursor-pointer hover:shadow-md border-2", 
        isSelected ? "border-accent" : "border-border"
      )}
      onClick={() => onSelect(amount)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-accent">{icon}</span>}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          ${amount}{frequency === 'monthly' && <span className="text-sm font-normal text-muted-foreground">/month</span>}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant={isSelected ? "default" : "outline"} 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(amount);
          }}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonationTier;
