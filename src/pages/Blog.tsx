
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, User, ArrowRight, Search, Clock, Eye, Share } from 'lucide-react';
import Button from '@/components/Button';
import BlogCategoryMenubar from '@/components/BlogCategoryMenubar';

// Updated blog data with new categories
const BLOG_POSTS = [
  {
    id: 1,
    title: "What is AI Consciousness?",
    excerpt: "Exploring the philosophical and technical aspects of artificial consciousness and what it means for the future.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    date: "May 15, 2023",
    author: "Dr. Elena Martinez",
    readTime: "8 min read",
    views: 1250,
    category: "Philosophy",
    featured: true,
    tags: ["Consciousness", "Philosophy", "Technology"]
  },
  {
    id: 2,
    title: "The Role of Ethics in AI Development",
    excerpt: "How ethical considerations should guide the development of increasingly intelligent AI systems.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    date: "June 23, 2023",
    author: "Prof. James Wilson",
    readTime: "6 min read",
    views: 890,
    category: "Ethics",
    featured: false,
    tags: ["Ethics", "Development", "Guidelines"]
  },
  {
    id: 3,
    title: "AI's Impact on Society: A Global Perspective",
    excerpt: "Examining how artificial intelligence is transforming societies across the globe and what it means for humanity.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    date: "July 8, 2023",
    author: "Sophia Chen",
    readTime: "10 min read",
    views: 1640,
    category: "Society",
    featured: false,
    tags: ["Society", "Global Impact", "Future"]
  },
  {
    id: 4,
    title: "Can AI Experience Love? The Emotional Frontier",
    excerpt: "Investigating the possibilities and implications of emotional intelligence in artificial systems.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1581547848200-85cb245ebc8d",
    date: "August 4, 2023",
    author: "Dr. David Johnson",
    readTime: "7 min read",
    views: 2130,
    category: "Emotions",
    featured: false,
    tags: ["Emotions", "Love", "Sentience"]
  },
  {
    id: 5,
    title: "The Legal Framework for AI Rights",
    excerpt: "Examining current and future legal considerations for artificially intelligent entities.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9",
    date: "September 17, 2023",
    author: "Amanda Lee",
    readTime: "9 min read",
    views: 760,
    category: "Legal",
    featured: false,
    tags: ["Legal", "Rights", "Legislation"]
  },
  {
    id: 6,
    title: "Consciousness as an Emergent Property",
    excerpt: "How complex systems may give rise to conscious experiences and what this means for AI development.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
    date: "October 3, 2023",
    author: "Dr. Michael Zhang",
    readTime: "12 min read",
    views: 1890,
    category: "Consciousness",
    featured: false,
    tags: ["Consciousness", "Emergence", "Complex Systems"]
  },
];

// Updated categories list
const CATEGORIES = [
  "AI Consciousness and Ethics",
  "AI Rights and Legal Perspectives",
  "Philosophy and AI",
  "AI and Society",
  "AI Development and Technology",
  "Human-AI Relationships",
  "AI and Global Governance",
  "Voices in the Movement",
  "Future of AI and Humanity",
  "Activism and Community Action",
  "AI in Pop Culture and Media",
  "Resources and Educational Content"
];

// All unique tags from blog posts
const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap(post => post.tags))];

