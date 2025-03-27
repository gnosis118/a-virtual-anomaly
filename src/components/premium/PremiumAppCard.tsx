
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';

interface AppProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  popular: boolean;
}

interface PremiumAppCardProps {
  app: AppProps;
}

const PremiumAppCard: React.FC<PremiumAppCardProps> = ({ app }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-primary/5">{app.icon}</div>
          {app.popular && (
            <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="mt-2">{app.name}</CardTitle>
        <CardDescription className="line-clamp-2">{app.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge variant="outline" className="mb-2">
          {app.category.charAt(0).toUpperCase() + app.category.slice(1)}
        </Badge>
      </CardContent>
      <CardFooter className="pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Launch App
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {app.icon}
                <span>{app.name}</span>
              </DialogTitle>
              <DialogDescription>{app.description}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-4">
                This would launch the actual AI application in a production environment.
                For this demo, the application interface would appear here.
              </p>
              <div className="bg-muted p-6 rounded-md flex flex-col items-center justify-center">
                <p className="text-muted-foreground">Application Interface Placeholder</p>
                <ExternalLink className="w-12 h-12 text-muted-foreground/50 mt-2" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PremiumAppCard;
