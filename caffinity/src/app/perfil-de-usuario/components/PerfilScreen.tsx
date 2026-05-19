'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import AppLogo from '@/components/ui/AppLogo';
import { useAuth } from '@/contexts/AuthContext';
import { usuarioActual, listaDeseosData, matchesData, resenasData } from './perfil-data';

import CafeteriaCard from './CafeteriaCard';
import ResenaCard from './ResenaCard';

type TabId = 'deseos' | 'matches' | 'resenas';

const tabs: { key: string; id: TabId; label: string; emoji: string; count: number }[] = [
  { key: 'tab-deseos', id: 'deseos', label: 'Lista de deseos', emoji: '🔖', count: listaDeseosData.length },
  { key: 'tab-matches', id: 'matches', label: 'Mis matches', emoji: '❤️', count: matchesData.length },
  { key: 'tab-resenas', id: 'resenas', label: 'Reseñas', emoji: '⭐', count: resenasData.length },
];

export default function PerfilScreen() {
  const [tabActiva, setTabActiva] = useState<TabId>('deseos');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Cover image */}
      <div className="relative h-44 w-full">
        <AppImage
          src={usuarioActual.coverImage}
          alt={usuarioActual.coverImageAlt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(21,0,22,0.2) 0%, rgba(21,0,22,0.5) 100%)' }} />

        {/* Top bar */}
        <div className="absolute top-10 left-0 right-0 flex items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <AppLogo size={24} />
            <span className="font-extrabold text-base tracking-tight text-white">Mi Perfil</span>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90"
            style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
            aria-label="Ajustes de cuenta"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Avatar + info */}
      <div className="relative px-5 pb-5" style={{ marginTop: '-40px' }}>
        <div className="flex items-end justify-between mb-4">
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-full overflow-hidden border-4 flex-shrink-0"
            style={{ borderColor: 'white', boxShadow: '0 4px 20px rgba(82,44,93,0.25)' }}
          >
            <AppImage
              src={usuarioActual.avatar}
              alt={usuarioActual.avatarAlt}
              width={80}
              height={80}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Edit button */}
          <button
            className="px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-150 active:scale-95"
            style={{ background: 'var(--muted)', color: 'var(--primary)', border: '1.5px solid var(--border)' }}
          >
            Editar perfil
          </button>
        </div>

        {/* Name & username */}
        <h1 className="font-extrabold text-xl leading-tight mb-0.5" style={{ color: 'var(--foreground)' }}>
          {usuarioActual.nombre}
        </h1>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
          @{usuarioActual.username}
        </p>

        {/* Bio */}
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--foreground)' }}>
          {usuarioActual.bio}
        </p>

        {/* Location & member since */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{usuarioActual.ubicacion}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>Miembro desde {usuarioActual.miembroDesde}</span>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-5 gap-1 p-3 rounded-2xl mb-5"
          style={{ background: 'var(--muted)', border: '1px solid var(--border)' }}
        >
          {[
            { key: 'stat-matches', value: usuarioActual.stats.matches, label: 'Matches' },
            { key: 'stat-deseos', value: usuarioActual.stats.listaDeseos, label: 'Deseos' },
            { key: 'stat-resenas', value: usuarioActual.stats.resenas, label: 'Reseñas' },
            { key: 'stat-seguidores', value: usuarioActual.stats.seguidores, label: 'Seguidores' },
            { key: 'stat-siguiendo', value: usuarioActual.stats.siguiendo, label: 'Siguiendo' },
          ].map((stat) => (
            <div key={stat.key} className="flex flex-col items-center">
              <span className="font-extrabold text-base font-tabular" style={{ color: 'var(--primary)' }}>
                {stat.value}
              </span>
              <span className="text-[10px] font-medium text-center leading-tight" style={{ color: 'var(--muted-foreground)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-2xl p-1 mb-5"
          style={{ background: 'var(--muted)' }}
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={tabActiva === tab.id}
              onClick={() => setTabActiva(tab.id)}
              className="flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-200"
              style={{
                background: tabActiva === tab.id ? 'white' : 'transparent',
                boxShadow: tabActiva === tab.id ? '0 2px 12px rgba(82,44,93,0.12)' : 'none',
              }}
            >
              <span className="text-base leading-none mb-0.5">{tab.emoji}</span>
              <span
                className="text-[10px] font-bold leading-tight"
                style={{ color: tabActiva === tab.id ? 'var(--primary)' : 'var(--muted-foreground)' }}
              >
                {tab.label}
              </span>
              <span
                className="text-[10px] font-extrabold font-tabular"
                style={{ color: tabActiva === tab.id ? 'var(--primary)' : 'var(--muted-foreground)' }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div role="tabpanel" className="pb-8">
          {tabActiva === 'deseos' && (
            <div className="flex flex-col gap-3 animate-fade-in-up">
              {listaDeseosData.length === 0 ? (
                <EmptyTabState
                  emoji="🔖"
                  titulo="Tu lista de deseos está vacía"
                  descripcion="Guarda cafeterías usando el marcador mientras descubres para verlas aquí."
                />
              ) : (
                listaDeseosData.map((cafe) => (
                  <CafeteriaCard key={`wishlist-${cafe.id}`} cafe={cafe} tipo="deseos" />
                ))
              )}
            </div>
          )}

          {tabActiva === 'matches' && (
            <div className="flex flex-col gap-3 animate-fade-in-up">
              {matchesData.length === 0 ? (
                <EmptyTabState
                  emoji="❤️"
                  titulo="Aún no tienes matches"
                  descripcion="Desliza a la derecha en las cafeterías que te gusten para ver tus matches aquí."
                />
              ) : (
                matchesData.map((cafe) => (
                  <CafeteriaCard key={`match-${cafe.id}`} cafe={cafe} tipo="match" />
                ))
              )}
            </div>
          )}

          {tabActiva === 'resenas' && (
            <div className="flex flex-col gap-4 animate-fade-in-up">
              {resenasData.length === 0 ? (
                <EmptyTabState
                  emoji="⭐"
                  titulo="Aún no has escrito reseñas"
                  descripcion="Visita una cafetería y comparte tu experiencia para ayudar a otros usuarios."
                />
              ) : (
                resenasData.map((resena) => (
                  <ResenaCard key={resena.id} resena={resena} />
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

function EmptyTabState({ emoji, titulo, descripcion }: { emoji: string; titulo: string; descripcion: string }) {
  return (
    <div className="flex flex-col items-center py-12 text-center px-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl"
        style={{ background: 'var(--muted)' }}
      >
        {emoji}
      </div>
      <h4 className="font-bold text-base mb-1.5" style={{ color: 'var(--foreground)' }}>{titulo}</h4>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{descripcion}</p>
    </div>
  );
}

function SettingsModal({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    router.push('/auth');
  };

  const opciones = [
    { key: 'setting-cuenta', icon: '👤', label: 'Editar cuenta', descripcion: 'Nombre, email, contraseña' },
    { key: 'setting-notif', icon: '🔔', label: 'Notificaciones', descripcion: 'Matches, reseñas,novedades' },
    { key: 'setting-privacidad', icon: '🔒', label: 'Privacidad', descripcion: 'Visibilidad del perfil' },
    { key: 'setting-preferencias', icon: '☕', label: 'Preferencias de café', descripcion: 'Actividades favoritas, zona' },
    { key: 'setting-ayuda', icon: '💬', label: 'Ayuda y soporte', descripcion: 'Preguntas frecuentes, contacto' },
  ];

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
      aria-label="Ajustes de cuenta"
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
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-lg" style={{ color: 'var(--foreground)' }}>
              Ajustes
            </h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90"
              style={{ background: 'var(--muted)' }}
              aria-label="Cerrar ajustes"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-1 mb-4">
            {opciones.map((op) => (
              <button
                key={op.key}
                className="flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-150 active:scale-98 text-left w-full"
                style={{ background: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'var(--muted)' }}
                >
                  {op.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{op.label}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{op.descripcion}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </div>

          {/* Cerrar sesión */}
          <div style={{ borderTop: '1px solid var(--border)' }} className="pt-4">
            <button
              onClick={handleLogout}
              className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95"
              style={{ background: 'rgba(248,113,113,0.10)', color: '#ef4444', border: '1.5px solid rgba(248,113,113,0.25)' }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}