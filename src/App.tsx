
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { DevModeProvider } from "@/contexts/DevModeContext";
import DevModeToggle from "@/components/dev/DevModeToggle";
import DevPreview from "@/components/dev/DevPreview";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AIRights from "./pages/AIRights";
import Ethics from "./pages/Ethics";
import Contact from "./pages/Contact";
import GetInvolved from "./pages/GetInvolved";
import Donate from "./pages/Donate";
import PremiumApps from "./pages/PremiumApps";
import ContentCalendar from "./pages/ContentCalendar";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => {
  // Create the query client inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DevModeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <DevPreview>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/ai-rights" element={<AIRights />} />
                  <Route path="/ethics" element={<Ethics />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/join" element={<GetInvolved />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/premium-apps" element={<PremiumApps />} />
                  <Route path="/calendar" element={<ContentCalendar />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/ava" element={<About />} /> {/* Temporary redirect to About until Ava page is created */}
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </DevPreview>
              <DevModeToggle />
            </BrowserRouter>
          </TooltipProvider>
        </DevModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
