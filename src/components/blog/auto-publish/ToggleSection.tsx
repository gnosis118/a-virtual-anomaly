
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ToggleSectionProps {
  isEnabled: boolean;
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleSection: React.FC<ToggleSectionProps> = ({ isEnabled, setIsEnabled }) => {
  const toggleAutoPublish = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    
    toast({
      title: newValue ? "Auto-publishing enabled" : "Auto-publishing disabled",
      description: newValue 
        ? "Scheduled content will be automatically published on the specified date" 
        : "Content will no longer be automatically published",
    });
    
    // Update the setting in the database
    try {
      const { error } = await (supabase as any)
        .from('settings')
        .upsert({ 
          key: 'auto_publish', 
          value: newValue 
        });
      
      if (error) {
        console.error('Error saving auto-publish setting:', error);
        toast({
          title: "Failed to save setting",
          description: error.message,
          variant: "destructive",
        });
        // Revert the UI state if save failed
        setIsEnabled(!newValue);
      }
    } catch (error) {
      console.error('Error in toggleAutoPublish:', error);
      // Revert the UI state if save failed
      setIsEnabled(!newValue);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <Label htmlFor="auto-publish" className="text-base font-medium">Enable Auto-Publishing</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Automatically generate and publish content on scheduled dates
        </p>
      </div>
      <Switch 
        id="auto-publish" 
        checked={isEnabled} 
        onCheckedChange={toggleAutoPublish}
      />
    </div>
  );
};

export default ToggleSection;
