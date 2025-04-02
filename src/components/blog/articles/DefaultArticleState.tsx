
import React from 'react';
import Button from '@/components/Button';

interface DefaultArticleStateProps {
  onGenerateClick: () => void;
}

const DefaultArticleState: React.FC<DefaultArticleStateProps> = ({ onGenerateClick }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-6">This article hasn't been generated yet.</p>
        <Button
          href="#"
          variant="outline"
          onClick={onGenerateClick}
        >
          Generate Article
        </Button>
      </div>
    </div>
  );
};

export default DefaultArticleState;
