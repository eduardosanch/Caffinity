import React from 'react';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
}

export default function AppLayout({ children, hideBottomNav = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <main className={`flex-1 ${!hideBottomNav ? 'pb-20' : ''}`}>
        {children}
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}