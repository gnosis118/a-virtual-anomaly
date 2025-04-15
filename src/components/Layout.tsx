
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
