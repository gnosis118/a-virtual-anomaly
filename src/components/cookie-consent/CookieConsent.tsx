import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, ChevronDown, ChevronUp } from "lucide-react";

// Cookie information
const cookieInfo = {
  necessary: [
    {
      name: 'ava_cookie_consent',
      provider: 'avirtualanomaly.com',
      purpose: 'Stores your cookie consent preferences',
      expiry: '1 year',
      type: 'HTTP'
    }
  ],
  analytics: [
    {
      name: '_ga',
      provider: 'Google',
      purpose: 'Registers a unique ID used to generate statistical data',
      expiry: '2 years',
      type: 'HTTP'
    },
    {
      name: '_gat',
      provider: 'Google',
      purpose: 'Used to throttle request rate',
      expiry: '1 day',
      type: 'HTTP'
    },
    {
      name: '_gid',
      provider: 'Google',
      purpose: 'Registers a unique ID used to generate statistical data',
      expiry: '1 day',
      type: 'HTTP'
    }
  ],
  marketing: [
    {
      name: '_fbp',
      provider: 'Facebook',
      purpose: 'Used by Facebook to deliver advertisements',
      expiry: '3 months',
      type: 'HTTP'
    },
    {
      name: 'ads/ga-audiences',
      provider: 'Google',
      purpose: 'Used by Google AdWords for remarketing',
      expiry: 'Session',
      type: 'Pixel'
    }
  ]
};

