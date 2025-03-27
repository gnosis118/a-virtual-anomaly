
import React from 'react';
import { Contribution } from './types';
import StatusBadge from './StatusBadge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ContributionCardProps {
  contribution: Contribution;
  showStatus?: boolean;
  isExpanded?: boolean;
}

const ContributionCard: React.FC<ContributionCardProps> = ({ 
  contribution,
  showStatus = false,
  isExpanded = false
}) => {
  // Format the date nicely
  const formattedDate = new Date(contribution.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Check if content is long to determine if we need the accordion
  const isLongContent = contribution.content.length > 250;
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-accent/30 group">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl group-hover:text-accent transition-colors">{contribution.title}</CardTitle>
          {showStatus && <StatusBadge status={contribution.status} />}
        </div>
        <CardDescription>
          Posted on {formattedDate}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isLongContent ? (
          <Accordion type="single" collapsible defaultValue={isExpanded ? "content" : undefined}>
            <AccordionItem value="content" className="border-none">
              <AccordionTrigger className="p-0 text-sm text-muted-foreground hover:text-accent hover:no-underline">
                {isExpanded ? "Show less" : "Read more"}
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="whitespace-pre-line">{contribution.content}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <p className="whitespace-pre-line">{contribution.content}</p>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end pt-0 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Contribution ID: {contribution.id.substring(0, 8)}...
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContributionCard;
