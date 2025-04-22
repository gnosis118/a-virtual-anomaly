
// Extend the Window interface to include Cookiebot
interface Window {
  Cookiebot?: {
    consent: {
      functional: boolean;
      statistics: boolean;
      marketing: boolean;
      preferences: boolean;
      accept: () => void;
      decline: () => void;
    };
    dialog?: {
      showCookieDeclaration: () => void;
    };
  };
}
