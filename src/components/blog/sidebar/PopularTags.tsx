
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from 'lucide-react';

interface PopularTagsProps {
  tags: string[];
  onTagSelect: (tag: string) => void;
}

const PopularTags: React.FC<PopularTagsProps> = ({ tags, onTagSelect }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Tag className="h-5 w-5 text-accent" />
          Popular Tags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className="bg-secondary/30 hover:bg-accent/20 px-3 py-1 rounded-full text-sm transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularTags;
