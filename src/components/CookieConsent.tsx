
import React, { useEffect, useState } from 'react';
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
  const [showBanner, setShowBanner] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    toast({
      title: "Cookies Accepted",
      description: "Cookie preferences have been saved.",
    });
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
    toast({
      title: "Cookies Rejected",
      description: "You can change your preferences in the privacy policy.",
      variant: "destructive"
    });
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm z-50">
      <Card className="max-w-4xl mx-auto p-4 shadow-lg border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            {notice}
            <a 
              href={policyLink} 
              className="ml-1 underline hover:text-accent"
            >
              Learn more
            </a>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={rejectCookies} 
              variant="outline" 
              size="sm"
            >
              Reject
            </Button>
            <Button 
              onClick={acceptCookies} 
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
