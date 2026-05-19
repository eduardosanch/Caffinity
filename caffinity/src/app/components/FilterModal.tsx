'use client';

import React, { useState } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (radius: number) => void;
  initialRadius: number;
}

export default function FilterModal({ isOpen, onClose, onApply, initialRadius }: FilterModalProps) {
  const [radius, setRadius] = useState(initialRadius);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setRadius(initialRadius);
      const t = setTimeout(() => setVisible(true), 30);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [isOpen, initialRadius]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleApply = () => {
    onApply(radius);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: `rgba(21,0,22,${visible ? 0.65 : 0})`,
        backdropFilter: visible ? 'blur(8px)' : 'blur(0px)',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Filtrar cafeterías"
    >
      <div
        className="w-full max-w-lg rounded-t-3xl overflow-hidden"
        style={{
          background: 'white',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border)' }} />
        </div>

        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-extrabold text-lg" style={{ color: 'var(--foreground)' }}>
              Filtrar cafeterías
            </h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90"
              style={{ background: 'var(--muted)' }}
              aria-label="Cerrar filtros"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Filter Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>
                Radio de búsqueda
              </label>
              <div
                className="px-3.5 py-1.5 rounded-full text-sm font-bold"
                style={{ background: 'rgba(82,44,93,0.10)', color: 'var(--primary)' }}
              >
                {radius} km
              </div>
            </div>

            {/* Slider */}
            <div className="py-6">
              <input
                type="range"
                min="2"
                max="80"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${((radius - 2) / 78) * 100}%, var(--border) ${((radius - 2) / 78) * 100}%, var(--border) 100%)`,
                }}
                aria-label="Radio de búsqueda en kilómetros"
              />
            </div>

            {/* Range labels */}
            <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <span className="font-medium">2 km</span>
              <span className="font-medium">80 km</span>
            </div>
          </div>

          {/* Info text */}
          <p className="text-xs text-center mb-6" style={{ color: 'var(--muted-foreground)' }}>
            Mostrará cafeterías en un radio de {radius} km desde tu ubicación
          </p>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--muted-rose))', color: 'white' }}
          >
            Aplicar filtros
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleClose}
            className="w-full py-3 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95 mt-2"
            style={{ background: 'var(--muted)', color: 'var(--foreground)' }}
          >
            Cancelar
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(82, 44, 93, 0.3);
          border: 3px solid var(--primary);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(82, 44, 93, 0.3);
          border: 3px solid var(--primary);
        }

        .slider-thumb::-webkit-slider-runnable-track {
          background: transparent;
          height: 8px;
          border-radius: 4px;
        }

        .slider-thumb::-moz-range-track {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
}
