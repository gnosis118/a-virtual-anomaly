
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ContributionStatus } from './types';

interface StatusBadgeProps {
  status: ContributionStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    approved: {
      variant: 'outline' as const,
      className: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900',
    },
    rejected: {
      variant: 'outline' as const,
      className: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:text-red-900',
    },
    pending: {
      variant: 'outline' as const,
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 hover:text-yellow-900',
    },
  };

  const config = statusConfig[status];
  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge 
      variant={config.variant} 
      className={cn(config.className, 'animate-fade-in', className)}
    >
      {displayStatus}
    </Badge>
  );
};

export default StatusBadge;
