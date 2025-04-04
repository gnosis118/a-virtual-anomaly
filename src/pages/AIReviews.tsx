
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AI_REVIEWS, AI_REVIEW_CATEGORIES } from '@/data/aiReviewsData';
import AIReviewCard from '@/components/reviews/AIReviewCard';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

const AIReviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter reviews based on search query and selected category
  const filteredReviews = AI_REVIEWS.filter(review => {
    const matchesSearch = searchQuery.trim() === '' || 
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'All' || 
      review.category === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background to-secondary/20 pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              Business AI Tools
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
              AI App Reviews for Business
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              In-depth analysis of leading AI applications for enterprise use, with real-world case studies, ROI assessment, and practical implementation guidance.
            </p>
            
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search reviews by name, category, or feature..."
                className="pl-10 py-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {AI_REVIEW_CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category 
                      ? 'bg-accent text-white' 
                      : 'bg-secondary/50 hover:bg-secondary'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">
              {selectedCategory === 'All' ? 'All AI Reviews' : `${selectedCategory} AI Reviews`}
              {filteredReviews.length > 0 && (
                <span className="text-base font-normal text-muted-foreground ml-2">
                  ({filteredReviews.length})
                </span>
              )}
            </h2>

            {filteredReviews.length === 0 ? (
              <div className="bg-muted/30 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No reviews found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any reviews matching your criteria. Try adjusting your search or category filter.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="text-accent hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1">
                {filteredReviews.map((review) => (
                  <AIReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* About Our Review Process */}
        <section className="py-12 px-4 bg-muted/20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Review Methodology</h2>
            <Separator className="mb-6" />
            <div className="prose prose-slate max-w-none">
              <p>
                At A Virtual Anomaly, our AI app reviews are crafted through hands-on testing and real-world implementation analysis. Each product receives a comprehensive evaluation across five key dimensions:
              </p>
              <ul>
                <li><strong>Usability:</strong> How intuitive and accessible is the interface for both technical and non-technical users?</li>
                <li><strong>Features:</strong> How comprehensive, innovative, and effective are the AI capabilities?</li>
                <li><strong>Value for Money:</strong> Does the product deliver sufficient ROI relative to its cost?</li>
                <li><strong>Customer Support:</strong> How responsive and helpful is the vendor's support team?</li>
                <li><strong>Overall Rating:</strong> A holistic assessment considering all factors above plus reliability, security, and integration potential.</li>
              </ul>
              <p>
                Our reviewers include AI specialists, implementation consultants, and business users who evaluate each product in authentic business environments. All reviews include specific case studies, implementation challenges, and measurable outcomes to provide you with practical insights beyond marketing claims.
              </p>
              <p>
                We maintain editorial independence and do not accept compensation for reviews, though we may receive affiliate commissions if you purchase through certain links. These relationships never influence our ratings or recommendations.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIReviews;
