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
import GeneralSettingsSection from './SiteSettings/GeneralSettingsSection';
import SocialSettingsSection from './SiteSettings/SocialSettingsSection';
import FeatureSettingsSection from './SiteSettings/FeatureSettingsSection';
import CookieConsentSettingsSection from './SiteSettings/CookieConsentSettingsSection';

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
  const [settings, setSettings] = React.useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
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
        setSettings({ ...defaultSettings, ...(typeof data.value === 'object' ? data.value : {}) });
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
          ...defaultSettings,
          ...(typeof data.value === 'object' ? data.value : {}),
          ...settings
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

  const setSiteTitle = (v: string) => setSettings(prev => ({ ...prev, site_title: v }));
  const setSiteDescription = (v: string) => setSettings(prev => ({ ...prev, site_description: v }));
  const setContactEmail = (v: string) => setSettings(prev => ({ ...prev, contact_email: v }));

  const updateSocialLink = (field: keyof NonNullable<SiteSettings['social_links']>, value: string) => {
    setSettings(prev => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [field]: value
      }
    }));
  };

  const updateFeatureEnabled = (field: keyof NonNullable<SiteSettings['features_enabled']>, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      features_enabled: {
        ...prev.features_enabled,
        [field]: value
      }
    }));
  };

  const updateCookieConsent = (field: keyof NonNullable<SiteSettings['cookie_consent']>, value: any) => {
    setSettings(prev => ({
      ...prev,
      cookie_consent: {
        ...prev.cookie_consent,
        [field]: value
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
          <GeneralSettingsSection
            site_title={settings.site_title || ''}
            site_description={settings.site_description || ''}
            contact_email={settings.contact_email || ''}
            setSiteTitle={setSiteTitle}
            setSiteDescription={setSiteDescription}
            setContactEmail={setContactEmail}
          />
        </TabsContent>
        <TabsContent value="social">
          <SocialSettingsSection
            social_links={settings.social_links || {}}
            updateSocialLink={updateSocialLink}
          />
        </TabsContent>
        <TabsContent value="features">
          <FeatureSettingsSection
            features_enabled={settings.features_enabled || {}}
            updateFeatureEnabled={updateFeatureEnabled}
          />
        </TabsContent>
        <TabsContent value="cookies">
          <CookieConsentSettingsSection
            cookie_consent={settings.cookie_consent || {}}
            updateCookieConsent={updateCookieConsent}
          />
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
