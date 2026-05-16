'use client';

import React, { useEffect, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { type Publicacion } from './feed-data';
import { actividadConfig } from '../../components/cafeterias-data';

interface PublicacionModalProps {
  post: Publicacion;
  isLiked: boolean;
  onLike: (id: string, e: React.MouseEvent) => void;
  onClose: () => void;
}

const comentariosMock = [
{ key: 'com-001', usuario: 'sofi.mndz', texto: '¡Me encanta! Tengo que ir 😍', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png", avatarAlt: 'Foto de perfil de Sofía Mendoza' },
{ key: 'com-002', usuario: 'diegoram', texto: 'El mejor café de la zona sin duda 🔥', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16e9d8251-1763294843980.png", avatarAlt: 'Foto de perfil de Diego Ramírez' },
{ key: 'com-003', usuario: 'mateo.rios', texto: 'Ya lo tengo en mi lista de deseos 📌', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16e9d8251-1763294843980.png", avatarAlt: 'Foto de perfil de Mateo Ríos' }];


export default function PublicacionModal({ post, isLiked, onLike, onClose }: PublicacionModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: `rgba(21,0,22,${visible ? 0.7 : 0})`,
        backdropFilter: visible ? 'blur(8px)' : 'blur(0px)',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease'
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Detalle de publicación">
      
      <div
        className="w-full max-w-lg rounded-t-3xl overflow-hidden"
        style={{
          background: 'white',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}>
        
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border)' }} />
        </div>

        {/* Image */}
        <div className="relative w-full" style={{ height: '280px' }}>
          <AppImage
            src={post.imagen}
            alt={post.imagenAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 512px" />
          
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Author row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: 'var(--accent)' }}>
                <AppImage
                  src={post.autor.avatar}
                  alt={post.autor.avatarAlt}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full" />
                
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{post.autor.nombre}</p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>@{post.autor.username}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90"
              style={{ background: 'var(--muted)' }}
              aria-label="Cerrar">
              
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Description */}
          {post.descripcion &&
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>
              {post.descripcion}
            </p>
          }

          {/* Activities */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.actividades.map((act) =>
            <span key={`modal-act-${act}`} className="activity-pill-dark">
                {actividadConfig[act].emoji} {actividadConfig[act].label}
              </span>
            )}
          </div>

          {/* Café asociado */}
          {post.cafeteria &&
          <div
            className="flex items-center justify-between p-3 rounded-2xl mb-4"
            style={{ background: 'var(--muted)', border: '1px solid var(--border)' }}>
            
              <div className="flex items-center gap-2">
                <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--primary)' }}>
                
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 010 8h-1" />
                    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>{post.cafeteria.nombre}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{post.cafeteria.zona}</p>
                </div>
              </div>
              <button
              className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-95"
              style={{ background: 'var(--primary)', color: 'white' }}>
              
                Ver café
              </button>
            </div>
          }

          {/* Like / comment stats */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={(e) => onLike(post.id, e)}
              className="flex items-center gap-2 transition-all duration-150 active:scale-90"
              aria-label={isLiked ? 'Quitar me gusta' : 'Me gusta'}>
              
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isLiked ? '#f43f5e' : 'none'}
                stroke={isLiked ? '#f43f5e' : 'var(--muted-foreground)'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isLiked ? 'animate-heart-beat' : ''}>
                
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: isLiked ? '#f43f5e' : 'var(--muted-foreground)' }}>
                {isLiked ? post.likes + 1 : post.likes}
              </span>
            </button>
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: 'var(--muted-foreground)' }}>{post.comentarios}</span>
            </div>
          </div>

          {/* Comments preview */}
          <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted-foreground)' }}>
              Comentarios
            </p>
            <div className="flex flex-col gap-3">
              {comentariosMock.map((c) =>
              <div key={c.key} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage
                    src={c.avatar}
                    alt={c.avatarAlt}
                    width={28}
                    height={28}
                    className="object-cover w-full h-full" />
                  
                  </div>
                  <div className="flex-1 rounded-2xl px-3 py-2" style={{ background: 'var(--muted)' }}>
                    <span className="text-xs font-bold mr-2" style={{ color: 'var(--primary)' }}>@{c.usuario}</span>
                    <span className="text-xs" style={{ color: 'var(--foreground)' }}>{c.texto}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}