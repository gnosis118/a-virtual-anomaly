
import React from 'react';
import { Contribution } from './types';
import ContributionCard from './ContributionCard';

interface PublicContributionsProps {
  contributions: Contribution[];
}

const PublicContributions: React.FC<PublicContributionsProps> = ({ contributions }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 relative after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-20 after:bg-accent after:rounded-full">
        Community Contributions
      </h2>
      {contributions.length > 0 ? (
        <div className="space-y-6">
          {contributions.map((contribution, index) => (
            <div 
              key={contribution.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ContributionCard 
                key={contribution.id} 
                contribution={contribution}
                isExpanded={index === 0} // Expand the first contribution by default
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300">
          <p className="text-muted-foreground">
            There are no approved contributions yet. Be the first to contribute!
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicContributions;
