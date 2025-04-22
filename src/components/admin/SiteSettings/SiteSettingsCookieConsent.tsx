
import React from "react";
import CookieConsentSettingsSection from "./CookieConsentSettingsSection";

type SiteSettingsCookieConsentProps = {
  cookie_consent: {
    enabled?: boolean;
    notice?: string;
    policy_link?: string;
    expire_days?: number;
  };
  updateCookieConsent: (field: keyof NonNullable<{ enabled?: boolean; notice?: string; policy_link?: string; expire_days?: number }>, value: any) => void;
};

const SiteSettingsCookieConsent = ({ cookie_consent, updateCookieConsent }: SiteSettingsCookieConsentProps) => {
  return <CookieConsentSettingsSection cookie_consent={cookie_consent} updateCookieConsent={updateCookieConsent} />;
};

export default SiteSettingsCookieConsent;
