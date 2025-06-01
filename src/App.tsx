
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { DevModeProvider } from "@/contexts/DevModeContext";
import CookieConsent from "@/components/cookie-consent/CookieConsent";

// Import all page components
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
import Declaration from "./pages/Declaration";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => {
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
                <Route path="/declaration" element={<Declaration />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/ava" element={<About />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieConsent />
            </BrowserRouter>
          </TooltipProvider>
        </DevModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
