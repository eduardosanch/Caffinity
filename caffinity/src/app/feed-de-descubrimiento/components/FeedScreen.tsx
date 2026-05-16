'use client';

import React, { useState, useCallback } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import AppImage from '@/components/ui/AppImage';
import { publicacionesData, type Publicacion } from './feed-data';
import { actividadConfig, type Actividad } from '../../components/cafeterias-data';
import PublicacionModal from './PublicacionModal';

const filtrosActividad: { key: string; label: string; value: Actividad | 'todos' }[] = [
  { key: 'filter-todos', label: 'Todo', value: 'todos' },
  { key: 'filter-fotos', label: 'Fotos', value: 'fotos' },
  { key: 'filter-estudiar', label: 'Estudiar', value: 'estudiar' },
  { key: 'filter-amigos', label: 'Amigos', value: 'amigos' },
  { key: 'filter-comida', label: 'Comida', value: 'comida' },
];

function formatLikes(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default function FeedScreen() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState<Actividad | 'todos'>('todos');
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicacion | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const publicacionesFiltradas = publicacionesData.filter((p) => {
    const matchBusqueda =
      busqueda === '' ||
      p.cafeteria?.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.autor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.autor.username.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(busqueda.toLowerCase());

    const matchFiltro =
      filtroActivo === 'todos' || p.actividades.includes(filtroActivo);

    return matchBusqueda && matchFiltro;
  });

  const columnaIzq = publicacionesFiltradas.filter((_, i) => i % 2 === 0);
  const columnaDer = publicacionesFiltradas.filter((_, i) => i % 2 !== 0);

  const toggleLike = useCallback((postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
    // Backend integration point: POST /api/posts/{postId}/like { userId }
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 pt-10 pb-3"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AppLogo size={28} />
            <span className="font-extrabold text-lg tracking-tight" style={{ color: 'var(--primary)' }}>
              Descubrimiento
            </span>
          </div>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 active:scale-95"
            style={{ background: 'var(--muted)' }}
            aria-label="Notificaciones"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar cafeterías, usuarios..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl text-sm font-medium outline-none transition-all duration-200 focus:ring-2"
            style={{
              background: 'var(--input)',
              color: 'var(--foreground)',
              border: '1.5px solid transparent',
              '--tw-ring-color': 'var(--primary)',
            } as React.CSSProperties}
            aria-label="Buscar en el feed"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Limpiar búsqueda"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filtrosActividad.map((f) => (
            <button
              key={f.key}
              onClick={() => setFiltroActivo(f.value)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 active:scale-95"
              style={{
                background: filtroActivo === f.value ? 'var(--primary)' : 'var(--muted)',
                color: filtroActivo === f.value ? 'white' : 'var(--muted-foreground)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      {/* Feed content */}
      <div className="px-3 py-4">
        {publicacionesFiltradas.length === 0 ? (
          <EmptyFeed busqueda={busqueda} filtro={filtroActivo} />
        ) : (
          <>
            <p className="text-xs font-medium mb-3 px-1" style={{ color: 'var(--muted-foreground)' }}>
              {publicacionesFiltradas.length} publicaciones
            </p>
            <div className="flex gap-3">
              {/* Columna izquierda */}
              <div className="flex-1 flex flex-col gap-3">
                {columnaIzq.map((post) => (
                  <FeedCard
                    key={post.id}
                    post={post}
                    isLiked={likedPosts.includes(post.id)}
                    onLike={toggleLike}
                    onClick={() => setPublicacionSeleccionada(post)}
                  />
                ))}
              </div>
              {/* Columna derecha */}
              <div className="flex-1 flex flex-col gap-3 mt-8">
                {columnaDer.map((post) => (
                  <FeedCard
                    key={post.id}
                    post={post}
                    isLiked={likedPosts.includes(post.id)}
                    onLike={toggleLike}
                    onClick={() => setPublicacionSeleccionada(post)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal de publicación */}
      {publicacionSeleccionada && (
        <PublicacionModal
          post={publicacionSeleccionada}
          isLiked={likedPosts.includes(publicacionSeleccionada.id)}
          onLike={toggleLike}
          onClose={() => setPublicacionSeleccionada(null)}
        />
      )}
    </div>
  );
}

interface FeedCardProps {
  post: Publicacion;
  isLiked: boolean;
  onLike: (id: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

function FeedCard({ post, isLiked, onLike, onClick }: FeedCardProps) {
  const aspectClass = post.aspectRatio === 'tall' ? 'aspect-[3/4]' : 'aspect-square';

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 active:scale-98"
      style={{ boxShadow: '0 4px 20px rgba(82,44,93,0.10)' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Ver publicación de ${post.autor.nombre}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Image */}
      <div className={`relative w-full ${aspectClass}`}>
        <AppImage
          src={post.imagen}
          alt={post.imagenAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 200px"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-overlay-light opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Like button */}
        <button
          onClick={(e) => onLike(post.id, e)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(4px)',
          }}
          aria-label={isLiked ? 'Quitar me gusta' : 'Me gusta'}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={isLiked ? '#f43f5e' : 'none'}
            stroke={isLiked ? '#f43f5e' : 'var(--muted-foreground)'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isLiked ? 'animate-heart-beat' : ''}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        {/* Activity pill */}
        {post.actividades[0] && (
          <div className="absolute bottom-2 left-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(82,44,93,0.75)', color: '#FFE3D8', backdropFilter: 'blur(4px)' }}
            >
              {actividadConfig[post.actividades[0]].emoji}
            </span>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="p-2.5" style={{ background: 'white' }}>
        {post.cafeteria && (
          <p className="text-xs font-bold truncate mb-0.5" style={{ color: 'var(--primary)' }}>
            {post.cafeteria.nombre}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
              <AppImage
                src={post.autor.avatar}
                alt={post.autor.avatarAlt}
                width={20}
                height={20}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-[11px] font-medium truncate" style={{ color: 'var(--muted-foreground)' }}>
              {post.autor.username}
            </span>
          </div>
          <span className="text-[11px] font-semibold flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>
            {formatLikes(post.likes)}
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyFeed({ busqueda, filtro }: { busqueda: string; filtro: Actividad | 'todos' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-8">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
        style={{ background: 'var(--muted)' }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>
      <h3 className="text-lg font-extrabold mb-2" style={{ color: 'var(--foreground)' }}>
        Sin publicaciones
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        {busqueda
          ? `No encontramos publicaciones para "${busqueda}". Intenta con otro término.`
          : `No hay publicaciones para la actividad seleccionada todavía.`}
      </p>
    </div>
  );
}