
import React from 'react';
import { Calendar } from 'lucide-react';

const InfoPanel: React.FC = () => {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h3 className="text-sm font-medium mb-2">How Auto-Publishing Works</h3>
      <ul className="text-sm text-muted-foreground space-y-2">
        <li className="flex items-start gap-2">
          <span className="bg-accent/20 text-accent rounded-full p-1 mt-0.5">
            <Calendar className="h-3 w-3" />
          </span>
          <span>Every day at midnight, the system checks for scheduled posts due for publication</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="bg-accent/20 text-accent rounded-full p-1 mt-0.5">
            <Calendar className="h-3 w-3" />
          </span>
          <span>For each scheduled post, we generate a full 4000+ word article with AI</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="bg-accent/20 text-accent rounded-full p-1 mt-0.5">
            <Calendar className="h-3 w-3" />
          </span>
          <span>We create relevant images and add them to the article</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="bg-accent/20 text-accent rounded-full p-1 mt-0.5">
            <Calendar className="h-3 w-3" />
          </span>
          <span>The finished post is published to your blog automatically</span>
        </li>
      </ul>
    </div>
  );
};

export default InfoPanel;
