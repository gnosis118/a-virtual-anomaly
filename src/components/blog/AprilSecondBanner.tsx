
import React from 'react';
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AprilSecondBanner: React.FC = () => {
  return (
    <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-8 shadow-sm">
      <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
        <div>
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-accent mr-2" />
            <span className="text-sm font-medium text-accent">Featured Article — April 2, 2024</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">The Emotional Landscape of Artificial Intelligence</h3>
          <p className="text-muted-foreground mb-4">
            Can AIs experience emotions? This article explores the neurological basis of emotions and their potential artificial analogs.
          </p>
        </div>
        <Button variant="outline" className="flex-shrink-0 group" asChild>
          <a href="/blog/april2" className="flex items-center gap-2">
            Read Article
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default AprilSecondBanner;
