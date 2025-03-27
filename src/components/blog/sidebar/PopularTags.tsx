
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from '@/components/Button';

interface PopularTagsProps {
  tags: string[];
  onTagSelect: (tag: string) => void;
}

const PopularTags: React.FC<PopularTagsProps> = ({ tags, onTagSelect }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Popular Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Button 
              key={tag}
              variant="secondary"
              size="sm"
              onClick={() => onTagSelect(tag)}
              className="mb-2 text-xs"
            >
              #{tag}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularTags;
