
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, Settings, RotateCw } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AutoPublishSettings = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch current setting on component mount
  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .eq('key', 'auto_publish')
          .single();
        
        if (error) {
          console.error('Error fetching auto-publish setting:', error);
          return;
        }
        
        // If data exists, set the state accordingly
        if (data) {
          setIsEnabled(data.value === true || data.value === 'true');
        }
      } catch (error) {
        console.error('Error in fetchSetting:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSetting();
  }, []);
  
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
      const { error } = await supabase
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
  
  const runManualPublish = async () => {
    setIsRunning(true);
    toast({
      title: "Publishing scheduled content",
      description: "We're generating and publishing your scheduled content. This may take a few minutes.",
    });
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-scheduled-post');
      
      if (error) {
        throw error;
      }
      
      if (data.results && data.results.length > 0) {
        const publishedCount = data.results.filter(r => r.success).length;
        const failedCount = data.results.filter(r => !r.success).length;
        
        toast({
          title: "Content publishing complete",
          description: `Successfully published ${publishedCount} posts${failedCount > 0 ? `, with ${failedCount} failures` : ''}`,
          variant: failedCount > 0 ? "destructive" : "default",
        });
      } else {
        toast({
          title: "No content to publish",
          description: "There are no scheduled posts ready for today",
        });
      }
    } catch (error) {
      console.error('Error running content generation:', error);
      toast({
        title: "Publishing failed",
        description: `An error occurred: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };
  
  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-24">
            <RotateCw className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading settings...</span>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-accent" />
          Auto-Publishing Settings
        </CardTitle>
        <CardDescription>
          Configure how your scheduled content is automatically published
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
          
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">How Auto-Publishing Works</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-accent/20 text-accent rounded-full p-1 mt-0.5">
                  <Calendar className="h-3 w-3" />
                </span>
                <span>Every day at midnight, the system checks for scheduled posts due for publication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-accent/20 text-accent rounded-full p-1 mt-0.5">
                  <Calendar className="h-3 w-3" />
                </span>
                <span>For each scheduled post, we generate a full 4000+ word article with AI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-accent/20 text-accent rounded-full p-1 mt-0.5">
                  <Calendar className="h-3 w-3" />
                </span>
                <span>We create relevant images and add them to the article</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-accent/20 text-accent rounded-full p-1 mt-0.5">
                  <Calendar className="h-3 w-3" />
                </span>
                <span>The finished post is published to your blog automatically</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t pt-6">
        <div className="text-sm text-muted-foreground">
          You can also manually trigger the publishing process
        </div>
        <Button 
          onClick={runManualPublish} 
          disabled={isRunning}
          className="gap-2"
        >
          {isRunning ? (
            <>
              <RotateCw className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Publish Now"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AutoPublishSettings;
