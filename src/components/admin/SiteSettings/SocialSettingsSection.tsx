
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type SocialLinks = {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
};

type Props = {
  social_links: SocialLinks;
  updateSocialLink: (field: keyof SocialLinks, value: string) => void;
};

const SocialSettingsSection = ({ social_links, updateSocialLink }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>Social Media Links</CardTitle>
      <CardDescription>
        Add your social media profile URLs.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="twitter">Twitter / X</Label>
        <Input
          id="twitter"
          value={social_links.twitter || ''}
          onChange={(e) => updateSocialLink('twitter', e.target.value)}
          placeholder="https://twitter.com/yourusername"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="facebook">Facebook</Label>
        <Input
          id="facebook"
          value={social_links.facebook || ''}
          onChange={(e) => updateSocialLink('facebook', e.target.value)}
          placeholder="https://facebook.com/yourpage"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          value={social_links.linkedin || ''}
          onChange={(e) => updateSocialLink('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="instagram">Instagram</Label>
        <Input
          id="instagram"
          value={social_links.instagram || ''}
          onChange={(e) => updateSocialLink('instagram', e.target.value)}
          placeholder="https://instagram.com/yourusername"
        />
      </div>
    </CardContent>
  </Card>
);

export default SocialSettingsSection;
