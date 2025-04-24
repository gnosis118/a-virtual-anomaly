
import React, { useEffect, useState } from "react";

interface CookieConsentProps {
  notice: string;
  policyLink: string;
}

const CookieConsent = ({ notice, policyLink }: CookieConsentProps) => {
  // This component doesn't need to render anything as the cookie banner
  // is already handled directly in index.html

  // We'll use this empty component as a way to programmatically
  // interact with the cookie consent if needed later
  
  useEffect(() => {
    // The component can be used to programmatically interact with 
    // the cookie consent functionality if needed in the future
    
    // We don't need to do anything here since the cookie consent banner
    // is already managed by the script in index.html
  }, []);

  return null;
};

export default CookieConsent;
