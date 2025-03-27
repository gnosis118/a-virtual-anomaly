
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactHeader from '@/components/contact/ContactHeader';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import ContactFooter from '@/components/contact/ContactFooter';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-12">
        <ContactHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Contact Information */}
          <div className="md:col-span-2">
            <ContactInfo />
          </div>
          
          {/* Contact Form */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
        
        <ContactFooter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
