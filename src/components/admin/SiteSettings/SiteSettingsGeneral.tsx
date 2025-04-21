
import React from "react";
import GeneralSettingsSection from "./SiteSettings/GeneralSettingsSection";

type SiteSettingsGeneralProps = {
  site_title: string;
  site_description: string;
  contact_email: string;
  setSiteTitle: (v: string) => void;
  setSiteDescription: (v: string) => void;
  setContactEmail: (v: string) => void;
};

const SiteSettingsGeneral = ({
  site_title,
  site_description,
  contact_email,
  setSiteTitle,
  setSiteDescription,
  setContactEmail,
}: SiteSettingsGeneralProps) => {
  return (
    <GeneralSettingsSection
      site_title={site_title}
      site_description={site_description}
      contact_email={contact_email}
      setSiteTitle={setSiteTitle}
      setSiteDescription={setSiteDescription}
      setContactEmail={setContactEmail}
    />
  );
};

export default SiteSettingsGeneral;

