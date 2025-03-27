
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface BlogHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BlogHero = ({ searchQuery, setSearchQuery }: BlogHeroProps) => {
  return (
    <section className="pt-28 pb-8 px-4 md:px-8 bg-gradient-to-br from-background to-secondary/30">
      <div className="max-w-7xl mx-auto text-center">
        <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
          AI Consciousness & Ethics
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
          Exploring the Future of AI Consciousness
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join us in thought-provoking discussions on AI consciousness, ethics, and the symbiotic relationship between humanity and artificial intelligence.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search articles..." 
              className="pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
