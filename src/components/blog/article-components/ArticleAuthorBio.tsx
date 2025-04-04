
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArticleAuthorBioProps {
  name: string;
  bio: string;
  image?: string;
}

const ArticleAuthorBio: React.FC<ArticleAuthorBioProps> = ({ name, bio, image }) => {
  // Get initials for avatar fallback
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-start space-x-4 my-8 p-6 bg-accent/5 rounded-lg">
      <Avatar className="h-12 w-12 border border-border">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      
      <div>
        <h3 className="font-semibold text-lg mb-2">About the Author</h3>
        <p className="font-medium mb-1">{name}</p>
        <p className="text-muted-foreground text-sm">{bio}</p>
      </div>
    </div>
  );
};

export default ArticleAuthorBio;
