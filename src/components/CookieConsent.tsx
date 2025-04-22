
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type CookieConsentProps = {
  notice?: string;
  policyLink?: string;
};

const CookieConsent = ({ 
  notice = "We use cookies to improve your experience. By continuing to use this site, you agree to our cookie policy.", 
  policyLink = "/privacy-policy" 
}: CookieConsentProps) => {
  const { toast } = useToast();

  useEffect(() => {
    // Cookiebot initialization
    const initCookiebot = () => {
      if (window.Cookiebot) {
        window.Cookiebot.consent.functional = true;
        window.Cookiebot.consent.statistics = false;
        window.Cookiebot.consent.marketing = false;
        window.Cookiebot.consent.preferences = false;
        
        window.Cookiebot.runScripts();
      }
    };

    // Check if Cookiebot is already loaded
    if (window.Cookiebot) {
      initCookiebot();
    } else {
      // If not loaded, wait for it
      document.addEventListener('cookiebotLoadComplete', initCookiebot);
    }

    return () => {
      document.removeEventListener('cookiebotLoadComplete', initCookiebot);
    };
  }, []);

  const openCookieDeclaration = () => {
    // Open Cookiebot's cookie declaration modal
    if (window.Cookiebot && window.Cookiebot.dialog) {
      window.Cookiebot.dialog.showCookieDeclaration();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm z-50">
      <Card className="max-w-4xl mx-auto p-4 shadow-lg border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            {notice}
            <button 
              onClick={openCookieDeclaration} 
              className="ml-1 underline hover:text-accent"
            >
              Manage Cookies
            </button>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => window.Cookiebot?.consent.decline()} 
              variant="outline" 
              size="sm"
            >
              Reject
            </Button>
            <Button 
              onClick={() => window.Cookiebot?.consent.accept()} 
              size="sm"
            >
              Accept
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
