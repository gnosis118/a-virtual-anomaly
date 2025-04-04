
import React from 'react';
import { Calendar, Star, StarHalf, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Review } from '@/types/reviews';

interface AIReviewCardProps {
  review: Review;
}

const AIReviewCard: React.FC<AIReviewCardProps> = ({ review }) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.8;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-accent text-accent w-4 h-4" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="fill-accent text-accent w-4 h-4" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-muted-foreground/30 w-4 h-4" />);
    }
    
    return stars;
  };

  return (
    <Card className="overflow-hidden border-border hover:shadow-md transition-shadow">
      <div className="md:flex">
        <div className="md:w-1/3 h-64 md:h-auto relative">
          <a href={`/ai-reviews/${review.id}`}>
            <img 
              src={review.image} 
              alt={review.title} 
              className="w-full h-full object-cover"
            />
          </a>
          <Badge 
            variant="secondary"
            className="absolute top-3 left-3 bg-black/70 text-white hover:bg-black/80"
          >
            {review.category}
          </Badge>
        </div>
        
        <CardContent className="p-6 md:p-8 md:w-2/3">
          <div className="flex items-center gap-1 mb-2">
            {renderStars(review.rating.overall)}
            <span className="ml-2 text-sm font-medium">
              {review.rating.overall.toFixed(1)}/5
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">
            <a href={`/ai-reviews/${review.id}`} className="hover:text-accent transition-colors">
              {review.title}
            </a>
          </h3>
          
          <p className="text-muted-foreground mb-6">
            {review.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {review.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center text-xs text-muted-foreground space-x-4">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {review.datePublished}
              </span>
              <span className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                {review.author}
              </span>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href={review.productUrl} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
              
              <Button size="sm" asChild>
                <a href={`/ai-reviews/${review.id}`} className="flex items-center gap-1">
                  Read Review
                  <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default AIReviewCard;
