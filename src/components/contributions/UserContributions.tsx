
import React from 'react';
import { Contribution } from './types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

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
          {contributions.map((contribution) => (
            <div key={contribution.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{contribution.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  contribution.status === 'approved' ? 'bg-green-100 text-green-800' :
                  contribution.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {contribution.content}
              </p>
              <p className="text-xs text-muted-foreground">
                Submitted on {new Date(contribution.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserContributions;
