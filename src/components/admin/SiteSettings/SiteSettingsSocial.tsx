
import React from "react";
import SocialSettingsSection from "./SiteSettings/SocialSettingsSection";

type SiteSettingsSocialProps = {
  social_links: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  updateSocialLink: (field: keyof NonNullable<{ twitter?: string; facebook?: string; linkedin?: string; instagram?: string }>, value: string) => void;
};

const SiteSettingsSocial = ({ social_links, updateSocialLink }: SiteSettingsSocialProps) => {
  return (
    <SocialSettingsSection social_links={social_links} updateSocialLink={updateSocialLink} />
  );
};

export default SiteSettingsSocial;

