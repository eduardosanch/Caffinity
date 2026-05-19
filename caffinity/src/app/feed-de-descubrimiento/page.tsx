import React from 'react';
import AppLayout from '@/components/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import FeedScreen from './components/FeedScreen';

export default function FeedDeDescubrimiento() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <FeedScreen />
      </AppLayout>
    </ProtectedRoute>
  );
}