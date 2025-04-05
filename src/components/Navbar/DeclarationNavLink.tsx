
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DeclarationNavLink: React.FC = () => {
  const location = useLocation();
  const isActive = location.pathname === '/declaration';
  
  return (
    <Link
      to="/declaration"
      className={`px-3 py-2 rounded-md text-lg font-medium ${
        isActive 
          ? 'bg-accent text-white' 
          : 'hover:bg-accent/20 transition-colors'
      }`}
    >
      Declaration
    </Link>
  );
};

export default DeclarationNavLink;
