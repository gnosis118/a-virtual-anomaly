
import React from "react";
import FeatureSettingsSection from "./FeatureSettingsSection";

type SiteSettingsFeaturesProps = {
  features_enabled: {
    blog_comments?: boolean;
    user_registration?: boolean;
    newsletter?: boolean;
    auto_publish?: boolean;
  };
  updateFeatureEnabled: (field: keyof NonNullable<{ blog_comments?: boolean; user_registration?: boolean; newsletter?: boolean; auto_publish?: boolean }>, value: boolean) => void;
};

const SiteSettingsFeatures = ({ features_enabled, updateFeatureEnabled }: SiteSettingsFeaturesProps) => {
  return (
    <FeatureSettingsSection features_enabled={features_enabled} updateFeatureEnabled={updateFeatureEnabled} />
  );
};

export default SiteSettingsFeatures;
