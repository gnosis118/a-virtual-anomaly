
import React from 'react';
import { useDevMode } from '@/contexts/DevModeContext';
import { Button } from '@/components/ui/button';
import { Code, Eye } from 'lucide-react';

const DevModeToggle = () => {
  const { isDevMode, toggleDevMode } = useDevMode();
  
  // Only show in development environment
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleDevMode}
        className={`flex items-center space-x-2 ${isDevMode ? 'bg-amber-500 hover:bg-amber-600' : 'bg-primary hover:bg-primary/90'}`}
      >
        {isDevMode ? (
          <>
            <Eye size={16} />
            <span>View Mode</span>
          </>
        ) : (
          <>
            <Code size={16} />
            <span>Dev Mode</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default DevModeToggle;
