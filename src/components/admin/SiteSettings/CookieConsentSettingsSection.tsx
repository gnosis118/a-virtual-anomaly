
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type CookieConsent = {
  enabled?: boolean;
  notice?: string;
  policy_link?: string;
  expire_days?: number;
};

type Props = {
  cookie_consent: CookieConsent;
  updateCookieConsent: (field: keyof CookieConsent, value: any) => void;
};

const CookieConsentSettingsSection = ({ cookie_consent, updateCookieConsent }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>Cookie Consent Settings</CardTitle>
      <CardDescription>
        Configure cookie consent notification to comply with data protection regulations.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="cookie_enabled" className="flex flex-col">
          <span>Enable Cookie Consent</span>
          <span className="font-normal text-sm text-muted-foreground">
            Show cookie consent notification to users
          </span>
        </Label>
        <Switch
          id="cookie_enabled"
          checked={!!cookie_consent.enabled}
          onCheckedChange={(checked) => updateCookieConsent('enabled', checked)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cookie_notice">Consent Notice Text</Label>
        <Textarea
          id="cookie_notice"
          value={cookie_consent.notice || ''}
          onChange={(e) => updateCookieConsent('notice', e.target.value)}
          rows={3}
          placeholder="We use cookies to improve your experience..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="policy_link">Privacy Policy Link</Label>
        <Input
          id="policy_link"
          value={cookie_consent.policy_link || ''}
          onChange={(e) => updateCookieConsent('policy_link', e.target.value)}
          placeholder="/privacy-policy"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expire_days">Cookie Expiration (Days)</Label>
        <Input
          id="expire_days"
          type="number"
          min="1"
          max="365"
          value={cookie_consent.expire_days || 30}
          onChange={(e) => updateCookieConsent('expire_days', parseInt(e.target.value) || 30)}
        />
      </div>
    </CardContent>
  </Card>
);

export default CookieConsentSettingsSection;
