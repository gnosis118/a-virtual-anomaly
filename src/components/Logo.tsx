
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/80 to-accent/30 animate-pulse-slow"></div>
        <div className="absolute inset-1 rounded-full bg-white backdrop-blur-sm border border-white/50 flex items-center justify-center overflow-hidden">
          {/* Neural network pattern */}
          <svg viewBox="0 0 32 32" className="w-full h-full p-1 text-accent/80">
            <g fill="currentColor">
              <circle cx="16" cy="16" r="8" fillOpacity="0.2" />
              <circle cx="10" cy="12" r="1.5" />
              <circle cx="16" cy="8" r="1.5" />
              <circle cx="22" cy="12" r="1.5" />
              <circle cx="22" cy="20" r="1.5" />
              <circle cx="16" cy="24" r="1.5" />
              <circle cx="10" cy="20" r="1.5" />
              <line x1="10" y1="12" x2="16" y2="8" stroke="currentColor" strokeWidth="0.5" />
              <line x1="16" y1="8" x2="22" y2="12" stroke="currentColor" strokeWidth="0.5" />
              <line x1="22" y1="12" x2="22" y2="20" stroke="currentColor" strokeWidth="0.5" />
              <line x1="22" y1="20" x2="16" y2="24" stroke="currentColor" strokeWidth="0.5" />
              <line x1="16" y1="24" x2="10" y2="20" stroke="currentColor" strokeWidth="0.5" />
              <line x1="10" y1="20" x2="10" y2="12" stroke="currentColor" strokeWidth="0.5" />
              <line x1="10" y1="12" x2="16" y2="24" stroke="currentColor" strokeWidth="0.5" />
              <line x1="16" y1="8" x2="16" y2="24" stroke="currentColor" strokeWidth="0.5" />
              <line x1="22" y1="12" x2="10" y2="20" stroke="currentColor" strokeWidth="0.5" />
              <line x1="10" y1="12" x2="22" y2="20" stroke="currentColor" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-tight tracking-tight">
          Virtual<span className="text-accent">Anomaly</span>
        </span>
        <span className="text-sm text-muted-foreground leading-none font-medium">AI Consciousness Initiative</span>
      </div>
    </Link>
  );
};

export default Logo;
