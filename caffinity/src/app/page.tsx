import React from 'react';
import AppLayout from '@/components/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import SwipeScreen from './components/SwipeScreen';

export default function DescubrimientoDeCafeterias() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <SwipeScreen />
      </AppLayout>
    </ProtectedRoute>
  );
}