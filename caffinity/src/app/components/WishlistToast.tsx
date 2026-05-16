'use client';

import React, { useEffect, useState } from 'react';

interface WishlistToastProps {
  cafeName: string;
}

export default function WishlistToast({ cafeName }: WishlistToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setVisible(false), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="fixed bottom-24 left-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl"
      style={{
        transform: `translateX(-50%) translateY(${visible ? '0' : '20px'})`,
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        background: 'var(--primary)',
        boxShadow: '0 8px 32px rgba(82,44,93,0.4)',
        whiteSpace: 'nowrap',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
      </svg>
      <span className="text-white text-sm font-semibold">
        {cafeName} guardado en tu lista
      </span>
    </div>
  );
}