'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { type Resena } from './perfil-data';

interface ResenaCardProps {
  resena: Resena;
}

export default function ResenaCard({ resena }: ResenaCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(resena.texto);
  const MAX_LEN = 120;
  const isLong = editedText.length > MAX_LEN;
  const displayText = expanded || !isLong ? editedText : editedText.slice(0, MAX_LEN) + '…';

  const fechaFormateada = (() => {
    const [y, m, d] = resena.fecha.split('-');
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${d} ${meses[parseInt(m, 10) - 1]} ${y}`;
  })();

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: 'white',
        border: '1.5px solid var(--border)',
        boxShadow: '0 2px 12px rgba(82,44,93,0.06)',
      }}
    >
      {/* Café header */}
      <div className="flex items-center gap-3 p-3 pb-0">
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
          <AppImage
            src={resena.cafeteria.imagen}
            alt={resena.cafeteria.imagenAlt}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate" style={{ color: 'var(--foreground)' }}>
            {resena.cafeteria.nombre}
          </h4>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {resena.cafeteria.zona}
          </p>
        </div>
        <span className="text-xs font-medium flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>
          {fechaFormateada}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-0">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={`${resena.id}-star-${star}`}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={star <= resena.calificacion ? '#FFD700' : 'var(--border)'}
              stroke="none"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>
        <span className="text-xs font-bold font-tabular" style={{ color: 'var(--primary)' }}>
          {resena.calificacion}.0
        </span>
      </div>

      {/* Review text */}
      <div className="px-3 pt-2 pb-3">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-2 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-offset-0"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                background: 'var(--background)',
              }}
              rows={4}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95"
                style={{
                  background: 'var(--muted)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setExpanded(false);
                }}
                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95"
                style={{ background: 'var(--primary)', color: 'white' }}
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
              {displayText}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs font-bold mt-1 transition-colors duration-150"
                style={{ color: 'var(--primary)' }}
              >
                {expanded ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-3 py-2.5"
        style={{ borderTop: '1px solid var(--border)', background: 'var(--muted)' }}
      >
        <div className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
            <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
          </svg>
          <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
            {resena.utilidad} personas encontraron esto útil
          </span>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs font-bold px-2.5 py-1 rounded-lg transition-all duration-150 active:scale-95"
          style={{ background: 'var(--primary)', color: 'white' }}
        >
          Editar
        </button>
      </div>
    </div>
  );
}