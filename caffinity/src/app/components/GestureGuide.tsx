'use client';

import React, { useEffect, useState } from 'react';

interface GestureGuideProps {
  onDismiss: () => void;
}

export default function GestureGuide({ onDismiss }: GestureGuideProps) {
  const [visible, setVisible] = useState(false);
  const [animPhase, setAnimPhase] = useState<'right' | 'left' | 'center'>('center');

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const sequence = [
      setTimeout(() => setAnimPhase('right'), 800),
      setTimeout(() => setAnimPhase('center'), 1400),
      setTimeout(() => setAnimPhase('left'), 2000),
      setTimeout(() => setAnimPhase('center'), 2600),
    ];
    return () => sequence.forEach(clearTimeout);
  }, [visible]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 250);
  };

  const handTranslate =
    animPhase === 'right' ? 'translateX(32px)' :
    animPhase === 'left' ? 'translateX(-32px)' :
    'translateX(0)';

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{
        background: 'rgba(21,0,22,0.72)',
        backdropFilter: 'blur(8px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Guía de gestos"
    >
      <div
        className="flex flex-col items-center gap-6 px-8 text-center"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Gesture animation */}
        <div className="relative flex items-center gap-8">
          {/* Left arrow */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(248,113,113,0.25)', border: '2px solid #f87171' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-white/70">Pasar</span>
          </div>

          {/* Hand icon */}
          <div
            style={{
              transform: handTranslate,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <div className="text-4xl">👆</div>
          </div>

          {/* Right arrow */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(74,222,128,0.25)', border: '2px solid #4ade80' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#4ade80" stroke="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-white/70">Me gusta</span>
          </div>
        </div>

        {/* Text */}
        <div>
          <h3 className="text-white font-extrabold text-xl mb-2">¿Cómo funciona?</h3>
          <p className="text-white/75 text-sm leading-relaxed max-w-xs">
            Desliza a la <strong className="text-white">derecha</strong> si te gusta la cafetería, o a la <strong className="text-white">izquierda</strong> para pasar. ¡Guarda las favoritas con el marcador!
          </p>
        </div>

        {/* Wishlist hint */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
          style={{ background: 'rgba(82,44,93,0.4)', border: '1px solid rgba(227,182,177,0.3)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E3B6B1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
          </svg>
          <span className="text-sm font-medium" style={{ color: '#E3B6B1' }}>
            Usa el marcador para guardar en tu lista de deseos
          </span>
        </div>

        <button
          onClick={handleDismiss}
          className="px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95"
          style={{ background: 'linear-gradient(135deg, var(--primary), var(--muted-rose))', color: 'white' }}
        >
          ¡Entendido, a explorar! ☕
        </button>
      </div>
    </div>
  );
}