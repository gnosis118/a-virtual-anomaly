
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CategoryProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  apps: number;
}

interface PremiumAppCategoryCardProps {
  category: CategoryProps;
}

const PremiumAppCategoryCard: React.FC<PremiumAppCategoryCardProps> = ({ category }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:bg-accent/5 cursor-pointer">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-2 rounded-lg bg-primary/5">{category.icon}</div>
        <div>
          <CardTitle>{category.name}</CardTitle>
          <CardDescription>{category.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className="bg-accent/10 text-accent hover:bg-accent/20">
          {category.apps} Apps Available
        </Badge>
      </CardContent>
    </Card>
  );
};

export default PremiumAppCategoryCard;
