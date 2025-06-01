
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Cookie, Shield, BarChart3, Target, Globe } from 'lucide-react';

// Extend Window interface for GA
declare global {
  interface Window {
    ga?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      implementCookiePreferences(savedPreferences);
    }
  }, []);

  const implementCookiePreferences = (prefs: CookiePreferences) => {
    // Implement Google Analytics based on preferences
    if (prefs.analytics && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    } else if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }

    // Implement marketing cookies
    if (prefs.marketing && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted'
      });
    } else if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'denied'
      });
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    implementCookiePreferences(allAccepted);
    setIsVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    implementCookiePreferences(preferences);
    setIsVisible(false);
  };

  const declineAll = () => {
    const minimal = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(minimal);
    localStorage.setItem('cookie-consent', JSON.stringify(minimal));
    implementCookiePreferences(minimal);
    setIsVisible(false);
  };

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return; // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Cookie Preferences</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={declineAll}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            We use cookies to enhance your browsing experience, provide personalized content, 
            and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>

          {!showDetails ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button onClick={acceptAll} className="flex-1 min-w-[120px]">
                  Accept All
                </Button>
                <Button 
                  variant="outline" 
                  onClick={declineAll}
                  className="flex-1 min-w-[120px]"
                >
                  Decline All
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowDetails(true)}
                  className="flex-1 min-w-[120px]"
                >
                  Customize
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <h3 className="font-medium">Necessary Cookies</h3>
                  </div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Always Active
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Essential for the website to function properly. These cannot be disabled.
                </p>
              </div>

              <Separator />

              {/* Analytics Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <h3 className="font-medium">Analytics Cookies</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handlePreferenceChange('analytics')}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Help us understand how visitors interact with our website.
                </p>
              </div>

              <Separator />

              {/* Marketing Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <h3 className="font-medium">Marketing Cookies</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => handlePreferenceChange('marketing')}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Used to deliver personalized advertisements and track their effectiveness.
                </p>
              </div>

              <Separator />

              {/* Functional Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-orange-600" />
                    <h3 className="font-medium">Functional Cookies</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => handlePreferenceChange('functional')}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable enhanced functionality and personalization features.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button onClick={acceptSelected} className="flex-1 min-w-[120px]">
                  Save Preferences
                </Button>
                <Button 
                  variant="outline" 
                  onClick={acceptAll}
                  className="flex-1 min-w-[120px]"
                >
                  Accept All
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowDetails(false)}
                  className="flex-1 min-w-[120px]"
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
