import React from 'react';
import AppLayout from '@/components/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import PerfilScreen from './components/PerfilScreen';

export default function PerfilDeUsuario() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <PerfilScreen />
      </AppLayout>
    </ProtectedRoute>
  );
}