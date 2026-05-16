'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { type Cafeteria, actividadConfig } from '../../components/cafeterias-data';

interface CafeteriaCardProps {
  cafe: Cafeteria;
  tipo: 'deseos' | 'match';
}

export default function CafeteriaCard({ cafe, tipo }: CafeteriaCardProps) {
  const [removed, setRemoved] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    // Backend integration point: DELETE /api/users/me/wishlist/{cafeId} or /api/users/me/matches/{cafeId}
    setTimeout(() => setRemoved(true), 300);
  };

  if (removed) return null;

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-2xl transition-all duration-300"
      style={{
        background: 'white',
        border: '1.5px solid var(--border)',
        boxShadow: '0 2px 12px rgba(82,44,93,0.06)',
        opacity: removing ? 0 : 1,
        transform: removing ? 'translateX(-20px)' : 'translateX(0)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <AppImage
          src={cafe.imagen}
          alt={cafe.imagenAlt}
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h4 className="font-bold text-sm truncate" style={{ color: 'var(--foreground)' }}>
            {cafe.nombre}
          </h4>
          {cafe.destacada && (
            <span className="text-xs">✨</span>
          )}
        </div>
        <p className="text-xs mb-1.5 flex items-center gap-1" style={{ color: 'var(--muted-foreground)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {cafe.zona} · {cafe.distancia}
        </p>

        {/* Rating + precio */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={`${cafe.id}-pcard-star-${star}`}
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill={star <= Math.floor(cafe.calificacion) ? '#FFD700' : 'var(--border)'}
                stroke="none"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="text-xs font-semibold font-tabular" style={{ color: 'var(--foreground)' }}>
            {cafe.calificacion}
          </span>
          <span
            className="text-xs font-bold px-1.5 py-0.5 rounded-lg"
            style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
          >
            {cafe.precioRango}
          </span>
        </div>

        {/* Actividades pills */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {cafe.actividades.slice(0, 2).map((act) => (
            <span key={`${cafe.id}-pcard-act-${act}`} className="activity-pill-dark">
              {actividadConfig[act].emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1.5 flex-shrink-0">
        {/* Type badge */}
        <div
          className="flex items-center justify-center w-8 h-8 rounded-xl"
          style={{ background: tipo === 'match' ? 'rgba(244,63,94,0.10)' : 'rgba(82,44,93,0.08)' }}
        >
          {tipo === 'match' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f43f5e" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
            </svg>
          )}
        </div>

        {/* Remove button */}
        <button
          onClick={handleRemove}
          className="flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-150 active:scale-90"
          style={{ background: 'var(--muted)' }}
          aria-label={`Eliminar ${cafe.nombre} de ${tipo === 'match' ? 'matches' : 'lista de deseos'}`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
            <path d="M10 11v6"/>
            <path d="M14 11v6"/>
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}