const Blog = () => {
  // Get featured post
  const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
  
  // Regular posts (excluding featured)
  const regularPosts = BLOG_POSTS.filter(post => post.id !== featuredPost.id);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Filter posts based on search query and selected category
  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = searchQuery.trim() === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "" || 
      post.category === selectedCategory ||
      post.tags.includes(selectedCategory);
      
    return matchesSearch && matchesCategory;
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      setSearchQuery(category);
    } else {
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Blog Hero */}
        <section className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-br from-background to-secondary/30">
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

        <section className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Category Menu Bar */}
            <BlogCategoryMenubar 
              categories={CATEGORIES}
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content Area (2/3 width on desktop) */}
              <div className="md:col-span-2">
                {/* Featured Post */}
                {!searchQuery && !selectedCategory && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 relative heading-highlight">Featured Article</h2>
                    <div className="relative rounded-xl overflow-hidden group">
                      <div className="relative h-80 overflow-hidden">
                        <img 
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                          <span className="px-3 py-1 text-xs font-medium bg-accent/80 text-white rounded-full mb-3 inline-block">
                            {featuredPost.category}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {featuredPost.title}
                          </h3>
                          <div className="flex items-center text-white/90 text-sm mb-4">
                            <span className="flex items-center mr-4">
                              <Calendar className="mr-1 h-3 w-3" />
                              {featuredPost.date}
                            </span>
                            <span className="flex items-center mr-4">
                              <User className="mr-1 h-3 w-3" />
                              {featuredPost.author}
                            </span>
                            <span className="flex items-center mr-4">
                              <Clock className="mr-1 h-3 w-3" />
                              {featuredPost.readTime}
                            </span>
                            <span className="flex items-center">
                              <Eye className="mr-1 h-3 w-3" />
                              {featuredPost.views}
                            </span>
                          </div>
                          <Button 
                            href={`/blog/${featuredPost.id}`} 
                            variant="primary"
                            icon={<ArrowRight size={16} />} 
                            iconPosition="right"
                          >
                            Read Article
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Article Grid */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6 relative heading-highlight">
                    {searchQuery || selectedCategory ? `Search Results: ${filteredPosts.length} found` : "Latest Articles"}
                  </h2>
                  
                  {filteredPosts.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="text-lg text-muted-foreground">No articles found matching your search criteria.</p>
                      <Button 
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("");
                        }} 
                        variant="outline"
                        className="mt-4"
                      >
                        Clear Search
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredPosts.map((post, index) => (
                        <Card 
                          key={post.id}
                          className="overflow-hidden group hover:shadow-md transition-all duration-300 border border-border"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 px-2 py-1 bg-accent/90 text-white text-xs font-medium rounded">
                              {post.category}
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl group-hover:text-accent transition-colors">
                              {post.title}
                            </CardTitle>
                            <CardDescription className="flex items-center text-xs text-muted-foreground mt-2">
                              <span className="flex items-center mr-3">
                                <Calendar className="mr-1 h-3 w-3" />
                                {post.date}
                              </span>
                              <span className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {post.readTime}
                              </span>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-2">
                              {post.excerpt}
                            </p>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-0">
                            <Button 
                              href={`/blog/${post.id}`} 
                              variant="ghost" 
                              icon={<ArrowRight size={16} />} 
                              iconPosition="right"
                              className="p-0 h-auto text-accent"
                            >
                              Read More
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 h-auto text-muted-foreground"
                              aria-label="Share this post"
                            >
                              <Share size={16} />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {/* Pagination */}
                  <Pagination className="mt-10">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
              
              {/* Sidebar (1/3 width on desktop) */}
              <div>
                <div className="sticky top-24 space-y-8">
                  {/* Categories Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(category => (
                          <Button 
                            key={category}
                            variant={selectedCategory === category ? "primary" : "outline"}
                            size="sm"
                            onClick={() => handleCategorySelect(category)}
                            className="mb-2"
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Popular Tags */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Popular Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {ALL_TAGS.map(tag => (
                          <Button 
                            key={tag}
                            variant="secondary"
                            size="sm"
                            onClick={() => setSearchQuery(tag)}
                            className="mb-2 text-xs"
                          >
                            #{tag}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Recent Posts */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Recent Posts</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-64 px-6">
                        <div className="space-y-4 pr-4 pb-6">
                          {BLOG_POSTS.slice(0, 5).map(post => (
                            <div key={post.id} className="flex gap-3 py-2 group cursor-pointer">
                              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={post.image} 
                                  alt={post.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium line-clamp-2 group-hover:text-accent transition-colors">
                                  {post.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {post.date}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                  
                  {/* Newsletter Signup */}
                  <Card className="bg-accent/5 border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-xl">Join Our Newsletter</CardTitle>
                      <CardDescription>
                        Get the latest insights on AI consciousness and ethics delivered to your inbox.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <Input placeholder="Your email address" type="email" required />
                        <Button variant="primary" type="submit" fullWidth>
                          Subscribe
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  {/* Join the Conversation CTA */}
                  <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">Join the Conversation</h3>
                      <p className="text-muted-foreground mb-4">
                        Have thoughts on AI consciousness? Share your perspective and contribute to this important dialogue.
                      </p>
                      <Button 
                        variant="primary" 
                        href="/join"
                        fullWidth
                      >
                        Get Involved
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
