
import React, { useState } from 'react';
import { useDevMode } from '@/contexts/DevModeContext';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Save, RefreshCw, X } from 'lucide-react';

const DevPreview = ({ children }: { children: React.ReactNode }) => {
  const { isDevMode } = useDevMode();
  const [editedContent, setEditedContent] = useState<string>('');
  const [previewContent, setPreviewContent] = useState<React.ReactNode>(children);
  const [activeTab, setActiveTab] = useState('view');

  // This is simplified - in a real app, you would use a proper code editor
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleApplyChanges = () => {
    // This is a simplified example - in a real app, you would 
    // parse and apply changes safely
    try {
      // We're just showing the preview, not actually evaluating code
      setPreviewContent(children);
      setActiveTab('preview');
      toast.success("Changes applied to preview");
    } catch (error) {
      toast.error("Could not apply changes");
    }
  };

  const handleReset = () => {
    setEditedContent('');
    setPreviewContent(children);
    toast.info("Reset to original content");
  };

  if (!isDevMode) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
      <div className="bg-muted p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Development Preview</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={handleApplyChanges}>
            <Save className="h-4 w-4 mr-2" />
            Apply Changes
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 border-b">
          <TabsList>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="view">View</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="code" className="h-full p-4">
            <textarea
              className="w-full h-full p-4 font-mono text-sm border rounded-md"
              value={editedContent}
              onChange={handleCodeChange}
              placeholder="// Edit your component here"
            />
          </TabsContent>
          
          <TabsContent value="preview" className="h-full">
            <div className="p-4 bg-background h-full overflow-auto">
              {previewContent}
            </div>
          </TabsContent>
          
          <TabsContent value="view" className="h-full">
            <iframe 
              src="/" 
              className="w-full h-full border-none"
              title="Site Preview"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DevPreview;
