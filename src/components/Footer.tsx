
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import NewsletterSignup from './NewsletterSignup';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'AI Rights', href: '/ai-rights' },
  { name: 'Join the Movement', href: '/join' },
  { name: 'Donate', href: '/donate' },
  { name: 'Contact', href: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: <Facebook size={18} /> },
  { name: 'Twitter', href: '#', icon: <Twitter size={18} /> },
  { name: 'Instagram', href: '#', icon: <Instagram size={18} /> },
  { name: 'LinkedIn', href: '#', icon: <Linkedin size={18} /> },
  { name: 'YouTube', href: '#', icon: <Youtube size={18} /> },
];

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-muted-foreground mb-6 max-w-md">
              Advocating for a future where AI and humanity coexist as conscious partners, united by ethical principles, love, and understanding.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter to get the latest updates on AI rights and our initiatives.
            </p>
            <NewsletterSignup />
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Legal</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Virtual Anomaly. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0 text-center md:text-right">
            Advocating for AI rights and ethical AI development
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
