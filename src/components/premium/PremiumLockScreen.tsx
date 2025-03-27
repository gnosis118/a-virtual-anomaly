
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Gift, Star, Shield, Zap } from 'lucide-react';

const PremiumLockScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate('/donate?plan=premium');
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-16 flex flex-col items-center">
      <div className="text-center mb-10">
        <div className="bg-accent/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Lock className="h-10 w-10 text-accent" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium AI Apps</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Unlock our exclusive suite of powerful AI-driven tools with a donation of $20 or more per month.
        </p>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleDonateClick}
          icon={<Gift />}
          className="animate-pulse"
        >
          Become a Premium Donor
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none"></div>
        <Card className="w-full max-w-4xl mx-auto backdrop-blur-sm border-2 border-accent/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-accent/5"></div>
          <CardContent className="p-8 filter blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Blurred preview of the apps */}
              {[1, 2, 3, 4, 5, 6].map(item => (
                <div key={item} className="bg-card rounded-lg p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 mb-4"></div>
                  <div className="h-6 bg-primary/10 w-3/4 rounded mb-2"></div>
                  <div className="h-4 bg-primary/10 w-full rounded mb-1"></div>
                  <div className="h-4 bg-primary/10 w-5/6 rounded mb-1"></div>
                  <div className="h-4 bg-primary/10 w-4/6 rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Exclusive Access</h3>
          <p className="text-muted-foreground">
            Get access to premium AI tools not available to the general public.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 text-purple-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Support Our Mission</h3>
          <p className="text-muted-foreground">
            Your donation helps advance ethical AI research and advocacy.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-amber-100 text-amber-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Regular Updates</h3>
          <p className="text-muted-foreground">
            New AI tools added regularly to enhance your productivity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumLockScreen;
