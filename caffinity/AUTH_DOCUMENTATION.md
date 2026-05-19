# 🔐 Sistema de Autenticación - Caffinity

## Descripción General

Se ha implementado un sistema completo de autenticación con login y registro para usuarios y cafeterías, manteniendo la estética visual de Caffinity.

## 🎯 Características Principales

### 1. **Login**
- Inicio de sesión con email y contraseña
- Validaciones en tiempo real
- Mensajes de error personalizados
- Acceso a pantalla de registro desde el login

### 2. **Registro de Usuario**
- Registro con campos:
  - Nombre completo (requerido)
  - Email (requerido)
  - Teléfono (opcional)
  - Contraseña (mínimo 6 caracteres)
  - Confirmación de contraseña
- Validación de email único
- Validación de contraseñas coincidentes

### 3. **Registro de Cafetería**
Incluye toda la información del usuario más:
- Nombre de la cafetería
- Dirección
- Ciudad y zona
- Descripción del negocio
- Validaciones de campos únicos

### 4. **Protección de Rutas**
- Las páginas principales requieren autenticación
- Redireccionamiento automático a login si no está autenticado
- Soporte para roles (usuario/cafetería)

### 5. **Gestión de Sesión**
- Persistencia de usuario en localStorage
- Logout con botón en la barra de navegación
- Gestión de estado con Context API

## 📁 Estructura de Archivos

```
src/
├── types/
│   └── auth.ts                    # Tipos de autenticación
│
├── contexts/
│   └── AuthContext.tsx            # Context y hook useAuth()
│
├── app/
│   ├── auth/
│   │   ├── page.tsx               # Página principal de auth
│   │   └── components/
│   │       ├── LoginScreen.tsx    # Pantalla de login
│   │       ├── RegisterScreen.tsx # Pantalla de registro usuario
│   │       └── RegisterCafeteriaScreen.tsx  # Pantalla de registro cafetería
│   │
│   ├── page.tsx                   # Protegida ✅
│   ├── feed-de-descubrimiento/page.tsx  # Protegida ✅
│   └── perfil-de-usuario/page.tsx       # Protegida ✅
│
└── components/
    ├── ProtectedRoute.tsx         # Componente de protección
    └── BottomNav.tsx              # Incluye botón logout
```

## 🚀 Cómo Usar

### Acceder al Login
```
http://localhost:4028/auth
```

### Flujos Disponibles

#### 1. **Crear Cuenta de Usuario**
```
Login → "¿No tienes cuenta?" → "👤 Cuenta de Usuario" 
→ Completar formulario → "Crear Cuenta"
```

#### 2. **Crear Cuenta de Cafetería**
```
Login → "¿No tienes cuenta?" → "🏪 Cuenta de Cafetería"
→ Completar formulario → "Registrar Cafetería"
```

#### 3. **Cerrar Sesión**
```
Barra inferior → Botón "Salir" (última opción)
```

## 💾 Almacenamiento de Datos

El sistema usa **localStorage** para almacenar:

1. **caffinity_users** - Listado de todos los usuarios registrados
2. **caffinity_user** - Usuario actual autenticado

### Estructura de Usuario
```typescript
interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  password: string; // ⚠️ En producción debe estar hasheado
  role: 'user' | 'cafeteria';
  createdAt: string;
  updatedAt: string;
}

// Usuario de cafetería incluye además:
{
  cafeteriaName: string;
  address: string;
  city: string;
  zone: string;
  description: string;
}
```

## 🔑 Hook de Autenticación

```typescript
import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { 
    user,        // Usuario actual o null
    loading,     // Estado de carga
    error,       // Mensaje de error
    login,       // (email, password) => Promise<void>
    registerUser,           // (data) => Promise<void>
    registerCafeteria,      // (data) => Promise<void>
    logout,      // () => void
    clearError,  // () => void
  } = useAuth();

  // Usar en el componente
}
```

## 🛡️ Proteger Componentes

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

export function Page() {
  return (
    <ProtectedRoute allowedRoles={['user']}>
      <YourComponent />
    </ProtectedRoute>
  );
}
```

## 🎨 Estilos y Colores

El sistema mantiene la paleta de colores de Caffinity:
- **Primario**: `#522C5D` (púrpura)
- **Secundario**: `#29104A` (púrpura oscuro)
- **Acentos**: `#E3B6B1` (rosa)
- **Fondos**: Blanco y crema

## ⚠️ Notas Importantes

### Producción
1. **Hashear contraseñas** con bcrypt o similar
2. **Usar una base de datos real** (Supabase, Firebase, etc.)
3. **Implementar JWT** para tokens de sesión
4. **HTTPS obligatorio**
5. **Rate limiting** en endpoints de autenticación
6. **Validación en servidor** de todos los datos

### Desarrollo Actual
- Las contraseñas se almacenan en texto plano (SOLO PARA DEMO)
- Los datos se guardan en localStorage (volátil)
- Sin sesiones de larga duración
- Sin refresh tokens

## 📋 Reglas de Negocio Implementadas

### Usuarios Normales ✅
1. Email y contraseña requeridos
2. Acceso requiere autenticación
3. Perfil único por usuario
4. Posibilidad de editar información

### Usuarios de Cafetería ✅
1. Toda la información del usuario normal
2. Nombre de la cafetería
3. Ubicación (dirección, ciudad, zona)
4. Descripción del negocio
5. Imágenes (campo preparado para futuro)

## 🔄 Próximos Pasos

1. **Backend API**
   - Implementar endpoints de autenticación
   - Hashear contraseñas
   - JWT para sesiones

2. **Base de Datos**
   - Migrar de localStorage a DB real
   - Crear índices para emails únicos

3. **Features Adicionales**
   - Recuperación de contraseña
   - Verificación de email
   - 2FA (autenticación de dos factores)
   - OAuth (Google, Apple, etc.)

4. **Seguridad**
   - HTTPS
   - CORS
   - Rate limiting
   - CSRF protection

## 📞 Ejemplos de Datos de Prueba

Después de crear una cuenta, puedes usar:

**Usuario Normal**
```
Email: usuario@ejemplo.com
Contraseña: 123456
Nombre: Juan Pérez
```

**Cafetería**
```
Email: cafe@ejemplo.com
Contraseña: 123456
Nombre: Mi Cafetería
Dirección: Calle Principal 123
Ciudad: Madrid
Zona: Centro
Descripción: La mejor cafetería del barrio
```

## 🆘 Troubleshooting

### Usuario no se redirige a login
- Verificar que AuthProvider está envolviendo la app en layout.tsx ✅

### Errores de tipo en TypeScript
- Los tipos están definidos en `src/types/auth.ts`
- Verificar que los imports son correctos

### Datos persistentes perdidos
- Los datos están en localStorage (se pierden si se limpia el navegador)
- Usar DevTools → Storage → Local Storage para inspeccionar

---

**Creado con ❤️ para Caffinity**
