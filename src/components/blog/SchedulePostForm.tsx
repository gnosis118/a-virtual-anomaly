
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { CATEGORIES } from '@/data/blogData';

const SchedulePostForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    tags: '',
    date: new Date(),
    time: '12:00',
  });
  
  // Handle form field changes
  const handleChange = (field: string, value: string | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validation
    if (!formData.title || !formData.category) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields."
      });
      return;
    }
    
    // Here's where you'd normally send this to an API
    // or update your state management with the new post
    
    toast({
      title: "Post Scheduled",
      description: `"${formData.title}" has been scheduled for ${format(formData.date, 'PPP')} at ${formData.time}.`,
    });
    
    // Reset form
    setFormData({
      title: '',
      excerpt: '',
      category: '',
      tags: '',
      date: new Date(),
      time: '12:00',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-accent" />
          Schedule New Blog Post
        </CardTitle>
        <CardDescription>
          Create and schedule a new blog post for publication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Post Title *
              </label>
              <Input 
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter post title..."
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                Post Excerpt
              </label>
              <Textarea 
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                placeholder="Write a brief summary of your post..."
                className="w-full"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category *
                </label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-1">
                  Tags (comma separated)
                </label>
                <Input 
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  placeholder="AI, Ethics, Technology..."
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Publication Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && handleChange('date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium mb-1">
                  Publication Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90">Schedule Post</Button>
      </CardFooter>
    </Card>
  );
};

export default SchedulePostForm;
