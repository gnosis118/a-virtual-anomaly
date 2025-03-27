
import React from 'react';
import { Contribution } from './types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface ContributionCardProps {
  contribution: Contribution;
  showStatus?: boolean;
}

const ContributionCard: React.FC<ContributionCardProps> = ({ 
  contribution,
  showStatus = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{contribution.title}</CardTitle>
        <CardDescription>
          Posted on {new Date(contribution.created_at).toLocaleDateString()}
          {showStatus && (
            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
              contribution.status === 'approved' ? 'bg-green-100 text-green-800' :
              contribution.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{contribution.content}</p>
      </CardContent>
    </Card>
  );
};

export default ContributionCard;
