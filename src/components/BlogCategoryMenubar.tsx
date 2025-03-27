
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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
    <div className="w-full mb-8 mt-8 border-b border-t py-2 bg-background/80 backdrop-blur-sm sticky top-16 z-30">
      <div className="max-w-7xl mx-auto">
        <NavigationMenu className="justify-start w-full max-w-full">
          <NavigationMenuList className="flex-wrap justify-start w-full">
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn(
                  navigationMenuTriggerStyle(),
                  !selectedCategory ? "bg-accent text-accent-foreground" : ""
                )}
                onClick={() => onCategorySelect('')}
              >
                All Categories
              </NavigationMenuLink>
            </NavigationMenuItem>

            {Object.entries(categoryGroups).map(([groupName, groupCategories]) => (
              <NavigationMenuItem key={groupName} className="relative">
                <NavigationMenuTrigger>
                  {groupName}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-0 top-full">
                  <ul className="grid w-[300px] gap-1 p-2">
                    {groupCategories.map(category => (
                      <li key={category} className="w-full">
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => onCategorySelect(category)}
                            className={cn(
                              "w-full block select-none space-y-1 rounded-md p-3 text-left leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                              selectedCategory === category ? "bg-accent text-accent-foreground" : ""
                            )}
                          >
                            <div className="text-sm font-medium leading-none">{category}</div>
                          </button>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default BlogCategoryMenubar;
