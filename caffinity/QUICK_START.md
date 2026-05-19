# 🚀 Guía Rápida - Sistema de Autenticación

## ¿Qué acabo de implementar?

Un **sistema completo de autenticación** con login y registro para usuarios normales y cafeterías, manteniendo la estética de Caffinity.

## ⚡ Primeros Pasos

### 1. Acceder al Login
```
http://localhost:4028/auth
```

### 2. Crear una Cuenta de Usuario
```
Login → "👤 Cuenta de Usuario" → Completar campos → "Crear Cuenta"

Campos:
- Nombre Completo (requerido)
- Email (requerido, debe ser único)
- Teléfono (opcional)
- Contraseña (mínimo 6 caracteres)
- Confirmar Contraseña
```

### 3. Crear una Cuenta de Cafetería
```
Login → "🏪 Cuenta de Cafetería" → Completar campos → "Registrar Cafetería"

Campos adicionales:
- Nombre de la Cafetería
- Dirección
- Ciudad y Zona
- Descripción del negocio
```

### 4. Cerrar Sesión
```
Barra inferior → Botón "Salir"
```

## 🧪 Probar con Datos de Ejemplo

### En la consola del navegador (F12):

```javascript
// Cargar datos de prueba
testData.loadTestData()

// Ahora puedes iniciar sesión con:
// Email: usuario@ejemplo.com
// Contraseña: 123456
// O
// Email: cafe@ejemplo.com
// Contraseña: 123456

// Ver datos guardados
testData.showData()

// Limpiar datos
testData.clearTestData()
```

## 📂 Archivos Nuevos

| Archivo | Descripción |
|---------|------------|
| `src/types/auth.ts` | Tipos de TypeScript |
| `src/contexts/AuthContext.tsx` | Lógica de autenticación |
| `src/app/auth/page.tsx` | Página de auth |
| `src/app/auth/components/LoginScreen.tsx` | Pantalla de login |
| `src/app/auth/components/RegisterScreen.tsx` | Registro usuario |
| `src/app/auth/components/RegisterCafeteriaScreen.tsx` | Registro cafetería |
| `src/components/ProtectedRoute.tsx` | Protección de rutas |

## 🔑 Usar en tu Código

### Acceder al estado de autenticación:

```typescript
import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { user, loading, error, logout } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>No autenticado</div>;

  return (
    <div>
      <h1>Hola, {user.fullName}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Proteger componentes:

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

export function Dashboard() {
  return (
    <ProtectedRoute allowedRoles={['user']}>
      <div>Solo usuarios normales ven esto</div>
    </ProtectedRoute>
  );
}
```

## 📋 Pantallas Disponibles

| Ruta | Descripción | Protegida |
|------|------------|-----------|
| `/auth` | Login/Registro | ❌ No |
| `/` | Home con swipe | ✅ Sí |
| `/feed-de-descubrimiento` | Feed | ✅ Sí |
| `/perfil-de-usuario` | Perfil | ✅ Sí |

## 🎨 Estilo

Todas las pantallas mantienen:
- ✅ Colores de Caffinity
- ✅ Fuente Plus Jakarta Sans
- ✅ Componentes redondeados
- ✅ Animaciones suaves
- ✅ Responsive design

## ✅ Validaciones Implementadas

### Login
- [x] Email requerido
- [x] Contraseña requerida
- [x] Validar credenciales

### Registro Usuario
- [x] Nombre completo requerido
- [x] Email válido y único
- [x] Contraseña mínimo 6 caracteres
- [x] Confirmar contraseña igual
- [x] Teléfono opcional

### Registro Cafetería
- [x] Todos los validaciones de usuario
- [x] Nombre de cafetería requerido
- [x] Dirección requerida
- [x] Ciudad requerida
- [x] Zona requerida
- [x] Descripción requerida

## 🔐 Seguridad Actual

⚠️ **IMPORTANTE**: Esto es un sistema de DEMO

- Las contraseñas se guardan en texto plano
- localStorage no es seguro para datos sensibles
- Usar solo para desarrollo/pruebas

## 🚀 Para Producción

Necesitas:

1. **Backend con autenticación real**
   ```
   POST /api/auth/login
   POST /api/auth/register
   POST /api/auth/register-cafeteria
   POST /api/auth/logout
   GET /api/auth/me
   ```

2. **Base de datos**
   ```
   Supabase, Firebase, MongoDB, PostgreSQL, etc.
   ```

3. **Hasheo de contraseñas**
   ```
   bcrypt, argon2, etc.
   ```

4. **JWT para sesiones**
   ```
   Tokens de autenticación
   ```

5. **HTTPS obligatorio**
   ```
   Cifrado en tránsito
   ```

## 🐛 Troubleshooting

### "No puedo crear cuenta"
- Verificar que el email no existe ya
- Verificar que las contraseñas coinciden
- Verificar que todos los campos requeridos están llenos

### "Error al iniciar sesión"
- Verificar email y contraseña
- Limpiar localStorage y probar de nuevo

### "Redirige a /auth automáticamente"
- No hay usuario autenticado
- localStorage fue limpiado
- Crear una nueva cuenta

## 📚 Documentación Completa

Para más detalles, consulta:
- `AUTH_DOCUMENTATION.md` - Guía completa
- `AUTHENTICATION_FLOW_DIAGRAM.md` - Diagramas de flujo
- `AUTHENTICATION_SUMMARY.md` - Resumen técnico

## 💡 Tips

1. **Ver datos en localStorage**: Abre DevTools → Storage → Local Storage → localhost:4028
2. **Ver estado de autenticación**: Abre consola → `testData.showData()`
3. **Cargar datos de prueba**: Consola → `testData.loadTestData()`
4. **Limpiar todo**: Consola → `testData.clearTestData()`

## 🎯 Próximos Pasos

1. [ ] Conectar a un backend real
2. [ ] Implementar recuperación de contraseña
3. [ ] Agregar verificación de email
4. [ ] Implementar OAuth (Google/Apple)
5. [ ] Agregar 2FA
6. [ ] Mejorar validaciones

---

**¡Tu app está lista para autenticación! 🎉**

Continúa con las instrucciones de producción cuando estés listo.
