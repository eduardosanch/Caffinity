'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const navItems = [
  {
    key: 'nav-descubrimiento',
    href: '/',
    label: 'Descubrir',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--primary)' : 'none'} stroke={active ? 'var(--primary)' : 'var(--muted-foreground)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    key: 'nav-feed',
    href: '/feed-de-descubrimiento',
    label: 'Feed',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--primary)' : 'var(--muted-foreground)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" fill={active ? 'var(--primary)' : 'none'}/>
        <rect x="14" y="3" width="7" height="7" rx="1" fill={active ? 'var(--primary)' : 'none'}/>
        <rect x="3" y="14" width="7" height="7" rx="1" fill={active ? 'var(--primary)' : 'none'}/>
        <rect x="14" y="14" width="7" height="7" rx="1" fill={active ? 'var(--primary)' : 'none'}/>
      </svg>
    ),
  },
  {
    key: 'nav-perfil',
    href: '/perfil-de-usuario',
    label: 'Perfil',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--primary)' : 'none'} stroke={active ? 'var(--primary)' : 'var(--muted-foreground)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bottom-nav-blur border-t border-border"
      style={{ boxShadow: '0 -4px 24px rgba(82, 44, 93, 0.08)' }}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-screen-sm mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.key}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all duration-200 active:scale-95"
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`transition-all duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}>
                {item.icon(isActive)}
              </span>
              <span
                className="text-[10px] font-semibold tracking-wide transition-colors duration-200"
                style={{ color: isActive ? 'var(--primary)' : 'var(--muted-foreground)' }}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-1 w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--primary)' }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}