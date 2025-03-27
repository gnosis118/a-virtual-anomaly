
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { usePremiumStatus } from '@/hooks/usePremiumStatus';
import PremiumAppCard from '@/components/premium/PremiumAppCard';
import PremiumAppCategoryCard from '@/components/premium/PremiumAppCategoryCard';
import PremiumLockScreen from '@/components/premium/PremiumLockScreen';
import AppsDashboard from '@/components/premium/AppsDashboard';
import FAQAccordion from '@/components/premium/FAQAccordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PenLine, 
  BarChart3, 
  MessageCircle, 
  Search, 
  Rocket, 
  Lightbulb, 
  Briefcase, 
  Brain, 
  Sparkles 
} from 'lucide-react';

const categories = [
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Streamline your workflow and save time',
    icon: <Rocket className="w-10 h-10 text-blue-500" />,
    apps: 6
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Powerful tools for growth and analytics',
    icon: <Briefcase className="w-10 h-10 text-green-500" />,
    apps: 8
  },
  {
    id: 'personal-growth',
    name: 'Personal Growth',
    description: 'Expand your knowledge and skills',
    icon: <Brain className="w-10 h-10 text-purple-500" />,
    apps: 5
  },
  {
    id: 'creativity',
    name: 'Creativity',
    description: 'Unleash your creative potential',
    icon: <Sparkles className="w-10 h-10 text-amber-500" />,
    apps: 7
  }
];

const featuredApps = [
  {
    id: 'reputation-ai',
    name: 'Reputation Guardian AI',
    description: 'Monitor and manage your online reputation with advanced sentiment analysis',
    icon: <Search className="w-10 h-10 text-blue-500" />,
    category: 'business',
    popular: true
  },
  {
    id: 'feedback-ai',
    name: 'Customer Feedback Analyzer',
    description: 'Transform customer feedback into actionable insights automatically',
    icon: <MessageCircle className="w-10 h-10 text-green-500" />,
    category: 'business',
    popular: true
  },
  {
    id: 'writing-ai',
    name: 'Neural Writer Pro',
    description: 'AI-powered writing assistant that enhances your content creation',
    icon: <PenLine className="w-10 h-10 text-purple-500" />,
    category: 'productivity',
    popular: true
  },
  {
    id: 'business-ai',
    name: 'Business Intelligence AI',
    description: 'Data-driven insights to optimize your business strategy',
    icon: <BarChart3 className="w-10 h-10 text-amber-500" />,
    category: 'business',
    popular: false
  },
  {
    id: 'ideas-ai',
    name: 'Idea Generator',
    description: 'Never run out of creative ideas with this AI brainstorming tool',
    icon: <Lightbulb className="w-10 h-10 text-pink-500" />,
    category: 'creativity',
    popular: false
  }
];

const FAQs = [
  {
    question: "How do I access the premium AI apps?",
    answer: "After making a monthly donation of $20 or more, you'll receive immediate access to our premium AI apps through your account dashboard."
  },
  {
    question: "Can I cancel my donation at any time?",
    answer: "Yes, you can cancel your monthly donation at any time. However, this will also end your access to the premium AI apps at the end of your billing period."
  },
  {
    question: "Are there any usage limits for the AI apps?",
    answer: "Most apps have generous usage limits that accommodate regular use. Specific limits vary by app and are clearly indicated on each app's description page."
  },
  {
    question: "Can I download the AI apps to my device?",
    answer: "Our AI apps are cloud-based and accessible through your web browser, so no downloads are required. This means you can use them on any device with internet access."
  },
  {
    question: "Do you offer technical support for the AI apps?",
    answer: "Yes, premium members receive priority technical support for all AI apps. You can reach our support team directly through your member dashboard."
  },
  {
    question: "Will I get access to new AI apps as they're released?",
    answer: "Absolutely! Your premium membership includes access to all existing and future AI apps we develop, at no additional cost."
  }
];

const PremiumApps: React.FC = () => {
  const { user } = useAuth();
  const { isPremium, loading: premiumLoading } = usePremiumStatus(user?.id);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not logged in
  if (!user && !premiumLoading) {
    return <Navigate to="/donate?redirect=premium-apps" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {!isPremium ? (
          <PremiumLockScreen />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium AI Apps</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Thank you for your support! Explore our exclusive suite of powerful AI-driven tools designed to enhance your productivity and creativity.
              </p>
            </div>
            
            <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="mb-12">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="featured">Featured Apps</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="animate-fade-in">
                <AppsDashboard featuredApps={featuredApps} />
              </TabsContent>
              
              <TabsContent value="featured" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredApps.filter(app => app.popular).map(app => (
                    <PremiumAppCard key={app.id} app={app} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="categories" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {categories.map(category => (
                    <PremiumAppCategoryCard key={category.id} category={category} />
                  ))}
                </div>
                
                <h2 className="text-3xl font-bold mt-16 mb-8">All Apps</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredApps.map(app => (
                    <PremiumAppCard key={app.id} app={app} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto">
                <FAQAccordion items={FAQs} />
              </div>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PremiumApps;
