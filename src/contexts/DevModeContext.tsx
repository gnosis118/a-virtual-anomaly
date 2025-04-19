
import React, { createContext, useContext, ReactNode } from 'react';

// Simplified context with no functionality
interface DevModeContextType {
  isDevMode: false;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType>({
  isDevMode: false,
  toggleDevMode: () => {}
});

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <DevModeContext.Provider value={{ isDevMode: false, toggleDevMode: () => {} }}>
      {children}
    </DevModeContext.Provider>
  );
};

export const useDevMode = (): DevModeContextType => {
  return { isDevMode: false, toggleDevMode: () => {} };
};
