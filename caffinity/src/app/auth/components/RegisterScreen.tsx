'use client';

import React, { useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { useAuth } from '@/contexts/AuthContext';

interface RegisterScreenProps {
  onSwitchToLogin: () => void;
}

export default function RegisterScreen({ onSwitchToLogin }: RegisterScreenProps) {
  const { registerUser, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    try {
      await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="flex items-center justify-center pt-8 pb-6">
        <div className="flex items-center gap-3">
          <AppLogo size={28} />
          <div>
            <h1 className="font-extrabold text-xl tracking-tight" style={{ color: 'var(--primary)' }}>
              Caffinity
            </h1>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Descubre tu cafetería perfecta
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="font-extrabold text-2xl tracking-tight mb-1" style={{ color: 'var(--foreground)' }}>
              Crear Cuenta
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
              Como Usuario
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

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Nombre Completo
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  background: 'var(--input)',
                  color: 'var(--foreground)',
                  '--tw-ring-color': 'var(--primary)',
                } as React.CSSProperties}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  background: 'var(--input)',
                  color: 'var(--foreground)',
                  '--tw-ring-color': 'var(--primary)',
                } as React.CSSProperties}
                required
              />
            </div>

            {/* Phone Input (Optional) */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Teléfono <span style={{ color: 'var(--muted-foreground)' }}>(Opcional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+34 612 345 678"
                className="w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  background: 'var(--input)',
                  color: 'var(--foreground)',
                  '--tw-ring-color': 'var(--primary)',
                } as React.CSSProperties}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  background: 'var(--input)',
                  color: 'var(--foreground)',
                  '--tw-ring-color': 'var(--primary)',
                } as React.CSSProperties}
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  background: 'var(--input)',
                  color: 'var(--foreground)',
                  '--tw-ring-color': 'var(--primary)',
                } as React.CSSProperties}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl font-bold text-base transition-all duration-200 active:scale-95 disabled:opacity-70 mt-4"
              style={{
                background: loading ? 'var(--muted)' : 'linear-gradient(135deg, var(--primary), var(--muted-rose))',
                color: 'white',
              }}
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          {/* Back to Login */}
          <button
            onClick={onSwitchToLogin}
            className="w-full py-3 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 mt-3"
            style={{
              background: 'transparent',
              color: 'var(--primary)',
              border: '2px solid var(--primary)',
            }}
          >
            ← Volver a Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
