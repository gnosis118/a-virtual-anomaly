
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/Button';

const ContactInfo = () => {
  return (
    <div className="space-y-8 animate-fade-in delay-200">
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-secondary/10 backdrop-blur-xs">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <a href="mailto:Admin@avirtualanomaly.com" className="text-muted-foreground hover:text-accent transition-colors">
                  Admin@avirtualanomaly.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <a href="tel:+19166448058" className="text-muted-foreground hover:text-accent transition-colors">
                  +1-916-644-8058
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 rounded-lg bg-muted/50 animate-pulse-slow">
        <p className="text-lg font-medium mb-2">Join Our Community</p>
        <p className="text-muted-foreground mb-4">
          Follow us on social media to stay updated on our mission and the latest in AI ethics.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" href="#" size="sm">
            Twitter
          </Button>
          <Button variant="outline" href="#" size="sm">
            LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
