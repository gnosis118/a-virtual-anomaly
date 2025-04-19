
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type CookieSettings = {
  enabled: boolean;
  notice: string;
  policy_link: string;
  expire_days: number;
};

const defaultSettings: CookieSettings = {
  enabled: true,
  notice: 'We use cookies to improve your experience on our site. By continuing to browse, you accept our privacy policy.',
  policy_link: '/privacy-policy',
  expire_days: 30
};

const CookieConsent = () => {
  const [isConsentGiven, setIsConsentGiven] = useState<boolean | null>(null);
  const [settings, setSettings] = useState<CookieSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'site_settings')
          .maybeSingle();

        if (!error && data && data.value && typeof data.value === 'object') {
          const siteSettings = data.value as Record<string, any>;
          
          if (siteSettings.cookie_consent) {
            setSettings({
              enabled: siteSettings.cookie_consent.enabled ?? defaultSettings.enabled,
              notice: siteSettings.cookie_consent.notice ?? defaultSettings.notice,
              policy_link: siteSettings.cookie_consent.policy_link ?? defaultSettings.policy_link,
              expire_days: siteSettings.cookie_consent.expire_days ?? defaultSettings.expire_days,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching cookie settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
    
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      setIsConsentGiven(consent === 'accepted');
    }
  }, []);

  const handleAccept = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (settings.expire_days || 30));
    
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentExpiry', expiryDate.toISOString());
    setIsConsentGiven(true);
    console.log('Cookies accepted');
  };

  const handleReject = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (settings.expire_days || 30));
    
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentExpiry', expiryDate.toISOString());
    setIsConsentGiven(false);
    console.log('Cookies rejected');
  };

  // Don't show while loading or if consent has been given or the banner is disabled
  if (loading || isConsentGiven !== null || !settings.enabled) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 text-white p-4 text-center z-50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-sm sm:text-base">
          {settings.notice}{' '}
          <Link to={settings.policy_link} className="text-accent hover:underline">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <Button
            onClick={handleAccept}
            variant="default"
            className="bg-primary hover:bg-primary/90"
          >
            Accept
          </Button>
          <Button
            onClick={handleReject}
            variant="destructive"
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
