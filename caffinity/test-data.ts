// Script de prueba para pre-cargar datos de ejemplo en localStorage
// Ejecutar en la consola del navegador: eval(fetch('/test-data.js').then(r=>r.text()).then(eval))

export const testData = {
  // Usuario normal de ejemplo
  normalUser: {
    id: 'user_example_001',
    email: 'usuario@ejemplo.com',
    fullName: 'Juan Pérez García',
    phone: '+34 612 345 678',
    password: '123456',
    role: 'user' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Usuario de cafetería de ejemplo
  cafeteriaUser: {
    id: 'cafe_example_001',
    email: 'cafe@ejemplo.com',
    fullName: 'María García López',
    phone: '+34 698 765 432',
    password: '123456',
    role: 'cafeteria' as const,
    cafeteriaName: 'Café La Esquina del Barrio',
    address: 'Calle Principal 123',
    city: 'Madrid',
    zone: 'Centro',
    description: 'Cafetería artesanal con ambiente acogedor, perfecta para estudiar o trabajar. Especialidad en café de origen único y pasteles caseros.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Función para cargar datos en localStorage
  loadTestData: function() {
    const users = [this.normalUser, this.cafeteriaUser];
    localStorage.setItem('caffinity_users', JSON.stringify(users));
    console.log('✅ Datos de ejemplo cargados en localStorage');
    console.log('Usuario: usuario@ejemplo.com / 123456');
    console.log('Cafetería: cafe@ejemplo.com / 123456');
  },

  // Función para limpiar datos
  clearTestData: function() {
    localStorage.removeItem('caffinity_users');
    localStorage.removeItem('caffinity_user');
    console.log('✅ Datos limpiados');
  },

  // Función para mostrar datos actuales
  showData: function() {
    const users = localStorage.getItem('caffinity_users');
    const currentUser = localStorage.getItem('caffinity_user');
    console.log('📋 Usuarios registrados:', users ? JSON.parse(users) : 'Ninguno');
    console.log('👤 Usuario actual:', currentUser ? JSON.parse(currentUser) : 'Ninguno');
  },
};

// Hacer disponible globalmente en consola
(window as any).testData = testData;

// Ejemplos de uso en consola:
// testData.loadTestData()   - Cargar datos de prueba
// testData.showData()        - Ver datos actuales
// testData.clearTestData()   - Limpiar datos
