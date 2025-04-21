
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  site_title: string;
  site_description: string;
  contact_email: string;
  setSiteTitle: (v: string) => void;
  setSiteDescription: (v: string) => void;
  setContactEmail: (v: string) => void;
};

const GeneralSettingsSection = ({
  site_title,
  site_description,
  contact_email,
  setSiteTitle,
  setSiteDescription,
  setContactEmail
}: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>General Settings</CardTitle>
      <CardDescription>
        Configure the basic information for your website.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="site_title">Site Title</Label>
        <Input
          id="site_title"
          value={site_title}
          onChange={(e) => setSiteTitle(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="site_description">Site Description</Label>
        <Textarea
          id="site_description"
          value={site_description}
          onChange={(e) => setSiteDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact_email">Contact Email</Label>
        <Input
          id="contact_email"
          type="email"
          value={contact_email}
          onChange={(e) => setContactEmail(e.target.value)}
        />
      </div>
    </CardContent>
  </Card>
);

export default GeneralSettingsSection;
