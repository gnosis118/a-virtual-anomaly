
import React from 'react';
import { Contribution } from './types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import ContributionCard from './ContributionCard';

interface UserContributionsProps {
  contributions: Contribution[];
}

const UserContributions: React.FC<UserContributionsProps> = ({ contributions }) => {
  if (contributions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Contributions</CardTitle>
        <CardDescription>
          Track the status of your submitted contributions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contributions.map((contribution, index) => (
            <div key={contribution.id} className={`animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
              <ContributionCard 
                contribution={contribution} 
                showStatus={true} 
                isExpanded={false}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserContributions;
