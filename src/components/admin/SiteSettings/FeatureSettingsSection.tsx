
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type FeaturesEnabled = {
  blog_comments?: boolean;
  user_registration?: boolean;
  newsletter?: boolean;
  auto_publish?: boolean;
};

type Props = {
  features_enabled: FeaturesEnabled;
  updateFeatureEnabled: (field: keyof FeaturesEnabled, value: boolean) => void;
};

const FeatureSettingsSection = ({ features_enabled, updateFeatureEnabled }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>Feature Settings</CardTitle>
      <CardDescription>
        Enable or disable features on your website.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="blog_comments" className="flex flex-col">
          <span>Blog Comments</span>
          <span className="font-normal text-sm text-muted-foreground">
            Allow visitors to comment on blog posts
          </span>
        </Label>
        <Switch
          id="blog_comments"
          checked={!!features_enabled.blog_comments}
          onCheckedChange={(checked) => updateFeatureEnabled('blog_comments', checked)}
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="user_registration" className="flex flex-col">
          <span>User Registration</span>
          <span className="font-normal text-sm text-muted-foreground">
            Allow visitors to create an account
          </span>
        </Label>
        <Switch
          id="user_registration"
          checked={!!features_enabled.user_registration}
          onCheckedChange={(checked) => updateFeatureEnabled('user_registration', checked)}
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="newsletter" className="flex flex-col">
          <span>Newsletter</span>
          <span className="font-normal text-sm text-muted-foreground">
            Show newsletter signup forms
          </span>
        </Label>
        <Switch
          id="newsletter"
          checked={!!features_enabled.newsletter}
          onCheckedChange={(checked) => updateFeatureEnabled('newsletter', checked)}
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="auto_publish" className="flex flex-col">
          <span>Auto-Publish Posts</span>
          <span className="font-normal text-sm text-muted-foreground">
            Automatically publish scheduled posts
          </span>
        </Label>
        <Switch
          id="auto_publish"
          checked={!!features_enabled.auto_publish}
          onCheckedChange={(checked) => updateFeatureEnabled('auto_publish', checked)}
        />
      </div>
    </CardContent>
  </Card>
);

export default FeatureSettingsSection;
