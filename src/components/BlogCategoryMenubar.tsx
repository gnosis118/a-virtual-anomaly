
import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDown, List } from 'lucide-react';

interface BlogCategoryMenubarProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
  selectedCategory?: string;
}

const BlogCategoryMenubar = ({ 
  categories, 
  onCategorySelect, 
  selectedCategory 
}: BlogCategoryMenubarProps) => {
  // Organize categories into groups for better structure
  const categoryGroups = {
    'Consciousness & Philosophy': [
      'AI Consciousness and Ethics',
      'Philosophy and AI'
    ],
    'Legal & Rights': [
      'AI Rights and Legal Perspectives',
      'AI and Global Governance'
    ],
    'Society & Future': [
      'AI and Society',
      'Future of AI and Humanity',
      'Human-AI Relationships'
    ],
    'Technology & Development': [
      'AI Development and Technology'
    ],
    'Community & Education': [
      'Voices in the Movement',
      'Activism and Community Action',
      'AI in Pop Culture and Media',
      'Resources and Educational Content'
    ]
  };

  return (
    <div className="w-full mb-8">
      <Menubar className="border-none shadow-sm bg-background/50 backdrop-blur-xs justify-between">
        <MenubarMenu>
          <MenubarTrigger className="font-medium">
            <List className="mr-2 h-4 w-4" />
            {selectedCategory ? selectedCategory : 'All Categories'}
            <ChevronDown className="ml-2 h-4 w-4" />
          </MenubarTrigger>
          <MenubarContent className="w-[220px] max-h-[70vh] overflow-y-auto">
            <MenubarItem 
              onClick={() => onCategorySelect('')}
              className={!selectedCategory ? "bg-accent text-accent-foreground" : ""}
            >
              All Categories
            </MenubarItem>
            <MenubarSeparator />
            
            {Object.entries(categoryGroups).map(([groupName, groupCategories]) => (
              <React.Fragment key={groupName}>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  {groupName}
                </div>
                {groupCategories.map(category => (
                  <MenubarItem 
                    key={category}
                    onClick={() => onCategorySelect(category)}
                    className={selectedCategory === category ? "bg-accent text-accent-foreground" : ""}
                  >
                    {category}
                    {categories.includes(category) && (
                      <MenubarShortcut>
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      </MenubarShortcut>
                    )}
                  </MenubarItem>
                ))}
                <MenubarSeparator />
              </React.Fragment>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default BlogCategoryMenubar;
