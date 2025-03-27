
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Button from '@/components/Button';

const NewsletterSignup: React.FC = () => {
  return (
    <Card className="bg-accent/5 border-accent/20">
      <CardHeader>
        <CardTitle className="text-xl">Join Our Newsletter</CardTitle>
        <CardDescription>
          Get the latest insights on AI consciousness and ethics delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Input placeholder="Your email address" type="email" required />
          <Button variant="primary" type="submit" fullWidth>
            Subscribe
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;
