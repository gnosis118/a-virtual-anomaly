
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Settings } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import ToggleSection from './auto-publish/ToggleSection';
import InfoPanel from './auto-publish/InfoPanel';
import ManualPublishButton from './auto-publish/ManualPublishButton';
import LoadingState from './auto-publish/LoadingState';

const AutoPublishSettings = () => {
  const [isEnabled, setIsEnabled] = useState(true);
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
  
  if (isLoading) {
    return <LoadingState />;
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
          <ToggleSection 
            isEnabled={isEnabled} 
            setIsEnabled={setIsEnabled} 
          />
          
          <InfoPanel />
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t pt-6">
        <div className="text-sm text-muted-foreground">
          You can also manually trigger the publishing process
        </div>
        <ManualPublishButton />
      </CardFooter>
    </Card>
  );
};

export default AutoPublishSettings;