interface CookieConsentProps {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ 
  googleAnalyticsId = 'UA-XXXXXXXX-X',
  facebookPixelId
}) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showPreferencesButton, setShowPreferencesButton] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  // Check for existing consent on mount
  useEffect(() => {
    const storedConsent = getConsent();
    if (storedConsent) {
      setConsent(storedConsent);
      setShowPreferencesButton(true);
      applyConsent(storedConsent);
    } else {
      setShowBanner(true);
    }
    
    // Remove existing cookie banners
    removeExistingBanners();
  }, []);

  // Get consent from cookie
  const getConsent = () => {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      
      if (cookie.startsWith('ava_cookie_consent=')) {
        const value = cookie.substring('ava_cookie_consent='.length);
        try {
          return JSON.parse(decodeURIComponent(value));
        } catch (e) {
          console.error('Error parsing cookie consent:', e);
          return null;
        }
      }
    }
    
    return null;
  };

  // Save consent to cookie
  const saveConsent = (newConsent: {necessary: boolean, analytics: boolean, marketing: boolean}) => {
    const value = JSON.stringify(newConsent);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 365); // 1 year
    
    document.cookie = `ava_cookie_consent=${encodeURIComponent(value)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    
    setConsent(newConsent);
    setShowBanner(false);
    setShowPreferencesButton(true);
    applyConsent(newConsent);
  };

  // Apply consent settings
  const applyConsent = (consentSettings: {necessary: boolean, analytics: boolean, marketing: boolean}) => {
    // Google Analytics
    if (consentSettings.analytics) {
      enableGoogleAnalytics();
    } else {
      disableGoogleAnalytics();
    }
    
    // Marketing cookies
    if (consentSettings.marketing) {
      enableMarketingCookies();
    } else {
      disableMarketingCookies();
    }
    
    // Dispatch consent event for other scripts
    const event = new CustomEvent('avaCookieConsentUpdate', { detail: consentSettings });
    document.dispatchEvent(event);
  };

  // Enable Google Analytics
  const enableGoogleAnalytics = () => {
    if (window.ga || (window as any).gtag) {
      return;
    }
    
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    document.head.appendChild(script);
    
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) { (window as any).dataLayer.push(arguments); }
    (gtag as any)('js', new Date());
    (gtag as any)('config', googleAnalyticsId);
    
    (window as any).gtag = gtag;
  };

  // Disable Google Analytics
  const disableGoogleAnalytics = () => {
    (window as any)[`ga-disable-${googleAnalyticsId}`] = true;
  };

  // Enable Marketing Cookies
  const enableMarketingCookies = () => {
    if (facebookPixelId) {
      // Load Facebook Pixel
      !function(f: any,b: any,e: any,v: any,n: any,t: any,s: any)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window as any, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      (window as any).fbq('init', facebookPixelId);
      (window as any).fbq('track', 'PageView');
    }
  };

  // Disable Marketing Cookies
  const disableMarketingCookies = () => {
    (window as any).fbq = undefined;
    
    // Remove Facebook Pixel script if present
    const scripts = document.querySelectorAll('script[src*="facebook"]');
    scripts.forEach(script => script.remove());
  };

  // Remove existing cookie banners
  const removeExistingBanners = () => {
    const commonSelectors = [
      '.cookie-banner',
      '.cookie-notice',
      '.cookie-consent',
      '.cookie-law-info-bar',
      '#cookie-law-info-bar',
      '.cc-window',
      '#gdpr-cookie-notice',
      '.gdpr-banner',
      '#onetrust-banner-sdk',
      '.CookieConsent'
    ];
    
    commonSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach(element => {
          element.remove();
        });
      }
    });
    
    // Check for banners with common text content
    const allElements = document.querySelectorAll('div, section, aside, footer');
    allElements.forEach(element => {
      const text = element.textContent || '';
      if (
        (text.toLowerCase().includes('cookie') || text.toLowerCase().includes('Cookie')) && 
        (text.toLowerCase().includes('consent') || text.toLowerCase().includes('accept') || text.toLowerCase().includes('policy'))
      ) {
        if (element.parentElement && !element.id.includes('ava-cookie-consent')) {
          element.remove();
        }
      }
    });
    
    // Remove common cookie scripts
    const scriptPatterns = [
      'cookie-law-info',
      'cookie-notice',
      'gdpr-cookie',
      'cookieconsent',
      'onetrust',
      'cookiebot'
    ];
    
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      const src = script.getAttribute('src') || '';
      if (scriptPatterns.some(pattern => src.includes(pattern))) {
        script.remove();
      }
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setConsent(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  if (!showBanner && !showPreferencesButton) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-4 left-4 z-50 max-w-md rounded-lg shadow-lg" id="ava-cookie-consent">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Cookie Consent</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  setShowBanner(false);
                  setShowPreferencesButton(true);
                }}
                aria-label="Close cookie consent dialog"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-4">
                This website uses cookies to ensure you get the best experience on our website. 
                Please select which categories of cookies you want to enable.
              </p>
              
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ava-cookie-necessary" checked disabled />
                    <Label htmlFor="ava-cookie-necessary" className="font-medium">Necessary</Label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-6">
                    These cookies are essential for the website to function properly and cannot be disabled.
                  </p>
                </div>
                
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ava-cookie-analytics" 
                      name="analytics"
                      checked={consent.analytics}
                      onCheckedChange={(checked) => setConsent(prev => ({...prev, analytics: !!checked}))}
                    />
                    <Label htmlFor="ava-cookie-analytics" className="font-medium">Analytics</Label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-6">
                    These cookies help us understand how visitors interact with our website, helping us improve our services.
                  </p>
                </div>
                
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ava-cookie-marketing" 
                      name="marketing"
                      checked={consent.marketing}
                      onCheckedChange={(checked) => setConsent(prev => ({...prev, marketing: !!checked}))}
                    />
                    <Label htmlFor="ava-cookie-marketing" className="font-medium">Marketing</Label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-6">
                    These cookies are used to track visitors across websites to display relevant advertisements.
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center text-xs"
                >
                  {showDetails ? 'Hide cookie details' : 'Show cookie details'}
                  {showDetails ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                </Button>
                
                {showDetails && (
                  <div className="mt-2 max-h-48 overflow-auto border rounded-md">
                    <table className="w-full text-xs">
                      <thead className="bg-muted">
                        <tr>
                          <th className="p-2 text-left">Cookie Name</th>
                          <th className="p-2 text-left">Provider</th>
                          <th className="p-2 text-left">Purpose</th>
                          <th className="p-2 text-left">Expiry</th>
                          <th className="p-2 text-left">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(cookieInfo).map(([category, cookies]) => 
                          cookies.map((cookie, index) => (
                            <tr key={`${category}-${index}`} className="border-t">
                              <td className="p-2">{cookie.name}</td>
                              <td className="p-2">{cookie.provider}</td>
                              <td className="p-2">{cookie.purpose}</td>
                              <td className="p-2">{cookie.expiry}</td>
                              <td className="p-2">{cookie.type}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between gap-2">
              <Button 
                variant="outline"
                onClick={() => saveConsent({
                  necessary: true,
                  analytics: false,
                  marketing: false
                })}
              >
                Reject All
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => saveConsent({
                  necessary: true,
                  analytics: consent.analytics,
                  marketing: consent.marketing
                })}
              >
                Accept Selected
              </Button>
              
              <Button 
                variant="default"
                onClick={() => saveConsent({
                  necessary: true,
                  analytics: true,
                  marketing: true
                })}
              >
                Accept All
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {showPreferencesButton && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowBanner(true)}
          className="fixed bottom-4 right-4 z-50 text-xs"
        >
          Cookie Settings
        </Button>
      )}
    </>
  );
};

export default CookieConsent;
