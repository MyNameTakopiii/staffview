'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 text-xs border-t border-border bg-card/40 text-text-muted transition-colors">
      <p>© {new Date().getFullYear()} Agnos Healthcare Portal. All rights reserved.</p>
    </footer>
  );
};
