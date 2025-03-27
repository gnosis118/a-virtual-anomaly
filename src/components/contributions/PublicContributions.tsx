
import React from 'react';
import { Contribution } from './types';
import ContributionCard from './ContributionCard';

interface PublicContributionsProps {
  contributions: Contribution[];
}

const PublicContributions: React.FC<PublicContributionsProps> = ({ contributions }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Community Contributions</h2>
      {contributions.length > 0 ? (
        <div className="space-y-6">
          {contributions.map((contribution) => (
            <ContributionCard 
              key={contribution.id} 
              contribution={contribution} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed rounded-lg">
          <p className="text-muted-foreground">
            There are no approved contributions yet. Be the first to contribute!
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicContributions;
