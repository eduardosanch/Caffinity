'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AuthContextType, AuthUser, RegisterUserData, RegisterCafeteriaData } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('caffinity_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error loading user:', err);
        localStorage.removeItem('caffinity_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Obtener usuarios almacenados
      const usersData = localStorage.getItem('caffinity_users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Buscar usuario
      const foundUser = users.find((u: any) => u.email === email);
      
      if (!foundUser) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      // Validar contraseña (en producción usar bcrypt/hash)
      if (foundUser.password !== password) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      // No guardar contraseña en el estado
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('caffinity_user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUser = useCallback(async (data: RegisterUserData) => {
    setLoading(true);
    setError(null);

    try {
      // Validaciones
      if (!data.email || !data.password) {
        throw new Error('Email y contraseña son requeridos');
      }

      if (data.password !== data.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (data.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      if (!data.fullName) {
        throw new Error('El nombre completo es requerido');
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('Email no válido');
      }

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Obtener usuarios existentes
      const usersData = localStorage.getItem('caffinity_users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Verificar si el email ya existe
      if (users.some((u: any) => u.email === data.email)) {
        throw new Error('Este email ya está registrado');
      }

      // Crear nuevo usuario
      const newUser = {
        id: `user_${Date.now()}`,
        email: data.email,
        fullName: data.fullName,
        phone: data.phone || null,
        password: data.password, // En producción, hashear esto
        role: 'user' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Guardar usuario
      users.push(newUser);
      localStorage.setItem('caffinity_users', JSON.stringify(users));

      // No guardar contraseña en el estado
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('caffinity_user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerCafeteria = useCallback(async (data: RegisterCafeteriaData) => {
    setLoading(true);
    setError(null);

    try {
      // Validaciones básicas
      if (!data.email || !data.password) {
        throw new Error('Email y contraseña son requeridos');
      }

      if (data.password !== data.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (data.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      if (!data.fullName || !data.cafeteriaName || !data.address || !data.description) {
        throw new Error('Todos los campos son requeridos');
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('Email no válido');
      }

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Obtener usuarios existentes
      const usersData = localStorage.getItem('caffinity_users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Verificar si el email ya existe
      if (users.some((u: any) => u.email === data.email)) {
        throw new Error('Este email ya está registrado');
      }

      // Crear nuevo usuario de cafetería
      const newCafeteria = {
        id: `cafe_${Date.now()}`,
        email: data.email,
        fullName: data.fullName,
        phone: data.phone || null,
        password: data.password, // En producción, hashear esto
        role: 'cafeteria' as const,
        cafeteriaName: data.cafeteriaName,
        address: data.address,
        description: data.description,
        city: data.city,
        zone: data.zone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Guardar cafetería
      users.push(newCafeteria);
      localStorage.setItem('caffinity_users', JSON.stringify(users));

      // No guardar contraseña en el estado
      const { password: _, ...cafeWithoutPassword } = newCafeteria;
      setUser(cafeWithoutPassword);
      localStorage.setItem('caffinity_user', JSON.stringify(cafeWithoutPassword));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar cafetería';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('caffinity_user');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    registerUser,
    registerCafeteria,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
