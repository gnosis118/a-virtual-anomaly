
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isConsentGiven, setIsConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      setIsConsentGiven(consent === 'accepted');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsConsentGiven(true);
    console.log('Cookies accepted');
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsConsentGiven(false);
    console.log('Cookies rejected');
  };

  if (isConsentGiven !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 text-white p-4 text-center z-50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-sm sm:text-base">
          We use cookies to improve your experience on our site. By continuing to browse, you accept our{' '}
          <Link to="/privacy-policy" className="text-accent hover:underline">
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
