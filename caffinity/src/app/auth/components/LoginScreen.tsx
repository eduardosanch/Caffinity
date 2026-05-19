'use client';

import React, { useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { useAuth } from '@/contexts/AuthContext';

interface LoginScreenProps {
  onSwitchToRegister: () => void;
  onSwitchToAccountType: () => void;
}

export default function LoginScreen({ onSwitchToRegister, onSwitchToAccountType }: LoginScreenProps) {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    try {
      await login(email, password);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="flex items-center justify-center pt-12 pb-8">
        <div className="flex items-center gap-3">
          <AppLogo size={32} />
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight" style={{ color: 'var(--primary)' }}>
              Caffinity
            </h1>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Descubre tu cafetería perfecta
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-sm">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="font-extrabold text-3xl tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
              Bienvenido
            </h2>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Inicia sesión en tu cuenta
            </p>
          </div>

          {/* Error Message */}
          {(error || localError) && (
            <div
              className="mb-4 p-3 rounded-2xl text-sm font-medium"
              style={{
                background: 'rgba(220, 53, 69, 0.1)',
                color: '#dc3545',
                border: '1px solid rgba(220, 53, 69, 0.2)',
              }}
            >
              {error || localError}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  background: 'var(--input)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)',
                  '--tw-ring-color': 'var(--primary)',
                } as React.CSSProperties}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  background: 'var(--input)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)',
                  '--tw-ring-color': 'var(--primary)',
                } as React.CSSProperties}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl font-bold text-base transition-all duration-200 active:scale-95 disabled:opacity-70"
              style={{
                background: loading ? 'var(--muted)' : 'linear-gradient(135deg, var(--primary), var(--muted-rose))',
                color: 'white',
              }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>o</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* New Account Section */}
          <div className="space-y-3">
            <p style={{ color: 'var(--muted-foreground)', textAlign: 'center', fontSize: '0.875rem' }}>
              ¿No tienes cuenta?
            </p>
            
            {/* Create Account Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onSwitchToRegister}
                className="py-3 px-4 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95"
                style={{
                  background: 'var(--muted)',
                  color: 'var(--muted-foreground)',
                  border: '1px solid var(--border)',
                }}
              >
                 Cuenta de Usuario
              </button>
              <button
                onClick={onSwitchToAccountType}
                className="py-3 px-4 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--muted-rose))',
                  color: 'white',
                }}
              >
                 Cuenta de Cafetería
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
