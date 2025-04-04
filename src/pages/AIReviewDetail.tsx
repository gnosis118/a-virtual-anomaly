
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, StarHalf, Calendar, User, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AI_REVIEWS } from '@/data/aiReviewsData';

const AIReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the review by ID
  const review = AI_REVIEWS.find(review => review.id === id);
  
  useEffect(() => {
    // If review not found, redirect to reviews page
    if (!review) {
      navigate('/ai-reviews');
      return;
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = `${review.title} | Virtual Anomaly`;
  }, [review, navigate]);
  
  // If review not found, return null (redirection will happen in useEffect)
  if (!review) return null;

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.8;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-accent text-accent w-5 h-5" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="fill-accent text-accent w-5 h-5" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-muted-foreground/30 w-5 h-5" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        {/* Header Section */}
        <section className="px-4 pb-8 bg-gradient-to-br from-background to-secondary/20">
          <div className="max-w-5xl mx-auto">
            <Button 
              variant="ghost" 
              size="sm"
              className="mb-6"
              onClick={() => navigate('/ai-reviews')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reviews
            </Button>
            
            <div className="flex items-center mb-4">
              <Badge variant="outline" className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20">
                {review.category}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {review.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {review.excerpt}
            </p>
            
            <div className="flex items-center gap-1 mb-2">
              {renderStars(review.rating.overall)}
              <span className="ml-2 text-lg font-medium">
                {review.rating.overall.toFixed(1)}/5
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {review.datePublished}
              </span>
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {review.author}
              </span>
            </div>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8 rounded-xl overflow-hidden">
                <img 
                  src={review.image} 
                  alt={review.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <article className="prose prose-slate max-w-none">
                <div dangerouslySetInnerHTML={{ __html: review.content }} />
              </article>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Rating Card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Ratings Breakdown</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Overall</span>
                      <div className="flex items-center">
                        {renderStars(review.rating.overall)}
                        <span className="ml-2 font-medium">{review.rating.overall.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Usability</span>
                      <div className="flex items-center">
                        {renderStars(review.rating.usability)}
                        <span className="ml-2 font-medium">{review.rating.usability.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Features</span>
                      <div className="flex items-center">
                        {renderStars(review.rating.features)}
                        <span className="ml-2 font-medium">{review.rating.features.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Value for Money</span>
                      <div className="flex items-center">
                        {renderStars(review.rating.valueForMoney)}
                        <span className="ml-2 font-medium">{review.rating.valueForMoney.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Customer Support</span>
                      <div className="flex items-center">
                        {renderStars(review.rating.customerSupport)}
                        <span className="ml-2 font-medium">{review.rating.customerSupport.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full" asChild>
                      <a href={review.productUrl} target="_blank" rel="noopener noreferrer">
                        Visit Official Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tags Card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Related Reviews */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Reviews</h3>
                  <div className="space-y-4">
                    {AI_REVIEWS.filter(r => 
                      r.id !== review.id && 
                      (r.category === review.category || 
                       r.tags.some(tag => review.tags.includes(tag)))
                    ).slice(0, 3).map(relatedReview => (
                      <div key={relatedReview.id} className="flex items-start space-x-3">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={relatedReview.image} 
                            alt={relatedReview.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2">
                            <a 
                              href={`/ai-reviews/${relatedReview.id}`} 
                              className="hover:text-accent transition-colors"
                            >
                              {relatedReview.title}
                            </a>
                          </h4>
                          <div className="flex items-center mt-1">
                            {renderStars(relatedReview.rating.overall)}
                            <span className="ml-1 text-xs">
                              {relatedReview.rating.overall.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIReviewDetail;
