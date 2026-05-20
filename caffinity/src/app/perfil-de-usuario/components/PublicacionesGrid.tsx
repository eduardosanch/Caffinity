'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { type Publicacion } from './perfil-data';

interface PublicacionesGridProps {
  publicaciones: Publicacion[];
}

export default function PublicacionesGrid({ publicaciones }: PublicacionesGridProps) {
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicacion | null>(null);

  return (
    <>
      {/* Grid de publicaciones */}
      <div className="grid grid-cols-3 gap-1.5">
        {publicaciones.map((pub) => (
          <button
            key={pub.id}
            onClick={() => setPublicacionSeleccionada(pub)}
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer active:scale-95 transition-transform duration-150"
          >
            <AppImage
              src={pub.imagen}
              alt={pub.imagenAlt}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 640px) 33vw, 200px"
            />
            {/* Overlay hover con stats */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2"
            >
              <div className="flex gap-3 text-white text-xs font-medium">
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {pub.likes}
                </div>
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  {pub.comentarios}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal de publicación */}
      {publicacionSeleccionada && (
        <PublicacionModal
          publicacion={publicacionSeleccionada}
          onClose={() => setPublicacionSeleccionada(null)}
        />
      )}
    </>
  );
}

function PublicacionModal({ publicacion, onClose }: { publicacion: Publicacion; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: `rgba(21,0,22,${visible ? 0.8 : 0})`,
        backdropFilter: visible ? 'blur(8px)' : 'blur(0px)',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full rounded-none overflow-hidden flex flex-col bg-white"
        style={{
          height: '100vh',
          transform: visible ? 'scale(1)' : 'scale(1.05)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="flex-1">
            <h3 className="font-bold text-lg" style={{ color: 'var(--foreground)' }}>
              {publicacion.titulo}
            </h3>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
              {publicacion.cafeteria.nombre} • {publicacion.cafeteria.zona}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90 flex-shrink-0 ml-4"
            style={{ background: 'var(--muted)' }}
            aria-label="Cerrar publicación"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto flex-1">
          {/* Imagen */}
          <div className="relative w-full bg-gray-100">
            <AppImage
              src={publicacion.imagen}
              alt={publicacion.imagenAlt}
              width={1200}
              height={1200}
              className="w-full h-auto object-cover max-h-[70vh]"
            />
          </div>

          {/* Descripción */}
          <div className="p-6">
            <p className="text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>
              {publicacion.descripcion}
            </p>

            {/* Metadata */}
            <div className="mt-6 pt-6 border-t flex items-center gap-6" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--primary)">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span className="text-base font-medium" style={{ color: 'var(--foreground)' }}>
                  {publicacion.likes}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span className="text-base font-medium" style={{ color: 'var(--foreground)' }}>
                  {publicacion.comentarios}
                </span>
              </div>
              <div className="ml-auto text-sm" style={{ color: 'var(--muted-foreground)' }}>
                {(() => {
                  const [y, m, d] = publicacion.fecha.split('-');
                  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
                  return `${d} ${meses[parseInt(m, 10) - 1]} ${y}`;
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Footer con acciones - FIJO ABAJO */}
        <div className="p-6 border-t flex gap-3 flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          <button
            className="flex-1 py-3 rounded-lg font-bold text-base transition-all duration-150 active:scale-95"
            style={{ background: 'var(--muted)', color: 'var(--foreground)' }}
          >
            Editar
          </button>
          <button
            className="flex-1 py-3 rounded-lg font-bold text-base transition-all duration-150 active:scale-95"
            style={{ background: 'rgba(248,113,113,0.10)', color: '#ef4444', border: '1.5px solid rgba(248,113,113,0.25)' }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
