'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import RegisterCafeteriaScreen from './components/RegisterCafeteriaScreen';

type AuthScreen = 'login' | 'register' | 'register-cafeteria';

export default function AuthPage() {
  const [screen, setScreen] = useState<AuthScreen>('login');
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <div className="text-4xl mb-4">☕</div>
          <p style={{ color: 'var(--muted-foreground)' }}>Cargando...</p>
        </div>
      </div>
    );
  }

  // Si ya está autenticado, no mostrar nada (la redirección se encarga)
  if (user) {
    return null;
  }

  return (
    <>
      {screen === 'login' && (
        <LoginScreen
          onSwitchToRegister={() => setScreen('register')}
          onSwitchToAccountType={() => setScreen('register-cafeteria')}
        />
      )}
      {screen === 'register' && (
        <RegisterScreen
          onSwitchToLogin={() => setScreen('login')}
        />
      )}
      {screen === 'register-cafeteria' && (
        <RegisterCafeteriaScreen
          onSwitchToLogin={() => setScreen('login')}
        />
      )}
    </>
  );
}
