
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Star, Clock, Heart } from 'lucide-react';
import PremiumAppCard from './PremiumAppCard';

interface AppProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  popular: boolean;
}

interface AppsDashboardProps {
  featuredApps: AppProps[];
}

const AppsDashboard: React.FC<AppsDashboardProps> = ({ featuredApps }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredApps = featuredApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome to Your AI Apps Dashboard</CardTitle>
          <CardDescription>
            Discover and use powerful AI tools to enhance your productivity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for apps..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Apps</TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> Favorites
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> Recent
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex items-center gap-1">
                <Star className="h-4 w-4" /> Popular
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {searchQuery && filteredApps.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No apps match your search criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredApps.map(app => (
                    <PremiumAppCard key={app.id} app={app} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-0">
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Favorite apps will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Recently used apps will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.filter(app => app.popular).map(app => (
                  <PremiumAppCard key={app.id} app={app} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-green-600 font-medium mb-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              Premium Active
            </div>
            <p className="text-sm text-muted-foreground">
              Your premium membership is active and current.
              Thank you for your continued support!
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Usage Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Monthly API requests: 103/1000
            </p>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div className="bg-accent h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground">
              Resets on: April 30, 2023
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our support team is available to assist you with any questions about the premium AI tools.
            </p>
            <a 
              href="/contact" 
              className="text-accent hover:underline text-sm mt-2 inline-block"
            >
              Contact Support
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppsDashboard;
