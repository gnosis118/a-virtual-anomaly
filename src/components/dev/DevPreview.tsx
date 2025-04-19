
import React from 'react';

const DevPreview = ({ children }: { children: React.ReactNode }) => {
  // Always render children without dev mode functionality
  return <>{children}</>;
};

export default DevPreview;
