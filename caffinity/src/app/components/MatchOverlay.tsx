'use client';

import React, { useEffect, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { type Cafeteria } from './cafeterias-data';

interface MatchOverlayProps {
  cafe: Cafeteria;
  onClose: () => void;
}

export default function MatchOverlay({ cafe, onClose }: MatchOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        background: 'rgba(21,0,22,0.88)',
        backdropFilter: 'blur(12px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="¡Es un match!"
    >
      <div
        className="relative w-full max-w-xs rounded-3xl overflow-hidden text-center"
        style={{
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(40px)',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          boxShadow: '0 24px 80px rgba(82,44,93,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background image */}
        <div className="relative h-64">
          <AppImage
            src={cafe.imagen}
            alt={cafe.imagenAlt}
            fill
            className="object-cover"
            sizes="320px"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(82,44,93,0.7) 0%, transparent 50%, rgba(21,0,22,0.9) 100%)' }} />

          {/* Match title */}
          <div className="absolute top-6 left-0 right-0 text-center">
            <div className="text-5xl mb-1">☕</div>
            <h2 className="text-white font-extrabold text-3xl tracking-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
              ¡Es un match!
            </h2>
            <p className="text-white/80 text-sm font-medium mt-1">
              Te encantó esta cafetería
            </p>
          </div>
        </div>

        {/* Info section */}
        <div className="p-5" style={{ background: 'white' }}>
          <h3 className="font-extrabold text-lg mb-0.5" style={{ color: 'var(--foreground)' }}>
            {cafe.nombre}
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
            {cafe.zona} · {cafe.distancia}
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className="flex-1 py-3 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95"
              style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
            >
              Seguir viendo
            </button>
            <button
              className="flex-1 py-3 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--muted-rose))', color: 'white' }}
              onClick={handleClose}
            >
              Ver cafetería
            </button>
          </div>
        </div>
      </div>

      {/* Confetti particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { key: 'confetti-0', left: '10%', delay: '0s', color: '#E3B6B1', size: 8 },
          { key: 'confetti-1', left: '20%', delay: '0.1s', color: '#522C5D', size: 6 },
          { key: 'confetti-2', left: '35%', delay: '0.15s', color: '#FFE3D8', size: 10 },
          { key: 'confetti-3', left: '50%', delay: '0.05s', color: '#845162', size: 7 },
          { key: 'confetti-4', left: '65%', delay: '0.2s', color: '#E3B6B1', size: 9 },
          { key: 'confetti-5', left: '78%', delay: '0.08s', color: '#29104A', size: 5 },
          { key: 'confetti-6', left: '88%', delay: '0.12s', color: '#522C5D', size: 8 },
        ].map((p) => (
          <div
            key={p.key}
            className="absolute top-0 rounded-sm animate-bounce"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationDelay: p.delay,
              animationDuration: '1s',
              transform: `rotate(${p.size * 10}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}