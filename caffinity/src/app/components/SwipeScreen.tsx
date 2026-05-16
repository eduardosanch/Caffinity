'use client';

import React, { useState, useRef, useCallback } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import AppImage from '@/components/ui/AppImage';
import { cafeteriasData, actividadConfig, type Cafeteria } from './cafeterias-data';
import MatchOverlay from './MatchOverlay';
import GestureGuide from './GestureGuide';
import WishlistToast from './WishlistToast';

type SwipeDirection = 'left' | 'right' | null;
type StampType = 'like' | 'nope' | null;

interface CardState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  rotation: number;
  opacity: number;
}

const SWIPE_THRESHOLD = 80;

export default function SwipeScreen() {
  const [cards, setCards] = useState<Cafeteria[]>([...cafeteriasData]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const [stamp, setStamp] = useState<StampType>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedCafe, setMatchedCafe] = useState<Cafeteria | null>(null);
  const [showGuide, setShowGuide] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showWishlistToast, setShowWishlistToast] = useState(false);
  const [wishlistToastCafe, setWishlistToastCafe] = useState('');
  const [likedCafes, setLikedCafes] = useState<string[]>([]);
  const [cardState, setCardState] = useState<CardState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    rotation: 0,
    opacity: 1,
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const animationClass = useRef<string>('');

  const currentCafe = cards[currentIndex];
  const nextCafe = cards[currentIndex + 1];
  const hasMore = currentIndex < cards.length;

  const dismissGuide = useCallback(() => setShowGuide(false), []);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (isAnimating || !currentCafe) return;
    setIsAnimating(true);
    setSwipeDirection(direction);
    setStamp(direction === 'right' ? 'like' : 'nope');

    if (direction === 'right') {
      setLikedCafes(prev => [...prev, currentCafe.id]);
      // Backend integration point: POST /api/swipes { cafeId, direction: 'right', userId }
      if (Math.random() > 0.5) {
        setTimeout(() => {
          setMatchedCafe(currentCafe);
          setShowMatch(true);
        }, 400);
      }
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
      setStamp(null);
      setIsAnimating(false);
      setCardState({
        isDragging: false,
        startX: 0, startY: 0,
        currentX: 0, currentY: 0,
        rotation: 0, opacity: 1,
      });
    }, 420);
  }, [isAnimating, currentCafe]);

  const handleAddToWishlist = useCallback((cafe: Cafeteria) => {
    if (!wishlist.includes(cafe.id)) {
      setWishlist(prev => [...prev, cafe.id]);
      setWishlistToastCafe(cafe.nombre);
      setShowWishlistToast(true);
      // Backend integration point: POST /api/wishlist { cafeId, userId }
      setTimeout(() => setShowWishlistToast(false), 2500);
    }
  }, [wishlist]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isAnimating || showGuide) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setCardState(prev => ({
      ...prev,
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      currentX: 0,
      currentY: 0,
    }));
  }, [isAnimating, showGuide]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!cardState.isDragging) return;
    const deltaX = e.clientX - cardState.startX;
    const deltaY = e.clientY - cardState.startY;
    const rotation = deltaX * 0.08;
    const opacity = Math.max(0.6, 1 - Math.abs(deltaX) / 400);

    setCardState(prev => ({
      ...prev,
      currentX: deltaX,
      currentY: deltaY * 0.3,
      rotation,
      opacity,
    }));

    if (deltaX > 30) setStamp('like');
    else if (deltaX < -30) setStamp('nope');
    else setStamp(null);
  }, [cardState.isDragging, cardState.startX, cardState.startY]);

  const handlePointerUp = useCallback(() => {
    if (!cardState.isDragging) return;
    setCardState(prev => ({ ...prev, isDragging: false }));

    if (cardState.currentX > SWIPE_THRESHOLD) {
      handleSwipe('right');
    } else if (cardState.currentX < -SWIPE_THRESHOLD) {
      handleSwipe('left');
    } else {
      setStamp(null);
      setCardState({
        isDragging: false,
        startX: 0, startY: 0,
        currentX: 0, currentY: 0,
        rotation: 0, opacity: 1,
      });
    }
  }, [cardState.isDragging, cardState.currentX, handleSwipe]);

  const cardTransform = cardState.isDragging
    ? `translate(${cardState.currentX}px, ${cardState.currentY}px) rotate(${cardState.rotation}deg)`
    : swipeDirection === 'right' ?'translateX(150%) rotate(25deg)'
    : swipeDirection === 'left' ?'translateX(-150%) rotate(-25deg)' :'translate(0, 0) rotate(0deg)';

  const cardTransition = cardState.isDragging ? 'none' : 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.38s ease';

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFE3D8 0%, #FFFFFF 50%, #f5e8f5 100%)' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-10 pb-3 z-10 relative">
        <div className="flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-extrabold text-xl tracking-tight" style={{ color: 'var(--primary)' }}>
            CAFFINITY
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(82,44,93,0.08)', color: 'var(--primary)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{likedCafes.length} me gusta</span>
          </div>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 active:scale-95"
            style={{ background: 'rgba(82,44,93,0.08)' }}
            aria-label="Filtros"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Progress indicator */}
      {hasMore && (
        <div className="px-5 mb-3 z-10 relative">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
              {currentIndex + 1} de {cards.length}
            </span>
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / cards.length) * 100}%`,
                  background: 'linear-gradient(90deg, var(--primary), var(--soft-rose))',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Card Stack */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        {!hasMore ? (
          <EmptyState onReset={() => { setCurrentIndex(0); setLikedCafes([]); setWishlist([]); }} />
        ) : (
          <div className="relative w-full max-w-sm" style={{ height: '520px' }}>
            {/* Next card (background) */}
            {nextCafe && (
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  transform: 'scale(0.95) translateY(12px)',
                  zIndex: 1,
                  boxShadow: '0 8px 40px rgba(82,44,93,0.12)',
                }}
              >
                <AppImage
                  src={nextCafe.imagen}
                  alt={nextCafe.imagenAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 384px"
                />
                <div className="absolute inset-0 gradient-overlay" />
              </div>
            )}

            {/* Current card */}
            <div
              ref={cardRef}
              className="absolute inset-0 rounded-3xl overflow-hidden swipe-card cursor-grab active:cursor-grabbing"
              style={{
                zIndex: 2,
                transform: cardTransform,
                transition: cardTransition,
                opacity: swipeDirection ? 0 : cardState.opacity,
                boxShadow: '0 12px 48px rgba(82,44,93,0.20)',
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              role="article"
              aria-label={`Cafetería: ${currentCafe.nombre}`}
            >
              {/* Card Image */}
              <AppImage
                src={currentCafe.imagen}
                alt={currentCafe.imagenAlt}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 640px) 100vw, 384px"
                priority
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 gradient-overlay pointer-events-none" />

              {/* Destacada badge */}
              {currentCafe.destacada && (
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                  style={{ background: 'rgba(82,44,93,0.85)', color: '#FFE3D8', backdropFilter: 'blur(8px)' }}
                >
                  ✨ Destacada
                </div>
              )}

              {/* WiFi badge */}
              {currentCafe.wifi && (
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
                  title="WiFi disponible"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.55a11 11 0 0114.08 0"/>
                    <path d="M1.42 9a16 16 0 0121.16 0"/>
                    <path d="M8.53 16.11a6 6 0 016.95 0"/>
                    <line x1="12" y1="20" x2="12.01" y2="20"/>
                  </svg>
                </div>
              )}

              {/* LIKE stamp */}
              {stamp === 'like' && (
                <div
                  className="absolute top-12 left-6 like-stamp"
                  style={{ transform: 'rotate(-15deg)' }}
                >
                  <div
                    className="px-4 py-2 rounded-xl border-4 font-extrabold text-2xl tracking-widest"
                    style={{ borderColor: '#4ade80', color: '#4ade80', background: 'rgba(74,222,128,0.12)' }}
                  >
                    ME GUSTA
                  </div>
                </div>
              )}

              {/* NOPE stamp */}
              {stamp === 'nope' && (
                <div
                  className="absolute top-12 right-6 nope-stamp"
                  style={{ transform: 'rotate(15deg)' }}
                >
                  <div
                    className="px-4 py-2 rounded-xl border-4 font-extrabold text-2xl tracking-widest"
                    style={{ borderColor: '#f87171', color: '#f87171', background: 'rgba(248,113,113,0.12)' }}
                  >
                    PASAR
                  </div>
                </div>
              )}

              {/* Card Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                {/* Actividades */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {currentCafe.actividades.map((act) => (
                    <span key={`${currentCafe.id}-act-${act}`} className="activity-pill">
                      {actividadConfig[act].emoji} {actividadConfig[act].label}
                    </span>
                  ))}
                </div>

                {/* Nombre y zona */}
                <h2 className="text-white font-extrabold text-2xl leading-tight mb-1">
                  {currentCafe.nombre}
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="text-white/80 text-sm font-medium">{currentCafe.zona} · {currentCafe.distancia}</span>
                </div>

                {/* Rating y precio */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={`${currentCafe.id}-star-${star}`}
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill={star <= Math.floor(currentCafe.calificacion) ? '#FFD700' : 'rgba(255,255,255,0.3)'}
                          stroke="none"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-white font-bold text-sm">{currentCafe.calificacion}</span>
                    <span className="text-white/60 text-xs">({currentCafe.totalResenas})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)' }}
                    >
                      {currentCafe.precioRango}
                    </span>
                    <span className="text-white/70 text-xs font-medium">{currentCafe.horario}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {hasMore && (
          <div className="flex items-center gap-4 mt-6 z-10">
            {/* Nope */}
            <button
              onClick={() => handleSwipe('left')}
              disabled={isAnimating}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90 disabled:opacity-50"
              style={{ background: 'white', boxShadow: '0 4px 20px rgba(248,113,113,0.25)', border: '2.5px solid #f87171' }}
              aria-label="No me gusta"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => currentCafe && handleAddToWishlist(currentCafe)}
              disabled={isAnimating || wishlist.includes(currentCafe?.id ?? '')}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90 disabled:opacity-60"
              style={{
                background: wishlist.includes(currentCafe?.id ?? '') ? 'rgba(82,44,93,0.12)' : 'white',
                boxShadow: '0 4px 20px rgba(82,44,93,0.15)',
                border: '2.5px solid var(--primary)',
              }}
              aria-label="Agregar a lista de deseos"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={wishlist.includes(currentCafe?.id ?? '') ? 'var(--primary)' : 'none'}
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
              </svg>
            </button>

            {/* Like */}
            <button
              onClick={() => handleSwipe('right')}
              disabled={isAnimating}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--muted-rose))', boxShadow: '0 4px 24px rgba(82,44,93,0.35)' }}
              aria-label="Me gusta"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
        )}

        {/* Swipe hint text */}
        {hasMore && (
          <p className="mt-3 text-xs font-medium text-center" style={{ color: 'var(--muted-foreground)' }}>
            Desliza para descubrir · {cards.length - currentIndex - 1} restantes
          </p>
        )}
      </div>

      {/* Gesture Guide overlay */}
      {showGuide && <GestureGuide onDismiss={dismissGuide} />}

      {/* Match overlay */}
      {showMatch && matchedCafe && (
        <MatchOverlay
          cafe={matchedCafe}
          onClose={() => { setShowMatch(false); setMatchedCafe(null); }}
        />
      )}

      {/* Wishlist toast */}
      {showWishlistToast && <WishlistToast cafeName={wishlistToastCafe} />}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-12 text-center animate-fade-in-up">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'linear-gradient(135deg, var(--muted), var(--accent))' }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 010 8h-1"/>
          <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
          <line x1="6" y1="1" x2="6" y2="4"/>
          <line x1="10" y1="1" x2="10" y2="4"/>
          <line x1="14" y1="1" x2="14" y2="4"/>
        </svg>
      </div>
      <h3 className="text-xl font-extrabold mb-2" style={{ color: 'var(--foreground)' }}>
        ¡Lo viste todo!
      </h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
        Revisaste todas las cafeterías disponibles. ¡Vuelve a empezar para descubrir nuevos favoritos!
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95"
        style={{ background: 'linear-gradient(135deg, var(--primary), var(--muted-rose))', color: 'white' }}
      >
        Volver a descubrir ✨
      </button>
    </div>
  );
}