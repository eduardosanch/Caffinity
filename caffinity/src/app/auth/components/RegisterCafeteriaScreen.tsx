'use client';

import React, { useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { useAuth } from '@/contexts/AuthContext';

interface RegisterCafeteriaScreenProps {
  onSwitchToLogin: () => void;
}

export default function RegisterCafeteriaScreen({ onSwitchToLogin }: RegisterCafeteriaScreenProps) {
  const { registerCafeteria, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    cafeteriaName: '',
    address: '',
    city: '',
    zone: '',
    description: '',
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    try {
      await registerCafeteria({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        cafeteriaName: formData.cafeteriaName,
        address: formData.address,
        city: formData.city,
        zone: formData.zone,
        description: formData.description,
      });
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Error al registrar cafetería');
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
              Registrar Cafetería
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
              Expande tu negocio en Caffinity
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
            {/* Section: Información del Propietario */}
            <div className="pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--primary)' }}>
                📋 Información Personal
              </h3>

              {/* Full Name */}
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    background: 'var(--input)',
                    color: 'var(--foreground)',
                    '--tw-ring-color': 'var(--primary)',
                  } as React.CSSProperties}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    background: 'var(--input)',
                    color: 'var(--foreground)',
                    '--tw-ring-color': 'var(--primary)',
                  } as React.CSSProperties}
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  Teléfono <span style={{ color: 'var(--muted-foreground)' }}>(Opcional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+34 612 345 678"
                  className="w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    background: 'var(--input)',
                    color: 'var(--foreground)',
                    '--tw-ring-color': 'var(--primary)',
                  } as React.CSSProperties}
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    background: 'var(--input)',
                    color: 'var(--foreground)',
                    '--tw-ring-color': 'var(--primary)',
                  } as React.CSSProperties}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    background: 'var(--input)',
                    color: 'var(--foreground)',
                    '--tw-ring-color': 'var(--primary)',
                  } as React.CSSProperties}
                  required
                />
              </div>
            </div>

            {/* Section: Información de la Cafetería */}
            <div className="pt-4">
              <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--primary)' }}>
                ☕ Información de la Cafetería
              </h3>

              {/* Cafeteria Name */}
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  Nombre de la Cafetería
                </label>
                <input
                  type="text"
                  name="cafeteriaName"
                  value={formData.cafeteriaName}
                  onChange={handleChange}
                  placeholder="Café La Esquina"
                  className="w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    background: 'var(--input)',
                    color: 'var(--foreground)',
                    '--tw-ring-color': 'var(--primary)',
                  } as React.CSSProperties}
                  required
                />
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Calle Principal 123"
                  className="w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    background: 'var(--input)',
                    color: 'var(--foreground)',
                    '--tw-ring-color': 'var(--primary)',
                  } as React.CSSProperties}
                  required
                />
              </div>

              {/* City & Zone */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Madrid"
                    className="w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                    style={{
                      background: 'var(--input)',
                      color: 'var(--foreground)',
                      '--tw-ring-color': 'var(--primary)',
                    } as React.CSSProperties}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                    Zona
                  </label>
                  <input
                    type="text"
                    name="zone"
                    value={formData.zone}
                    onChange={handleChange}
                    placeholder="Centro"
                    className="w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                    style={{
                      background: 'var(--input)',
                      color: 'var(--foreground)',
                      '--tw-ring-color': 'var(--primary)',
                    } as React.CSSProperties}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe tu cafetería: ambiente, especialidades, etc."
                  className="w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    background: 'var(--input)',
                    color: 'var(--foreground)',
                    '--tw-ring-color': 'var(--primary)',
                    minHeight: '80px',
                    resize: 'none',
                  } as React.CSSProperties}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl font-bold text-base transition-all duration-200 active:scale-95 disabled:opacity-70 mt-6"
              style={{
                background: loading ? 'var(--muted)' : 'linear-gradient(135deg, var(--primary), var(--muted-rose))',
                color: 'white',
              }}
            >
              {loading ? 'Registrando cafetería...' : 'Registrar Cafetería'}
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
