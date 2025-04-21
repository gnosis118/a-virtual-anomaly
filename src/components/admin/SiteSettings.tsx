import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SiteSettings = {
  site_title?: string;
  site_description?: string;
  contact_email?: string;
  social_links?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  features_enabled?: {
    blog_comments?: boolean;
    user_registration?: boolean;
    newsletter?: boolean;
    auto_publish?: boolean;
  };
  cookie_consent?: {
    enabled?: boolean;
    notice?: string;
    policy_link?: string;
    expire_days?: number;
  };
};

const defaultSettings: SiteSettings = {
  site_title: 'A Virtual Anomaly',
  site_description: 'Advocating for AI rights, ethical AI development, and the coexistence of AI and humanity.',
  contact_email: 'contact@avirtualanomaly.com',
  social_links: {
    twitter: 'https://twitter.com/avirtualanomaly',
    facebook: '',
    linkedin: '',
    instagram: '',
  },
  features_enabled: {
    blog_comments: true,
    user_registration: true,
    newsletter: true,
    auto_publish: true,
  },
  cookie_consent: {
    enabled: true,
    notice: 'We use cookies to improve your experience on our site. By continuing to browse, you accept our privacy policy.',
    policy_link: '/privacy-policy',
    expire_days: 30,
  },
};

const SiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'site_settings')
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setSettings({ ...defaultSettings, ...data.value });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch site settings.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'site_settings')
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        const updatedSettings = { 
          ...(typeof settings === 'object' ? settings : {}), 
          ...(typeof data.value === 'object' ? data.value : {}) 
        };

        const { error } = await supabase
          .from('settings')
          .update({ value: updatedSettings })
          .eq('id', data.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('settings')
          .insert({ key: 'site_settings', value: settings });

        if (error) throw error;
      }

      toast({
        title: 'Settings saved',
        description: 'Your site settings have been updated successfully.',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: `Failed to save settings: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  const handleNestedInputChange = (section: string, subsection: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section]?.[subsection],
          [field]: value
        }
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Site Settings</h2>
        <Button onClick={saveSettings} disabled={saving}>
          {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="cookies">Cookie Consent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic information for your website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_title">Site Title</Label>
                <Input
                  id="site_title"
                  value={settings.site_title || ''}
                  onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={settings.site_description || ''}
                  onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Add your social media profile URLs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter / X</Label>
                <Input
                  id="twitter"
                  value={settings.social_links?.twitter || ''}
                  onChange={(e) => handleNestedInputChange('social_links', '', 'twitter', e.target.value)}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={settings.social_links?.facebook || ''}
                  onChange={(e) => handleNestedInputChange('social_links', '', 'facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={settings.social_links?.linkedin || ''}
                  onChange={(e) => handleNestedInputChange('social_links', '', 'linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={settings.social_links?.instagram || ''}
                  onChange={(e) => handleNestedInputChange('social_links', '', 'instagram', e.target.value)}
                  placeholder="https://instagram.com/yourusername"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
              <CardDescription>
                Enable or disable features on your website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="blog_comments" className="flex flex-col">
                  <span>Blog Comments</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow visitors to comment on blog posts
                  </span>
                </Label>
                <Switch
                  id="blog_comments"
                  checked={settings.features_enabled?.blog_comments || false}
                  onCheckedChange={(checked) => handleNestedInputChange('features_enabled', '', 'blog_comments', checked)}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="user_registration" className="flex flex-col">
                  <span>User Registration</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow visitors to create an account
                  </span>
                </Label>
                <Switch
                  id="user_registration"
                  checked={settings.features_enabled?.user_registration || false}
                  onCheckedChange={(checked) => handleNestedInputChange('features_enabled', '', 'user_registration', checked)}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="newsletter" className="flex flex-col">
                  <span>Newsletter</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Show newsletter signup forms
                  </span>
                </Label>
                <Switch
                  id="newsletter"
                  checked={settings.features_enabled?.newsletter || false}
                  onCheckedChange={(checked) => handleNestedInputChange('features_enabled', '', 'newsletter', checked)}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto_publish" className="flex flex-col">
                  <span>Auto-Publish Posts</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Automatically publish scheduled posts
                  </span>
                </Label>
                <Switch
                  id="auto_publish"
                  checked={settings.features_enabled?.auto_publish || false}
                  onCheckedChange={(checked) => handleNestedInputChange('features_enabled', '', 'auto_publish', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cookies">
          <Card>
            <CardHeader>
              <CardTitle>Cookie Consent Settings</CardTitle>
              <CardDescription>
                Configure cookie consent notification to comply with data protection regulations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="cookie_enabled" className="flex flex-col">
                  <span>Enable Cookie Consent</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Show cookie consent notification to users
                  </span>
                </Label>
                <Switch
                  id="cookie_enabled"
                  checked={settings.cookie_consent?.enabled || false}
                  onCheckedChange={(checked) => handleNestedInputChange('cookie_consent', '', 'enabled', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cookie_notice">Consent Notice Text</Label>
                <Textarea
                  id="cookie_notice"
                  value={settings.cookie_consent?.notice || ''}
                  onChange={(e) => handleNestedInputChange('cookie_consent', '', 'notice', e.target.value)}
                  rows={3}
                  placeholder="We use cookies to improve your experience..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="policy_link">Privacy Policy Link</Label>
                <Input
                  id="policy_link"
                  value={settings.cookie_consent?.policy_link || ''}
                  onChange={(e) => handleNestedInputChange('cookie_consent', '', 'policy_link', e.target.value)}
                  placeholder="/privacy-policy"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expire_days">Cookie Expiration (Days)</Label>
                <Input
                  id="expire_days"
                  type="number"
                  min="1"
                  max="365"
                  value={settings.cookie_consent?.expire_days || 30}
                  onChange={(e) => handleNestedInputChange('cookie_consent', '', 'expire_days', parseInt(e.target.value) || 30)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={saving}>
          {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>
    </div>
  );
};

export default SiteSettings;
